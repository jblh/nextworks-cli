"use client";

import React from "react";
import { cn } from "@nextworks/blocks-core";
import { Input, Button } from "@nextworks/blocks-core";

/**
 * Props for a compact newsletter/signup block.
 *
 * - Slot-style API (section, container, header, heading, subheading, form, formRow, input, button)
 * - Merges consumer classes with sensible defaults via cn(...)
 * - Uses CSS vars in defaults so token/theming overrides don't break
 */
export interface NewsletterProps {
  id?: string;
  className?: string;

  headingText?: string;
  subheadingText?: string;

  /** Called after successful submit (form event will be passed) */
  onSubmit?: (e: React.FormEvent<HTMLFormElement>, email: string) => void;

  /** Slot-style overrides */
  section?: { className?: string };
  container?: { className?: string };
  header?: { className?: string };
  heading?: { className?: string };
  subheading?: { className?: string };
  form?: { className?: string };
  formRow?: { className?: string };
  input?: { className?: string };
  button?: {
    className?: string;
    variant?: any;
    size?: any;
    unstyled?: boolean;
  };

  enableMotion?: boolean;

  ariaLabel?: string;
}

// Default classes used for slot merging. Consumers' slot.className will be merged after these.
const DEFAULT_SECTION = "py-12 bg-[var(--card-bg)] text-[var(--card-fg)]";
const DEFAULT_CONTAINER = "max-w-3xl mx-auto px-4";
const DEFAULT_HEADER = "text-center mb-6";
const DEFAULT_HEADING =
  "text-2xl font-bold font-poppins text-foreground text-[var(--heading-fg)]";
const DEFAULT_SUBHEADING =
  "text-sm font-inter text-muted-foreground max-w-xl mx-auto leading-relaxed text-[var(--subheading-fg)]";
const DEFAULT_FORM = "w-full";
const DEFAULT_FORM_ROW =
  "mt-6 flex flex-col sm:flex-row items-center gap-3 justify-center";
const DEFAULT_INPUT =
  "w-full sm:flex-1 p-3 rounded-md border border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--input-fg)] placeholder:text-[var(--input-placeholder)]";
const DEFAULT_BUTTON =
  "w-full sm:w-auto px-5 py-3 rounded-md bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary text-primary-foreground font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 border-[var(--btn-border)] focus-visible:ring-[var(--btn-ring)]";

/**
 * Compact newsletter/signup block.
 *
 * Usage:
 * <Newsletter section={{ className: "bg-gradient-to-r ..." }} />
 *
 * Slots exposed: section, container, header, heading, subheading, form, formRow, input, button
 */
export function Newsletter({
  id,
  className,
  headingText = "Stay in the loop",
  subheadingText = "Subscribe for product news, tips, and updates.",
  onSubmit,
  section,
  container,
  header,
  heading,
  subheading,
  form,
  formRow,
  input,
  button,
  enableMotion = true,
  ariaLabel = "Newsletter signup section",
}: NewsletterProps) {
  const [email, setEmail] = React.useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(e, email);
    // Optimistic clear; consumer can override behavior via onSubmit
    setEmail("");
  };

  return (
    <section
      id={id}
      className={cn(DEFAULT_SECTION, section?.className, className)}
      aria-label={ariaLabel}
    >
      <div className={cn(DEFAULT_CONTAINER, container?.className)}>
        <div className={cn(DEFAULT_HEADER, header?.className)}>
          <h2 className={cn(DEFAULT_HEADING, heading?.className)}>
            {headingText}
          </h2>
          <p className={cn(DEFAULT_SUBHEADING, subheading?.className)}>
            {subheadingText}
          </p>
        </div>

        <form
          className={cn(DEFAULT_FORM, form?.className)}
          onSubmit={handleSubmit}
          aria-label="Newsletter signup form"
        >
          <div className={cn(DEFAULT_FORM_ROW, formRow?.className)}>
            <Input
              id="newsletter-email"
              name="email"
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              placeholder="Your email address"
              required
              aria-label="Email address"
              className={cn(DEFAULT_INPUT, input?.className)}
            />

            <Button
              type="submit"
              unstyled={button?.unstyled}
              variant={button?.variant}
              size={button?.size}
              className={cn(
                DEFAULT_BUTTON,
                button?.className,
                !enableMotion &&
                  "transition-none hover:!translate-y-0 hover:shadow-none",
              )}
            >
              Subscribe
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

/*
  Example component summary:
  - Slots exposed: section, container, header, heading, subheading, form, formRow, input, button
  - Accessibility: aria-label defaults; form has aria-label; input has aria-label; uses semantic <section>
  - Motion: enableMotion prop implemented (removes hover/transition classes when false)
*/
