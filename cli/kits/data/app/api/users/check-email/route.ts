import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { jsonOk, jsonFail } from "@/lib/server/result";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const email = body?.email;
    if (!email) return jsonFail("Missing email", { status: 400 });

    const user = await prisma.user.findUnique({ where: { email } });
    return jsonOk({ exists: !!user });
  } catch (e) {
    return jsonFail("Failed to check email", { status: 500 });
  }
}
