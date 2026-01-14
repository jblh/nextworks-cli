"use client";

import type { ComponentProps } from "react";
import { Navbar as SharedNavbar } from "@/components/sections/Navbar";
import { BrandNodeGradientRing } from "@/components/ui/brand-node";

/**
 * Digital Agency preset Navbar (Nexus Digital)
 *
 * - Preserves original branding, colors, and blur effect
 * - No CTA button (ctaButton = null)
 * - Fuchsia hover/focus accents for links and toggles
 * - Exposes the full Shared Navbar API via shallow-merge overrides
 *
 * Example overrides:
 * <Navbar
 *   links={{ className: "hover:text-emerald-600" }}
 *   container={{ className: "max-w-6xl mx-auto" }}
 * />
 */
type SharedNavbarProps = ComponentProps<typeof SharedNavbar>;
type PresetOverrides = Partial<SharedNavbarProps>;

const defaultProps: SharedNavbarProps = {
  brand: "Nexus Digital",
  brandNode: (
    <BrandNodeGradientRing gradient="conic-gradient(#7c3aed, #ec4899, #7c3aed)" />
  ),
  menuItems: [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" },
  ],
  ctaButton: null,
  showColorModeToggle: true,
  navHeight: "h-16",
  sticky: true,
  ariaLabel: "Nexus Digital main navigation",

  // Allow page-level layout overrides if needed
  className: "",

  // Style slots (preserve original look; add defaults for new slots)
  nav: {
    className:
      "bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 " +
      "text-gray-800 dark:text-white " +
      // Accent variables for this preset (read by toggle, links, mobile links)
      "[--navbar-accent:theme(colors.fuchsia.600)] dark:[--navbar-accent:theme(colors.fuchsia.400)] " +
      "[--navbar-toggle-bg:theme(colors.white)] dark:[--navbar-toggle-bg:theme(colors.gray.900)] " +
      "[--navbar-hover-bg:theme(colors.fuchsia.50)] dark:[--navbar-hover-bg:color-mix(in oklab,oklch(0.24 0.07 330) 20%, transparent)] " +
      "[--navbar-ring:theme(colors.fuchsia.500)] dark:[--navbar-ring:theme(colors.fuchsia.400)] " +
      "[--navbar-border:theme(colors.gray.200)] dark:[--navbar-border:theme(colors.gray.800)]",
  },
  brandText: {
    className:
      "text-2xl font-bold font-poppins text-fuchsia-600 dark:text-fuchsia-400",
  },
  links: {
    className:
      "text-sm font-inter font-medium text-gray-700 dark:text-gray-200 " +
      "hover:text-fuchsia-600 dark:hover:text-fuchsia-400 " +
      "focus:ring-[var(--navbar-ring)]",
  },

  // CTA hidden by default; styled to match theme if enabled later
  ctaButtonStyle: {
    variant: "default",
    size: "default",
    className:
      "shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 " +
      "bg-fuchsia-600 text-white hover:bg-fuchsia-700 " +
      "dark:bg-fuchsia-500 dark:hover:bg-fuchsia-400",
  },

  mobileMenu: {
    className: "border-t border-gray-200 dark:border-gray-800",
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
      "hover:bg-fuchsia-50 dark:hover:bg-fuchsia-900/20 " +
      "focus:outline-none focus:ring-2 focus:ring-fuchsia-500 dark:focus:ring-fuchsia-400",
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
  // Shallow-merge: providing a slot object replaces that slot entirely.
  const props: SharedNavbarProps = {
    ...defaultProps,
    ...overrides,
  };
  return <SharedNavbar {...props} />;
}

// "use client";

// import React from "react";
// import { Navbar as SharedNavbar } from "@/components/sections/Navbar";
// import { BrandNodeGradientRing } from "@/components/ui/brand-node";

// export function Navbar() {
//   return (
//     <SharedNavbar
//       brand="Nexus Digital"
//       brandNode={
//         <BrandNodeGradientRing gradient="conic-gradient(#7c3aed, #ec4899, #7c3aed)" />
//       }
//       // brandNode={
//       //   <div className="grid h-8 w-8 place-items-center rounded-md bg-gradient-to-br from-blue-600 to-purple-600 text-xs font-extrabold text-white shadow-sm">
//       //     ND
//       //   </div>
//       // }
//       menuItems={[
//         { label: "Home", href: "#home" },
//         { label: "Services", href: "#services" },
//         { label: "Portfolio", href: "#portfolio" },
//         { label: "Pricing", href: "#pricing" },
//         { label: "Contact", href: "#contact" },
//       ]}
//       ctaButton={null}
//       showColorModeToggle={true}
//       nav={{
//         className:
//           "bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 text-gray-800 dark:text-white",
//       }}
//       brandText={{
//         className:
//           "text-2xl font-bold font-poppins text-fuchsia-600 dark:text-fuchsia-400",
//       }}
//       links={{
//         className:
//           "text-sm font-inter font-medium text-gray-700 dark:text-gray-200 hover:text-fuchsia-600 dark:hover:text-fuchsia-400",
//       }}
//       mobileMenu={{
//         className: "border-t border-gray-200 dark:border-gray-800",
//       }}
//     />
//   );
// }

// export default Navbar;
