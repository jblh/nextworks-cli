import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { jsonOk, jsonFail } from "@/lib/server/result";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Ensure Prisma runs in Node.js (not Edge)
export const runtime = "nodejs";

type RouteContext = { params: Promise<{ id: string }> };

// Type guards/helpers (kept minimal here)
const hasErrorCode = (e: unknown, code: string): boolean =>
  typeof e === "object" &&
  e !== null &&
  "code" in e &&
  typeof (e as { code?: unknown }).code === "string" &&
  (e as { code: string }).code === code;

export async function GET(_req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params; // async params in Next.js 15

    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, role: true },
    });

    if (!user) {
      return jsonFail("Not found", { status: 404 });
    }

    return jsonOk(user);
  } catch (e) {
    console.error("GET /api/users/[id] error:", e);
    return jsonFail("Failed to fetch user", { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: RouteContext) {
  try {
    // Only admins may update other users. Allow self-update as well.
    const session = await getServerSession(authOptions);
    if (!session?.user) return jsonFail("Unauthorized", { status: 401 });

    const { id } = await params;
    const isAdmin = (session.user as { role?: string }).role === "admin";
    const isSelf = (session.user as { id?: string }).id === id;
    if (!isAdmin && !isSelf) return jsonFail("Forbidden", { status: 403 });

    const body: unknown = await req.json();
    if (typeof body !== "object" || body === null) {
      return jsonFail("Body must be a JSON object", { status: 400 });
    }

    // Validate with Zod (imported lazily to keep this route light)
    const { userUpdateSchema } = await import("@/lib/validation/forms");
    try {
      const parsed = userUpdateSchema.parse(body);

      // Build Prisma-compatible update object (avoid `as any` + incremental mutation)
      const data = {
        ...(parsed.name !== undefined
          ? { name: parsed.name === "" ? null : parsed.name }
          : {}),
        ...(parsed.email !== undefined ? { email: parsed.email } : {}),
        ...(parsed.image !== undefined
          ? { image: parsed.image === "" ? null : parsed.image }
          : {}),
        ...(parsed.password !== undefined
          ? {
              password: await (async () => {
                const { hashPassword } = await import("@/lib/hash");
                // `password` is present in this branch; help TS narrow from `string | undefined`.
                return hashPassword(parsed.password!);
              })(),
            }
          : {}),
        ...(parsed.emailVerified !== undefined
          ? { emailVerified: parsed.emailVerified }
          : {}),
      } satisfies Parameters<typeof prisma.user.update>[0]["data"];

      const updated = await prisma.user.update({
        where: { id },
        data,
      });

      return jsonOk(updated, { status: 200, message: "User updated" });
        } catch (err) {
      // Zod errors
      if (err && typeof err === "object" && "issues" in err) {
        const { jsonFromZod } = await import("@/lib/server/result");
        return jsonFromZod(err as import("zod").ZodError, {
          status: 400,
          message: "Validation failed",
        });
      }
      throw err;
    }
  } catch (e) {
    console.error("PUT /api/users/[id] error:", e);
    if (hasErrorCode(e, "P2025")) {
      return jsonFail("Not found", { status: 404 });
    }
    return jsonFail("Failed to update user", { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  try {
    const { requireAdminApi } = await import("@/lib/auth-helpers");
    const session = await requireAdminApi();
    if (!session) return jsonFail("Forbidden", { status: 403 });

    const { id } = await params;

    // Clean up dependent records first to avoid FK violations
    await prisma.$transaction([
      prisma.account.deleteMany({ where: { userId: id } }),
      prisma.session.deleteMany({ where: { userId: id } }),
      prisma.post.deleteMany({ where: { authorId: id } }),
      prisma.user.delete({ where: { id } }),
    ]);

    return jsonOk({ ok: true }, { status: 200, message: "User deleted" });
  } catch (e) {
    console.error("DELETE /api/users/[id] error:", e);
    if (hasErrorCode(e, "P2025")) {
      return jsonFail("Not found", { status: 404 });
    }
    return jsonFail("Failed to delete user", { status: 500 });
  }
}
