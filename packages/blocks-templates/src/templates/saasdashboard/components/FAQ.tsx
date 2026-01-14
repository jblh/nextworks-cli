"use client";

import { FAQ as SharedFAQ } from "@nextworks/blocks-sections";

const defaultFAQArray = [
  {
    question: "Can I migrate from other tools?",
    answer: "Yes, we help with data import.",
  },
  {
    question: "What integrations are available?",
    answer: "50+ apps including Slack, Google, Zapier.",
  },
  { question: "How long does setup take?", answer: "Less than 15 minutes." },
  {
    question: "Is there a free trial?",
    answer: "Yes — start a 14-day free trial with no credit card required.",
  },
  {
    question: "What support do you offer?",
    answer: "Email, chat, and dedicated onboarding for paid plans.",
  },
  {
    question: "Are there discounts for teams or annual billing?",
    answer:
      "Yes — we offer team pricing and discounts for annual subscriptions.",
  },
];

export function FAQ() {
  return (
    <SharedFAQ
      faqData={defaultFAQArray}
      faqSectionHeaderText="Frequently Asked Questions"
      section={{ className: "py-10 px-5 bg-background text-[var(--card-fg)]" }}
      heading={{
        className:
          "text-3xl font-bold font-inter text-center mb-6 text-[var(--heading-fg)]",
      }}
      grid={{ className: "grid grid-cols-2 gap-4" }}
      item={{ className: "mb-0" }}
      questionButton={{
        className:
          "p-5 rounded-lg transition-all duration-200 flex items-center justify-between cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-0.5 font-inter bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white [--btn-ring:theme(colors.sky.500)] dark:[--btn-ring:theme(colors.sky.400)] [--btn-border:theme(colors.sky.500)] dark:[--btn-border:theme(colors.sky.400)]",
      }}
      questionText={{ className: "font-inter font-semibold text-base" }}
      answer={{
        className:
          "mt-1 rounded-lg bg-[var(--card-bg)] text-[var(--card-fg)] border-[var(--card-border)]",
      }}
      answerText={{ className: "font-inter text-base text-[var(--card-fg)]" }}
      allowMultipleOpen={true}
    />
  );
}
