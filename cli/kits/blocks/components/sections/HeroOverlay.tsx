"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Props for the HeroOverlay component.
 *
 * @remarks
 * - Prefer the structured image prop (image) over deprecated flat props.
 * - Slot-style className overrides are merged after defaults via cn().
 * - Motion controls affect CTA hover transitions.
 *
 * @public
 */
export interface HeroOverlayProps {
  id?: string;
  className?: string;

  // New structured image props (aligns with HeroSplit)
  image?: {
    src?: string;
    alt?: string;
    className?: string;
    objectFit?: React.CSSProperties["objectFit"];
    objectPosition?: React.CSSProperties["objectPosition"];
  };

  // Deprecated flat image props (kept for backward compatibility)
  /** @deprecated Use image.src instead */
  imageSrc?: string;
  /** @deprecated Use image.alt instead */
  imageAlt?: string;
  /** @deprecated Use image.objectFit instead */
  imageObjectFit?: React.CSSProperties["objectFit"];
  /** @deprecated Use image.objectPosition instead */
  imageObjectPosition?: React.CSSProperties["objectPosition"];

  // Allow string or object form like HeroSplit
  heading?: string | { text?: string; className?: string };
  subheading?: string | { text?: string; className?: string };
  overlayRGBA?: string;
  overlayDarkRGBA?: string;

  // Alias to match HeroSplit naming
  section?: { className?: string };
  container?: { className?: string };
  imageContainer?: { className?: string };
  overlay?: { className?: string };
  content?: { className?: string };
  textContainer?: { className?: string };

  // Retained styles; merged with heading/subheading.className when provided
  /** @deprecated Use heading.className */
  headingStyle?: { className?: string };
  /** @deprecated Use subheading.className */
  subheadingStyle?: { className?: string };

  ctaContainer?: { className?: string };

  // CTA objects now support label/href (aligns with HeroSplit)
  cta1?: {
    label?: string;
    href?: string;
    variant?:
      | "default"
      | "destructive"
      | "outline"
      | "secondary"
      | "ghost"
      | "link";
    size?: "default" | "sm" | "lg" | "icon";
    className?: string;
    unstyled?: boolean;
    style?: React.CSSProperties;
  };
  cta2?: {
    label?: string;
    href?: string;
    variant?:
      | "default"
      | "destructive"
      | "outline"
      | "secondary"
      | "ghost"
      | "link";
    size?: "default" | "sm" | "lg" | "icon";
    className?: string;
    unstyled?: boolean;
    style?: React.CSSProperties;
  };

  // Deprecated CTA props (kept for backward compatibility)
  /** @deprecated Use cta1.label instead */
  ctaBtn1Label?: string;
  /** @deprecated Use cta1.href instead */
  ctaBtn1Href?: string;
  /** @deprecated Use cta2.label instead */
  ctaBtn2Label?: string;
  /** @deprecated Use cta2.href instead */
  ctaBtn2Href?: string;

  ariaLabel?: string;

  // Motion control for CTA buttons
  enableMotion?: boolean;
}

/**
 * Full-bleed image hero with color overlay, heading/subheading, and up to two CTAs.
 *
 * @remarks
 * - Styling: slot-style overrides for container, imageContainer, overlay, content, textContainer.
 * - Motion: enableMotion applies hover-lift transitions to CTA buttons only.
 * - Accessibility: uses semantic <section> with aria-label; background image is
 *   decorative with overlay and text content provided separately.
 *
 * @example
 * <HeroOverlay
 *   image={{ src: "/hero.png", alt: "" }}
 *   heading="Welcome"
 *   subheading="Build faster with our blocks"
 *   cta1={{ label: "Get Started", href: "#getstarted" }}
 * />
 */
