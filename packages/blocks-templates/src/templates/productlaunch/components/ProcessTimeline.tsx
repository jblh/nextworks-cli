"use client";

import { ProcessTimeline as SharedProcessTimeline } from "@nextworks/blocks-sections";

/**
 * Product Launch preset for ProcessTimeline wired to the upgraded shared ProcessTimeline component
 */
export function ProcessTimeline() {
  const steps = [
    {
      stepNumber: 1,
      title: "Instant AI Assessment",
      description:
        "Get your personalized AI readiness report in minutes. Our intelligent system analyzes your data and identifies breakthrough opportunities.",
      icon: "🧠",
    },
    {
      stepNumber: 2,
      title: "Smart AI Configuration",
      description:
        "Our AI configures itself for your business. No coding required - just tell us your goals and watch the magic happen.",
      icon: "⚙️",
    },
    {
      stepNumber: 3,
      title: "Real-time AI Training",
      description:
        "Watch your AI learn and improve in real-time. Our breakthrough algorithms adapt to your data patterns instantly.",
      icon: "🎯",
    },
    {
      stepNumber: 4,
      title: "Launch & Scale",
      description:
        "Deploy your AI in minutes, not months. Continuous learning ensures your AI gets smarter every day.",
      icon: "🚀",
    },
  ];

  return (
    <SharedProcessTimeline
      steps={steps}
      heading="How AI Gets Done in Minutes"
      subheading="Experience the future of AI deployment with our revolutionary 4-step process that transforms your business in real-time."
      section={{ className: "py-20 md:py-24 bg-white dark:bg-black" }}
      container={{ className: "max-w-6xl mx-auto px-6 md:px-12" }}
      header={{ className: "space-y-6 mb-16 md:mb-20 text-center" }}
      headingStyle={{
        className:
          "text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white leading-tight font-outfit",
      }}
      subheadingStyle={{
        className:
          "text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-inter",
      }}
      timelineContainer={{ className: "w-full max-w-5xl mx-auto" }}
      desktopTimeline={{
        className: "hidden lg:flex justify-between items-start relative w-full",
      }}
      connectingLine={{
        className:
          "absolute top-8 left-15 right-15 h-1 bg-purple-300 dark:bg-purple-600 z-10",
      }}
      stepContainer={{
        className:
          "flex flex-col items-center space-y-6 flex-1 max-w-56 relative z-20",
      }}
      stepCircle={{
        className:
          "w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 dark:from-purple-500 dark:to-purple-600 text-white font-bold text-2xl rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:-translate-y-1 hover:scale-110 relative z-30",
      }}
      stepNumber={{ className: "text-white font-bold text-2xl font-outfit" }}
      stepIcon={{ className: "text-3xl md:text-4xl mb-3" }}
      stepContent={{ className: "space-y-3 text-center" }}
      stepTitle={{
        className:
          "text-lg md:text-xl font-semibold text-gray-800 dark:text-white leading-tight font-outfit",
      }}
      stepDescription={{
        className:
          "text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-inter",
      }}
      mobileTimeline={{
        className: "flex lg:hidden flex-col space-y-10 w-full",
      }}
      mobileStep={{ className: "flex items-start relative" }}
      mobileVerticalLine={{
        className:
          "absolute left-8 top-16 bottom-[-2.5rem] w-1 bg-purple-300 dark:bg-purple-600 z-10",
      }}
      mobileStepCircle={{
        className:
          "w-16 h-16 bg-purple-600 dark:bg-purple-500 text-white font-bold text-2xl rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex-shrink-0 mr-8 z-20",
      }}
      mobileStepContent={{
        className: "flex flex-col items-start space-y-4 flex-1 pt-2",
      }}
      mobileStepIcon={{ className: "text-3xl md:text-4xl" }}
      mobileStepTitle={{
        className:
          "text-lg md:text-xl font-semibold text-gray-800 dark:text-white leading-tight font-outfit",
      }}
      mobileStepDescription={{
        className:
          "text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-inter",
      }}
      ariaLabel="IntelliOpAI process timeline"
    />
  );
}
