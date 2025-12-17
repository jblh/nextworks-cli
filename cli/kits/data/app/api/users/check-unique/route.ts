import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { jsonOk, jsonFail } from "@/lib/server/result";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const field = body?.field;
    const value = body?.value;
    if (!field || !value) return jsonFail("Missing field or value", { status: 400 });

    // Only allow specific fields for security
    if (!["email", "username"].includes(field)) {
      return jsonFail("Unsupported field", { status: 400 });
    }

    let where: any = {};
    where[field] = value;

    const user = await prisma.user.findUnique({ where });
    return jsonOk({ unique: !user });
  } catch (e) {
    return jsonFail("Failed to check uniqueness", { status: 500 });
  }
}
