import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

type ApiErrorPayload = {
  message?: unknown;
  errors?: unknown;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function mapApiErrorsToForm<TFieldValues extends FieldValues>(
  methods: UseFormReturn<TFieldValues>,
  payload: unknown,
): string | null {
  if (!isRecord(payload)) return null;

  const messageRaw = (payload as ApiErrorPayload).message;
  const errorsRaw = (payload as ApiErrorPayload).errors;

  const message = typeof messageRaw === "string" ? messageRaw : null;

  if (!isRecord(errorsRaw)) return message;

  for (const [field, msg] of Object.entries(errorsRaw)) {
    // Runtime safety: only set errors for fields that exist on the form
    if (field in methods.getValues()) {
      methods.setError(field as Path<TFieldValues>, {
        type: "server",
        message: typeof msg === "string" ? msg : String(msg),
      });
    }
  }

  return message;
}

