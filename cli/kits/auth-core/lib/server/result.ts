import { NextResponse } from "next/server";
import type { ZodError } from "zod";

export type FieldErrors = Record<string, string>;

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

export function jsonFromZod(
  error: ZodError,
  options?: { status?: number; message?: string },
) {
  const fieldErrors: FieldErrors = {};
  for (const issue of error.issues) {
    if (issue.path.length > 0) {
      fieldErrors[String(issue.path[0])] = issue.message;
    }
  }

  return jsonFail(options?.message ?? "Validation failed", {
    status: options?.status ?? 400,
    errors: Object.keys(fieldErrors).length > 0 ? fieldErrors : undefined,
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
  const meta = err.meta;
  const target =
    meta && typeof meta === "object" && "target" in meta
      ? (meta as { target?: unknown }).target
      : undefined;
  if (Array.isArray(target) && target.length) return String(target[0]);
  if (typeof target === "string") return String(target.split("_")[0]);
  return undefined;
}

export function jsonFromPrisma(error: unknown) {
  if (isPrismaKnownRequestError(error) && error.code === "P2002") {
    const field = extractUniqueField(error) ?? "field";
    return jsonFail("Unique constraint violation", {
      status: 409,
      errors: { [field]: `${field} already in use` },
      code: "P2002",
    });
  }

  const code = isPrismaKnownRequestError(error) ? error.code : "PRISMA_ERROR";
  return jsonFail("Database error", { status: 500, code });
}

