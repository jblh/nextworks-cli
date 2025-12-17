// app/templates/productlaunch/componnets/Contact.tsx

"use client";

import React from "react";
import {
  Contact as SharedContact,
  ContactField,
} from "@nextworks/blocks-sections";

/**
 * A preset Contact component customized for the product launch page,
 * using the shared Contact.tsx with predefined styles and content.
 *
 * Features:
 * - "Get Started with IntelliOpAI" heading with custom typography
 * - Purple-themed styling matching the brand
 * - Custom form fields optimized for product launch
 * - Responsive design with proper spacing
 * - Dark mode support with consistent theming
 * - Clean, modern design with hover effects
 */
const productLaunchContactFormData: ContactField[] = [
  {
    id: "name",
    label: "Your Full Name",
    placeholder: "John Doe",
    required: true,
    type: "text",
  },
  {
    id: "email",
    label: "Email Address",
    placeholder: "you@example.com",
    required: true,
    type: "email",
  },
  {
    id: "company",
    label: "Company Name",
    placeholder: "Your Company",
    required: false,
    type: "text",
  },
  {
    id: "phone",
    label: "Phone Number",
    placeholder: "+1 (555) 123-4567",
    required: false,
    type: "tel",
  },
  {
    id: "message",
    label: "Tell us about your project",
    placeholder: "Describe your business needs and how we can help...",
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
      fields={productLaunchContactFormData}
      contactHeaderText="Get Started with IntelliOpAI"
      contactSubHeaderText="Ready to revolutionize your workflow? Get in touch with our team to learn how our AI solutions can transform your business operations and drive growth."
      // Root and layout
      className="w-full"
      section={{
        className:
          "py-16 px-4 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 dark:from-purple-500 dark:via-purple-600 dark:to-purple-700",
      }}
      container={{
        className: "mx-auto max-w-4xl",
      }}
      // Header slots
      headerWrapper={{ className: "mb-4 text-center" }}
      headerText={{
        className:
          "text-2xl md:text-3xl lg:text-4xl font-bold font-outfit text-white dark:text-white",
      }}
      subheaderText={{
        className:
          "text-base md:text-lg text-white dark:text-gray-200 text-center mb-8 px-4 md:px-14 font-inter leading-relaxed",
      }}
      // Form container
      form={{
        className:
          "bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg border border-purple-200 dark:border-purple-300",
      }}
      // Fields wrapper and field item
      fieldsWrapper={{ className: "space-y-6" }}
      field={{ className: "space-y-2" }}
      // Label + inputs
      label={{
        className:
          "text-gray-700 dark:text-white text-sm font-semibold block font-inter",
      }}
      input={{
        className:
          "w-full p-3 border border-gray-200 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-0 focus:border-transparent transition-all duration-200",
      }}
      textarea={{
        className:
          "w-full p-3 border border-gray-200 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-0 focus:border-transparent resize-vertical min-h-[120px] transition-all duration-200",
      }}
      // Submit button (split: wrapper/style/text)
      submitButtonWrapper={{ className: "pt-2" }}
      submitButtonStyle={{
        variant: "default",
        size: "lg",
        className:
          "w-full font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 border-0 [--btn-bg:theme(colors.purple.600)] hover:[--btn-hover-bg:theme(colors.purple.700)] [--btn-fg:white] hover:[--btn-hover-fg:white] [--btn-border:transparent]",
      }}
      submitButtonText="Start Your AI Journey"
      onSubmit={handleFormSubmit}
      ariaLabel="Get started with IntelliOpAI contact form"
    />
  );
}

// "use client";

// import { Contact as SharedContact } from "@/components/sections/Contact";

// /**
//  * A preset Contact component customized for the product launch page,
//  * using the shared Contact.tsx with predefined styles and content.
//  *
//  * Features:
//  * - "Get Started with IntelliOpAI" heading with custom typography
//  * - Purple-themed styling matching the brand
//  * - Custom form fields optimized for product launch
//  * - Responsive design with proper spacing
//  * - Dark mode support with consistent theming
//  * - Clean, modern design with hover effects
//  */
// export function Contact() {
//   return (
//     <SharedContact
//       contactHeaderText="Get Started with IntelliOpAI"
//       contactSubHeaderText="Ready to revolutionize your workflow? Get in touch with our team to learn how our AI solutions can transform your business operations and drive growth."
//       fields={[
//         {
//           id: "name",
//           label: "Your Full Name",
//           placeholder: "John Doe",
//           required: true,
//           type: "text",
//         },
//         {
//           id: "email",
//           label: "Email Address",
//           placeholder: "you@example.com",
//           required: true,
//           type: "email",
//         },
//         {
//           id: "company",
//           label: "Company Name",
//           placeholder: "Your Company",
//           required: false,
//           type: "text",
//         },
//         {
//           id: "phone",
//           label: "Phone Number",
//           placeholder: "+1 (555) 123-4567",
//           required: false,
//           type: "tel",
//         },
//         {
//           id: "message",
//           label: "Tell us about your project",
//           placeholder: "Describe your business needs and how we can help...",
//           required: true,
//           type: "textarea",
//         },
//       ]}
//       section={{
//         className:
//           "py-16 px-4 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 dark:from-purple-500 dark:via-purple-600 dark:to-purple-700",
//       }}
//       container={{
//         className: "max-w-4xl mx-auto",
//       }}
//       header={{
//         className:
//           "text-2xl md:text-3xl lg:text-4xl font-bold text-white dark:text-white text-center mb-4 font-outfit",
//       }}
//       subheader={{
//         className:
//           "text-base md:text-lg text-white dark:text-gray-200 text-center mb-8 px-4 md:px-14 font-inter leading-relaxed",
//       }}
//       form={{
//         className:
//           "bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg border border-purple-200 dark:border-purple-300",
//       }}
//       field={{
//         className: "mb-6",
//       }}
//       label={{
//         className:
//           "text-gray-700 dark:text-white text-sm font-semibold mb-2 block font-inter",
//       }}
//       input={{
//         className:
//           "w-full p-3 border border-gray-200 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200",
//       }}
//       textarea={{
//         className:
//           "w-full p-3 border border-gray-200 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-vertical min-h-[120px] transition-all duration-200",
//       }}
//       submitButton={{
//         text: "Start Your AI Journey",
//         variant: "default",
//         size: "lg",
//         className:
//           "w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 border-0",
//       }}
//       ariaLabel="Get started with IntelliOpAI contact form"
//     />
//   );
// }
