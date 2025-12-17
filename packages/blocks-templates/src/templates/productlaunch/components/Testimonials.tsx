"use client";

import { Testimonials as SharedTestimonials } from "@nextworks/blocks-sections";

/**
 * Product Launch preset for Testimonials wired to the upgraded shared Testimonials component
 */
export function Testimonials() {
  const testimonials = [
    {
      testimonialText:
        "IntelliOpAI has completely transformed our workflow. The AI-powered automation saves us 40+ hours per week, and the accuracy is incredible.",
      testimonialAuthor: " - Sarah Johnson, CEO at TechCorp",
      testimonialAuthorInitials: "SJ",
    },
    {
      testimonialText:
        "The machine learning capabilities are outstanding. We've seen a 300% increase in productivity since implementing their AI solutions.",
      testimonialAuthor: " - Michael Chen, CTO at InnovateLab",
      testimonialAuthorInitials: "MC",
    },
    {
      testimonialText:
        "Game-changing technology! The AI insights have helped us make better decisions and scale our business faster than ever before.",
      testimonialAuthor: " - Emily Rodriguez, VP Operations at GrowthCo",
      testimonialAuthorInitials: "ER",
    },
    {
      testimonialText:
        "The implementation was seamless and the results exceeded our expectations. Our team loves working with the AI-powered tools.",
      testimonialAuthor: " - David Kim, Head of Engineering at StartupXYZ",
      testimonialAuthorInitials: "DK",
    },
    {
      testimonialText:
        "IntelliOpAI's natural language processing capabilities have revolutionized how we handle customer support. Response times improved by 80%.",
      testimonialAuthor:
        " - Lisa Wang, Customer Success Director at ServicePro",
      testimonialAuthorInitials: "LW",
    },
    {
      testimonialText:
        "The predictive analytics features are phenomenal. We can now forecast trends and make data-driven decisions with confidence.",
      testimonialAuthor:
        " - James Thompson, Data Science Lead at AnalyticsPlus",
      testimonialAuthorInitials: "JT",
    },
  ];

  return (
    <SharedTestimonials
      id="testimonials"
      testimonials={testimonials}
      testimonialSectionHeader="What Our AI Customers Say"
      section={{
        className: "py-20 md:py-24 lg:py-28 bg-gray-50 dark:bg-gray-900",
      }}
      container={{ className: "max-w-7xl mx-auto px-6 md:px-8 lg:px-12" }}
      header={{ className: "text-center mb-16" }}
      heading={{
        className:
          "text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white text-center font-outfit",
      }}
      grid={{
        className:
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10",
      }}
      card={{
        className:
          "bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10 group border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600",
      }}
      content={{ className: "flex flex-col space-y-6" }}
      text={{
        className:
          "text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed italic font-inter group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300",
      }}
      author={{
        className:
          "text-gray-600 dark:text-gray-400 text-sm md:text-base font-medium font-inter",
      }}
      avatar={{
        className:
          "w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300",
      }}
      avatarText={{ className: "text-white font-bold" }}
      ariaLabel="Customer testimonials for IntelliOpAI"
    />
  );
}
