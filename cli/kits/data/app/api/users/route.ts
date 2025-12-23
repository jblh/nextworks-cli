import { ZodError } from "zod";
import { prisma } from "@/lib/prisma";
import { userSchema } from "@/lib/validation/forms";
import {
  jsonOk,
  jsonFail,
  jsonFromZod,
  jsonFromPrisma,
} from "@/lib/server/result";

export const runtime = "nodejs";

export async function GET(req: Request) {
  // Restrict listing users to admins only to avoid leaking emails/passwords.
  const { requireAdminApi } = await import("@/lib/auth-helpers");
  const session = await requireAdminApi();
  if (!session) {
    return jsonFail("Forbidden", { status: 403 });
  }

  // Simple server-side paging: ?page=1&perPage=20
  const url = new URL(req.url);
  const page = Math.max(1, Number(url.searchParams.get("page") ?? "1"));
  const perPage = Math.min(
    200,
    Math.max(1, Number(url.searchParams.get("perPage") ?? "20")),
  );

  const skip = (page - 1) * perPage;

  // Return only safe public fields for users (no password, tokens, etc.)
  const [total, items] = await Promise.all([
    prisma.user.count(),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      skip,
      take: perPage,
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        role: true,
        createdAt: true,
        emailVerified: true,
      },
    }),
  ]);

  return jsonOk({ items, total, page, perPage });
}

export async function POST(req: Request) {
  try {
    // Only admins may create users via admin API
    const { requireAdminApi } = await import("@/lib/auth-helpers");
    const session = await requireAdminApi();
    if (!session) {
      return jsonFail("Forbidden", { status: 403 });
    }

    const body = await req.json();
    const data = userSchema.parse(body);
    const created = await prisma.user.create({
      data: { email: data.email, name: data.name || null },
    });
    return jsonOk(created, { status: 201, message: "User created" });
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return jsonFromZod(error, { status: 400, message: "Validation failed" });
    }
    if ((error as unknown as { code?: string })?.code === "P2002") {
      return jsonFromPrisma(error);
    }
    return jsonFail("Failed to create user", { status: 500 });
  }
}
