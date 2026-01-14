"use client";

import { Pricing as SharedPricing } from "@/components/sections/Pricing";
import { cn } from "@/lib/utils";

const DefaultPricingData = [
  {
    pricingPlanHeaderText: "Starter Plan",
    pricingPlanPrice: "$29/month",
    pricingPlanFeatures: [
      "Up to 5 users",
      "3 projects",
      "Basic analytics",
      "email support",
    ],
    pricingPlanCTALabel: "Select Plan",
    pricingPlanCTAHref: "#contact",
  },
  {
    pricingPlanHeaderText: "Professional Plan",
    pricingPlanPrice: "$79.99/month",
    pricingPlanFeatures: [
      "Up to 25 users",
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "Api access",
    ],
    pricingPlanCTALabel: "Select Plan",
    pricingPlanCTAHref: "#contact",
    isPopular: true,
  },
  {
    pricingPlanHeaderText: "Enterprise Plan",
    pricingPlanPrice: "$199.99/month",
    pricingPlanFeatures: [
      "Unlimited users",
      "Custom integrations",
      "Dedicated account manager",
      "SLA guarantee",
    ],
    pricingPlanCTALabel: "Select Plan",
    pricingPlanCTAHref: "#contact",
  },
];

export function Pricing() {
  return (
    <SharedPricing
      pricingPlans={DefaultPricingData}
      pricingHeadingText="Simple Pricing That Scales With You"
      className={cn("relative")}
      section={{
        className:
          "pt-20 pb-5 bg-[var(--section-bg,theme(colors.white))] dark:bg-[var(--section-bg,theme(colors.gray.900))]",
      }}
      heading={{
        className:
          "text-3xl font-bold font-inter text-center mb-8 text-[var(--heading-fg)]",
      }}
      card={{
        className:
          "relative rounded-lg transition-all duration-300 will-change-transform hover:-translate-y-1 bg-[var(--card-bg)] text-[var(--card-fg)] border-[var(--card-border)] shadow-[var(--card-shadow)]",
      }}
      title={{
        className:
          "text-xl font-bold font-inter mb-2 text-[var(--card-title-fg)]",
      }}
      price={{
        className:
          "text-2xl font-bold font-inter mb-4 text-[var(--card-title-fg)]",
      }}
      featureItem={{
        className:
          "flex items-center text-base font-inter text-[var(--card-muted-fg)]",
      }}
      cta={{
        variant: "default",
        size: "lg",
        className:
          "w-full font-semibold font-inter shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 [--btn-bg:theme(colors.sky.600)] hover:[--btn-hover-bg:theme(colors.sky.700)] [--btn-fg:theme(colors.white)] hover:[--btn-hover-fg:theme(colors.white)] border-[var(--btn-border)] focus-visible:ring-[var(--btn-ring)]",
      }}
      popularBadge={{
        className:
          "absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold bg-[var(--badge-active-bg)] text-[var(--badge-active-fg)] border-[var(--badge-active-border)]",
      }}
      ariaLabel="Pricing section"
    />
  );
}
