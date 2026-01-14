import * as React from "react";
import { cn } from "@/lib/utils";

export type SwitchProps = React.InputHTMLAttributes<HTMLInputElement> & {
  isLoading?: boolean;
};

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, isLoading, disabled, ...props }, ref) => {
    const checked = typeof props.checked === "boolean" ? props.checked : false;
    const isDisabled = !!disabled || !!isLoading;
    return (
      <label
        className={cn(
          "focus-within:ring-offset-background inline-flex items-center rounded-full focus-within:ring-2 focus-within:ring-[var(--ring)] focus-within:ring-offset-2",
          isDisabled ? "cursor-not-allowed opacity-80" : "cursor-pointer",
          className,
        )}
      >
        <input
          type="checkbox"
          role="switch"
                    ref={ref}
          className="sr-only"
          disabled={isDisabled}
          aria-busy={isLoading ? "true" : undefined}
          {...props}
        />
        <span
          aria-hidden
          className={cn(
            "relative inline-flex h-6 w-11 flex-shrink-0 rounded-full transition-colors duration-200",
            checked ? "bg-[var(--primary)]" : "bg-[var(--primary)]/80",
          )}
        >
          <span
            className={cn(
              // Thumb should adjust for theme to guarantee contrast
              "absolute top-0.5 left-0.5 h-5 w-5 transform rounded-full bg-[var(--switch-thumb)] shadow-md transition-transform duration-200 ease-in-out",
              checked ? "translate-x-5" : "translate-x-0",
            )}
          />

          {/* Loading indicator centered inside the switch when isLoading */}
          {isLoading && (
            <span className="absolute inset-0 flex items-center justify-center">
              <svg
                className="h-4 w-4 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            </span>
          )}
        </span>
      </label>
    );
  },
);

Switch.displayName = "Switch";

export { Switch };
