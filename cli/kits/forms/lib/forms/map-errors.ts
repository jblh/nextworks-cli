import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import type { ApiResult } from "@/lib/server/result";

export function mapApiErrorsToForm<TFieldValues extends FieldValues>(
  form: UseFormReturn<TFieldValues>,
  result: ApiResult<unknown>,
  options?: { formKey?: string },
): string | undefined {
  if (!result || result.success) return undefined;

  const formKey = options?.formKey ?? "form";
  let globalMessage = result.message;

  const entries = Object.entries(result.errors ?? {});
  for (const [key, message] of entries) {
    if (!message) continue;
    if (key === formKey) {
      globalMessage = message;
      continue;
    }
    try {
      form.setError(key as Path<TFieldValues>, { type: "server", message });
    } catch {
      globalMessage = globalMessage ?? message;
    }
  }

  return globalMessage;
}
