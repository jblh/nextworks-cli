"use client";

import { Pricing as SharedPricing } from "@/components/sections/Pricing";

export function Pricing() {
  return (
    <SharedPricing
      id="pricing"
      pricingHeadingText="Pricing for teams shipping with coding agents"
      pricingPlans={[
        {
          pricingPlanHeaderText: "Starter",
          pricingPlanPrice: "$49/mo",
          pricingPlanFeatures: [
            "3 active repos",
            "GitHub and docs intake",
            "Shared review queue",
            "Patch analytics",
          ],
          pricingPlanCTALabel: "Start free",
          pricingPlanCTAHref: "#contact",
        },
        {
          pricingPlanHeaderText: "Growth",
          pricingPlanPrice: "$149/mo",
          pricingPlanFeatures: [
            "Unlimited agent runs",
            "Repo, issue tracker, and CI sync",
            "Review gates and approvals",
            "Live diff dashboards",
            "Role-based code governance",
          ],
          pricingPlanCTALabel: "Book a demo",
          pricingPlanCTAHref: "#contact",
          isPopular: true,
        },
        {
          pricingPlanHeaderText: "Enterprise",
          pricingPlanPrice: "Custom",
          pricingPlanFeatures: [
            "Private agent deployment options",
            "Custom repo and context connectors",
            "SSO and change exports",
            "Dedicated rollout support",
            "Priority agent support",
          ],
          pricingPlanCTALabel: "Talk to the team",
          pricingPlanCTAHref: "#contact",
        },
      ]}
      section={{
        className: "bg-[var(--section-bg)] pt-18 pb-16",
      }}
      container={{ className: "max-w-7xl mx-auto px-6" }}
      heading={{
        className:
          "mb-4 text-center font-outfit text-3xl font-semibold text-[var(--heading-fg)] md:text-4xl lg:text-5xl",
      }}
      grid={{
        className: "mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3",
      }}
      card={{
        className:
          "relative rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--card-fg)] shadow-[var(--card-shadow)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
      }}
      title={{
        className:
          "font-inter text-xl font-semibold text-[var(--card-title-fg)]",
      }}
      price={{
        className:
          "font-outfit text-3xl font-semibold text-[var(--card-title-fg)]",
      }}
      featureItem={{
        className:
          "font-inter text-sm text-[var(--card-muted-fg)] md:text-base",
      }}
      cta={{
        variant: "default",
        size: "lg",
        className:
          "w-full font-inter font-semibold [--btn-bg:var(--hero-cta-primary-bg)] [--btn-fg:var(--hero-cta-primary-fg)] [--btn-border:var(--hero-cta-primary-border)] hover:[--btn-hover-bg:var(--hero-cta-primary-hover-bg)] hover:[--btn-hover-fg:var(--hero-cta-primary-hover-fg)]",
      }}
      popularBadge={{
        className:
          "absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-[var(--badge-active-border)] bg-[var(--badge-active-bg)] px-4 py-1 text-xs font-semibold text-[var(--badge-active-fg)] shadow-sm shadow-black/5",
      }}
      ariaLabel="AI coding agent pricing"
    />
  );
}
