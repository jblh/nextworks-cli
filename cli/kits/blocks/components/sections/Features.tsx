"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { FeatureCard } from "@/components/ui/feature-card";

/**
 * Data used to render a FeatureCard within the Features grid.
 * @public
 */
export interface FeatureCardData {
  imageSrc: string;
  imageAlt: string;
  headingText: string;
  subheadingText: string;
}

/**
 * Props for the Features section component.
 *
 * @remarks
 * - Styling: slot-style className overrides are merged after defaults via cn().
 * - Motion: entrance animations respect enableMotion; prefers-reduced-motion
 *   disables transforms and transitions where possible.
 *
 * @public
 */
type MotionTransition = React.ComponentProps<typeof motion.div>["transition"];

export interface FeaturesProps {
  /**
   * Optional id to attach to the root section element.
   * @defaultValue "features"
   */
  id?: string;

  /** Main section heading text */
  sectionHeading?: string;
  /** Subheading text displayed below the main heading */
  sectionSubheading?: string;

  /** Array of feature card data objects */
  featuresData?: FeatureCardData[];

  /** Optional top-level class to override the section root */
  className?: string;

  /** Styling configuration objects (slots) */
  section?: { className?: string };
  container?: { className?: string };
  header?: { className?: string };
  heading?: { className?: string };
  subheading?: { className?: string };
  grid?: { className?: string };
  /** Wrapper around each FeatureCard (the animated container) */
  cardWrapper?: { className?: string };
  /** Styles passed down to FeatureCard slots */
  card?: { className?: string };
  image?: { className?: string };
  cardHeading?: { className?: string };
  cardSubheading?: { className?: string };

  /** When false, disables entrance animations and hover transitions. */
  enableMotion?: boolean;

  /** Motion configuration for the feature items */
  motionConfig?: {
    initial?: { opacity?: number; y?: number };
    whileInView?: { opacity?: number; y?: number };
    viewport?: { once?: boolean; amount?: number };
    transition?: MotionTransition;
  };

  /** ARIA label for the features section */
  ariaLabel?: string;
}

const defaultFeaturesData: FeatureCardData[] = [
  {
    imageSrc: "/feature_1.png",
    imageAlt: "Advanced Analytics Dashboard",
    headingText: "Advanced Analytics",
    subheadingText:
      "Get deep insights into your business performance with our comprehensive analytics dashboard that tracks key metrics and provides actionable recommendations.",
  },
  {
    imageSrc: "/feature_2.png",
    imageAlt: "Real-time Collaboration Tools",
    headingText: "Real-time Collaboration",
    subheadingText:
      "Work seamlessly with your team using our real-time collaboration tools that keep everyone in sync and boost productivity across all projects.",
  },
  {
    imageSrc: "/feature_3.png",
    imageAlt: "Secure Data Management",
    headingText: "Secure Data Management",
    subheadingText:
      "Protect your sensitive information with enterprise-grade security features including encryption, access controls, and compliance monitoring.",
  },
  {
    imageSrc: "/feature_4.png",
    imageAlt: "Mobile-First Design",
    headingText: "Mobile-First Design",
    subheadingText:
      "Access your data and manage your workflow from anywhere with our responsive, mobile-optimized interface that works perfectly on all devices.",
  },
];

/**
 * Responsive Features section that renders a heading, optional subheading,
 * and a grid of FeatureCard items with configurable entrance animations.
 *
 * @remarks
 * - Styling: slot-style className overrides are merged after defaults via cn().
 * - Motion: Controlled by enableMotion and motionConfig; animations are reduced
 *   or disabled when users prefer reduced motion.
 * - Accessibility: Uses a semantic <section> with an aria-label.
 *
 * @example
 * <Features
 *   sectionHeading="Key Features"
 *   featuresData={[{ imageSrc: "/a.png", imageAlt: "", headingText: "Fast", subheadingText: "Blazing" }]}
 * />
 */
