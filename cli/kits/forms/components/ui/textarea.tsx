import * as React from "react";

import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          // Base structural + token fallbacks
          "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/30 dark:aria-invalid:focus-visible:ring-destructive/40 flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          // CSS variable hooks (preset-first). When vars are unset, tokens above apply.
          "border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--input-fg)] placeholder:text-[var(--input-placeholder)] focus-visible:ring-[var(--input-focus-ring)] focus-visible:ring-offset-[var(--input-ring-offset)]",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
