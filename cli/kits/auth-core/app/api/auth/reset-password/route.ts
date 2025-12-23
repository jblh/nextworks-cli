import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resetPasswordSchema } from "@/lib/validation/forms";
import { hash } from "bcryptjs";
import { createHash } from "crypto";
import { z } from "zod";

export async function POST(req: Request) {
  if (process.env.NEXTWORKS_ENABLE_PASSWORD_RESET !== "1") {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  try {
    const parsed = resetPasswordSchema.parse(body);
    const { token, password } = parsed;

    const tokenHash = createHash("sha256").update(token).digest("hex");
    const pr = await prisma.passwordReset.findFirst({ where: { tokenHash } });
    if (!pr) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
    }
    if (pr.used) {
      return NextResponse.json({ message: "Token already used" }, { status: 400 });
    }
    if (pr.expires < new Date()) {
      return NextResponse.json({ message: "Token expired" }, { status: 400 });
    }

    const hashed = await hash(password, 10);
    await prisma.user.update({ where: { id: pr.userId }, data: { password: hashed } });
    await prisma.passwordReset.update({ where: { id: pr.id }, data: { used: true } });

    return NextResponse.json({ message: "Password updated" });
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation failed", errors: err.issues },
        { status: 400 },
      );
    }
    return NextResponse.json({ message: "Failed" }, { status: 400 });
  }
}

export async function GET(req: Request) {
  if (process.env.NEXTWORKS_ENABLE_PASSWORD_RESET !== "1") {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  const url = new URL(req.url);
  const token = url.searchParams.get("token");
  if (!token) return NextResponse.json({ valid: false }, { status: 400 });

  const tokenHash = createHash("sha256").update(token).digest("hex");
  const pr = await prisma.passwordReset.findFirst({ where: { tokenHash } });
  if (!pr) return NextResponse.json({ valid: false });
  if (pr.used) return NextResponse.json({ valid: false });
  if (pr.expires < new Date()) return NextResponse.json({ valid: false });

  return NextResponse.json({ valid: true });
}