export function Features({
  id = "features",
  sectionHeading = "Key Features",
  sectionSubheading = "Discover what makes our platform unique and powerful",
  featuresData = defaultFeaturesData,

  className,

  section = { className: "py-16 md:py-20 lg:py-24 bg-background" },
  container = { className: "max-w-7xl mx-auto px-4 md:px-6 lg:px-8" },
  header = { className: "text-center mb-12 md:mb-16" },
  heading = {
    className:
      "text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4",
  },
  subheading = {
    className:
      "text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed",
  },
  grid = {
    className:
      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8",
  },
  cardWrapper = {
    className: "motion-reduce:transform-none motion-reduce:transition-none",
  },
  card = {
    className:
      "h-full bg-card border border-border rounded-lg shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg overflow-hidden motion-reduce:transition-none motion-reduce:transform-none",
  },
  image = {
    className:
      "w-full h-48 md:h-56 object-cover transition-none hover:!scale-100 group-hover:!scale-100 [transform:none]",
  },
  cardHeading = {
    className:
      "text-xl md:text-2xl font-semibold text-card-foreground mb-3 leading-tight",
  },
  cardSubheading = {
    className: "text-sm md:text-base text-muted-foreground leading-relaxed",
  },

  enableMotion = true,
  motionConfig = {
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: {
      type: "tween",
      stiffness: 0,
      damping: 50,
      mass: 1,
      delay: 0.15,
    },
  },
  ariaLabel = "Features section",
}: FeaturesProps) {
  return (
    <section
      id={id}
      className={cn(section.className, className)}
      aria-label={ariaLabel}
    >
      <div className={cn(container.className)}>
        <div className={cn(header.className)}>
          <h2 className={cn(heading.className)}>{sectionHeading}</h2>
          {sectionSubheading && (
            <p className={cn(subheading.className)}>{sectionSubheading}</p>
          )}
        </div>

        <div className={cn(grid.className)}>
          {featuresData.map((feature, index) => {
            const mConfig: NonNullable<FeaturesProps["motionConfig"]> =
              enableMotion
                ? (motionConfig as NonNullable<FeaturesProps["motionConfig"]>)
                : {
                    initial: { opacity: 1, y: 0 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true, amount: 0 },
                    transition: {
                      type: "tween",
                      duration: 0,
                    } as const satisfies MotionTransition,
                  };

            // Ensure we always spread a defined object into transition
            const baseTransition: MotionTransition = mConfig.transition ??
              ({
                type: "tween",
                duration: 0,
              } as const);

            const noMotionCard =
              "transition-none hover:!translate-y-0 hover:shadow-none motion-reduce:transition-none motion-reduce:transform-none";
            const noMotionImage =
              "transition-none hover:!scale-100 transform-none motion-reduce:transform-none group-hover:!scale-100";

            return (
              <motion.div
                key={index}
                initial={mConfig.initial}
                whileInView={mConfig.whileInView}
                viewport={mConfig.viewport}
                transition={{
                  ...baseTransition,
                  // Stagger based on index while preserving provided delay if any
                  delay:
                    (mConfig.transition?.delay ?? 0.15) +
                    index * (enableMotion ? 0.06 : 0),
                }}
                className={cn(cardWrapper.className)}
              >
                <FeatureCard
                  cardImageSrc={feature.imageSrc}
                  cardImageAlt={feature.imageAlt}
                  cardHeadingText={feature.headingText}
                  cardSubheadingText={feature.subheadingText}
                  card={{
                    className: cn(
                      card.className,
                      !enableMotion && noMotionCard,
                    ),
                  }}
                  image={{
                    className: cn(
                      image.className,
                      !enableMotion && noMotionImage,
                    ),
                  }}
                  // image={{
                  //   className: cn(image.className),
                  // }}
                  heading={{ className: cn(cardHeading.className) }}
                  subheading={{ className: cn(cardSubheading.className) }}
                  className={cn("h-full")}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
