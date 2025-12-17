export function mapApiErrorsToForm(methods: any, payload: any) {
  if (!payload || typeof payload !== "object") return null;
  const errors = payload.errors || null;
  const message = payload.message || null;
  if (errors && typeof errors === "object") {
    Object.entries(errors).forEach(([field, msg]) => {
      methods.setError(field as any, { type: "server", message: String(msg) });
    });
  }
  return message;
}
