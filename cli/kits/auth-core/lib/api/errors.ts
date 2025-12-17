import { ZodError } from "zod";

export type FieldErrors = Record<string, string>;

export function zodErrorToFieldErrors(error: ZodError): FieldErrors {
  const fieldErrors: FieldErrors = {};
  for (const issue of error.issues) {
    const key = (issue.path?.[0]?.toString() || "form").toString();
    if (!fieldErrors[key]) {
      fieldErrors[key] = issue.message;
    }
  }
  return fieldErrors;
}
