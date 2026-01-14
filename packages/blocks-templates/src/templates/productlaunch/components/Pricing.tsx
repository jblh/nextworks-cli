"use client";

import { Pricing as SharedPricing } from "@nextworks/blocks-sections";

/**
 * Product Launch preset for Pricing wired to the upgraded shared Pricing component
 */
export function Pricing() {
  return (
    <SharedPricing
      id="pricing"
      pricingHeadingText="Choose Your AI Plan"
      pricingPlans={[
        {
          pricingPlanHeaderText: "Starter",
          pricingPlanPrice: "$29",
          pricingPlanFeatures: [
            "Up to 1,000 AI requests/month",
            "Basic AI models access",
            "Email support",
            "Standard analytics",
            "API access",
          ],
          pricingPlanCTALabel: "Get Started",
          pricingPlanCTAHref: "#contact",
        },
        {
          pricingPlanHeaderText: "Professional",
          pricingPlanPrice: "$99",
          pricingPlanFeatures: [
            "Up to 10,000 AI requests/month",
            "Advanced AI models access",
            "Priority support",
            "Advanced analytics & insights",
            "Full API access",
            "Custom integrations",
            "Team collaboration tools",
          ],
          pricingPlanCTALabel: "Start Free Trial",
          pricingPlanCTAHref: "#contact",
          isPopular: true,
        },
        {
          pricingPlanHeaderText: "Enterprise",
          pricingPlanPrice: "Custom",
          pricingPlanFeatures: [
            "Unlimited AI requests",
            "Premium AI models access",
            "24/7 dedicated support",
            "Custom analytics dashboard",
            "White-label solutions",
            "Custom model training",
            "SLA guarantee",
            "On-premise deployment",
          ],
          pricingPlanCTALabel: "Contact Sales",
          pricingPlanCTAHref: "#contact",
        },
      ]}
      section={{
        className:
          "pt-20 pb-16 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white",
      }}
      container={{ className: "max-w-7xl mx-auto px-6" }}
      heading={{
        className:
          "text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-800 dark:text-white mb-4 font-outfit",
      }}
      grid={{
        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12",
      }}
      card={{
        className:
          "relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-2 hover:border-purple-300 dark:hover:border-purple-600",
      }}
      header={{
        className:
          "p-8 text-center border-b border-gray-200 dark:border-gray-700",
      }}
      title={{
        className:
          "text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-3 font-outfit",
      }}
      price={{
        className:
          "text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-6 font-outfit",
      }}
      features={{ className: "p-8 space-y-4" }}
      featureItem={{
        className:
          "flex items-center text-gray-600 dark:text-gray-300 text-sm md:text-base font-inter",
      }}
      cta={{
        variant: "default",
        size: "lg",
        className:
          "w-full font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 border-0 [--btn-bg:theme(colors.purple.600)] hover:[--btn-hover-bg:theme(colors.purple.700)] [--btn-fg:white] hover:[--btn-hover-fg:white] [--btn-border:transparent]",
      }}
      popularBadge={{
        className:
          "absolute -top-4 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium font-inter shadow-lg",
      }}
      ariaLabel="IntelliOpAI pricing plans"
    />
  );
}
