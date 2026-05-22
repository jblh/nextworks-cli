"use client";

import { Pricing as SharedPricing } from "@/components/sections/Pricing";

export function Pricing() {
  return (
    <SharedPricing
      id="pricing"
      pricingHeadingText="Pricing for teams automating real operational work"
      pricingPlans={[
        {
          pricingPlanHeaderText: "Starter",
          pricingPlanPrice: "$49/mo",
          pricingPlanFeatures: [
            "3 active workflows",
            "Slack and email intake",
            "Shared approval inbox",
            "Core analytics",
          ],
          pricingPlanCTALabel: "Start free",
          pricingPlanCTAHref: "#contact",
        },
        {
          pricingPlanHeaderText: "Growth",
          pricingPlanPrice: "$149/mo",
          pricingPlanFeatures: [
            "Unlimited workflows",
            "CRM and project tool sync",
            "Advanced approval routing",
            "Live execution dashboards",
            "Role-based governance",
          ],
          pricingPlanCTALabel: "Book a demo",
          pricingPlanCTAHref: "#contact",
          isPopular: true,
        },
        {
          pricingPlanHeaderText: "Enterprise",
          pricingPlanPrice: "Custom",
          pricingPlanFeatures: [
            "Private deployment options",
            "Custom policy and knowledge connectors",
            "SSO and audit exports",
            "Dedicated onboarding",
            "Priority support",
          ],
          pricingPlanCTALabel: "Talk to sales",
          pricingPlanCTAHref: "#contact",
        },
      ]}
      section={{
        className:
          "bg-[linear-gradient(180deg,#eef3f8_0%,#f6f8fb_48%,#eef3f8_100%)] pt-18 pb-16 dark:bg-[linear-gradient(180deg,#171717_0%,#121212_18%,#1d1d1d_46%,#131313_76%,#1b1b1b_100%)]",
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
          "w-full font-inter font-semibold [--btn-bg:theme(colors.slate.950)] [--btn-fg:theme(colors.white)] [--btn-border:transparent] hover:[--btn-hover-bg:theme(colors.slate.800)] hover:[--btn-hover-fg:theme(colors.white)] dark:[--btn-bg:theme(colors.white)] dark:[--btn-fg:theme(colors.slate.950)] dark:hover:[--btn-hover-bg:theme(colors.slate.100)] dark:hover:[--btn-hover-fg:theme(colors.slate.950)]",
      }}
      popularBadge={{
        className:
          "absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-[var(--badge-active-border)] bg-[var(--badge-active-bg)] px-4 py-1 text-xs font-semibold text-[var(--badge-active-fg)] shadow-sm shadow-black/5",
      }}
      ariaLabel="AI workflow pricing"
    />
  );
}
