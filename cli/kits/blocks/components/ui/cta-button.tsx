"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CTAButtonProps {
  /** Optional id on the root anchor/button */
  id?: string;
  /** Additional className merged with the button slot */
  className?: string;

  /** onClick handler for the CTA button (anchor element) */
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  /** Label text for the CTA button */
  ctaButtonLabel?: string;
  /** URL or anchor target for the CTA button */
  ctaButtonHref?: string;

  /** Deprecated style shorthands (kept for backward-compat). Prefer button.className */
  ctaButtonTextColor?: string;
  ctaButtonBgColor?: string;
  ctaButtonBorderColor?: string;
  ctaButtonDarkMode?: {
    color?: string;
    bg?: string;
    borderColor?: string;
  };
  ctaButtonHoverStyle?: {
    color?: string;
    bg?: string;
    borderColor?: string;
    transform?: string;
    boxShadow?: string;
  };

  /** Slot for shadcn Button styling */
  button?: {
    variant?:
      | "default"
      | "destructive"
      | "outline"
      | "secondary"
      | "ghost"
      | "link";
    size?: "default" | "sm" | "lg" | "icon";
    className?: string;
    /** Forward-through escape hatch matching Button */
    unstyled?: boolean;
    style?: React.CSSProperties;
  };
}

export function CTAButton({
  id,
  className,
  onClick,
  ctaButtonLabel = "Get Started",
  ctaButtonHref = "#contact",
  ctaButtonTextColor,
  ctaButtonBgColor,
  ctaButtonBorderColor,
  ctaButtonDarkMode,
  ctaButtonHoverStyle,
  button = {
    variant: "default",
    size: "lg",
    className:
      "bg-primary text-primary-foreground hover:bg-primary/90 font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5",
  },
}: CTAButtonProps) {
  if (!ctaButtonLabel) return null;

  // Build dynamic classes from deprecated style props (kept for compatibility)
  const dynamic: string[] = [];
  if (ctaButtonTextColor) dynamic.push(`text-${ctaButtonTextColor}`);
  if (ctaButtonBgColor) dynamic.push(`bg-${ctaButtonBgColor}`);
  if (ctaButtonBorderColor) dynamic.push(`border-${ctaButtonBorderColor}`);

  if (ctaButtonHoverStyle) {
    const { color, bg, borderColor, transform, boxShadow } =
      ctaButtonHoverStyle;
    if (color) dynamic.push(`hover:text-${color}`);
    if (bg) dynamic.push(`hover:bg-${bg}`);
    if (borderColor) dynamic.push(`hover:border-${borderColor}`);
    if (transform) dynamic.push(`hover:${transform}`);
    if (boxShadow) dynamic.push(`hover:${boxShadow}`);
  }

  if (ctaButtonDarkMode) {
    const { color, bg, borderColor } = ctaButtonDarkMode;
    if (color) dynamic.push(`dark:text-${color}`);
    if (bg) dynamic.push(`dark:bg-${bg}`);
    if (borderColor) dynamic.push(`dark:border-${borderColor}`);
  }

  const finalClassName = cn(
    // Allow var hooks to flow through to Button
    "border-[var(--btn-border)] focus-visible:ring-[var(--btn-ring)]",
    button.className,
    className,
    dynamic.join(" "),
  );

  return (
    <Button
      asChild
      variant={button.variant}
      size={button.size}
      className={finalClassName}
      {...(button.unstyled ? { unstyled: true } : {})}
      style={button.style}
    >
      <Link
        id={id}
        href={ctaButtonHref || "#"}
        onClick={onClick}
        aria-label={ctaButtonLabel}
      >
        {ctaButtonLabel}
      </Link>
    </Button>
  );
}
