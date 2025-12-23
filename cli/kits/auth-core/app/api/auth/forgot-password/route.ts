import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { forgotPasswordSchema } from "@/lib/validation/forms";
import { randomBytes, createHash } from "crypto";
import { sendDevEmail } from "@/lib/email/dev-transport";
import { sendEmail, isEmailProviderConfigured } from "@/lib/email";

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_PER_WINDOW = 5;
const ipMap = new Map<string, number[]>();

function rateLimit(ip: string) {
  const now = Date.now();
  const arr = ipMap.get(ip) ?? [];
  const pruned = arr.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  pruned.push(now);
  ipMap.set(ip, pruned);
  return pruned.length <= MAX_PER_WINDOW;
}

export async function POST(req: Request) {
  if (process.env.NEXTWORKS_ENABLE_PASSWORD_RESET !== "1") {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  const ip = req.headers.get("x-forwarded-for") || "local";
  if (!rateLimit(ip)) {
    return NextResponse.json({ message: "Too many requests" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  try {
    const parsed = forgotPasswordSchema.parse(body);
    const { email } = parsed;

    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      const token = randomBytes(24).toString("hex");
      const tokenHash = createHash("sha256").update(token).digest("hex");
      const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour
      await prisma.passwordReset.create({
        data: {
          tokenHash,
          expires,
          user: { connect: { id: user.id } },
        },
      });

      const mailConfigured = isEmailProviderConfigured();
      const isProd = process.env.NODE_ENV === "production";

      if (
        isProd &&
        process.env.NEXTWORKS_ENABLE_PASSWORD_RESET === "1" &&
        !mailConfigured
      ) {
        return NextResponse.json({ message: "Not found" }, { status: 404 });
      }

      try {
        const base = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
        const resetUrl = `${base.replace(/\/$/, "")}/auth/reset-password?token=${token}`;

        if (mailConfigured) {
          try {
            await sendEmail({
              to: email,
              subject: "Password reset",
              text: `Reset your password: ${resetUrl}`,
              html: `<p>Reset your password: <a href="${resetUrl}">Reset password</a></p>`,
            });
            console.info(`Password reset email queued for ${email}`);
          } catch {
            console.error("Failed to send password reset email");
          }
        } else if (process.env.NEXTWORKS_USE_DEV_EMAIL === "1") {
          try {
            const { previewUrl } = await sendDevEmail({
              to: email,
              subject: "Password reset",
              text: `Reset your password: ${resetUrl}`,
              html: `<p>Reset your password: <a href="${resetUrl}">Reset password</a></p>`,
            });
            if (previewUrl) {
              console.info(`Password reset email (dev preview): ${previewUrl}`);
            } else {
              console.info(`Password reset email queued for ${email}`);
            }
          } catch {
            console.error("Failed to send dev password reset email");
          }
        } else {
          console.info(`Password reset requested for ${email}`);
        }
      } catch {
        console.error("Failed to handle password reset email");
      }
    }

    return NextResponse.json({ message: "If an account exists, a reset link was sent." });
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
