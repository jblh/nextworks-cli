"use client";

import React from "react";
import { Pricing as SharedPricing } from "@nextworks/blocks-sections";

const AgencyPricingData = [
  {
    pricingPlanHeaderText: "Starter",
    pricingPlanPrice: "$2,999",
    pricingPlanFeatures: [
      "5-page custom website",
      "Mobile-responsive design",
      "Basic SEO optimization",
      "Contact form integration",
      "2 rounds of revisions",
      "1 month post-launch support",
    ],
    pricingPlanCTALabel: "Get Started",
    pricingPlanCTAHref: "#contact",
  },
  {
    pricingPlanHeaderText: "Professional",
    pricingPlanPrice: "$5,999",
    pricingPlanFeatures: [
      "10-page custom website",
      "Advanced responsive design",
      "Comprehensive SEO setup",
      "CMS integration",
      "Analytics & tracking setup",
      "Social media integration",
      "3 rounds of revisions",
      "3 months ongoing support",
    ],
    pricingPlanCTALabel: "Most Popular",
    pricingPlanCTAHref: "#contact",
    isPopular: true,
  },
  {
    pricingPlanHeaderText: "Enterprise",
    pricingPlanPrice: "Custom Quote",
    pricingPlanFeatures: [
      "Unlimited pages",
      "Custom functionality",
      "E-commerce integration",
      "Advanced SEO strategy",
      "Performance optimization",
      "Third-party integrations",
      "Priority support",
      "Dedicated project manager",
      "6 months ongoing support",
    ],
    pricingPlanCTALabel: "Contact Sales",
    pricingPlanCTAHref: "#contact",
  },
];

export function Pricing() {
  return (
    <section id="pricing">
      <SharedPricing
        pricingPlans={AgencyPricingData}
        pricingHeadingText="Choose Your Plan"
        section={{
          className: "py-16 md:py-20 lg:py-24 bg-fuchsia-50 dark:bg-gray-800",
        }}
        container={{
          className: "max-w-7xl mx-auto px-6",
        }}
        heading={{
          className:
            "text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-center text-gray-800 dark:text-white mb-8",
        }}
        grid={{
          className:
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8",
        }}
        card={{
          className:
            "relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200",
        }}
        header={{
          className:
            "p-6 text-center border-b border-gray-200 dark:border-gray-700",
        }}
        title={{
          className:
            "text-xl font-bold font-poppins text-gray-800 dark:text-white mb-2",
        }}
        price={{
          className:
            "text-3xl font-bold font-poppins text-fuchsia-600 dark:text-fuchsia-400 mb-4",
        }}
        features={{
          className: "p-6 space-y-3 font-inter",
        }}
        featureItem={{
          className:
            "flex items-center text-gray-600 dark:text-gray-300 text-sm",
        }}
        cta={{
          variant: "default",
          size: "lg",
          className:
            "w-full bg-fuchsia-600 hover:bg-fuchsia-700 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700 text-white hover:text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5",
        }}
        popularBadge={{
          className:
            "absolute -top-3 left-1/2 transform -translate-x-1/2 bg-fuchsia-600 text-white px-4 py-1 rounded-full text-sm font-medium",
        }}
        ariaLabel="Pricing section"
      />
    </section>
  );
}
