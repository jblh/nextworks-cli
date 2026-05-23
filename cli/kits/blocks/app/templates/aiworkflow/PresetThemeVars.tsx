import React from "react";
import { cn } from "@/lib/utils";

type Props = React.PropsWithChildren<{ className?: string }>;

export function PresetThemeVars({ className, children }: Props) {
  return (
    <div
      className={cn(
        "[--btn-ring:theme(colors.slate.950)] dark:[--btn-ring:theme(colors.white)]",

        "[--input-bg:theme(colors.white)] dark:[--input-bg:theme(colors.slate.950)]",
        "[--input-fg:theme(colors.slate.900)] dark:[--input-fg:theme(colors.slate.100)]",
        "[--input-placeholder:theme(colors.slate.400)] dark:[--input-placeholder:theme(colors.slate.500)]",
        "[--input-border:theme(colors.slate.200)] dark:[--input-border:theme(colors.slate.800)]",
        "[--input-focus-ring:theme(colors.slate.950)] dark:[--input-focus-ring:theme(colors.white)]",
        "[--input-ring-offset:theme(colors.white)] dark:[--input-ring-offset:theme(colors.slate.950)]",

        "[--card-bg:theme(colors.white)] dark:[--card-bg:theme(colors.slate.950)]",
        "[--card-fg:theme(colors.slate.900)] dark:[--card-fg:theme(colors.slate.100)]",
        "[--card-title-fg:theme(colors.slate.950)] dark:[--card-title-fg:theme(colors.white)]",
        "[--card-muted-fg:theme(colors.slate.600)] dark:[--card-muted-fg:theme(colors.slate.300)]",
        "[--card-border:theme(colors.slate.200)] dark:[--card-border:rgba(255,255,255,0.1)]",
        "[--card-shadow:0_10px_30px_rgba(8,15,30,0.08)] dark:[--card-shadow:0_12px_32px_rgba(0,0,0,0.35)]",

        "[--badge-bg:theme(colors.slate.50)] dark:[--badge-bg:theme(colors.slate.900)]",
        "[--badge-fg:theme(colors.slate.700)] dark:[--badge-fg:theme(colors.slate.200)]",
        "[--badge-border:theme(colors.slate.200)] dark:[--badge-border:theme(colors.slate.700)]",
        "[--badge-active-bg:theme(colors.slate.950)] dark:[--badge-active-bg:theme(colors.white)]",
        "[--badge-active-fg:theme(colors.white)] dark:[--badge-active-fg:theme(colors.slate.950)]",
        "[--badge-active-border:theme(colors.slate.950)] dark:[--badge-active-border:theme(colors.white)]",

        "[--heading-fg:theme(colors.slate.950)] dark:[--heading-fg:theme(colors.white)]",
        "[--subheading-fg:theme(colors.slate.600)] dark:[--subheading-fg:theme(colors.slate.300)]",
        "[--description-fg:theme(colors.slate.700)] dark:[--description-fg:theme(colors.slate.200)]",

        "[--footer-bg:transparent] dark:[--footer-bg:transparent]",
        "[--footer-fg:theme(colors.slate.800)] dark:[--footer-fg:theme(colors.slate.100)]",
        "[--footer-heading-fg:theme(colors.slate.950)] dark:[--footer-heading-fg:theme(colors.white)]",
        "[--footer-link-fg:theme(colors.slate.700)] dark:[--footer-link-fg:theme(colors.slate.300)]",
        "[--footer-link-hover-fg:theme(colors.slate.950)] dark:[--footer-link-hover-fg:theme(colors.white)]",
        "[--footer-link-hover-bg:theme(colors.slate.100)] dark:[--footer-link-hover-bg:rgba(255,255,255,0.06)]",
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
