"use client";

import React from "react";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";

const agencySteps = [
  {
    stepNumber: 1,
    title: "Discovery Call",
    description: "Understanding your goals and requirements",
    icon: "🔍",
  },
  {
    stepNumber: 2,
    title: "Strategy & Design",
    description: "Custom mockups and project roadmap",
    icon: "🎨",
  },
  {
    stepNumber: 3,
    title: "Development",
    description: "Building your site with regular updates",
    icon: "⚡",
  },
  {
    stepNumber: 4,
    title: "Launch & Support",
    description: "Going live with ongoing maintenance",
    icon: "🚀",
  },
];

export function Process() {
  return (
    <section id="process">
      <ProcessTimeline
        steps={agencySteps}
        heading="How We Work"
        subheading="Our proven 4-step process ensures your project delivers real results, on time and within budget."
        section={{
          className:
            "py-16 md:py-20 bg-fuchsia-50 dark:bg-gray-900 [--process-step-bg:theme(colors.fuchsia.600)] [--process-step-fg:theme(colors.white)] [--process-connector:theme(colors.gray.300)] dark:[--process-connector:theme(colors.gray.600)]",
        }}
        container={{ className: "max-w-6xl mx-auto px-6" }}
        headingStyle={{
          className:
            "text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-gray-800 dark:text-white leading-tight",
        }}
        subheadingStyle={{
          className:
            "text-xl md:text-2xl font-inter text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed",
        }}
        connectingLine={undefined}
        stepCircle={undefined}
        ariaLabel="Process timeline section"
      />
    </section>
  );
}
