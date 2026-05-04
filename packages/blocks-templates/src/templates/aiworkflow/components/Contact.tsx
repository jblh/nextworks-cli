"use client";

import React from "react";
import {
  Contact as SharedContact,
  ContactField,
} from "@nextworks/blocks-sections";

const contactFields: ContactField[] = [
  {
    id: "name",
    label: "Full name",
    placeholder: "Jordan Lee",
    required: true,
    type: "text",
  },
  {
    id: "email",
    label: "Work email",
    placeholder: "jordan@company.com",
    required: true,
    type: "email",
  },
  {
    id: "company",
    label: "Company",
    placeholder: "Acme Inc.",
    required: true,
    type: "text",
  },
  {
    id: "workflow",
    label: "Workflow to automate",
    placeholder: "Approvals, onboarding, launches, support escalations…",
    required: true,
    type: "text",
  },
  {
    id: "message",
    label: "What should the workflow coordinate?",
    placeholder:
      "Tell us which systems, approvals, or handoffs are slowing the team down.",
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
      ariaLabel="AI workflow contact section"
      fields={contactFields}
      contactHeaderText="Bring your messiest workflow."
      contactSubHeaderText="We’ll map the approvals, systems, and execution steps that AI can automate first."
      className="w-full"
      section={{
        className:
          "bg-[linear-gradient(180deg,rgba(241,245,249,1)_0%,rgba(224,242,254,0.55)_100%)] px-6 py-16 dark:bg-[linear-gradient(180deg,rgba(2,6,23,1)_0%,rgba(8,47,73,0.45)_100%)]",
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
          "w-full font-inter font-semibold [--btn-bg:theme(colors.cyan.500)] [--btn-fg:theme(colors.slate.950)] [--btn-border:transparent] hover:[--btn-hover-bg:theme(colors.cyan.400)] hover:[--btn-hover-fg:theme(colors.slate.950)]",
      }}
      submitButtonText="Request a demo"
      onSubmit={handleFormSubmit}
    />
  );
}
