"use client";

import React from "react";
import {
  PortfolioSimple,
  PortfolioProject,
} from "@/components/sections/PortfolioSimple";

// Default portfolio data without images - Digital Marketing Agency focused
const defaultProjects: PortfolioProject[] = [
  {
    id: 1,
    title: "TechStartup Growth Campaign",
    category: "Digital Marketing",
    industry: "Technology",
    result: "+300% Leads",
    description:
      "Comprehensive digital marketing campaign that increased qualified leads by 300% through targeted SEO, social media marketing, and conversion optimization strategies.",
    tags: ["SEO", "Social Media", "PPC", "Analytics"],
    color: "blue",
    url: "#",
  },
  {
    id: 2,
    title: "E-Commerce Brand Launch",
    category: "Brand Marketing",
    industry: "Retail",
    result: "+250% Revenue",
    description:
      "Complete brand launch and digital marketing strategy for a new e-commerce platform, resulting in 250% revenue growth within the first 6 months.",
    tags: ["Brand Strategy", "Content Marketing", "Influencer", "Email"],
    color: "green",
    url: "#",
  },
  {
    id: 3,
    title: "Healthcare Practice Expansion",
    category: "Local Marketing",
    industry: "Healthcare",
    result: "+180% Patients",
    description:
      "Local SEO and digital marketing campaign that helped a healthcare practice expand to three new locations and increase patient acquisition by 180%.",
    tags: ["Local SEO", "Google Ads", "Reputation", "Content"],
    color: "purple",
    url: "#",
  },
  {
    id: 4,
    title: "SaaS Product Launch",
    category: "B2B Marketing",
    industry: "Software",
    result: "+400% Signups",
    description:
      "Strategic B2B marketing campaign for a SaaS product launch, achieving 400% increase in trial signups through targeted content marketing and account-based marketing.",
    tags: ["B2B Strategy", "Content", "LinkedIn Ads", "Webinars"],
    color: "indigo",
    url: "#",
  },
  {
    id: 5,
    title: "Restaurant Chain Rebrand",
    category: "Brand Marketing",
    industry: "Food & Beverage",
    result: "+220% Foot Traffic",
    description:
      "Complete rebrand and digital marketing transformation for a restaurant chain, resulting in 220% increase in foot traffic and 150% growth in online orders.",
    tags: ["Rebranding", "Social Media", "Local SEO", "Delivery"],
    color: "red",
    url: "#",
  },
  {
    id: 6,
    title: "Fitness App User Acquisition",
    category: "Mobile Marketing",
    industry: "Health & Fitness",
    result: "+500% Downloads",
    description:
      "Mobile-first marketing campaign that achieved 500% increase in app downloads through app store optimization, influencer partnerships, and targeted social media advertising.",
    tags: ["ASO", "Influencer", "Social Ads", "Retention"],
    color: "yellow",
    url: "#",
  },
];

const defaultFilters = [
  "All Projects",
  "Digital Marketing",
  "Brand Marketing",
  "B2B Marketing",
  "Local Marketing",
  "Mobile Marketing",
];

// Upgraded Portfolio Preset Component
export function Portfolio() {
  return (
    <section id="portfolio">
      <PortfolioSimple
        enableMotion={true}
        projects={defaultProjects}
        filters={defaultFilters}
        sectionTitle="Our Portfolio"
        sectionSubtitle="Discover our successful projects that have transformed businesses across various industries with innovative digital solutions."
        ctaTitle="Ready to Start Your Project?"
        ctaDescription="Let's work together to create something amazing that drives real results for your business."
        section={{
          className: "py-16 md:py-24 bg-background",
        }}
        title={{
          className:
            "text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-[var(--heading-fg)]",
        }}
        subtitle={{
          className:
            "text-xl md:text-2xl font-inter text-[var(--subheading-fg)] max-w-2xl mx-auto leading-relaxed",
        }}
        ctaTitleStyle={{
          className: "text-2xl md:text-3xl font-bold text-[var(--heading-fg)]",
        }}
        ctaDescriptionStyle={{
          className:
            "text-lg md:text-xl text-[var(--subheading-fg)] max-w-md mx-auto",
        }}
        tagStyle={{
          className:
            "px-2 py-1 text-xs rounded-full border-[var(--badge-border)] text-[var(--badge-fg)] bg-[var(--badge-bg)]",
        }}
        ctaSection={{
          className:
            "space-y-6 text-center mt-16 pt-12 border-t border-[var(--footer-border)]",
        }}
        cta1Label="Start Your Project"
        cta1Href="#contact"
        cta2Label="View All Projects"
        cta2Href="#portfolio"
        cta1Button={{
          className:
            "h-10 px-6 flex items-center justify-center font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 [--btn-bg:theme(colors.fuchsia.600)] hover:[--btn-hover-bg:theme(colors.fuchsia.700)] [--btn-fg:theme(colors.white)] hover:[--btn-hover-fg:theme(colors.white)]",
        }}
        cta2Button={{
          className:
            "h-10 px-6 flex items-center justify-center font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 border-2 [--btn-bg:transparent] [--btn-fg:theme(colors.fuchsia.700)] [--btn-border:theme(colors.fuchsia.600)] hover:[--btn-hover-bg:theme(colors.fuchsia.600)] hover:[--btn-hover-fg:theme(colors.white)] dark:[--btn-fg:theme(colors.fuchsia.400)] dark:[--btn-border:theme(colors.fuchsia.500)] dark:hover:[--btn-hover-bg:theme(colors.fuchsia.500)] dark:hover:[--btn-hover-fg:theme(colors.white)]",
        }}
        onProjectClick={(project) => {
          console.log("Project clicked:", project);
        }}
        onPrimaryCtaClick={() => {
          console.log("CTA 1 clicked:");
        }}
        onSecondaryCtaClick={() => {
          console.log("CTA 2 clicked:");
        }}
        ariaLabel="Portfolio showcase section"
      />
    </section>
  );
}
