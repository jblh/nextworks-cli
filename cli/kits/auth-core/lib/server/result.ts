export function jsonOk(data?: any, opts?: { status?: number; message?: string }) {
  return Response.json({ success: true, data: data ?? null, message: opts?.message ?? null }, { status: opts?.status ?? 200 });
}

export function jsonFail(
  message: string,
  opts?: { status?: number; code?: string | number; errors?: Record<string, string> | null },
) {
  return Response.json(
    { success: false, data: null, message, code: opts?.code ?? null, errors: opts?.errors ?? null },
    { status: opts?.status ?? 400 },
  );
}

export function jsonFromZod(err: any, opts?: { status?: number; message?: string }) {
  const fieldErrors: Record<string, string> = {};
  if (err?.issues && Array.isArray(err.issues)) {
    for (const issue of err.issues) {
      if (issue.path && issue.path.length > 0) {
        fieldErrors[String(issue.path[0])] = issue.message;
      }
    }
  }
  return jsonFail(opts?.message || "Validation failed", {
    status: opts?.status ?? 400,
    errors: Object.keys(fieldErrors).length > 0 ? fieldErrors : null,
    code: "VALIDATION_ERROR",
  });
}

export function jsonFromPrisma(err: any) {
  // Basic unique violation mapping (P2002)
  const code = (err && err.code) || "PRISMA_ERROR";
  if (code === "P2002") {
    const meta = err.meta || {};
    const target = Array.isArray(meta.target) ? meta.target[0] : meta.target;
    const field = typeof target === "string" ? target : "field";
    return jsonFail("Unique constraint violation", {
      status: 409,
      errors: { [field]: `${field} already in use` },
      code: "UNIQUE_CONSTRAINT",
    });
  }
  return jsonFail("Database error", { status: 500, code });
}
