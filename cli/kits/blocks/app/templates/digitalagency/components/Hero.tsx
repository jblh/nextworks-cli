"use client";

import React from "react";
import { HeroSplit } from "@/components/sections/HeroSplit";
import { NetworkPattern } from "@/app/templates/digitalagency/components/NetworkPattern";

/**
 * Upgraded HeroNew preset for the digital agency template,
 * wired to the shared HeroSplit with slots + cn API.
 */
export function Hero() {
  return (
    <section id="home" className="bg-white dark:bg-black">
      <HeroSplit
        section={{
          className:
            "relative bg-gradient-to-br from-violet-600 to-fuchsia-600 px-6 pt-8 pb-16 md:pt-12 md:pb-20 text-white hero-pattern",
        }}
        heading={{
          text: "Digital Innovation That Drives Growth",
          className:
            "text-5xl md:text-5xl lg:text-7xl font-extrabold leading-tight text-white font-poppins",
        }}
        subheading={{
          text: "We craft exceptional digital experiences that transform businesses. From cutting-edge web applications to AI-powered solutions, we turn your vision into reality.",
          className:
            "mt-6 text-xl md:text-1xl text-white/90 max-w-3xl font-inter font-medium leading-relaxed",
        }}
        cta1={{
          label: "Start Your Project",
          href: "#contact",
          variant: "default",
          size: "lg",
          className: [
            "font-poppins font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 text-lg",
            "[--btn-bg:theme(colors.fuchsia.600)]",
            "hover:[--btn-hover-bg:theme(colors.fuchsia.700)]",
            "[--btn-fg:theme(colors.white)]",
            "hover:[--btn-hover-fg:theme(colors.white)]",
          ].join(" "),
        }}
        cta2={{
          label: "Explore Solutions",
          href: "#services",
          variant: "outline",
          size: "lg",
          className: [
            "font-poppins font-semibold px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5",
            "border-2", // match previous thickness
            // set colors via vars
            "[--btn-fg:oklch(0.51_0.18_341)]", // fuchsia-700-ish
            "[--btn-border:oklch(0.97_0.01_0)]", // white/90 approx
            "[--btn-bg:oklch(0.97_0.01_0_/0.9)]",
            "hover:[--btn-hover-bg:oklch(1_0_0)]", // white
            "hover:[--btn-hover-fg:oklch(0.51_0.18_341)]",
            // dark: make it a light outline with white text
            "dark:[--btn-fg:oklch(1_0_0)]",
            "dark:[--btn-border:oklch(1_0_0_/0.9)]",
            "dark:[--btn-bg:transparent]",
            "dark:hover:[--btn-hover-bg:oklch(1_0_0))]",
          ].join(" "),
        }}
        image={{
          src: undefined,
          alt: "Digital innovation network visualization",
          className: "object-contain",
        }}
        imageLayout="full-bleed"
        fallback={<NetworkPattern />}
        imageContainer={{ className: "mt-10 sm:mt-10 md:mt-0 md:mr-0 lg:mr-7" }}
        // imageContainer={{
        //   className:
        //     "relative w-full min-h-[16rem] h-[20rem] md:h-[28rem] lg:h-[32rem] self-start mt-20 lg:mt-0 mb-10 lg:mb-0",
        // }}
        textContainer={{
          className: "flex-1 px-5 lg:px-8 lg:self-start pt-0 md:pt-2 lg:pt-4",
        }}
        buttonsContainer={{
          className: [
            "gap-4 mt-8 sm:flex-col lg:flex-row",
            "[--btn-ring:oklch(1_0_0)]", // white ring to match on purple bg
          ].join(" "),
        }}
        // buttonsContainer={{ className: "flex gap-4 mt-8" }}
        textAlign="center"
        ariaLabel="Digital innovation that drives growth hero section"
      />
    </section>
  );
}
