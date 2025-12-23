import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { postSchema } from "@/lib/validation/forms";
import { jsonOk, jsonFail, jsonFromZod } from "@/lib/server/result";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Ensure Prisma runs in Node.js (not Edge)
export const runtime = "nodejs";

type RouteContext = { params: Promise<{ id: string }> };

export async function PUT(req: Request, { params }: RouteContext) {
  try {
    const { id } = await params;

    // Require authenticated session
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return jsonFail("Unauthorized", { status: 401 });
    }

    // Only admins or the post author may update
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) return jsonFail("Not found", { status: 404 });

    const isAdmin = (session.user as { role?: string }).role === "admin";
    const isAuthor = (session.user as { id?: string }).id === post.authorId;
    if (!isAdmin && !isAuthor) {
      return jsonFail("Forbidden", { status: 403 });
    }

    // Validate only the fields we allow to update. Make them optional so partial updates (e.g. { published: true }) work.
    const updateSchema = postSchema
      .pick({ title: true, content: true, published: true })
      .partial();
    const body = await req.json();
    const data = updateSchema.parse(body);

    // Build Prisma update object only with provided fields to avoid overwriting with undefined
    const updateData: Parameters<typeof prisma.post.update>[0]["data"] = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.content !== undefined) updateData.content = data.content ?? null;
    if (data.published !== undefined) updateData.published = data.published;

    const updated = await prisma.post.update({
      where: { id },
      data: updateData,
    });
    return jsonOk(updated, { status: 200, message: "Post updated" });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return jsonFromZod(error, { status: 400, message: "Validation failed" });
    }
    return jsonFail("Failed to update post", { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: RouteContext) {
  try {
    const { id } = await params; // await params

    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return jsonFail("Unauthorized", { status: 401 });
    }

    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) return jsonFail("Not found", { status: 404 });

    const isAdmin = (session.user as { role?: string }).role === "admin";
    const isAuthor = (session.user as { id?: string }).id === post.authorId;
    if (!isAdmin && !isAuthor) {
      return jsonFail("Forbidden", { status: 403 });
    }

    await prisma.post.delete({ where: { id } }); // If Int: id: Number(id)
    return jsonOk({ ok: true }, { status: 200, message: "Post deleted" });
  } catch (e: unknown) {
    console.error("DELETE /api/posts/[id] error:", e);
    return jsonFail("Failed to delete post", { status: 500 });
  }
}
