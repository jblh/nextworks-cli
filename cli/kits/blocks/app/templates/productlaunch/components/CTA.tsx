"use client";

import React from "react";
import { CTA as SharedCTA } from "@/components/sections/CTA";

export function CTA() {
  return (
    <SharedCTA
      // Background and theme colors live on the section slot
      section={{
        className:
          "bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 dark:from-purple-500 dark:via-purple-600 dark:to-purple-700 [--heading-fg:white] [--subheading-fg:rgba(255,255,255,0.85)] [--description-fg:rgba(255,255,255,0.8)]",
      }}
      // Layout, height, and centering are controlled by the container slot
      container={{
        className:
          "flex h-[45.5vh] w-full flex-col items-center overflow-hidden",
      }}
      // Heading mapped to the new headingText slot
      headingText={{
        text: "Join The Launch Today!",
        className:
          "text-xl md:text-2xl lg:text-3xl font-bold leading-tight text-white dark:text-white font-outfit",
      }}
      // Use actionsWrapper for spacing instead of margin on the button
      actionsWrapper={{
        className:
          "mt-4 [--btn-ring:rgba(124,58,237,0.35)] dark:[--btn-ring:rgba(124,58,237,0.45)]",
      }}
      // Primary CTA mapped to ctaButton + ctaButtonStyle
      ctaButton={{ label: "Sign Up Now", href: "#contact" }}
      ctaButtonStyle={{
        variant: "secondary",
        size: "lg",
        className:
          "text-base md:text-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 border-0 [--btn-bg:white] dark:[--btn-bg:white] [--btn-hover-bg:#f3f4f6] dark:[--btn-hover-bg:#e5e7eb] [--btn-fg:#7c3aed] dark:[--btn-fg:#7c3aed] hover:[--btn-hover-fg:#6d28d9] dark:hover:[--btn-hover-fg:#6d28d9] [--btn-border:transparent]",
      }}
      // Secondary CTA using outline style
      secondaryButton={{ label: "Learn More", href: "#features" }}
      secondaryButtonStyle={{
        variant: "outline",
        size: "lg",
        className:
          "text-base md:text-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 border [--btn-bg:transparent] dark:[--btn-bg:transparent] [--btn-fg:white] [--btn-border:rgba(255,255,255,0.9)] dark:[--btn-border:rgba(255,255,255,0.85)] hover:[--btn-hover-bg:white] hover:[--btn-hover-fg:#7c3aed]",
      }}
      // Preserve the previous top margin on the heading
      spacing={{ topMargin: "mt-[17vh]" }}
      ariaLabel="Join the product launch call to action"
    />
  );
}

// "use client";

// import { CTA as SharedCTA } from "@/components/sections/CTA";

// /**
//  * A preset CTA (Call-To-Action) component customized for the product launch page,
//  * using the shared CTA.tsx with predefined styles and content.
//  *
//  * Features:
//  * - "Join The Launch Today!" heading with custom typography
//  * - Purple button with hover effects and shadow
//  * - Gray background with dark mode support
//  * - Custom spacing and sizing
//  */
// export function CTA() {
//   return (
//     <SharedCTA
//       heading={{
//         text: "Join The Launch Today!",
//         className:
//           "text-xl md:text-2xl lg:text-3xl font-bold leading-tight text-white dark:text-white font-outfit",
//       }}
//       section={{
//         className:
//           "flex h-[45.5vh] flex-col items-center overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 dark:from-purple-500 dark:via-purple-600 dark:to-purple-700",
//       }}
//       button={{
//         text: "Sign Up Now",
//         href: "#contact",
//         variant: "secondary",
//         size: "lg",
//         className:
//           "mt-4 bg-white hover:bg-gray-100 text-purple-600 hover:text-purple-700 text-base md:text-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 border-0",
//       }}
//       spacing={{
//         topMargin: "mt-[17vh]",
//       }}
//       ariaLabel="Join the product launch call to action"
//     />
//   );
// }
