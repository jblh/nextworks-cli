"use client";

import { Footer as SharedFooter } from "@nextworks/blocks-sections";
import { cn } from "@nextworks/blocks-core";

const defaultNavLinks = [
  {
    heading: "Product",
    links: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "Documentation", href: "#documentation" },
      { name: "FAQ", href: "#faq" },
    ],
  },
  {
    heading: "Company",
    links: [
      { name: "About", href: "#about" },
      { name: "Careers", href: "#careers" },
      { name: "Blog", href: "#blog" },
      { name: "Contact", href: "#contact" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { name: "Help Center", href: "#help" },
      { name: "Terms of Service", href: "#terms" },
      { name: "Privacy Policy", href: "#privacy" },
      { name: "Status", href: "#status" },
    ],
  },
];

export function Footer() {
  return (
    <SharedFooter
      footerBrandName="Dash Flow"
      footerNavLinks={defaultNavLinks}
      className={cn("w-full")}
      section={{
        className:
          "w-full bg-blue-50 dark:bg-gray-900 text-gray-800 dark:text-white",
      }}
      container={{ className: "max-w-7xl mx-auto px-6" }}
      brand={{
        className:
          "text-xl font-bold text-blue-600 dark:text-blue-400 font-outfit",
      }}
      brandWrapper={{
        className: "flex flex-col items-start text-left lg:pr-8",
      }}
      navSection={{
        className:
          "flex flex-col lg:flex-row items-start lg:items-start justify-center gap-8 lg:gap-12 pt-6.5 pb-8",
      }}
      navGroup={{ className: "flex flex-col items-start text-left pt-1.5" }}
      navHeading={{
        className:
          "font-semibold text-gray-800 dark:text-white mb-3 text-xs uppercase tracking-wider font-inter",
      }}
      navLink={{
        className:
          "text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 text-xs mb-2 block font-inter",
      }}
      socialSection={{
        className: "flex items-center justify-center gap-4 py-4",
      }}
      copyright={{
        className:
          "text-center text-xs text-gray-500 dark:text-gray-400 py-4 border-t border-gray-200 dark:border-gray-700 font-inter",
      }}
      ariaLabel="Footer section"
    />
  );
}
