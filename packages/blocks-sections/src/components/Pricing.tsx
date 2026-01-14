"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@nextworks/blocks-core";
import { PricingCard } from "@nextworks/blocks-core";

/**
 * Represents individual pricing plan data.
 * @public
 */
export interface PricingData {
  /** Title of the plan (e.g., "Pro") */
  pricingPlanHeaderText?: string;
  /** Display price (e.g., "$19.99") */
  pricingPlanPrice?: string;
  /** Feature list bullets */
  pricingPlanFeatures?: string[];
  /** CTA button label */
  pricingPlanCTALabel?: string;
  /** CTA button href */
  pricingPlanCTAHref?: string;
  /** Whether this plan should be highlighted */
  isPopular?: boolean;
}

/**
 * Props for the Pricing section component.
 *
 * @remarks
 * - Styling: slot-style className overrides are merged after defaults via cn().
 * - Motion: enableMotion toggles entrance animations and hover transitions.
 * - Accessibility: uses a semantic <section> with an aria-label.
 */
interface PricingProps {
  /** Optional id on root. @defaultValue "pricing" */
  id?: string;
  /** Merge-in class for root */
  className?: string;

  /** Heading text displayed at the top of the pricing section. @defaultValue "Choose Your Plan" */
  pricingHeadingText?: string;
  /** Array of individual pricing plans to display. @defaultValue defaultPricingData */
  pricingPlans?: PricingData[];

  /** When false, disables entrance animations and hover transitions */
  enableMotion?: boolean;

  /** Styling configuration objects */
  section?: {
    className?: string;
  };
  container?: {
    className?: string;
  };
  heading?: {
    className?: string;
  };
  grid?: {
    className?: string;
  };
  card?: {
    className?: string;
  };
  header?: {
    className?: string;
  };
  title?: {
    className?: string;
  };
  price?: {
    className?: string;
  };
  features?: {
    className?: string;
  };
  featureItem?: {
    className?: string;
  };
  cta?: {
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
  popularBadge?: {
    className?: string;
  };

  /** ARIA label for the pricing section */
  ariaLabel?: string;
}

/**
 * Default pricing plans used if none are passed in.
 */
const defaultPricingData: PricingData[] = [
  {
    pricingPlanHeaderText: "Basic",
    pricingPlanPrice: "$9.99",
    pricingPlanFeatures: ["Feature 1", "Feature 2", "Feature 3"],
    pricingPlanCTALabel: "Select Plan",
    pricingPlanCTAHref: "#contact",
  },
  {
    pricingPlanHeaderText: "Pro",
    pricingPlanPrice: "$19.99",
    pricingPlanFeatures: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
    pricingPlanCTALabel: "Select Plan",
    pricingPlanCTAHref: "#contact",
  },
  {
    pricingPlanHeaderText: "Enterprise",
    pricingPlanPrice: "$49.99",
    pricingPlanFeatures: [
      "Feature 1",
      "Feature 2",
      "Feature 3",
      "Feature 4",
      "Feature 5",
    ],
    pricingPlanCTALabel: "Select Plan",
    pricingPlanCTAHref: "#contact",
  },
];

/**
 * Responsive pricing grid using PricingCard with optional motion.
 *
 * @remarks
 * - Styling: exposes slot-style overrides (card, header, title, price, etc.).
 * - Motion: enableMotion controls entrance animations and hover transitions.
 * - Accessibility: semantic <section> with aria-label.
 *
 * @example
 * <Pricing pricingPlans={[{ pricingPlanHeaderText: 'Pro', pricingPlanPrice: '$19' }]} />
 */
export function Pricing({
  id,
  className,
  pricingPlans = defaultPricingData,
  pricingHeadingText = "Choose Your Plan",
  enableMotion = true,
  section = {
    className: "pt-20 pb-5 bg-background text-foreground",
  },
  container = {
    className: "max-w-7xl mx-auto px-6",
  },
  heading = {
    className:
      "text-3xl font-bold font-poppins text-center text-foreground mb-8",
  },
  grid = {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8",
  },
  card = {
    className:
      "relative bg-card border border-border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 bg-[var(--card-bg)] text-[var(--card-fg)] border-[var(--card-border)] shadow-[var(--card-shadow)]",
  },
  header = {
    className: "p-6 text-center border-b border-[var(--card-border)]",
  },
  title = {
    className:
      "text-xl font-bold font-poppins text-card-foreground mb-2 text-[var(--card-title-fg)]",
  },
  price = {
    className:
      "text-3xl font-bold font-poppins text-card-foreground mb-4 text-[var(--card-title-fg)]",
  },
  features = {
    className: "p-6 space-y-3 font-inter",
  },
  featureItem = {
    className:
      "flex items-center text-muted-foreground text-sm text-[var(--card-muted-fg)]",
  },
  cta = {
    variant: "default",
    size: "lg",
    className:
      "w-full bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90 text-primary-foreground font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 border-[var(--btn-border)] focus-visible:ring-[var(--btn-ring)]",
  },
  popularBadge = {
    className:
      "absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium bg-[var(--badge-bg)] text-[var(--badge-fg)] border-[var(--badge-border)]",
  },
  ariaLabel = "Pricing section",
}: PricingProps) {
  return (
    <section
      id={id || "pricing"}
      className={cn(section.className, className)}
      aria-label={ariaLabel}
    >
      <div className={container.className}>
        {/* Section heading */}
        <h2 className={heading.className}>{pricingHeadingText}</h2>

        {/* Pricing cards grid */}
        <div className={grid.className}>
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={
                enableMotion ? { opacity: 0, y: 12 } : { opacity: 1, y: 0 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={
                enableMotion
                  ? { once: true, amount: 0.2 }
                  : { once: true, amount: 0 }
              }
              transition={
                enableMotion
                  ? {
                      type: "spring",
                      stiffness: 125,
                      damping: 50,
                      mass: 1,
                      delay: 0.12 + index * 0.06,
                    }
                  : { type: "tween", duration: 0 }
              }
              className="motion-reduce:transform-none motion-reduce:transition-none"
            >
              <PricingCard
                pricingCardTitle={plan.pricingPlanHeaderText}
                pricingCardPrice={plan.pricingPlanPrice}
                pricingCardFeatures={plan.pricingPlanFeatures}
                pricingCardCTALabel={plan.pricingPlanCTALabel}
                pricingCardCTAHref={plan.pricingPlanCTAHref}
                isPopular={plan.isPopular}
                card={{
                  className: cn(
                    card.className,
                    enableMotion
                      ? "transition-all duration-200 hover:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none"
                      : "transition-none hover:!translate-y-0 hover:shadow-none",
                  ),
                }}
                header={header}
                title={title}
                price={price}
                features={features}
                featureItem={featureItem}
                cta={cta}
                popularBadge={popularBadge}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
