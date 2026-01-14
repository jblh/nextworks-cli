"use client";

import React, { useMemo, useState } from "react";
import { cn } from "@nextworks/blocks-core";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@nextworks/blocks-core";

/**
 * Represents a single FAQ item.
 * @public
 */
export interface FAQS {
  /** The question text */
  question?: string;
  /** The answer text */
  answer?: string;
}

/**
 * Props for the FAQ section component.
 *
 * @remarks
 * - Styling: exposes slot-style className overrides; consumer classes are
 *   merged after defaults via cn().
 * - Behavior: supports single or multiple open items; default open indices
 *   are respected. Controlled internally with a Set.
 * - Motion: when enableMotion is false, collapse/expand transitions are
 *   removed for a hard-cut.
 * - Accessibility: each item uses button+region with aria-controls and
 *   aria-expanded. Section uses aria-label.
 */
export interface FAQProps {
  /** Header text displayed at the top of the FAQ section. @defaultValue "Frequently Asked Questions" */
  faqSectionHeaderText?: string;
  /** Array of question/answer items. @defaultValue defaultFaqData */
  faqData?: FAQS[];
  /** Optional id for the section root. @defaultValue "faq" */
  sectionId?: string;
  /** Optional top-level class override */
  className?: string;
  /** When false, only one item can be open at a time. @defaultValue true */
  allowMultipleOpen?: boolean;
  /** Indices of items that should be open by default. @defaultValue [] */
  defaultOpenIndices?: number[];
  /** Optional icons for open/closed states */
  openIcon?: React.ReactNode;
  closedIcon?: React.ReactNode;
  /** ARIA label for the FAQ section. @defaultValue "Frequently asked questions section" */
  ariaLabel?: string;
  /** Slot-style overrides */
  section?: { className?: string };
  container?: { className?: string };
  heading?: { className?: string };
  grid?: { className?: string };
  item?: { className?: string };
  questionButton?: { className?: string };
  questionText?: { className?: string };
  chevronIcon?: { className?: string };
  answer?: { className?: string };
  answerText?: { className?: string };
  /** When false, removes transition on collapse/expand for a hard-cut */
  enableMotion?: boolean;
}

// const defaultFaqData: FAQS[] = [
//   {
//     question: "What does IntelliOpAI do?",
//     answer: "Automates ops with real-time insights.",
//   },
//   {
//     question: "Do I need coding skills?",
//     answer: "No, it's designed for ease of use.",
//   },
// ];

const defaultFaqData: FAQS[] = [
  {
    question: "What does IntelliOpAI do?",
    answer: "Automates ops with real-time insights.",
  },
  {
    question: "How secure is my data?",
    answer: "We use industry-standard encryption and strict access controls.",
  },
  {
    question: "Can I integrate with other tools?",
    answer:
      "Yes — supports APIs and popular integrations like Slack, GitHub, and Jira.",
  },
  {
    question: "How do I get support?",
    answer:
      "Contact our support team via in-app chat or the help center for assistance.",
  },
];

/**
 * Expandable FAQ section with accessible toggles and optional icons.
 *
 * @remarks
 * - Supports multiple or single open item behavior via allowMultipleOpen.
 * - Uses button with aria-expanded and a region with aria-labelledby.
 * - Motion can be disabled via enableMotion for reduced animation.
 *
 * @example
 * <FAQ faqData={[{ question: 'What is X?', answer: 'Y' }]} />
 */
export function FAQ({
  faqSectionHeaderText = "Frequently Asked Questions",
  faqData = defaultFaqData,
  sectionId = "faq",
  className,
  allowMultipleOpen = true,
  defaultOpenIndices = [],
  openIcon,
  closedIcon,
  ariaLabel = "Frequently asked questions section",
  section = { className: "py-10 px-5 bg-muted text-foreground" },
  container = { className: "mx-auto max-w-7xl" },
  heading = {
    className: "mb-6 text-center text-2xl font-bold text-foreground",
  },
  grid = { className: "grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6" },
  item = { className: "mb-4" },
  questionButton = {
    className:
      "shadow-md hover:shadow-lg border-[var(--btn-border)] focus-visible:ring-[var(--btn-ring)] bg-[var(--faq-btn-bg,var(--btn-bg))] text-[var(--faq-btn-fg,var(--btn-fg))] hover:bg-[var(--faq-btn-hover-bg,var(--btn-hover-bg))] hover:text-[var(--faq-btn-hover-fg,var(--btn-hover-fg))]",
  },
  questionText = { className: "" },
  chevronIcon = { className: "transition-transform duration-200" },
  answer = {
    className:
      "bg-[var(--faq-answer-bg,var(--card-bg))] text-[var(--faq-answer-fg,var(--card-fg))] border-[var(--card-border)]",
  },
  answerText = { className: "leading-relaxed" },
  enableMotion = true,
}: FAQProps) {
  const [openSet, setOpenSet] = useState<Set<number>>(
    () => new Set(defaultOpenIndices),
  );
  const idPrefix = useMemo(() => sectionId || "faq", [sectionId]);

  const onToggle = (idx: number) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else {
        if (!allowMultipleOpen) next.clear();
        next.add(idx);
      }
      return next;
    });
  };

  return (
    <section
      id={sectionId}
      className={cn(section.className, className)}
      aria-label={ariaLabel}
    >
      <div className={cn(container.className)}>
        {faqSectionHeaderText && (
          <h2 className={cn(heading.className)}>{faqSectionHeaderText}</h2>
        )}
        <div className={cn(grid.className)}>
          {faqData.map((faq, index) => {
            const transitionCls = enableMotion
              ? "transition-all duration-300 ease-in-out"
              : "transition-none";
            const isOpen = openSet.has(index);
            return (
              <div
                key={`${idPrefix}-item-${index}`}
                className={cn("w-full", item.className)}
              >
                <button
                  id={`${idPrefix}-trigger-${index}`}
                  aria-controls={`${idPrefix}-panel-${index}`}
                  aria-expanded={isOpen}
                  onClick={() => onToggle(index)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-md p-4 text-left focus:outline-none",
                    // preset-first ring/border
                    "border-[var(--btn-border)] focus-visible:ring-2 focus-visible:ring-[var(--btn-ring)] focus-visible:ring-offset-2",
                    questionButton.className,
                  )}
                >
                  <span
                    className={cn(
                      "flex-1 font-medium select-none",
                      questionText.className,
                    )}
                  >
                    {faq.question}
                  </span>
                  <span
                    className={cn("ml-3 flex-shrink-0", chevronIcon.className)}
                  >
                    {isOpen
                      ? (openIcon ?? <ChevronUp className="h-5 w-5" />)
                      : (closedIcon ?? <ChevronDown className="h-5 w-5" />)}
                  </span>
                </button>
                <div
                  id={`${idPrefix}-panel-${index}`}
                  role="region"
                  aria-labelledby={`${idPrefix}-trigger-${index}`}
                  className={cn(
                    "border-border overflow-hidden rounded-md border",
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
                    transitionCls,
                    answer.className,
                  )}
                >
                  <div className={cn("p-4", answerText.className)}>
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
