import React from "react";
import { cn } from "@/lib/utils";

type Props = React.PropsWithChildren<{ className?: string }>;

/**
 * Gallery template token-bridge wrapper.
 *
 * Maps component-level CSS variables (btn, input, card, etc.) to the
 * EnhancedThemeProvider token variables applied on :root (e.g., --primary,
 * --foreground, --card, --ring). This preserves the original Gallery behavior:
 * colors are driven by the selected Color Theme, not a fixed preset palette.
 */
export function PresetThemeVars({ className, children }: Props) {
  return (
    <div
      className={cn(
        // Buttons (leave bg/fg unset by default so tokenized variants can apply; set ring here)
        "[--btn-ring:var(--ring)]",

        // Inputs
        "[--input-bg:var(--background)]",
        "[--input-fg:var(--foreground)]",
        "[--input-placeholder:var(--muted-foreground)]",
        "[--input-border:var(--input)]",
        "[--input-focus-ring:var(--ring)]",
        "[--input-ring-offset:var(--background)]",

        // Cards
        "[--card-bg:var(--card)]",
        "[--card-fg:var(--card-foreground)]",
        "[--card-title-fg:var(--foreground)]",
        "[--card-muted-fg:var(--muted-foreground)]",
        "[--card-border:var(--border)]",
        "[--card-shadow:0_6px_20px_rgba(0,0,0,0.06)]",

        // Badges/Chips (align to accent; active uses primary)
        "[--badge-bg:var(--accent)]",
        "[--badge-fg:var(--accent-foreground)]",
        "[--badge-border:var(--border)]",
        "[--badge-active-bg:var(--primary)]",
        "[--badge-active-fg:var(--primary-foreground)]",
        "[--badge-active-border:var(--primary)]",

        // Typography helpers
        "[--heading-fg:var(--foreground)]",
        "[--subheading-fg:var(--muted-foreground)]",
        "[--description-fg:var(--foreground)]",

        // Process timeline
        "[--process-step-bg:var(--primary)]",
        "[--process-step-fg:var(--primary-foreground)]",
        "[--process-connector:var(--border)]",

        // Footer
        "[--footer-bg:transparent]",
        "[--footer-fg:var(--foreground)]",
        "[--footer-heading-fg:var(--foreground)]",
        "[--footer-link-fg:var(--muted-foreground)]",
        "[--footer-link-hover-fg:var(--primary)]",
        "[--footer-link-hover-bg:color-mix(in oklab, var(--primary) 12%, transparent)]",
        "[--footer-muted-fg:var(--muted-foreground)]",
        "[--footer-border:var(--border)]",

        // Table (optional)
        "[--table-fg:inherit]",
        "[--table-muted-fg:var(--muted-foreground)]",
        "[--table-head-fg:var(--foreground)]",
        "[--table-border:var(--border)]",
        "[--table-row-hover-bg:var(--muted)]",

        // Navbar
        "[--navbar-toggle-bg:var(--background)]",
        "[--navbar-hover-bg:color-mix(in oklab, var(--primary) 12%, transparent)]",
        "[--navbar-ring:var(--ring)]",
        "[--navbar-border:var(--border)]",
        "[--navbar-accent:var(--foreground)]",

        className,
      )}
    >
      {children}
    </div>
  );
}
