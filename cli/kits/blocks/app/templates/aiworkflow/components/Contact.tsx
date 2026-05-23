"use client";

import React from "react";
import {
  Contact as SharedContact,
  ContactField,
} from "@/components/sections/Contact";

const contactFields: ContactField[] = [
  {
    id: "name",
    label: "Full name",
    placeholder: "Avery Chen",
    required: true,
    type: "text",
  },
  {
    id: "email",
    label: "Work email",
    placeholder: "avery@company.com",
    required: true,
    type: "email",
  },
  {
    id: "company",
    label: "Company",
    placeholder: "Northstar Labs",
    required: true,
    type: "text",
  },
  {
    id: "workflow",
    label: "Workflow to automate",
    placeholder: "Bug fixes, refactors, releases, or repo cleanup…",
    required: true,
    type: "text",
  },
  {
    id: "message",
    label: "What should the workflow coordinate?",
    placeholder:
      "Tell us which files, checks, or handoffs are slowing the team down.",
    required: true,
    type: "textarea",
  },
];

export function Contact() {
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
  };

  return (
    <SharedContact
      id="contact"
      ariaLabel="AI coding agent contact section"
      fields={contactFields}
      contactHeaderText="Bring your messiest codebase issue."
      contactSubHeaderText="We’ll map the reads, edits, checks, and reviews the agent should handle first."
      className="w-full"
      section={{
        className:
          "bg-[linear-gradient(180deg,#eef3f8_0%,#f6f8fb_48%,#eef3f8_100%)] px-6 py-16 dark:bg-[linear-gradient(180deg,#171717_0%,#121212_18%,#1d1d1d_46%,#131313_76%,#1b1b1b_100%)]",
      }}
      container={{ className: "mx-auto max-w-4xl" }}
      headerWrapper={{ className: "mb-8 text-center" }}
      headerText={{
        className:
          "font-outfit text-3xl font-semibold text-[var(--heading-fg)] md:text-4xl",
      }}
      subheaderText={{
        className:
          "mx-auto mt-3 max-w-2xl font-inter text-base leading-7 text-[var(--subheading-fg)]",
      }}
      form={{
        className:
          "rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 shadow-[var(--card-shadow)] md:p-8",
      }}
      fieldsWrapper={{ className: "space-y-5" }}
      field={{ className: "space-y-2" }}
      label={{
        className:
          "block font-inter text-sm font-medium text-[var(--card-title-fg)]",
      }}
      input={{
        className:
          "w-full rounded-md border-[var(--input-border)] bg-[var(--input-bg)] p-3 font-inter text-[var(--input-fg)] placeholder:text-[var(--input-placeholder)] focus-visible:ring-2 focus-visible:ring-[var(--input-focus-ring)] focus-visible:ring-offset-[var(--input-ring-offset)]",
      }}
      textarea={{
        className:
          "min-h-[130px] w-full resize-vertical rounded-md border-[var(--input-border)] bg-[var(--input-bg)] p-3 font-inter text-[var(--input-fg)] placeholder:text-[var(--input-placeholder)] focus-visible:ring-2 focus-visible:ring-[var(--input-focus-ring)] focus-visible:ring-offset-[var(--input-ring-offset)]",
      }}
      submitButtonWrapper={{ className: "pt-2" }}
      submitButtonStyle={{
        variant: "default",
        size: "lg",
        className:
          "w-full font-inter font-semibold [--btn-bg:theme(colors.slate.950)] [--btn-fg:theme(colors.white)] [--btn-border:transparent] hover:[--btn-hover-bg:theme(colors.slate.800)] hover:[--btn-hover-fg:theme(colors.white)] dark:[--btn-bg:theme(colors.white)] dark:[--btn-fg:theme(colors.slate.950)] dark:hover:[--btn-hover-bg:theme(colors.slate.100)] dark:hover:[--btn-hover-fg:theme(colors.slate.950)]",
      }}
      submitButtonText="Book an agent demo"
      onSubmit={handleFormSubmit}
    />
  );
}
