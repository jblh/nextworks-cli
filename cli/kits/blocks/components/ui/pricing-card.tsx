"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface PricingCardProps {
  /** Optional id and root className */
  id?: string;
  className?: string;

  /** Header text/title of the pricing plan */
  pricingCardTitle?: string;
  /** Price text for the pricing plan */
  pricingCardPrice?: string;
  /** Array of features included in the pricing plan */
  pricingCardFeatures?: string[];
  /** Label text for the pricing call-to-action button */
  pricingCardCTALabel?: string;
  /** URL/href for the pricing call-to-action button */
  pricingCardCTAHref?: string;
  /** Whether this is the featured/popular plan */
  isPopular?: boolean;

  /** Styling configuration objects */
  card?: { className?: string };
  header?: { className?: string };
  title?: { className?: string };
  price?: { className?: string };
  features?: { className?: string };
  featureItem?: { className?: string };
  cta?: {
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
  popularBadge?: { className?: string };
}

export function PricingCard({
  id,
  className,
  pricingCardTitle = "Basic Plan",
  pricingCardPrice = "$9.99",
  pricingCardFeatures = ["Feature 1", "Feature 2", "Feature 3"],
  pricingCardCTALabel = "Select Plan",
  pricingCardCTAHref = "#contact",
  isPopular = false,
  card = {
    className:
      "relative bg-card text-card-foreground border border-border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200",
  },
  header = { className: "p-6 text-center border-b border-border" },
  title = { className: "text-xl font-bold text-foreground mb-2" },
  price = { className: "text-3xl font-bold text-foreground mb-4" },
  features = { className: "p-6 space-y-3" },
  featureItem = {
    className: "flex items-center text-muted-foreground text-sm",
  },
  cta = {
    variant: "default",
    size: "lg",
    className:
      "w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5",
  },
  popularBadge = {
    className:
      "absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium",
  },
}: PricingCardProps) {
  return (
    <Card id={id} className={cn(card.className, className, "rounded-lg")}>
      {isPopular && <div className={popularBadge.className}>Most Popular</div>}

      <div className={header.className}>
        <h3 className={title.className}>{pricingCardTitle}</h3>
        <div className={price.className}>{pricingCardPrice}</div>
      </div>

      <div className={features.className}>
        {pricingCardFeatures?.map((feature, index) => (
          <div key={index} className={featureItem.className}>
            <Check className="mr-3 h-4 w-4 flex-shrink-0 text-green-500" />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      <div className="p-6 pt-0">
        <Button
          asChild
          variant={cta.variant}
          size={cta.size}
          className={cn(
            // Allow presets to take over with var hooks from Button
            "border-[var(--btn-border)] focus-visible:ring-[var(--btn-ring)]",
            cta.className,
            "hover:animate-none motion-safe:animate-none",
          )}
          {...(cta.unstyled ? { unstyled: true } : {})}
          style={cta.style}
        >
          <Link href={pricingCardCTAHref || "#"}>{pricingCardCTALabel}</Link>
        </Button>
      </div>
    </Card>
  );
}
