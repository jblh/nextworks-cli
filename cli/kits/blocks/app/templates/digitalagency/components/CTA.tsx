"use client";

import React from "react";
import { CTA as SharedCTA } from "@/components/sections/CTA";

export function CTA() {
  return (
    <SharedCTA
      // Background colors moved to the section slot
      section={{
        className:
          "bg-sky-50 dark:bg-gray-900 text-foreground [--heading-fg:rgb(17,24,39)] dark:[--heading-fg:white] [--subheading-fg:rgba(17,24,39,0.8)] dark:[--subheading-fg:rgba(255,255,255,0.85)] [--description-fg:rgba(17,24,39,0.75)] dark:[--description-fg:rgba(255,255,255,0.75)]",
      }}
      // Layout/height/centering handled by the container slot
      container={{
        className:
          "mx-auto flex h-[32vh] w-full max-w-6xl flex-col items-center justify-center overflow-hidden px-4 pb-8",
      }}
      // Heading mapped to the new headingText slot
      headingText={{
        text: "Ready To Transform Your Business?",
        className:
          "text-4xl md:text-5xl lg:text-6xl font-bold font-poppins leading-tight",
      }}
      // Use actionsWrapper for spacing instead of margin on the button
      actionsWrapper={{
        className:
          "mt-6 flex flex-col items-center gap-3 sm:flex-row [--btn-ring:rgba(192,38,211,0.35)] dark:[--btn-ring:rgba(192,38,211,0.45)]",
      }}
      // Primary CTA mapped to ctaButton + ctaButtonStyle
      ctaButton={{ label: "Get Your Free Quote", href: "#contact" }}
      ctaButtonStyle={{
        variant: "default",
        size: "lg",
        className:
          "font-poppins shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 [--btn-bg:#c026d3] dark:[--btn-bg:#c026d3] [--btn-hover-bg:#a21caf] dark:[--btn-hover-bg:#a21caf] [--btn-fg:#ffffff] dark:[--btn-fg:#ffffff] hover:[--btn-hover-fg:#ffffff] dark:hover:[--btn-hover-fg:#ffffff] [--btn-border:transparent]",
      }}
      // Preserve the previous top margin on the heading
      spacing={{ topMargin: "mt-[8vh]" }}
    />
  );
}

// "use client";

// import React from "react";
// import { CTA as SharedCTA } from "@/components/sections/CTA";

// export function CTA() {
//   return (
//     <SharedCTA
//       heading={{
//         text: "Ready To Transform Your Business?",
//         className:
//           "text-4xl md:text-5xl lg:text-6xl font-bold font-poppins leading-tight",
//       }}
//       section={{
//         className:
//           "flex h-[32vh] flex-col items-center overflow-hidden bg-fuchsia-50 dark:bg-gray-900",
//       }}
//       button={{
//         text: "Get Your Free Quote",
//         href: "#contact",
//         variant: "default",
//         size: "lg",
//         className:
//           "mt-6 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-poppins shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5",
//       }}
//       spacing={{ topMargin: "mt-[8vh]" }}
//     />
//   );
// }

// export default CTA;
