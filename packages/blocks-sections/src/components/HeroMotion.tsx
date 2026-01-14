"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@nextworks/blocks-core";
import { cn } from "@nextworks/blocks-core";

/**
 * Props for the HeroMotion component.
 *
 * @remarks
 * - Styling: exposes slot-style className overrides merged via cn().
 * - Motion: controlled by enableMotion and motionOptions; respects
 *   prefers-reduced-motion by allowing disabling transforms.
 * - Accessibility: rendered as a semantic <section> with aria-label.
 * - CTA: primary/secondary CTA can be links (href provided) or buttons.
 */
type MotionTransition = React.ComponentProps<typeof motion.div>["transition"];

export interface HeroMotionProps {
  /** Optional id to attach to the section root */
  id?: string;
  /** ARIA label for the section. @defaultValue "Hero section" */
  ariaLabel?: string;
  /** Optional top-level class to override the root */
  className?: string;

  /** Primary heading text. Ignored when headingNode is provided. */
  heading?: string;
  /** Custom heading node; use for advanced layouts or styling. */
  headingNode?: React.ReactNode;
  /** Inline highlight node rendered next to heading text. */
  highlight?: React.ReactNode;
  /** Optional description paragraph/node */
  description?: React.ReactNode;

  /** Primary call to action config or null to hide */
  primaryCta?: { label: string; href?: string } | null;
  /** Secondary call to action config or null to hide */
  secondaryCta?: { label: string; href?: string } | null;

  /** Slot-style overrides */
  section?: { className?: string };
  container?: { className?: string };
  content?: { className?: string };
  headingText?: { className?: string };
  highlightText?: { className?: string };
  descriptionText?: { className?: string };
  actions?: { className?: string };
  primaryButtonStyle?: {
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

  /** Optional background node (e.g., SVGs, gradients, images) */
  backgroundNode?: React.ReactNode;

  /** When false, disables entrance animations */
  enableMotion?: boolean;

  /** Motion configuration for entrance sequences */
  motionOptions?: {
    viewport?: { once?: boolean; amount?: number };
    headingDelay?: number;
    descriptionDelay?: number;
    actionsDelay?: number;
    transition: MotionTransition;
  };
}

const defaultChildTransition: MotionTransition = {
  type: "tween",
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1], // smooth easeOut
};

/**
 * Motion-first hero with heading/highlight, optional description and CTAs.
 *
 * @remarks
 * - Styling: slot-style className overrides are merged after defaults via cn().
 * - Motion: enableMotion toggles entrance transitions; motionOptions controls
 *   delays and viewport.
 * - Accessibility: semantic <section> with aria-label.
 *
 * @example
 * <HeroMotion
 *   heading="Supercharge growth with"
 *   highlight="AI-powered insights"
 *   primaryCta={{ label: 'Get Started', href: '#contact' }}
 * />
 */
