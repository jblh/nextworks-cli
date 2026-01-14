"use client";

import React from "react";
import {
  Contact as SharedContact,
  ContactField,
} from "@nextworks/blocks-sections";

const saasContactFormData: ContactField[] = [
  {
    id: "name",
    label: "Full Name",
    placeholder: "Jane Doe",
    required: true,
    type: "text",
  },
  {
    id: "email",
    label: "Work Email",
    placeholder: "jane@company.com",
    required: true,
    type: "email",
  },
  {
    id: "company",
    label: "Company",
    placeholder: "Acme Inc.",
    required: false,
    type: "text",
  },
  {
    id: "teamSize",
    label: "Team Size",
    placeholder: "e.g. 10–50",
    required: false,
    type: "text",
  },
  {
    id: "useCase",
    label: "Primary Use Case",
    placeholder: "e.g. Product analytics, Ops dashboards",
    required: false,
    type: "text",
  },
  {
    id: "message",
    label: "What would you like to see in the demo?",
    placeholder: "Share goals, data sources, timeline…",
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
    <div className="relative">
      {/* Gradient mesh overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(60rem_60rem_at_0%_0%,rgba(59,130,246,0.08),transparent_40%),radial-gradient(50rem_50rem_at_100%_100%,rgba(168,85,247,0.06),transparent_40%)] opacity-20"
      />
      {/* Fine noise/dots texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:14px_14px] opacity-[0.05]"
      />

      <SharedContact
        id="contact"
        ariaLabel="SaaS dashboard contact section"
        fields={saasContactFormData}
        contactHeaderText="Ready to See DashFlow in Action?"
        contactSubHeaderText="Tell us a bit about your team and we'll reach out with a tailored demo."
        // Root and section
        className="w-full"
        section={{
          className:
            "py-16 px-6 bg-gradient-to-b from-slate-900/95 via-slate-950 to-slate-900/95 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950",
        }}
        container={{ className: "mx-auto max-w-4xl" }}
        // Header slots
        headerWrapper={{ className: "mb-10 text-center" }}
        headerText={{
          className: "text-3xl font-bold font-inter text-white",
        }}
        subheaderText={{
          className:
            "mt-3 text-base text-white/90 max-w-2xl mx-auto font-inter",
        }}
        // Form container
        form={{
          className:
            "bg-card p-8 rounded-xl shadow-xl border border-border bg-[var(--card-bg)] text-[var(--card-fg)] border-[var(--card-border)]",
        }}
        // Fields and inputs
        fieldsWrapper={{ className: "space-y-4" }}
        field={{ className: "space-y-2" }}
        label={{
          className:
            "text-card-foreground text-sm font-medium font-poppins block",
        }}
        input={{
          className:
            "w-full p-3 rounded-md font-inter border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--input-fg)] placeholder:text-[var(--input-placeholder)] focus-visible:ring-2 focus-visible:ring-[var(--input-focus-ring)] focus-visible:ring-offset-[var(--input-ring-offset)]",
        }}
        textarea={{
          className:
            "w-full p-3 rounded-md resize-vertical min-h-[120px] font-inter border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--input-fg)] placeholder:text-[var(--input-placeholder)] focus-visible:ring-2 focus-visible:ring-[var(--input-focus-ring)] focus-visible:ring-offset-[var(--input-ring-offset)]",
        }}
        // Submit button (wrapper/style/text split)
        submitButtonWrapper={{ className: "pt-2" }}
        submitButtonStyle={{
          variant: "default",
          size: "lg",
          className:
            "w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-400 text-white font-semibold font-inter shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5",
        }}
        submitButtonText="Send Request"
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}

// "use client";

// import { Contact as SharedContact } from "@/components/sections/Contact";

// export function Contact() {
//   return (
//     <div className="relative">
//       {/* Gradient mesh overlay */}
//       <div
//         aria-hidden
//         className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(60rem_60rem_at_0%_0%,rgba(59,130,246,0.08),transparent_40%),radial-gradient(50rem_50rem_at_100%_100%,rgba(168,85,247,0.06),transparent_40%)] opacity-20"
//       />
//       {/* Fine noise/dots texture */}
//       <div
//         aria-hidden
//         className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:14px_14px] opacity-[0.05]"
//       />
//       <SharedContact
//         contactHeaderText="Ready to See DashFlow in Action?"
//         contactSubHeaderText="Tell us a bit about your team and we'll reach out with a tailored demo."
//         section={{
//           className:
//             "py-16 px-6 bg-gradient-to-b from-slate-900/95 via-slate-950 to-slate-900/95 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950",
//         }}
//         header={{
//           className:
//             "text-3xl font-bold font-inter text-white text-center mb-4",
//         }}
//         subheader={{
//           className:
//             "text-base text-white/90 text-center mb-10 max-w-2xl mx-auto font-inter",
//         }}
//         form={{
//           className: "bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl",
//         }}
//         submitButton={{
//           text: "Send Request",
//           variant: "default",
//           size: "lg",
//           className:
//             "w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold font-inter shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5",
//         }}
//       />
//     </div>
//   );
// }
