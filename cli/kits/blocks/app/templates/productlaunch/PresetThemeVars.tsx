import React from "react";
import { cn } from "@/lib/utils";

type Props = React.PropsWithChildren<{ className?: string }>;

/**
 * ProductLaunch template theme variables wrapper.
 *
 * Sets a small CSS variable contract consumed by shared components
 * (Buttons, Inputs, Cards, Badges, Footer, Table, etc.).
 *
 * You can override any variable per-section by re-declaring it on
 * that section/container.
 */
export function PresetThemeVars({ className, children }: Props) {
  return (
    <div
      className={cn(
        // Button ring shared across template
        "[--btn-ring:theme(colors.purple.500)] dark:[--btn-ring:theme(colors.purple.400)]",

        // Inputs (Contact)
        "[--input-bg:theme(colors.white)] dark:[--input-bg:theme(colors.gray.900)]",
        "[--input-fg:theme(colors.gray.900)] dark:[--input-fg:theme(colors.gray.100)]",
        "[--input-placeholder:theme(colors.gray.400)] dark:[--input-placeholder:theme(colors.gray.500)]",
        "[--input-border:theme(colors.purple.200)] dark:[--input-border:theme(colors.purple.700)]",
        "[--input-focus-ring:theme(colors.purple.500)] dark:[--input-focus-ring:theme(colors.purple.400)]",
        "[--input-ring-offset:theme(colors.white)] dark:[--input-ring-offset:theme(colors.gray.900)]",

        // Cards (Features, ServicesGrid, Pricing, Testimonials, etc.)
        "[--card-bg:theme(colors.white)] dark:[--card-bg:theme(colors.gray.900)]",
        "[--card-fg:theme(colors.gray.900)] dark:[--card-fg:theme(colors.gray.100)]",
        "[--card-title-fg:theme(colors.gray.900)] dark:[--card-title-fg:theme(colors.gray.100)]",
        "[--card-muted-fg:theme(colors.gray.500)] dark:[--card-muted-fg:theme(colors.gray.400)]",
        "[--card-border:theme(colors.gray.200)] dark:[--card-border:theme(colors.gray.800)]",
        "[--card-shadow:0_6px_20px_rgba(0,0,0,0.06)]",

        // Badges/Chips (Portfolio filters/tags, Pricing badge, Testimonials avatar)
        "[--badge-bg:theme(colors.purple.50)] dark:[--badge-bg:theme(colors.purple.950)]",
        "[--badge-fg:theme(colors.purple.700)] dark:[--badge-fg:theme(colors.purple.300)]",
        "[--badge-border:theme(colors.purple.200)] dark:[--badge-border:theme(colors.purple.800)]",
        "[--badge-active-bg:theme(colors.purple.600)] dark:[--badge-active-bg:theme(colors.purple.500)]",
        "[--badge-active-fg:theme(colors.white)] dark:[--badge-active-fg:theme(colors.white)]",
        "[--badge-active-border:theme(colors.purple.700)] dark:[--badge-active-border:theme(colors.purple.400)]",

        // Headings/Subheadings
        "[--heading-fg:theme(colors.gray.900)] dark:[--heading-fg:theme(colors.gray.100)]",
        "[--subheading-fg:theme(colors.gray.600)] dark:[--subheading-fg:theme(colors.gray.300)]",
        "[--description-fg:theme(colors.gray.700)] dark:[--description-fg:theme(colors.gray.200)]",

        // Footer
        "[--footer-bg:transparent] dark:[--footer-bg:transparent]",
        "[--footer-fg:theme(colors.gray.800)] dark:[--footer-fg:theme(colors.gray.100)]",
        "[--footer-heading-fg:theme(colors.gray.900)] dark:[--footer-heading-fg:theme(colors.gray.100)]",
        "[--footer-link-fg:theme(colors.gray.700)] dark:[--footer-link-fg:theme(colors.gray.300)]",
        "[--footer-link-hover-fg:theme(colors.purple.700)] dark:[--footer-link-hover-fg:theme(colors.purple.400)]",
        "[--footer-link-hover-bg:theme(colors.purple.50)] dark:[--footer-link-hover-bg:color-mix(in_oklab,oklch(0.17_0.05_324)_20%,transparent)]",
        "[--footer-muted-fg:theme(colors.gray.500)] dark:[--footer-muted-fg:theme(colors.gray.400)]",
        "[--footer-border:theme(colors.gray.200)] dark:[--footer-border:theme(colors.gray.800)]",

        // Table (optional)
        "[--table-fg:inherit]",
        "[--table-muted-fg:theme(colors.gray.500)] dark:[--table-muted-fg:theme(colors.gray.400)]",
        "[--table-head-fg:theme(colors.gray.700)] dark:[--table-head-fg:theme(colors.gray.300)]",
        "[--table-border:theme(colors.gray.200)] dark:[--table-border:theme(colors.gray.800)]",
        "[--table-row-hover-bg:theme(colors.gray.50)] dark:[--table-row-hover-bg:theme(colors.gray.900)]",

        className,
      )}
    >
      {children}
    </div>
  );
}
