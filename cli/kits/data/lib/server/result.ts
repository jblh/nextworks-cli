import { NextResponse } from "next/server";
import type { ZodError } from "zod";
import type { Prisma } from "@prisma/client";
import { zodErrorToFieldErrors, type FieldErrors } from "@/lib/api/errors";

export type ApiResult<T = unknown> = {
  success: boolean;
  data?: T;
  message?: string;
  errors?: FieldErrors;
  code?: string;
};

export function ok<T>(data?: T, message?: string): ApiResult<T> {
  return { success: true, data, message };
}

export function fail(
  message: string,
  errors?: FieldErrors,
  code?: string,
): ApiResult<never> {
  return { success: false, message, errors, code };
}

export function jsonOk<T>(
  data?: T,
  options?: { status?: number; message?: string },
) {
  const { status = 200, message } = options || {};
  return NextResponse.json(ok(data, message), { status });
}

export function jsonFail(
  message: string,
  options?: { status?: number; errors?: FieldErrors; code?: string },
) {
  const { status = 400, errors, code } = options || {};
  return NextResponse.json(fail(message, errors, code), { status });
}

export function fromZod(error: ZodError, message = "Invalid input") {
  return fail(message, zodErrorToFieldErrors(error), "ZOD_VALIDATION_ERROR");
}

export function jsonFromZod(
  error: ZodError,
  options?: { message?: string; status?: number },
) {
  return jsonFail(options?.message ?? "Invalid input", {
    status: options?.status ?? 400,
    errors: zodErrorToFieldErrors(error),
    code: "ZOD_VALIDATION_ERROR",
  });
}

type PrismaKnownRequestErrorLike = { code: string; meta?: unknown };

function isPrismaKnownRequestError(
  e: unknown,
): e is PrismaKnownRequestErrorLike {
  return !!e && typeof e === "object" && "code" in e;
}

function extractUniqueField(
  err: PrismaKnownRequestErrorLike,
): string | undefined {
  const target = (err.meta as any)?.target;
  if (Array.isArray(target) && target.length) return String(target[0]);
  if (typeof target === "string") return String(target.split("_")[0]);
  return undefined;
}

export function jsonFromPrisma(
  error: unknown,
  options?: { defaultMessage?: string },
) {
  if (isPrismaKnownRequestError(error) && error.code === "P2002") {
    const field = extractUniqueField(error) ?? "form";
    return jsonFail("Conflict: duplicate value", {
      status: 409,
      errors: { [field]: "Already in use" },
      code: "P2002",
    });
  }
  return jsonFail(options?.defaultMessage ?? "Database error", {
    status: 500,
    code: "PRISMA_ERROR",
  });
}
