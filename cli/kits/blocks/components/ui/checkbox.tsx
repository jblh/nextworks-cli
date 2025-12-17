import * as React from "react";
import { cn } from "@/lib/utils";

export type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    // Use the native accent-color where supported for consistent checkbox fill
    const style: React.CSSProperties = { accentColor: "var(--primary)" }; // fallback; modern browsers will use this accent color

    return (
      <input
        type="checkbox"
        ref={ref}
        style={style}
        className={cn(
          // Keep layout small but add smooth transitions and focus ring
          "h-4 w-4 rounded border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--input-fg)] transition-colors duration-200 ease-in-out",
          "focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    );
  },
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
