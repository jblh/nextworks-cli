"use client";

import { FAQ as SharedFAQ } from "@/components/sections/FAQ";

export function FAQ() {
  return (
    <SharedFAQ
      faqSectionHeaderText="Frequently asked questions"
      faqData={[
        {
          question: "What kinds of coding tasks can the agent handle?",
          answer:
            "Teams use FlowPilot AI for bug fixes, refactors, routine maintenance, release prep, and other repeatable code changes.",
        },
        {
          question: "How do reviews and approvals work?",
          answer:
            "You define the rules once. The agent keeps moving on low-risk work and pauses only when a review or approval is required.",
        },
        {
          question: "Can the agent use our codebase and docs?",
          answer:
            "Yes. It can read repo files, docs, and internal notes so changes stay grounded in current project context.",
        },
        {
          question: "Will we be able to audit every change?",
          answer:
            "Yes. Each run records reads, edits, approvals, and output so teams can trace what changed and why.",
        },
        {
          question: "Do we need engineering support to start?",
          answer:
            "Most teams start with a few high-signal tasks, then expand the agent into more of the codebase as confidence grows.",
        },
        {
          question: "Which tools can it connect to?",
          answer:
            "The template story assumes common tools like GitHub, docs, issue trackers, CI, and chat, with more connectors added as needed.",
        },
      ]}
      section={{
        className:
          "bg-[linear-gradient(180deg,#eef3f8_0%,#f6f8fb_48%,#eef3f8_100%)] px-5 py-16 dark:bg-[linear-gradient(180deg,#171717_0%,#121212_18%,#1d1d1d_46%,#131313_76%,#1b1b1b_100%)]",
      }}
      container={{ className: "max-w-6xl mx-auto" }}
      heading={{
        className:
          "mb-8 text-center font-outfit text-3xl font-semibold text-[var(--heading-fg)] md:text-4xl",
      }}
      grid={{ className: "grid grid-cols-1 gap-5 lg:grid-cols-2" }}
      item={{ className: "mb-0 w-full" }}
      questionButton={{
        className:
          "flex cursor-pointer items-center justify-between rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 font-inter font-semibold text-[var(--card-title-fg)] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 dark:hover:bg-white/[0.04]",
      }}
      answer={{
        className:
          "overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--card-fg)] shadow-sm",
      }}
      answerText={{
        className: "font-inter text-sm leading-7 text-[var(--card-fg)]",
      }}
      ariaLabel="AI coding agent frequently asked questions"
    />
  );
}