export function HeroMotion({
  id,
  ariaLabel = "Hero section",
  className,
  heading = "Supercharge growth with",
  headingNode,
  highlight = "AI-powered insights",
  description = (
    <>
      Real-time trends, accurate user signals, and smarter, data-driven
      decisions.
    </>
  ),
  primaryCta = { label: "Get Started" },
  secondaryCta = { label: "See Demo" },
  section = { className: "bg-background relative overflow-hidden" },
  container = { className: "mx-auto max-w-7xl px-6 py-24 sm:py-28 lg:py-32" },
  content = { className: "mx-auto max-w-3xl text-center" },
  headingText = {
    className:
      "transform-gpu will-change-transform text-foreground text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl",
  },
  highlightText = {
    className:
      "from-primary via-primary/80 to-primary/60 bg-gradient-to-r bg-clip-text text-transparent",
  },
  descriptionText = {
    className:
      "transform-gpu will-change-transform text-muted-foreground mt-5 text-base text-pretty sm:text-lg",
  },
  actions = { className: "mt-8 flex items-center justify-center gap-3" },
  primaryButtonStyle = { size: "lg", variant: "default", className: "" },
  secondaryButtonStyle = { size: "lg", variant: "outline", className: "" },
  enableMotion = true,
  motionOptions = {
    viewport: { once: true, amount: 0.25 },
    headingDelay: 0.5,
    descriptionDelay: 0.58,
    actionsDelay: 0.66,
    transition: defaultChildTransition,
  },
  backgroundNode,
}: HeroMotionProps) {
  const viewport = enableMotion
    ? {
        once: motionOptions?.viewport?.once ?? true,
        amount: motionOptions?.viewport?.amount ?? 0.25,
      }
    : { once: true, amount: 0 };

  const transition: MotionTransition = {
    ...defaultChildTransition,
    ...(motionOptions?.transition ?? {}),
  };

  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(section.className, className)}
    >
      {backgroundNode}
      <div className={cn(container.className)}>
        <motion.div className={cn(content.className)}>
          <motion.h1
            initial={
              enableMotion ? { opacity: 0, y: 12 } : { opacity: 1, y: 0 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={
              enableMotion
                ? { ...transition, delay: motionOptions?.headingDelay ?? 0.5 }
                : { type: "tween", duration: 0 }
            }
            className={cn(headingText.className)}
          >
            {headingNode ? (
              headingNode
            ) : (
              <>
                {heading}
                {highlight ? (
                  <span className={cn(highlightText.className)}>
                    {" "}
                    {highlight}
                  </span>
                ) : null}
              </>
            )}
          </motion.h1>

          {description ? (
            <motion.p
              initial={
                enableMotion ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={
                enableMotion
                  ? {
                      ...transition,
                      delay: motionOptions?.descriptionDelay ?? 0.58,
                    }
                  : { type: "tween", duration: 0 }
              }
              className={cn(descriptionText.className)}
            >
              {description}
            </motion.p>
          ) : null}

          {(primaryCta || secondaryCta) && (
            <motion.div
              initial={
                enableMotion ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={
                enableMotion
                  ? {
                      ...transition,
                      delay: motionOptions?.actionsDelay ?? 0.66,
                    }
                  : { type: "tween", duration: 0 }
              }
              className={cn(actions.className)}
            >
              {primaryCta &&
                (primaryCta.href ? (
                  <Button
                    asChild
                    unstyled={primaryButtonStyle.unstyled}
                    variant={primaryButtonStyle.variant}
                    size={primaryButtonStyle.size}
                    className={cn(primaryButtonStyle.className)}
                    style={primaryButtonStyle.style}
                  >
                    <Link href={primaryCta.href} aria-label={primaryCta.label}>
                      {primaryCta.label}
                    </Link>
                  </Button>
                ) : (
                  <Button
                    variant={primaryButtonStyle.variant}
                    size={primaryButtonStyle.size}
                    className={cn(primaryButtonStyle.className)}
                    unstyled={primaryButtonStyle.unstyled}
                    style={primaryButtonStyle.style}
                    aria-label={primaryCta.label}
                  >
                    {primaryCta.label}
                  </Button>
                ))}

              {secondaryCta &&
                (secondaryCta.href ? (
                  <Button
                    asChild
                    unstyled={secondaryButtonStyle.unstyled}
                    variant={secondaryButtonStyle.variant}
                    size={secondaryButtonStyle.size}
                    className={cn(secondaryButtonStyle.className)}
                    style={secondaryButtonStyle.style}
                  >
                    <Link
                      href={secondaryCta.href}
                      aria-label={secondaryCta.label}
                    >
                      {secondaryCta.label}
                    </Link>
                  </Button>
                ) : (
                  <Button
                    variant={secondaryButtonStyle.variant}
                    size={secondaryButtonStyle.size}
                    className={cn(secondaryButtonStyle.className)}
                    unstyled={secondaryButtonStyle.unstyled}
                    style={secondaryButtonStyle.style}
                    aria-label={secondaryCta.label}
                  >
                    {secondaryCta.label}
                  </Button>
                ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
