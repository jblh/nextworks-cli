"use client";

import React from "react";
import { Footer as SharedFooter } from "@nextworks/blocks-sections";
import type { NavLinkGroup } from "@nextworks/blocks-sections";

const agencyNavLinks: NavLinkGroup[] = [
  {
    heading: "Services",
    links: [
      { name: "Web Design & Development", href: "#services" },
      { name: "SEO & Digital Marketing", href: "#services" },
      { name: "E-commerce Solutions", href: "#services" },
      { name: "Brand Identity & Design", href: "#services" },
    ],
  },
  {
    heading: "Company",
    links: [
      { name: "About Us", href: "#about" },
      { name: "Our Work", href: "#portfolio" },
      { name: "Process", href: "#process" },
      { name: "Contact", href: "#contact" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { name: "Free Consultation", href: "#contact" },
      { name: "Case Studies", href: "#portfolio" },
      { name: "Get Quote", href: "#pricing" },
      { name: "Privacy Policy", href: "#privacy" },
    ],
  },
];

/**
 * Upgraded preset Footer for the Digital Agency template
 * - Uses the shared Footer slot API
 * - Keeps brand distinct, flush-left; aligns top with nav headers
 */
export function Footer() {
  return (
    <SharedFooter
      footerBrandName="Nexus Digital"
      footerNavLinks={agencyNavLinks}
      ariaLabel="Footer section"
      section={{
        className:
          "w-full bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white",
      }}
      container={{ className: "max-w-7xl mx-auto px-6" }}
      brand={{
        className:
          "text-2xl font-bold font-poppins text-fuchsia-600 dark:text-fuchsia-400",
      }}
      brandWrapper={{
        className: "flex flex-col items-start text-left lg:pr-8",
      }}
      navSection={{
        className:
          "flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-12 pt-6.5 pb-8",
      }}
      navGroup={{ className: "flex flex-col items-start text-left pt-1.5" }}
      navHeading={{
        className:
          "font-bold font-poppins text-gray-800 dark:text-white mb-3 text-sm uppercase tracking-wider",
      }}
      navLink={{
        className:
          "text-gray-600 dark:text-gray-400 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors duration-200 text-sm mb-2 block font-inter",
      }}
      socialSection={{
        className: "flex items-center justify-center gap-4 py-4",
      }}
      socialLink={{
        className:
          "text-gray-600 dark:text-gray-400 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors duration-200 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800",
      }}
      socialIcon={{ className: "h-5 w-5" }}
      copyright={{
        className:
          "text-center text-xs text-gray-600 dark:text-gray-400 py-4 border-t border-gray-200 dark:border-gray-800 font-inter",
      }}
    />
  );
}
