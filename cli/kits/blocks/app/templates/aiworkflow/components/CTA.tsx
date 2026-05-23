"use client";

import { CTA as SharedCTA } from "@/components/sections/CTA";

export function CTA() {
  return (
    <SharedCTA
      section={{
        className:
          "bg-[linear-gradient(135deg,theme(colors.slate.950)_0%,theme(colors.black)_55%,theme(colors.slate.900)_100%)] [--heading-fg:white] [--subheading-fg:rgba(255,255,255,0.82)] [--description-fg:rgba(255,255,255,0.74)]",
      }}
      container={{
        className:
          "flex min-h-[22rem] w-full flex-col items-center justify-center px-6 py-16 text-center",
      }}
      headingText={{
        text: "Ship code changes with an agent in the loop.",
        className:
          "font-outfit text-3xl font-semibold leading-tight text-white md:text-4xl lg:text-5xl",
      }}
      subheadingText={{
        text: "Move from issue to patch to preview without leaving one workspace.",
        className:
          "mx-auto mt-4 max-w-2xl font-inter text-base leading-7 text-white/80 md:text-lg",
      }}
      actionsWrapper={{ className: "mt-8 flex flex-col gap-3 sm:flex-row" }}
      ctaButton={{ label: "Book a coding demo", href: "#contact" }}
      ctaButtonStyle={{
        variant: "default",
        size: "lg",
        className:
          "font-inter font-semibold [--btn-bg:theme(colors.white)] [--btn-fg:theme(colors.slate.950)] [--btn-border:transparent] hover:[--btn-hover-bg:theme(colors.slate.100)] hover:[--btn-hover-fg:theme(colors.slate.950)] dark:[--btn-bg:theme(colors.white)] dark:[--btn-fg:theme(colors.slate.950)] dark:hover:[--btn-hover-bg:theme(colors.slate.100)] dark:hover:[--btn-hover-fg:theme(colors.slate.950)]",
      }}
      secondaryButton={{ label: "Review pricing", href: "#pricing" }}
      secondaryButtonStyle={{
        variant: "outline",
        size: "lg",
        className:
          "border [--btn-bg:transparent] [--btn-fg:white] [--btn-border:rgba(255,255,255,0.18)] hover:[--btn-hover-bg:rgba(255,255,255,0.08)] hover:[--btn-hover-fg:white]",
      }}
      ariaLabel="AI coding agent call to action"
    />
  );
}
