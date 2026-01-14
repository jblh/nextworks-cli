// app/templates/productlaunch/components/Navbar.tsx

"use client";

import type { ComponentProps } from "react";
import { Navbar as SharedNavbar } from "@/components/sections/Navbar";

/**
 * Product Launch preset Navbar
 *
 * - IntelliOpAI branding with purple color scheme
 * - Custom font families (Outfit for brand, Inter for links)
 * - No CTA button (ctaButton = null)
 * - Purple hover states for links and theme toggle
 * - Clean white background with dark mode support
 *
 * This preset exposes the Shared Navbar API so devs can override any prop/slot:
 *
 * Example:
 * <Navbar
 *   brand="My Brand"
 *   links={{ className: "hover:text-emerald-600" }}
 *   container={{ className: "max-w-6xl mx-auto" }}
 * />
 */
type SharedNavbarProps = ComponentProps<typeof SharedNavbar>;
type PresetOverrides = Partial<SharedNavbarProps>;

const defaultProps: SharedNavbarProps = {
  brand: "IntelliOpAI",
  menuItems: [
    { label: "Home", href: "#home" },
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],
  ctaButton: null,
  showColorModeToggle: true,
  navHeight: "h-16",
  sticky: true,
  ariaLabel: "IntelliOpAI main navigation",
  // Top-level className is left empty so page-level overrides can add layout constraints if needed.
  className: "",
  // Style slots tuned for the purple theme
  nav: {
    className:
      "bg-white dark:bg-gray-900 text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-800 " +
      // Accent variables for this preset (read by toggle, links, mobile links)
      "[--navbar-accent:theme(colors.purple.600)] dark:[--navbar-accent:theme(colors.purple.400)] " +
      "[--navbar-toggle-bg:theme(colors.white)] dark:[--navbar-toggle-bg:theme(colors.gray.900)] " +
      "[--navbar-hover-bg:theme(colors.purple.50)] dark:[--navbar-hover-bg:color-mix(in oklab,oklch(0.17 0.05 324) 20%, transparent)] " +
      "[--navbar-ring:theme(colors.purple.500)] dark:[--navbar-ring:theme(colors.purple.400)] " +
      "[--navbar-border:theme(colors.gray.200)] dark:[--navbar-border:theme(colors.gray.800)]",
  },
  brandText: {
    className:
      "text-xl md:text-2xl font-bold font-outfit text-purple-700 dark:text-purple-500",
  },
  links: {
    className:
      "text-sm font-medium font-inter text-gray-800 dark:text-white hover:text-purple-700 dark:hover:text-purple-500 " +
      "focus:ring-[var(--navbar-ring)]",
  },
  // Preset keeps CTA hidden; if you enable it, these defaults give a subtle lift effect
  ctaButtonStyle: {
    variant: "default",
    size: "default",
    className:
      "shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5",
  },
  mobileMenu: {
    className: "border-t border-gray-200 dark:border-gray-800",
  },
  container: {
    className: "max-w-7xl mx-auto",
  },
  brandWrapper: {
    className: "", // base layout is provided by SharedNavbar; override here if needed
  },
  desktopMenu: {
    className: "hidden items-center space-x-1 md:flex lg:space-x-6",
  },
  toggleButton: {
    className:
      "md:hidden flex items-center justify-center rounded-md p-2 transition-colors " +
      "hover:bg-purple-50 dark:hover:bg-purple-900/20 " +
      "focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400",
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
  // replaces the default for that slot. This keeps the API simple and predictable.
  const props: SharedNavbarProps = {
    ...defaultProps,
    ...overrides,
  };

  return <SharedNavbar {...props} />;
}

// "use client";

// import { Navbar as SharedNavbar } from "@/components/sections/Navbar";

// /**
//  * A preset Navbar component customized for the product launch page,
//  * using the shared Navbar.tsx with predefined styles and content.
//  *
//  * Features:
//  * - IntelliOpAI branding with purple color scheme
//  * - Custom font families (Outfit for brand, Inter for links)
//  * - No CTA button as specified in original preset
//  * - Purple hover states for links and theme toggle
//  * - Clean white background with dark mode support
//  */
// export function Navbar() {
//   return (
//     <SharedNavbar
//       brand="IntelliOpAI"
//       menuItems={[
//         { label: "Home", href: "#home" },
//         { label: "Features", href: "#features" },
//         { label: "Pricing", href: "#pricing" },
//         { label: "FAQ", href: "#faq" },
//         { label: "Contact", href: "#contact" },
//       ]}
//       ctaButton={null}
//       showColorModeToggle={true}
//       navHeight="h-16"
//       sticky={true}
//       ariaLabel="IntelliOpAI main navigation"
//       nav={{
//         className: "bg-white dark:bg-gray-900 text-gray-800 dark:text-white",
//       }}
//       brandText={{
//         className:
//           "text-xl md:text-2xl font-bold font-outfit text-purple-700 dark:text-purple-500",
//       }}
//       links={{
//         className:
//           "text-sm font-medium font-inter text-gray-800 dark:text-white hover:text-purple-700 dark:hover:text-purple-500",
//       }}
//     />
//   );
// }
