"use client";
import React from "react";
import { About as SharedAbout } from "@nextworks/blocks-sections";

/**
 * A preset About component customized for the product launch page,
 * using the shared About.tsx with predefined styles and content.
 *
 * Features:
 * - "About IntelliOpAI" heading with custom typography
 * - Purple-themed styling matching the brand
 * - Custom stats optimized for AI product launch
 * - Responsive design with proper spacing
 * - Dark mode support with consistent theming
 * - Clean, modern design with hover effects
 */

export function About() {
  return (
    <SharedAbout
      // Content
      aboutSubheadingText="The Future of AI is Here"
      aboutHeadingText="About IntelliOpAI"
      aboutContentText="IntelliOpAI is pioneering the next generation of artificial intelligence solutions for modern businesses. Founded by AI researchers and industry disruptors, we're building intelligent systems that learn, adapt, and deliver results in real-time. Our breakthrough technology combines deep learning, natural language processing, and predictive analytics to create AI that actually works for your business."
      aboutTextAlign="center"
      // Stats
      showStats={true}
      animateStats={true}
      aboutStats={[
        { value: "10M", suffix: "+", label: "Data Points Processed" },
        { value: "99.7", suffix: "%", label: "AI Accuracy Rate" },
        { value: "500", suffix: "+", label: "Early Adopters" },
        { value: "24", suffix: "/7", label: "AI Innovation" },
      ]}
      // Slots / styling
      section={{
        className: "py-20 bg-white dark:bg-black text-gray-800 dark:text-white",
      }}
      container={{
        className: "max-w-7xl mx-auto px-6",
      }}
      inner={{
        // New slot styled for this preset
        className: "flex flex-col gap-12",
      }}
      contentContainer={{
        className: "max-w-4xl mx-auto",
      }}
      contentStack={{
        // New slot styled for this preset
        className: "flex flex-col gap-6",
      }}
      subheading={{
        className:
          "text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider font-inter",
      }}
      heading={{
        className:
          "text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white leading-tight font-outfit",
      }}
      content={{
        className:
          "text-base md:text-lg text-gray-700 dark:text-gray-200 leading-relaxed opacity-90 max-w-3xl font-inter",
      }}
      statsSection={{
        className:
          "bg-gradient-to-r from-purple-50 via-white to-purple-50 dark:from-purple-900/20 dark:via-gray-800 dark:to-purple-900/20 p-8 md:p-12 rounded-2xl shadow-xl mx-auto max-w-5xl w-full border border-purple-200 dark:border-purple-800",
      }}
      statsGrid={{
        className:
          "grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 justify-items-center",
      }}
      statItem={{
        className: "flex flex-col items-center gap-3",
      }}
      statNumber={{
        className:
          "text-2xl md:text-3xl lg:text-4xl font-bold text-purple-600 dark:text-purple-400 leading-none font-outfit",
      }}
      statLabel={{
        className:
          "text-sm md:text-base font-medium text-gray-700 dark:text-gray-300 text-center opacity-90 font-inter",
      }}
    />
  );
}

// "use client";

// import { About as SharedAbout } from "@/components/sections/About";

// /**
//  * A preset About component customized for the product launch page,
//  * using the shared About.tsx with predefined styles and content.
//  *
//  * Features:
//  * - "About IntelliOpAI" heading with custom typography
//  * - Purple-themed styling matching the brand
//  * - Custom stats optimized for AI product launch
//  * - Responsive design with proper spacing
//  * - Dark mode support with consistent theming
//  * - Clean, modern design with hover effects
//  */
// export function About() {
//   return (
//     <SharedAbout
//       aboutHeadingText="About IntelliOpAI"
//       aboutSubheadingText="The Future of AI is Here"
//       aboutContentText="IntelliOpAI is pioneering the next generation of artificial intelligence solutions for modern businesses. Founded by AI researchers and industry disruptors, we're building intelligent systems that learn, adapt, and deliver results in real-time. Our breakthrough technology combines deep learning, natural language processing, and predictive analytics to create AI that actually works for your business."
//       aboutStats={[
//         {
//           value: "10M",
//           label: "Data Points Processed",
//           suffix: "+",
//         },
//         {
//           value: "99.7",
//           label: "AI Accuracy Rate",
//           suffix: "%",
//         },
//         {
//           value: "500",
//           label: "Early Adopters",
//           suffix: "+",
//         },
//         {
//           value: "24",
//           label: "AI Innovation",
//           suffix: "/7",
//         },
//       ]}
//       section={{
//         className: "py-20 bg-white dark:bg-black text-gray-800 dark:text-white",
//       }}
//       container={{
//         className: "max-w-7xl mx-auto px-6",
//       }}
//       contentContainer={{
//         className: "max-w-4xl mx-auto",
//       }}
//       subheading={{
//         className:
//           "text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider font-inter",
//       }}
//       heading={{
//         className:
//           "text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white leading-tight font-outfit",
//       }}
//       content={{
//         className:
//           "text-base md:text-lg text-gray-700 dark:text-gray-200 leading-relaxed opacity-90 max-w-3xl font-inter",
//       }}
//       statsSection={{
//         className:
//           "bg-gradient-to-r from-purple-50 via-white to-purple-50 dark:from-purple-900/20 dark:via-gray-800 dark:to-purple-900/20 p-8 md:p-12 rounded-2xl shadow-xl mx-auto max-w-5xl w-full border border-purple-200 dark:border-purple-800",
//       }}
//       statsGrid={{
//         className:
//           "grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 justify-items-center",
//       }}
//       statItem={{
//         className: "flex flex-col items-center gap-3",
//       }}
//       statNumber={{
//         className:
//           "text-2xl md:text-3xl lg:text-4xl font-bold text-purple-600 dark:text-purple-400 leading-none font-outfit",
//       }}
//       statLabel={{
//         className:
//           "text-sm md:text-base font-medium text-gray-700 dark:text-gray-300 text-center opacity-90 font-inter",
//       }}
//       aboutTextAlign="center"
//       showStats={true}
//       animateStats={false}
//       ariaLabel="About IntelliOpAI section"
//     />
//   );
// }
