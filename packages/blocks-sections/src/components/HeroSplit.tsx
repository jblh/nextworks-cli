"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@nextworks/blocks-core";
import { cn } from "@nextworks/blocks-core";

/**
 * Props for the HeroSplit component.
 *
 * @remarks
 * - Layout: split hero with text and image. imageLayout controls whether the
 *   image is full-bleed or padded.
 * - Styling: slot-style className overrides are merged via cn(). Heading and
 *   subheading accept either a string or a { text, className } object.
 * - Motion: enableMotion toggles button hover lift transitions.
 * - Accessibility: uses a semantic <section> with aria-label.
 */
interface HeroSplitProps {
  /** Optional id to attach to the root section element */
  id?: string;
  /** Optional top-level class to override the root */
  className?: string;
  /** Section slot override */
  section?: { className?: string };
  /** Heading string or object with text and className */
  heading?: string | { text?: string; className?: string };
  /** Subheading string or object with text and className */
  subheading?: string | { text?: string; className?: string };
  /** Primary CTA configuration */
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
    /** When true, renders the Button in unstyled mode to avoid token bleed from variants */
    unstyled?: boolean;
    /** Optional inline style forwarded to Button */
    style?: React.CSSProperties;
  };
  /** Secondary CTA configuration */
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
    /** When true, renders the Button in unstyled mode to avoid token bleed from variants */
    unstyled?: boolean;
    /** Optional inline style forwarded to Button */
    style?: React.CSSProperties;
  };
  /** Image configuration */
  image?: { src?: string; alt?: string; className?: string };
  /** Image container slot */
  imageContainer?: { className?: string };
  /** Text container slot */
  textContainer?: { className?: string };
  /** Buttons container slot */
  buttonsContainer?: { className?: string };
  /** Text alignment at large breakpoints. @defaultValue "center" */
  textAlign?: "left" | "center" | "right";
  /** Fallback node shown when no image.src is provided */
  fallback?: React.ReactNode;
  /** ARIA label for the section. @defaultValue "Hero section" */
  ariaLabel?: string;
  /** When false, removes button hover lifts, keeps layout static */
  enableMotion?: boolean;
  /** "padded" keeps default gutters. "full-bleed" allows the image to touch page edges. @defaultValue "full-bleed" */
  imageLayout?: "padded" | "full-bleed";
}

/**
 * Split hero with text on one side and an image on the other.
 *
 * @remarks
 * - Text props accept string or object forms to easily override classes.
 * - Full-bleed layout absolutely positions the image on larger screens.
 * - Motion only affects the subtle hover lift on CTA buttons.
 *
 * @example
 * <HeroSplit heading="Build faster" subheading="Launch confidently" />
 */
