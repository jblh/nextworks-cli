import { NextRequest } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signupSchema } from "@/lib/validation/forms";
import { ZodError } from "zod";
import { jsonOk, jsonFail, jsonFromZod } from "@/lib/server/result";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = signupSchema.parse(body);

    const existing = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existing) {
      return jsonFail("Email already in use", {
        status: 409,
        errors: { email: "Email already in use" },
        code: "EMAIL_EXISTS",
      });
    }

    const hashed = await hash(data.password, 10);
    await prisma.user.create({
      data: { name: data.name, email: data.email, password: hashed },
    });

    return jsonOk(undefined, {
      status: 201,
      message: "User created successfully",
    });
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return jsonFromZod(error, { status: 400, message: "Validation failed" });
    }
    return jsonFail("Error during signup", { status: 500 });
  }
}