export function HeroOverlay({
  id,
  className,

  // Deprecated flat image defaults (still supported)
  imageSrc = "/hero.png",
  imageAlt = "Hero background image",
  imageObjectFit = "cover",
  imageObjectPosition = "center",

  // New structured image (optional)
  image,

  // Keep string defaults; object form supported
  heading = "Lorem ipsum dolor sit amet, consectetur",
  subheading = "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  overlayRGBA = "rgba(255, 255, 255, 0.8)",
  overlayDarkRGBA = "rgba(0, 0, 0, 0.8)",

  // Deprecated CTA label/href (still supported)
  ctaBtn1Label = "Get Started",
  ctaBtn1Href = "#getstarted",
  ctaBtn2Label,
  ctaBtn2Href,

  // Layout containers
  container = { className: "relative h-[440px] md:h-[500px] w-full" },
  // container = { className: "relative h-[500px] md:h-[600px] w-full" },
  section,
  imageContainer = { className: "absolute inset-0" },
  overlay = { className: "absolute inset-0 z-10 pointer-events-none" },
  content = {
    className:
      "relative z-20 h-full w-full flex flex-col justify-start items-center pt-14 pb-8 px-8",
  },
  textContainer = { className: "max-w-4xl space-y-6 text-center" },

  // Typography defaults (deprecated props still merged)
  headingStyle = { className: "" },
  subheadingStyle = { className: "" },

  // CTA containers and variants
  ctaContainer = {
    className:
      "flex flex-col sm:flex-row gap-4 mt-6 justify-center items-center",
  },
  cta1,
  cta2,

  ariaLabel = "Hero section",
  enableMotion = true,
}: HeroOverlayProps) {
  // Merge new structured image with deprecated flat props
  const effImage = {
    src: image?.src ?? imageSrc,
    alt: image?.alt ?? imageAlt,
    objectFit: image?.objectFit ?? imageObjectFit,
    objectPosition: image?.objectPosition ?? imageObjectPosition,
    className: image?.className,
  };

  // Defaults and normalization like HeroSplit
  const defaultHeading = {
    text: "Lorem ipsum dolor sit amet, consectetur",
    className:
      "text-4xl md:text-5xl font-bold text-center leading-tight text-foreground",
  };
  const defaultSubheading = {
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    className:
      "text-xl md:text-2xl text-center text-foreground leading-relaxed",
  };

  const normalizedHeading =
    typeof heading === "string"
      ? {
          text: heading,
          className: cn(defaultHeading.className, headingStyle?.className),
        }
      : {
          text: heading?.text ?? defaultHeading.text,
          className: cn(
            defaultHeading.className,
            headingStyle?.className,
            heading?.className,
          ),
        };

  const normalizedSubheading =
    typeof subheading === "string"
      ? {
          text: subheading,
          className: cn(
            defaultSubheading.className,
            subheadingStyle?.className,
          ),
        }
      : {
          text: subheading?.text ?? defaultSubheading.text,
          className: cn(
            defaultSubheading.className,
            subheadingStyle?.className,
            subheading?.className,
          ),
        };

  // Motion class for CTA buttons
  const buttonLift = enableMotion
    ? "transition-all duration-200 hover:-translate-y-0.5"
    : "transition-none hover:!translate-y-0";

  // CTA defaults and normalization (merge, don't replace).
  const defaultCta1 = {
    label: ctaBtn1Label,
    href: ctaBtn1Href,
    variant: "default" as const,
    size: "lg" as const,
    className: "",
  };
  const defaultCta2 = {
    label: ctaBtn2Label,
    href: ctaBtn2Href,
    variant: "outline" as const,
    size: "lg" as const,
    className: "",
  };

  const mergedCta1 = {
    ...defaultCta1,
    ...(cta1 ?? {}),
    className: cn(defaultCta1.className, cta1?.className, buttonLift),
  };
  const mergedCta2 =
    cta2 || ctaBtn2Label || ctaBtn2Href
      ? {
          ...defaultCta2,
          ...(cta2 ?? {}),
          className: cn(defaultCta2.className, cta2?.className, buttonLift),
        }
      : undefined;

  // buttonLift defined above

  // Merge alias section.className with container.className
  const finalContainerClass = cn(container.className, section?.className);

  const showCta2 = !!mergedCta2?.label;

  return (
    <section
      id={id}
      className={cn(finalContainerClass, className)}
      aria-label={ariaLabel}
    >
      <div className={imageContainer.className}>
        <Image
          src={effImage.src!}
          alt={effImage.alt!}
          fill
          sizes="100vw"
          quality={75}
          priority
          className={effImage.className}
          style={{
            objectFit: effImage.objectFit,
            objectPosition: effImage.objectPosition,
          }}
        />
      </div>

      <div
        className={overlay.className}
        style={{ backgroundColor: overlayRGBA }}
        aria-hidden
      />
      <div
        className={cn(overlay.className, "hidden dark:block")}
        style={{ backgroundColor: overlayDarkRGBA }}
        aria-hidden
      />

      <div className={content.className}>
        <div className={textContainer.className}>
          <h1 className={normalizedHeading.className}>
            {normalizedHeading.text}
          </h1>
          <p className={normalizedSubheading.className}>
            {normalizedSubheading.text}
          </p>
          <div className={ctaContainer.className}>
            {mergedCta1.label && (
              <Button
                asChild
                variant={mergedCta1.variant}
                size={mergedCta1.size}
                className={mergedCta1.className}
                unstyled={mergedCta1.unstyled}
                style={mergedCta1.style}
              >
                <Link
                  href={mergedCta1.href || "#"}
                  aria-label={mergedCta1.label}
                >
                  {mergedCta1.label}
                </Link>
              </Button>
            )}
            {showCta2 && (
              <Button
                asChild
                variant={mergedCta2!.variant}
                size={mergedCta2!.size}
                className={mergedCta2!.className}
                unstyled={mergedCta2!.unstyled}
                style={mergedCta2!.style}
              >
                <Link
                  href={mergedCta2!.href || "#"}
                  aria-label={mergedCta2!.label}
                >
                  {mergedCta2!.label}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
