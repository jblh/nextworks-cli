// app/templates/digitalagency/componets/Contact.tsx

"use client";

import React from "react";
import {
  Contact as SharedContact,
  ContactField,
} from "@nextworks/blocks-sections";

const agencyContactFormData: ContactField[] = [
  {
    id: "name",
    label: "Your Full Name",
    placeholder: "John Smith",
    required: true,
    type: "text",
  },
  {
    id: "email",
    label: "Email Address",
    placeholder: "john@yourcompany.com",
    required: true,
    type: "email",
  },
  {
    id: "phone",
    label: "Phone Number",
    placeholder: "+1 (555) 123-4567",
    required: false,
    type: "tel",
  },
  {
    id: "company",
    label: "Company Name",
    placeholder: "Your Company LLC",
    required: false,
    type: "text",
  },
  {
    id: "projectType",
    label: "Service Interested In",
    placeholder: "e.g. Web Design, SEO, E-commerce, Branding",
    required: false,
    type: "text",
  },
  {
    id: "budget",
    label: "Project Budget (Optional)",
    placeholder: "e.g. $3,000 - $6,000",
    required: false,
    type: "text",
  },
  {
    id: "message",
    label: "Project Details",
    placeholder:
      "Tell us about your project goals, timeline, and any specific requirements...",
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
      fields={agencyContactFormData}
      contactHeaderText="Let’s Talk Strategy"
      contactSubHeaderText="We’re here to help you grow — tell us how!"
      // Root and layout
      className="w-full"
      section={{ className: "py-16 px-4 bg-fuchsia-600 dark:bg-fuchsia-600" }}
      container={{ className: "mx-auto max-w-4xl" }}
      // Header slots (new)
      headerWrapper={{ className: "mb-8 text-center" }}
      headerText={{
        className:
          "text-4xl md:text-5xl font-bold font-poppins text-white tracking-tight",
      }}
      subheaderText={{
        className:
          "mt-3 text-lg md:text-xl font-inter text-white/90 px-4 md:px-14",
      }}
      // Form container
      form={{
        className:
          "bg-card p-8 rounded-lg shadow-md border border-border bg-[var(--card-bg)] text-[var(--card-fg)] border-[var(--card-border)]",
      }}
      // Fields wrapper and field item (new)
      fieldsWrapper={{ className: "space-y-4" }}
      field={{ className: "space-y-2" }}
      // Label + inputs (new)
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
      // Submit button (new split between wrapper/style/text)
      submitButtonWrapper={{ className: "pt-2" }}
      submitButtonStyle={{
        variant: "default",
        size: "lg",
        className:
          "w-full bg-fuchsia-700 hover:bg-fuchsia-800 text-white font-poppins font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5",
      }}
      submitButtonText="Schedule Free Consultation"
      onSubmit={handleFormSubmit}
      ariaLabel="Agency contact section"
    />
  );
}

// "use client";

// import React from "react";
// import {
//   Contact as SharedContact,
//   ContactField,
// } from "@/components/sections/Contact";

// const agencyContactFormData: ContactField[] = [
//   {
//     id: "name",
//     label: "Your Full Name",
//     placeholder: "John Smith",
//     required: true,
//     type: "text",
//   },
//   {
//     id: "email",
//     label: "Email Address",
//     placeholder: "john@yourcompany.com",
//     required: true,
//     type: "email",
//   },
//   {
//     id: "phone",
//     label: "Phone Number",
//     placeholder: "+1 (555) 123-4567",
//     required: false,
//     type: "tel",
//   },
//   {
//     id: "company",
//     label: "Company Name",
//     placeholder: "Your Company LLC",
//     required: false,
//     type: "text",
//   },
//   {
//     id: "projectType",
//     label: "Service Interested In",
//     placeholder: "e.g. Web Design, SEO, E-commerce, Branding",
//     required: false,
//     type: "text",
//   },
//   {
//     id: "budget",
//     label: "Project Budget (Optional)",
//     placeholder: "e.g. $3,000 - $6,000",
//     required: false,
//     type: "text",
//   },
//   {
//     id: "message",
//     label: "Project Details",
//     placeholder:
//       "Tell us about your project goals, timeline, and any specific requirements...",
//     required: true,
//     type: "textarea",
//   },
// ];

// export function Contact() {
//   const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const data = Object.fromEntries(new FormData(e.currentTarget).entries());
//     console.log("Contact form submitted:", data);
//   };

//   return (
//     <section id="contact">
//       <SharedContact
//         fields={agencyContactFormData}
//         contactHeaderText="Let’s Talk Strategy"
//         contactSubHeaderText="We’re here to help you grow — tell us how!"
//         section={{ className: "py-16 px-4 bg-fuchsia-600 dark:bg-fuchsia-600" }}
//         container={{ className: "max-w-4xl mx-auto" }}
//         header={{
//           className:
//             "text-4xl md:text-5xl font-bold text-white text-center mb-4",
//         }}
//         subheader={{
//           className:
//             "text-xl md:text-2xl font-inter text-white text-center mb-8 px-6",
//         }}
//         form={{
//           className: "bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md",
//         }}
//         submitButton={{
//           text: "Schedule Free Consultation",
//           variant: "default",
//           size: "lg",
//           className:
//             "w-full bg-fuchsia-700 hover:bg-fuchsia-800 text-white font-poppins font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5",
//         }}
//         onSubmit={handleFormSubmit}
//       />
//     </section>
//   );
// }

// export default Contact;
