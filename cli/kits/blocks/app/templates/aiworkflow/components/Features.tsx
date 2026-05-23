"use client";

import { Features as SharedFeatures } from "@/components/sections/Features";

const featuresData = [
  {
    imageSrc: "/placeholders/saas_dashboard/projectBoard.png",
    imageAlt: "Task navigator and repo context view",
    headingText: "Turn plain-language tasks into code changes",
    subheadingText:
      "The agent reads the repo, traces the issue, and shapes a safe patch with clear context.",
  },
  {
    imageSrc: "/placeholders/saas_dashboard/analytics.png",
    imageAlt: "Transcript, live diff, and editor output",
    headingText: "Watch the transcript and diff move independently",
    subheadingText:
      "The agent can keep reading, edit the file, and land a result without forcing both panes to move in lockstep.",
  },
  {
    imageSrc: "/placeholders/saas_dashboard/chat.png",
    imageAlt: "Review queue and patch summary panel",
    headingText: "Review only the changes that matter",
    subheadingText:
      "Keep the agent moving on routine edits while exceptions surface only when a human needs to step in.",
  },
];

export function Features() {
  return (
    <SharedFeatures
      sectionHeading="One system for requests, code, execution, and visibility"
      sectionSubheading="Turn a task into context, a patch, and a live result without losing the thread."
      featuresData={featuresData}
      section={{
        className:
          "bg-[linear-gradient(180deg,#eef3f8_0%,#f6f8fb_48%,#eef3f8_100%)] py-18 md:py-22 lg:py-24 dark:bg-[linear-gradient(180deg,#171717_0%,#121212_18%,#1d1d1d_46%,#131313_76%,#1b1b1b_100%)]",
      }}
      container={{ className: "max-w-7xl mx-auto px-6 md:px-8 lg:px-10" }}
      header={{ className: "mb-12 text-center md:mb-14" }}
      heading={{
        className:
          "font-outfit text-3xl font-semibold text-[var(--heading-fg)] md:text-4xl lg:text-5xl",
      }}
      subheading={{
        className:
          "mx-auto max-w-3xl font-inter text-base leading-7 text-[var(--subheading-fg)] md:text-lg",
      }}
      grid={{
        className: "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3",
      }}
      card={{
        className:
          "h-full rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--card-fg)] shadow-[var(--card-shadow)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
      }}
      image={{ className: "h-52 w-full object-cover" }}
      cardHeading={{
        className:
          "font-inter text-xl font-semibold leading-tight text-[var(--card-title-fg)]",
      }}
      cardSubheading={{
        className:
          "font-inter text-sm leading-6 text-[var(--card-muted-fg)] md:text-base",
      }}
      ariaLabel="AI coding agent features"
    />
  );
}
