"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@nextworks/blocks-core";
import { cn } from "@nextworks/blocks-core";

/**
 * Props for the CTA section component.
 *
 * @remarks
 * Uses a slot-style API for Tailwind className overrides. Each slot's
 * className is merged with component defaults via cn().
 *
 * Prefer customizing spacing via headingText.className and other slot
 * classNames rather than legacy spacing props.
 *
 * @public
 */
interface CTAProps {
  /**
   * Optional id for the section.
   * @defaultValue "cta"
   */
  id?: string;
  /** Optional top-level class to override the section root */
  className?: string;

  /** Styling configuration objects (slot-style pattern like Navbar) */
  section?: { className?: string };
  container?: { className?: string };
  contentWrapper?: { className?: string };
  headingText?: {
    text?: string;
    className?: string;
  };
  subheadingText?: {
    text?: string;
    className?: string;
  };
  descriptionText?: {
    text?: string;
    className?: string;
  };
  actionsWrapper?: { className?: string };

  /**
   * Primary CTA config or null to hide it (mirrors Navbar ctaButton pattern)
   * Example: { label: "Get Started", href: "#contact" }
   */
  ctaButton?: { label: string; href: string } | null;
  /** Primary CTA button styles */
  ctaButtonStyle?: {
    unstyled?: boolean;
    style?: React.CSSProperties;
    variant?:
      | "default"
      | "destructive"
      | "outline"
      | "secondary"
      | "ghost"
      | "link";
    size?: "default" | "sm" | "lg" | "icon";
    className?: string;
  };
  /** Optional wrapper slot for the primary CTA */
  ctaButtonWrapper?: { className?: string };

  /** Optional secondary action */
  secondaryButton?: { label: string; href: string } | null;
  /** Secondary CTA button styles */
  secondaryButtonStyle?: {
    unstyled?: boolean;
    style?: React.CSSProperties;
    variant?:
      | "default"
      | "destructive"
      | "outline"
      | "secondary"
      | "ghost"
      | "link";
    size?: "default" | "sm" | "lg" | "icon";
    className?: string;
  };
  /** Optional wrapper slot for the secondary CTA */
  secondaryButtonWrapper?: { className?: string };

  /**
   * Legacy spacing hook applied to the heading.
   * @deprecated Prefer margin utilities via headingText.className
   */
  spacing?: { topMargin?: string };

  /** Accessibility */
  ariaLabel?: string;
  role?: string;
}

/**
 * Call-to-Action section with a heading, optional subheading/description,
 * and up to two actions (primary and secondary).
 *
 * @remarks
 * - Styling: exposes slot-style className overrides (section, container,
 *   contentWrapper, headingText, subheadingText, descriptionText, actionsWrapper,
 *   ctaButtonStyle, secondaryButtonStyle). Consumer classes are merged after
 *   defaults via cn().
 * - Accessibility: rendered as a semantic <section> with aria-label. The role
 *   defaults to "region" but can be customized with the role prop.
 * - Motion: subtle hover lift effects on buttons are included by default.
 *
 * @example
 * <CTA
 *   headingText={{ text: "Join The Launch Today!" }}
 *   descriptionText={{ text: "Start your free trial in minutes." }}
 *   ctaButton={{ label: "Sign Up", href: "#contact" }}
 *   secondaryButton={{ label: "Learn More", href: "#features" }}
 * />
 */
export function CTA({
  id = "cta",
  className,

  section = {
    className: "bg-background text-foreground",
  },
  container = {
    className:
      "mx-auto flex min-h-[42vh] w-full max-w-6xl flex-col items-center justify-center overflow-hidden px-4 pb-7",
  },
  contentWrapper = {
    className: "flex w-full flex-col items-center text-center",
  },
  headingText = {
    text: "Join The Launch Today!",
    className:
      "text-3xl font-bold leading-[1.1] text-primary sm:text-4xl md:text-5xl text-[var(--heading-fg)]",
  },
  subheadingText = {
    text: "",
    className:
      "mt-2 text-lg font-medium text-muted-foreground sm:text-xl text-[var(--subheading-fg)]",
  },
  descriptionText = {
    text: "",
    className:
      "mt-3 max-w-2xl text-base text-foreground/80 sm:text-lg text-[var(--description-fg)]",
  },
  actionsWrapper = {
    className: "mt-6 flex flex-col items-center gap-3 sm:flex-row",
  },

  ctaButton = { label: "Sign Up Now", href: "#contact" },
  ctaButtonStyle = {
    variant: "default",
    size: "default",
    className:
      "shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl border-[var(--btn-border)] focus-visible:ring-[var(--btn-ring)]",
  },
  ctaButtonWrapper = { className: "" },

  secondaryButton = null,
  secondaryButtonStyle = {
    variant: "outline",
    size: "default",
    className:
      "transition-transform duration-200 hover:-translate-y-0.5 border-[var(--btn-border)] focus-visible:ring-[var(--btn-ring)]",
  },
  secondaryButtonWrapper = { className: "" },

  spacing = { topMargin: "mt-0 sm:mt-12" },
  // spacing = { topMargin: "mt-[17vh]" },

  ariaLabel = "Call to action section",
  role = "region",
}: CTAProps) {
  // default class for actions wrapper (keeps a gap and responsive row layout)
  const actionsWrapperDefault =
    "mt-6 flex flex-col items-center gap-3 sm:flex-row";

  return (
    <section
      id={id}
      role={role}
      aria-label={ariaLabel}
      className={cn("w-full", section.className, className)}
    >
      <div className={cn(container.className)}>
        <div className={cn(contentWrapper.className)}>
          {headingText?.text ? (
            <h2
              className={cn(
                "text-center",
                spacing?.topMargin,
                headingText.className,
              )}
            >
              {headingText.text}
            </h2>
          ) : null}

          {subheadingText?.text ? (
            <p className={cn(subheadingText.className)}>
              {subheadingText.text}
            </p>
          ) : null}

          {descriptionText?.text ? (
            <p className={cn(descriptionText.className)}>
              {descriptionText.text}
            </p>
          ) : null}

          <div className={cn(actionsWrapperDefault, actionsWrapper.className)}>
            {ctaButton && (
              <Button
                asChild
                unstyled={ctaButtonStyle.unstyled}
                variant={ctaButtonStyle.variant}
                size={ctaButtonStyle.size}
                className={cn(
                  ctaButtonWrapper.className,
                  ctaButtonStyle.className,
                )}
                style={ctaButtonStyle.style}
              >
                <Link href={ctaButton.href} aria-label={ctaButton.label}>
                  {ctaButton.label}
                </Link>
              </Button>
            )}

            {secondaryButton && (
              <Button
                asChild
                unstyled={secondaryButtonStyle.unstyled}
                variant={secondaryButtonStyle.variant}
                size={secondaryButtonStyle.size}
                className={cn(
                  secondaryButtonWrapper.className,
                  secondaryButtonStyle.className,
                )}
                style={secondaryButtonStyle.style}
              >
                <Link
                  href={secondaryButton.href}
                  aria-label={secondaryButton.label}
                >
                  {secondaryButton.label}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
