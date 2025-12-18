// TypeScript cli/kits/auth-core/app/api/users/[id]/route.ts
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { jsonOk, jsonFail, jsonFromZod } from "@/lib/server/result";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Ensure Prisma runs in Node.js runtime (not edge)
export const runtime = "nodejs";

// Next.js 15 style: params is a Promise
type RouteContext = { params: Promise<{ id: string }> };

function hasErrorCode(e: unknown, code: string): boolean {
  return (
    typeof e === "object" &&
    e !== null &&
    "code" in e &&
    typeof (e as { code?: unknown }).code === "string" &&
    (e as { code: string }).code === code
  );
}

export async function GET(_req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;

    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, image: true, role: true },
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
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return jsonFail("Unauthorized", { status: 401 });
    }

    const { id } = await params;
    const isAdmin = (session.user as { role?: string }).role === "admin";
    const isSelf = (session.user as { id?: string }).id === id;

    if (!isAdmin && !isSelf) {
      return jsonFail("Forbidden", { status: 403 });
    }

    const body: unknown = await req.json();
    if (typeof body !== "object" || body === null) {
      return jsonFail("Body must be a JSON object", { status: 400 });
    }

    // Lazy import to keep route light
    const { userUpdateSchema } = await import("@/lib/validation/forms");

    let parsed: any;
    try {
      parsed = userUpdateSchema.parse(body);
    } catch (err) {
      return jsonFromZod(err as any, {
        status: 400,
        message: "Validation failed",
      });
    }

    const data: Prisma.UserUpdateInput = {};

    if (parsed.name !== undefined) {
      data.name = parsed.name === "" ? null : parsed.name;
    }
    if (parsed.email !== undefined) {
      data.email = parsed.email;
    }
    if (parsed.image !== undefined) {
      data.image = parsed.image === "" ? null : parsed.image;
    }
    if (parsed.password !== undefined) {
      const { hashPassword } = await import("@/lib/hash");
      data.password = await hashPassword(parsed.password as string);
    }
    if (parsed.emailVerified !== undefined) {
      // parsed.emailVerified may be Date | string | null per schema
      data.emailVerified = parsed.emailVerified as any;
    }

    const updated = await prisma.user.update({
      where: { id },
      data,
    });

    return jsonOk(updated, { status: 200, message: "User updated" });
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
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return jsonFail("Unauthorized", { status: 401 });
    }

    const isAdmin = (session.user as { role?: string }).role === "admin";
    if (!isAdmin) {
      return jsonFail("Forbidden", { status: 403 });
    }

    const { id } = await params;

    // Clean up dependent records to avoid foreign-key issues
    await prisma.$transaction([
      prisma.account.deleteMany({ where: { userId: id } }),
      prisma.session.deleteMany({ where: { userId: id } }),
      // If your schema has posts or other dependent models, delete them here.
      // prisma.post.deleteMany({ where: { authorId: id } }),
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