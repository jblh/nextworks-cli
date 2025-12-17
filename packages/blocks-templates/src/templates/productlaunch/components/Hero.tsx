"use client";

import { HeroSplit as SharedHeroSplit } from "@nextworks/blocks-sections";

/**
 * Product Launch preset for Hero, wired to the upgraded shared HeroSplit component
 * using the slots + cn API.
 */
export function Hero() {
  return (
    <SharedHeroSplit
      heading={{
        text: "Revolutionize Your Workflow with AI",
        className:
          "text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-black dark:text-white font-outfit mx-auto",
      }}
      subheading={{
        text: "Transform your business operations with our cutting-edge AI solutions. Streamline processes, boost productivity, and unlock new possibilities for growth.",
        className:
          "text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-100 mt-6 mb-8 max-w-2xl font-inter leading-relaxed mx-auto",
      }}
      section={{
        className:
          "bg-gradient-to-br from-white via-purple-50 to-white dark:from-gray-900 dark:via-purple-950/20 dark:to-gray-900 pt-16 px-8 pb-8",
      }}
      cta1={{
        label: "Get Started",
        href: "#contact",
        variant: "default",
        size: "lg",
        className: [
          "text-base font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 px-8 py-3",
          "[--btn-bg:theme(colors.purple.600)]",
          "hover:[--btn-hover-bg:theme(colors.purple.700)]",
          "[--btn-fg:theme(colors.white)]",
          "hover:[--btn-hover-fg:theme(colors.white)]",
        ].join(" "),
      }}
      cta2={{
        label: "Learn More",
        href: "#features",
        variant: "outline",
        size: "lg",
        className: [
          // layout/typography/shadow/transitions
          "text-base font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 px-8 py-3",
          // base colors (ensure outline has transparent bg instead of token background)
          "[--btn-bg:transparent]",
          // CSS variable overrides to control colors while keeping the outline variant structure
          "[--btn-fg:theme(colors.purple.600)]",
          "[--btn-border:theme(colors.purple.600)]",
          "hover:[--btn-hover-bg:theme(colors.purple.50)]",
          "hover:[--btn-hover-fg:theme(colors.purple.600)]",
          // dark mode
          "dark:[--btn-bg:transparent]",
          "dark:[--btn-fg:theme(colors.purple.500)]",
          "dark:[--btn-border:theme(colors.purple.500)]",
          "dark:hover:[--btn-hover-bg:theme(colors.purple.950)]",
          "dark:hover:[--btn-hover-fg:theme(colors.purple.500)]",
          // ensure hover text stays the intended color in light mode
          "hover:[--btn-hover-fg:theme(colors.purple.600)]",
          // ensure a border width is present for the outline variant override cases
          "border",
        ].join(" "),
      }}
      image={{
        src: "/placeholders/product_launch/hero.png",
        alt: "AI-powered workflow illustration",
        className: "object-contain",
      }}
      imageLayout="padded"
      imageContainer={{
        className: "md:h-80 lg:h-96 md:w-1/2",
      }}
      textContainer={{
        className: "  flex-1 p-5 lg:p-8 text-center lg:text-left",
      }}
      buttonsContainer={{
        className: [
          "flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start",
          "[--btn-ring:theme(colors.purple.500)]",
          "dark:[--btn-ring:theme(colors.purple.400)]",
        ].join(" "),
      }}
      textAlign="center"
      ariaLabel="Revolutionize your workflow with AI hero section"
    />
  );
}
