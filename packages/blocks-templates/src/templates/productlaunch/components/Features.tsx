"use client";

import { Features as SharedFeatures } from "@nextworks/blocks-sections";

/**
 * Product Launch preset for Features, wired to the upgraded shared Features component
 * using the slots + cn API. Keeps content and styles consistent with the template.
 */
export function Features() {
  const featuresData = [
    {
      imageSrc: "/placeholders/product_launch/feature_1.png",
      imageAlt: "AI-Powered Analytics Dashboard",
      headingText: "Intelligent Analytics",
      subheadingText:
        "Harness the power of AI to gain deep insights into your business performance. Our machine learning algorithms analyze patterns and provide actionable recommendations to drive growth.",
    },
    {
      imageSrc: "/placeholders/product_launch/feature_2.png",
      imageAlt: "Real-time AI Collaboration Platform",
      headingText: "AI-Powered Collaboration",
      subheadingText:
        "Work seamlessly with AI assistants that understand context and help your team stay productive. Our intelligent collaboration tools adapt to your workflow and boost efficiency.",
    },
    {
      imageSrc: "/placeholders/product_launch/feature_3.png",
      imageAlt: "Advanced AI Security System",
      headingText: "AI-Enhanced Security",
      subheadingText:
        "Protect your data with next-generation AI security that learns and adapts to threats in real-time. Enterprise-grade protection with intelligent threat detection and prevention.",
    },
    {
      imageSrc: "/placeholders/product_launch/feature_4.png",
      imageAlt: "Mobile AI Interface",
      headingText: "Smart Mobile Experience",
      subheadingText:
        "Access your AI-powered workspace from anywhere with our intelligent mobile interface. Responsive design that adapts to your device and provides contextual assistance on the go.",
    },
  ];

  return (
    <SharedFeatures
      id="features"
      sectionHeading="AI-Powered Features"
      sectionSubheading="Experience the future of intelligent automation with our cutting-edge AI technology"
      featuresData={featuresData}
      section={{
        className: "py-20 md:py-24 lg:py-28 bg-white dark:bg-gray-900",
      }}
      container={{ className: "max-w-7xl mx-auto px-6 md:px-8 lg:px-12" }}
      header={{ className: "text-center mb-16" }}
      heading={{
        className:
          "text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white text-center font-outfit",
      }}
      subheading={{
        className:
          "text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed font-inter",
      }}
      grid={{
        className:
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-10",
      }}
      card={{
        className:
          "h-full transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-purple-500/20 group border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden",
      }}
      image={{
        className:
          "object-cover transition-transform duration-300 group-hover:scale-102",
      }}
      cardHeading={{
        className:
          "text-lg md:text-xl font-semibold text-gray-800 dark:text-white mb-4 leading-tight font-inter group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300",
      }}
      cardSubheading={{
        className:
          "text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-inter",
      }}
      ariaLabel="AI-powered features for IntelliOpAI"
      enableMotion={true}
    />
  );
}
