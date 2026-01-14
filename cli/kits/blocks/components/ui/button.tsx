import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 shadow-xs",
        outline:
          "bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 border shadow-xs",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-xs",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    /** When true, bypasses tokenized buttonVariants so callers fully control classes */
    unstyled?: boolean;
    /** Opt-in: force inline CSS var styles for color/bg/border/ring */
    forceInlineVars?: boolean;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      unstyled = false,
      forceInlineVars = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    // Use caller-provided style; only inject inline var-driven colors when explicitly requested
    const incomingStyle =
      (props.style as React.CSSProperties | undefined) ?? undefined;
    const finalStyle =
      forceInlineVars && !unstyled
        ? {
            ...incomingStyle,
            color: "var(--btn-fg)",
            backgroundColor: "var(--btn-bg)",
            borderColor: "var(--btn-border)",
            "--tw-ring-color": "var(--btn-ring)",
          }
        : incomingStyle;

    // Only enable CSS variable hooks when explicitly requested via inline vars
    // or when the caller sets any [--btn-*] classes in className.
    const wantsVarHooks =
      !unstyled &&
      (forceInlineVars ||
        (typeof className === "string" && className.includes("[--btn-")));

    return (
      <Comp
        ref={ref}
        data-slot="button"
        className={
          unstyled
            ? cn(
                "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap disabled:pointer-events-none disabled:opacity-50",
                className,
              )
            : cn(
                buttonVariants({ variant, size }),
                wantsVarHooks && [
                  // Color var hooks (apply only when CSS vars are provided)
                  "text-[var(--btn-fg)]",
                  "bg-[var(--btn-bg)]",
                  "hover:bg-[var(--btn-hover-bg)]",
                  "hover:text-[var(--btn-hover-fg)]",
                  // explicit dark variants to compete with dark: utilities from variants like outline
                  "dark:bg-[var(--btn-bg)]",
                  "dark:hover:bg-[var(--btn-hover-bg)]",
                  "dark:hover:text-[var(--btn-hover-fg)]",
                  // Focus ring and border hooks
                  "focus-visible:ring-[var(--btn-ring)]",
                  "border-[var(--btn-border)]",
                  "dark:border-[var(--btn-border)]",
                ],
                className,
              )
        }
        style={finalStyle}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
