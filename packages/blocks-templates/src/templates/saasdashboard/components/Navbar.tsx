"use client";

import type { ComponentProps } from "react";
import { Navbar as SharedNavbar } from "@nextworks/blocks-sections";

/**
 * SaaS Dashboard preset Navbar
 *
 * - DashFlow branding with blue/purple gradient logo square (brandNode)
 * - Inter font for brand and links
 * - No CTA button (ctaButton = null)
 * - Blue hover states for links and theme toggle
 * - Glassy background with backdrop blur (light/dark)
 *
 * This preset exposes the Shared Navbar API so devs can override any prop/slot:
 *
 * Example:
 * <Navbar
 *   brand="My SaaS"
 *   links={{ className: "hover:text-emerald-600" }}
 *   container={{ className: "max-w-6xl mx-auto" }}
 * />
 */
type SharedNavbarProps = ComponentProps<typeof SharedNavbar>;
type PresetOverrides = Partial<SharedNavbarProps>;

const defaultProps: SharedNavbarProps = {
  brand: "DashFlow",
  // Preserve custom gradient logo block
  brandNode: (
    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-blue-600 to-purple-600 font-bold text-white shadow-sm ring-1 ring-white/40">
      DF
    </div>
  ),
  menuItems: [
    { label: "Home", href: "#home" },
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" },
  ],
  ctaButton: null,
  showColorModeToggle: true,
  navHeight: "h-16",
  sticky: true,
  ariaLabel: "DashFlow main navigation",
  // Allow layout constraints to be added at page-level
  className: "",

  // Style slots tuned for the blue SaaS theme
  nav: {
    className:
      "bg-white/60 dark:bg-gray-900/60 backdrop-blur supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:dark:bg-gray-900/60 text-gray-800 dark:text-white " +
      // Accent variables for this preset (read by toggle, links, mobile links)
      "[--navbar-accent:theme(colors.blue.700)] dark:[--navbar-accent:theme(colors.blue.400)] " +
      "[--navbar-toggle-bg:theme(colors.white)] dark:[--navbar-toggle-bg:theme(colors.gray.900)] " +
      "[--navbar-hover-bg:theme(colors.blue.50)] dark:[--navbar-hover-bg:color-mix(in oklab,oklch(0.23 0.05 264) 20%, transparent)] " +
      "[--navbar-ring:theme(colors.blue.500)] dark:[--navbar-ring:theme(colors.blue.400)] " +
      "[--navbar-border:theme(colors.gray.200)] dark:[--navbar-border:theme(colors.gray.800)]",
  },
  brandText: {
    className: "text-xl font-bold font-inter text-blue-700 dark:text-blue-500",
  },
  links: {
    className:
      "text-sm font-medium font-inter text-gray-800 dark:text-white hover:text-blue-700 dark:hover:text-blue-400 " +
      "focus:ring-[var(--navbar-ring)]",
  },
  // Preset keeps CTA hidden; if enabled, provide subtle interactive defaults
  ctaButtonStyle: {
    variant: "default",
    size: "default",
    className:
      "shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5",
  },
  // Additional slots that weren't styled before, now aligned to the theme
  mobileMenu: {
    className: "border-t border-gray-200/80 dark:border-gray-800/80",
  },
  container: {
    className: "max-w-7xl mx-auto",
  },
  brandWrapper: {
    className: "",
  },
  desktopMenu: {
    className: "hidden items-center space-x-1 md:flex lg:space-x-6",
  },
  toggleButton: {
    className:
      "md:hidden flex items-center justify-center rounded-md p-2 transition-colors " +
      "hover:bg-blue-50 dark:hover:bg-blue-900/20 " +
      "focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400",
  },
  colorModeWrapper: {
    className: "ml-2",
  },
  // With variables above, ThemeToggle can rely on them; explicit override optional
  // themeToggle: { ... }
  ctaButtonWrapper: {
    className: "ml-2",
  },
  mobileMenuInner: {
    className: "space-y-2 px-4 pt-2 pb-4",
  },
  // Mobile links will read --navbar-hover-bg; explicit class optional
  mobileLinks: {
    className: "hover:bg-[var(--navbar-hover-bg)]",
  },
};

export function Navbar(overrides: PresetOverrides = {}) {
  // Shallow-merge: passing a style-slot object (e.g., links, nav, etc.)
  // replaces the default for that slot. Keeps the API simple and predictable.
  const props: SharedNavbarProps = {
    ...defaultProps,
    ...overrides,
  };
  return <SharedNavbar {...props} />;
}

// "use client";

// import { Navbar as SharedNavbar } from "@/components/sections/Navbar";

// export function Navbar() {
//   return (
//     <SharedNavbar
//       brand="DashFlow"
//       brandNode={
//         <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-blue-600 to-purple-600 font-bold text-white shadow-sm ring-1 ring-white/40">
//           DF
//         </div>
//       }
//       menuItems={[
//         { label: "Home", href: "#home" },
//         { label: "Features", href: "#features" },
//         { label: "Pricing", href: "#pricing" },
//         { label: "Contact", href: "#contact" },
//       ]}
//       ctaButton={null}
//       showColorModeToggle={true}
//       navHeight="h-16"
//       sticky={true}
//       ariaLabel="DashFlow main navigation"
//       nav={{
//         className:
//           "bg-white/60 dark:bg-gray-900/60 backdrop-blur supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:dark:bg-gray-900/60 text-gray-800 dark:text-white",
//       }}
//       brandText={{
//         className:
//           "text-xl font-bold font-inter text-blue-700 dark:text-blue-500",
//       }}
//       links={{
//         className:
//           "text-sm font-medium font-inter text-gray-800 dark:text-white hover:text-blue-700 dark:hover:text-blue-400",
//       }}
//     />
//   );
// }
