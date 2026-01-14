"use client";

import { FAQ as SharedFAQ } from "@nextworks/blocks-sections";
import { ChevronDown, ChevronUp } from "lucide-react";

// - org. jsdoc in the bck folder

/**
 * Upgraded preset FAQ component for the product launch page.
 * Now uses the new shared FAQ_new.tsx API while preserving
 * the original styling, content, and accessibility semantics.
 */
export function FAQ() {
  return (
    <SharedFAQ
      faqSectionHeaderText="Frequently Asked Questions"
      faqData={[
        {
          question: "What is IntelliOpAI and how does it work?",
          answer:
            "IntelliOpAI is an advanced AI-powered platform that automates business operations and provides real-time insights. Our system uses machine learning algorithms to analyze your data, streamline workflows, and help you make smarter decisions faster.",
        },
        {
          question: "Do I need technical expertise to use IntelliOpAI?",
          answer:
            "Not at all! IntelliOpAI is designed with a user-friendly interface that requires no coding knowledge. Our intuitive dashboard and guided setup process make it easy for anyone to get started, regardless of their technical background.",
        },
        {
          question: "How does IntelliOpAI integrate with my existing systems?",
          answer:
            "IntelliOpAI offers seamless integration with popular business tools and platforms through our robust API and pre-built connectors. We support integration with CRM systems, databases, cloud services, and more to ensure a smooth transition.",
        },
        {
          question: "What kind of support do you provide?",
          answer:
            "We offer comprehensive 24/7 support including live chat, email support, and dedicated account managers for enterprise clients. Our team of AI experts is always ready to help you maximize the value of your IntelliOpAI implementation.",
        },
        {
          question: "Is my data secure with IntelliOpAI?",
          answer:
            "Absolutely. We implement enterprise-grade security measures including end-to-end encryption, SOC 2 compliance, and regular security audits. Your data is protected with the highest industry standards and we never share your information with third parties.",
        },
        {
          question: "Can IntelliOpAI scale with my business growth?",
          answer:
            "Yes! IntelliOpAI is built to scale with your business. Our flexible architecture can handle everything from small startups to large enterprises, automatically adjusting resources and capabilities as your needs evolve.",
        },
      ]}
      section={{
        className:
          "py-16 px-5 bg-white dark:bg-black text-gray-800 dark:text-white",
      }}
      container={{
        className: "max-w-6xl mx-auto",
      }}
      heading={{
        className:
          "text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white font-outfit",
      }}
      grid={{
        className: "grid grid-cols-1 lg:grid-cols-2 gap-6 px-5 py-8",
      }}
      item={{
        className: "mb-6 w-full",
      }}
      questionButton={{
        className:
          // "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white p-5 cursor-pointer rounded-lg transition-all duration-200 flex items-center justify-between shadow-lg hover:shadow-xl hover:shadow-purple-500/30 hover:-translate-y-0.5 font-inter ",

          // your existing classes...
          "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white p-5 cursor-pointer rounded-lg transition-all duration-200 flex items-center justify-between shadow-lg hover:shadow-xl hover:shadow-purple-500/30 hover:-translate-y-0.5 font-inter " +
          // define the ring and border CSS vars you want
          "[--btn-ring:theme(colors.purple.500)] dark:[--btn-ring:theme(colors.purple.400)] " +
          "[--btn-border:theme(colors.purple.500)] dark:[--btn-border:theme(colors.purple.400)] " +
          // ensure mouse focus uses your ring color too
          "focus:ring-[var(--btn-ring)]",
      }}
      // No extra styles for the question text; inherits from button
      questionText={{ className: "" }}
      chevronIcon={{
        className: "h-6 w-6 transition-transform duration-200 flex-shrink-0",
      }}
      openIcon={<ChevronUp className="h-6 w-6" />}
      closedIcon={<ChevronDown className="h-6 w-6" />}
      answer={{
        className:
          "bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg overflow-hidden border border-purple-200 dark:border-purple-800 shadow-md",
      }}
      answerText={{ className: "p-5" }}
      ariaLabel="IntelliOpAI frequently asked questions"
    />
  );
}
