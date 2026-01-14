"use client";

import React from "react";
import { ServicesGrid } from "@nextworks/blocks-sections";

const defaultServicesData = [
  {
    icon: "💻",
    title: "Web Design & Development",
    description:
      "Custom websites that capture your brand and convert visitors into customers",
  },
  {
    icon: "📈",
    title: "SEO & Digital Marketing",
    description:
      "Get found on Google and drive qualified traffic to your website",
  },
  {
    icon: "🛒",
    title: "E-commerce Solutions",
    description: "Online stores that maximize sales and customer experience",
  },
  {
    icon: "🎨",
    title: "Brand Identity & Design",
    description: "Logo, branding, and visual identity that makes you stand out",
  },
];

export function Services() {
  return (
    <section id="services">
      <ServicesGrid
        enableMotion={true}
        section={{
          className: "py-16 md:py-20 lg:py-24 bg-fuchsia-50 dark:bg-gray-900",
        }}
        container={{ className: "max-w-6xl mx-auto px-6" }}
        heading={{
          className:
            "text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-gray-800 dark:text-white text-center mb-8 md:mb-12",
        }}
        grid={{ className: "grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8" }}
        card={{
          className:
            "bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300",
        }}
        servicesData={defaultServicesData}
        sectionHeading="Our Services"
        ariaLabel="Services section"
      />
    </section>
  );
}