export function HeroSplit({
  id,
  className,
  heading,
  subheading,
  section,
  cta1,
  cta2,
  image = {
    src: "/placeholders/gallery/hero-pexels-broken-9945014.avif",
    alt: "Hero image",
    className: "object-contain",
  },
  imageContainer,
  textContainer = { className: "flex-1 p-5" },
  buttonsContainer = { className: "flex flex-col md:flex-row gap-4 mt-6" },
  textAlign = "center",
  fallback,
  ariaLabel = "Hero section",
  enableMotion = true,
  imageLayout = "full-bleed",
}: HeroSplitProps) {
  const lgTextAlignClasses = {
    left: "lg:text-left",
    right: "lg:text-right",
    center: "lg:text-center",
  } as const;
  const lgItemsAlignClasses = {
    left: "lg:items-start",
    right: "lg:items-end",
    center: "lg:items-center",
  } as const;
  const lgJustifyAlignClasses = {
    left: "lg:justify-start",
    right: "lg:justify-end",
    center: "lg:justify-center",
  } as const;
  const buttonLift = enableMotion
    ? "transition-all duration-200 hover:-translate-y-0.5"
    : "transition-none hover:!translate-y-0";

  // Defaults for text props (normalized below)
  const defaultHeading = {
    text: "Lorem ipsum dolor sit amet",
    className: "text-3xl md:text-4xl font-bold leading-tight text-foreground",
  };
  const defaultSubheading = {
    text: "Consectetur adipiscing elit, sed do eiusmod tempor.",
    className: "text-lg md:text-xl text-foreground mt-4 mb-6",
  };

  const normalizedHeading =
    typeof heading === "string"
      ? { text: heading, className: defaultHeading.className }
      : {
          text: heading?.text ?? defaultHeading.text,
          className: cn(defaultHeading.className, heading?.className),
        };

  const normalizedSubheading =
    typeof subheading === "string"
      ? { text: subheading, className: defaultSubheading.className }
      : {
          text: subheading?.text ?? defaultSubheading.text,
          className: cn(defaultSubheading.className, subheading?.className),
        };

  // CTA defaults and normalization (merge, don't replace)
  const defaultCta1 = {
    label: "Get Started",
    href: "#contact",
    variant: "default" as const,
    size: "default" as const,
    className:
      "shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5",
  };

  const mergedCta1 = {
    ...defaultCta1,
    ...(cta1 ?? {}),
    className: cn(defaultCta1.className, cta1?.className, buttonLift),
  };

  const defaultCta2 = {
    label: "Learn More",
    href: "#",
    variant: "outline" as const,
    size: "default" as const,
    className: "",
  };

  const mergedCta2 = cta2
    ? {
        ...defaultCta2,
        ...cta2,
        className: cn(defaultCta2.className, cta2.className, buttonLift),
      }
    : undefined;

  const defaultSectionPadded = cn(
    "px-8 pt-8 pb-8 md:min-h-[60vh] lg:min-h-[70vh]",
  );

  const defaultSectionFull = cn(
    "relative overflow-hidden pt-0 pb-0 md:min-h-[60vh] lg:min-h-[70vh]",
  );

  const defaultImageContainerPadded = cn(
    "relative mb-4 h-48 min-h-[12rem] w-full md:mb-0 md:h-72 md:w-1/2",
  );

  // For full-bleed: absolute positioning on large screens to break out completely
  const defaultImageContainerFull = cn(
    "relative h-48 w-full md:absolute md:inset-y-0 md:right-0 md:h-full md:w-1/2",
  );

  const baseSectionClass =
    imageLayout === "full-bleed" ? defaultSectionFull : defaultSectionPadded;

  const finalSectionClass = cn(baseSectionClass, section?.className);

  const baseImageContainerClass =
    imageLayout === "full-bleed"
      ? defaultImageContainerFull
      : defaultImageContainerPadded;

  const finalImageContainerClass = cn(
    baseImageContainerClass,
    imageContainer?.className,
  );

  // -- This overrides the image.className that is passed from importing components ... devs should be able to decide on cover/contain from the importing component.
  const finalImageClass = cn(
    image?.className,
    imageLayout === "full-bleed"
      ? "object-cover object-center md:object-right"
      : "object-contain object-center",
  );

  return (
    <section
      id={id}
      className={cn(finalSectionClass, className)}
      aria-label={ariaLabel}
    >
      <div
        className={cn(
          "flex flex-col items-stretch",
          imageLayout === "full-bleed"
            ? "md:block"
            : "md:flex-row md:items-start",
        )}
      >
        {/* Text container - takes up left side on large screens */}
        <div
          className={cn(
            "w-full",
            imageLayout === "full-bleed" &&
              "relative z-10 md:w-1/2 md:px-8 md:py-12",
            textContainer.className,
          )}
        >
          <div
            className={cn(
              "flex flex-col items-center",
              lgItemsAlignClasses[textAlign],
            )}
          >
            <h1
              className={cn(
                "text-center",
                lgTextAlignClasses[textAlign],
                normalizedHeading.className,
              )}
            >
              {normalizedHeading.text}
            </h1>

            <p
              className={cn(
                "text-center",
                lgTextAlignClasses[textAlign],
                normalizedSubheading.className,
              )}
            >
              {normalizedSubheading.text}
            </p>

            <div
              className={cn(
                "flex flex-col items-center justify-center gap-4 sm:flex-row",
                lgJustifyAlignClasses[textAlign],
                lgItemsAlignClasses[textAlign],
                buttonsContainer.className,
              )}
            >
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

              {mergedCta2?.label && (
                <Button
                  asChild
                  variant={mergedCta2.variant}
                  size={mergedCta2.size}
                  className={mergedCta2.className}
                  unstyled={mergedCta2.unstyled}
                  style={mergedCta2.style}
                >
                  <Link
                    href={mergedCta2.href || "#"}
                    aria-label={mergedCta2.label}
                  >
                    {mergedCta2.label}
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Image container - absolutely positioned on right side for full-bleed */}
        <div className={cn(finalImageContainerClass)}>
          {image?.src ? (
            <Image
              priority
              fetchPriority="high"
              src={image.src}
              alt={image.alt || "Hero image"}
              className={finalImageClass}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              quality={75}
            />
          ) : (
            <div className="absolute inset-0">{fallback || null}</div>
          )}
        </div>
      </div>
    </section>
  );
}
