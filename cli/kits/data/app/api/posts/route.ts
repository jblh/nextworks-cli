import { ZodError, z } from "zod";
import { prisma } from "@/lib/prisma";
import { postSchema } from "@/lib/validation/forms";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { jsonOk, jsonFail, jsonFromZod } from "@/lib/server/result";

// Ensure Prisma runs in Node.js (not Edge)
export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page = Math.max(1, Number(url.searchParams.get("page") ?? "1"));
    const perPage = Math.min(
      200,
      Math.max(1, Number(url.searchParams.get("perPage") ?? "8")),
    );
    const q = url.searchParams.get("q") ?? undefined;
    const sortField = url.searchParams.get("sortField") ?? "createdAt";
    const sortDir =
      (url.searchParams.get("sortDir") as "asc" | "desc") ?? "desc";

    const skip = (page - 1) * perPage;

    const where: NonNullable<Parameters<typeof prisma.post.count>[0]>["where"] = {};
    if (q) {
      where.title = { contains: q, mode: "insensitive" };
    }

    // Filter by published state if requested: published=published|draft
    const publishedParam = url.searchParams.get("published");
    if (publishedParam === "published") {
      where.published = true;
    } else if (publishedParam === "draft") {
      where.published = false;
    }

    const orderBy: NonNullable<Parameters<typeof prisma.post.findMany>[0]>["orderBy"] = {};
    // Allow server to order by title or createdAt for now. Defaults to createdAt
    if (sortField === "title") {
      orderBy.title = sortDir === "asc" ? "asc" : "desc";
    } else {
      orderBy.createdAt = sortDir === "asc" ? "asc" : "desc";
    }

    const [total, items] = await Promise.all([
      prisma.post.count({ where }),
      prisma.post.findMany({
        where,
        orderBy,
        skip,
        take: perPage,
        include: { author: { select: { name: true, email: true } } },
      }),
    ]);

    return jsonOk({ items, total, page, perPage });
  } catch (error: unknown) {
    console.error("GET /api/posts error:", error);
    return jsonFail("Failed to fetch posts", { status: 500 });
  }
}

/**
 * Create a new post.
 * DX: authorId is optional. If omitted, we default to the currently signed-in user.
 * - If authorId is provided in the payload, it is used as-is.
 * - Otherwise we read the NextAuth session and use session.user.id.
 * - If neither is available (no session and no authorId), we return 400 to preserve data integrity.
 */
export async function POST(req: Request) {
  try {
    // Allow authenticated users to create posts. Admins may create on behalf of others.
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return jsonFail("Not authenticated", { status: 401 });
    }

    // 1) Parse and validate the request body. Server-side we allow authorId to be blank/omitted
    //    because we can infer it from the authenticated session.
    const body = await req.json();
    const serverPostSchema = postSchema.extend({
      // Make authorId optional for this API (UI may still require it via postSchema)
      authorId: postSchema.shape.authorId.optional().or(z.literal("")),
    });
    const data = serverPostSchema.parse(body);

    // 2) Resolve the authorId: prefer explicit authorId (only if admin or same as session user), else default to current session user
    const providedAuthorId =
      data.authorId && data.authorId.length > 0 ? data.authorId : undefined;

    const sessionUserId = (session.user as { id?: string } | undefined)?.id;
    const sessionIsAdmin =
      (session.user as { role?: string } | undefined)?.role === "admin";

    if (providedAuthorId) {
      // If a non-admin tries to set someone else as the author, reject for safety.
      if (!sessionIsAdmin && providedAuthorId !== sessionUserId) {
        return jsonFail("Forbidden: cannot set authorId to another user", {
          status: 403,
        });
      }
    }

    const resolvedAuthorId = providedAuthorId ?? sessionUserId;

    if (!resolvedAuthorId) {
      return jsonFail(
        "authorId is required. Provide an authorId or sign in so we can default to your user id.",
        {
          status: 400,
          errors: {
            authorId: "Author ID is required or sign in to use your user ID",
          },
          code: "MISSING_AUTHOR",
        },
      );
    }

    const created = await prisma.post.create({
      data: {
        title: data.title,
        content: data.content || null,
        authorId: resolvedAuthorId,
        published: data.published ?? false,
      },
    });
    return jsonOk(created, { status: 201, message: "Post created" });
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return jsonFromZod(error, { status: 400, message: "Validation failed" });
    }
    return jsonFail("Failed to create post", { status: 500 });
  }
}
