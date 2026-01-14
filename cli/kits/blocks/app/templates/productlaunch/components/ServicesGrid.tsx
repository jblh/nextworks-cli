"use client";

import { ServicesGrid as SharedServicesGrid } from "@/components/sections/ServicesGrid";

/**
 * Product Launch preset for ServicesGrid wired to the upgraded shared ServicesGrid component
 */
export function ServicesGrid() {
  const servicesData = [
    {
      icon: "🤖",
      title: "AI Automation Solutions",
      description:
        "Streamline your business processes with intelligent automation that reduces manual work and increases efficiency by up to 80%.",
    },
    {
      icon: "📊",
      title: "Predictive Analytics",
      description:
        "Make data-driven decisions with AI-powered insights that predict trends, optimize operations, and maximize ROI.",
    },
    {
      icon: "💬",
      title: "Intelligent Chatbots",
      description:
        "Enhance customer experience with AI chatbots that provide instant, accurate responses 24/7 and reduce support costs.",
    },
    {
      icon: "🔍",
      title: "Smart Document Processing",
      description:
        "Extract and analyze information from documents automatically, reducing processing time by 90% and improving accuracy.",
    },
  ];

  return (
    <SharedServicesGrid
      enableMotion={true}
      sectionHeading="AI-Powered Solutions"
      servicesData={servicesData}
      section={{ className: "py-20 md:py-24 lg:py-28 bg-white dark:bg-black" }}
      container={{ className: "max-w-6xl mx-auto px-6 md:px-8 lg:px-12" }}
      heading={{
        className:
          "text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white text-center mb-12 md:mb-16 font-outfit",
      }}
      grid={{ className: "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10" }}
      card={{
        className:
          "bg-white dark:bg-gray-800 p-8 md:p-10 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group",
      }}
      cardContent={{ className: "flex flex-col items-start h-full space-y-6" }}
      icon={{
        className:
          "text-5xl md:text-6xl group-hover:scale-110 transition-transform duration-300",
      }}
      title={{
        className:
          "text-lg md:text-xl font-semibold text-gray-800 dark:text-white leading-tight font-outfit group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300",
      }}
      description={{
        className:
          "text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-inter flex-1",
      }}
      ariaLabel="IntelliOpAI services section"
    />
  );
}
