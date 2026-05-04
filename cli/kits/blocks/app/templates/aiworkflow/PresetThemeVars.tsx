import React from "react";
import { cn } from "@/lib/utils";

type Props = React.PropsWithChildren<{ className?: string }>;

export function PresetThemeVars({ className, children }: Props) {
  return (
    <div
      className={cn(
        "[--btn-ring:theme(colors.cyan.500)] dark:[--btn-ring:theme(colors.cyan.400)]",

        "[--input-bg:theme(colors.white)] dark:[--input-bg:theme(colors.slate.950)]",
        "[--input-fg:theme(colors.slate.900)] dark:[--input-fg:theme(colors.slate.100)]",
        "[--input-placeholder:theme(colors.slate.400)] dark:[--input-placeholder:theme(colors.slate.500)]",
        "[--input-border:theme(colors.cyan.200)] dark:[--input-border:theme(colors.cyan.900)]",
        "[--input-focus-ring:theme(colors.cyan.500)] dark:[--input-focus-ring:theme(colors.cyan.400)]",
        "[--input-ring-offset:theme(colors.white)] dark:[--input-ring-offset:theme(colors.slate.950)]",

        "[--card-bg:theme(colors.white)] dark:[--card-bg:theme(colors.slate.900)]",
        "[--card-fg:theme(colors.slate.900)] dark:[--card-fg:theme(colors.slate.100)]",
        "[--card-title-fg:theme(colors.slate.950)] dark:[--card-title-fg:theme(colors.white)]",
        "[--card-muted-fg:theme(colors.slate.600)] dark:[--card-muted-fg:theme(colors.slate.300)]",
        "[--card-border:theme(colors.slate.200)] dark:[--card-border:theme(colors.slate.800)]",
        "[--card-shadow:0_10px_30px_rgba(8,15,30,0.08)]",

        "[--badge-bg:theme(colors.cyan.50)] dark:[--badge-bg:theme(colors.cyan.950)]",
        "[--badge-fg:theme(colors.cyan.700)] dark:[--badge-fg:theme(colors.cyan.200)]",
        "[--badge-border:theme(colors.cyan.200)] dark:[--badge-border:theme(colors.cyan.800)]",
        "[--badge-active-bg:theme(colors.cyan.500)] dark:[--badge-active-bg:theme(colors.cyan.500)]",
        "[--badge-active-fg:theme(colors.slate.950)] dark:[--badge-active-fg:theme(colors.slate.950)]",
        "[--badge-active-border:theme(colors.cyan.600)] dark:[--badge-active-border:theme(colors.cyan.400)]",

        "[--heading-fg:theme(colors.slate.950)] dark:[--heading-fg:theme(colors.white)]",
        "[--subheading-fg:theme(colors.slate.600)] dark:[--subheading-fg:theme(colors.slate.300)]",
        "[--description-fg:theme(colors.slate.700)] dark:[--description-fg:theme(colors.slate.200)]",

        "[--footer-bg:transparent] dark:[--footer-bg:transparent]",
        "[--footer-fg:theme(colors.slate.800)] dark:[--footer-fg:theme(colors.slate.100)]",
        "[--footer-heading-fg:theme(colors.slate.950)] dark:[--footer-heading-fg:theme(colors.white)]",
        "[--footer-link-fg:theme(colors.slate.700)] dark:[--footer-link-fg:theme(colors.slate.300)]",
        "[--footer-link-hover-fg:theme(colors.cyan.700)] dark:[--footer-link-hover-fg:theme(colors.cyan.300)]",
        "[--footer-link-hover-bg:theme(colors.cyan.50)] dark:[--footer-link-hover-bg:color-mix(in_oklab,oklch(0.25_0.06_230)_24%,transparent)]",
        "[--footer-muted-fg:theme(colors.slate.500)] dark:[--footer-muted-fg:theme(colors.slate.400)]",
        "[--footer-border:theme(colors.slate.200)] dark:[--footer-border:theme(colors.slate.800)]",

        "[--table-fg:inherit]",
        "[--table-muted-fg:theme(colors.slate.500)] dark:[--table-muted-fg:theme(colors.slate.400)]",
        "[--table-head-fg:theme(colors.slate.700)] dark:[--table-head-fg:theme(colors.slate.300)]",
        "[--table-border:theme(colors.slate.200)] dark:[--table-border:theme(colors.slate.800)]",
        "[--table-row-hover-bg:theme(colors.slate.50)] dark:[--table-row-hover-bg:theme(colors.slate.900)]",

        className,
      )}
    >
      {children}
    </div>
  );
}
