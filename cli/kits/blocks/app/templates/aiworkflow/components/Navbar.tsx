"use client";

import type { ComponentProps } from "react";
import { Navbar as SharedNavbar } from "@/components/sections/Navbar";

type SharedNavbarProps = ComponentProps<typeof SharedNavbar>;
type PresetOverrides = Partial<SharedNavbarProps>;

const defaultProps: SharedNavbarProps = {
  brand: "FlowPilot AI",
  brandNode: (
    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 bg-slate-950 text-white shadow-sm ring-1 ring-white/20 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:ring-white/10">
      <span className="grid grid-cols-2 gap-[2px]">
        <span className="h-[4px] w-[4px] rounded-[1px] bg-white/95" />
        <span className="h-[4px] w-[4px] rounded-[1px] bg-white/55" />
        <span className="h-[4px] w-[4px] rounded-[1px] bg-white/55" />
        <span className="h-[4px] w-[4px] rounded-[1px] bg-white/95" />
      </span>
    </div>
  ),

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
  ariaLabel: "FlowPilot AI main navigation",
  className: "",
  nav: {
    className:
      "border-b border-black/8 bg-white/76 text-slate-900 backdrop-blur supports-[backdrop-filter]:bg-white/76 " +
      "dark:border-white/10 dark:bg-black/72 dark:text-white supports-[backdrop-filter]:dark:bg-black/72 " +
      "[--navbar-accent:theme(colors.slate.950)] dark:[--navbar-accent:theme(colors.white)] " +
      "[--navbar-toggle-bg:theme(colors.white)] dark:[--navbar-toggle-bg:theme(colors.black)] " +
      "[--navbar-hover-bg:color-mix(in_oklab,theme(colors.sky.500)_9%,white)] dark:[--navbar-hover-bg:color-mix(in_oklab,theme(colors.sky.500)_12%,transparent)] " +
      "[--navbar-ring:theme(colors.sky.500)] dark:[--navbar-ring:theme(colors.sky.400)] " +
      "[--navbar-border:rgba(15,23,42,0.08)] dark:[--navbar-border:rgba(255,255,255,0.1)]",
  },
  brandText: {
    className:
      "text-xl font-semibold font-outfit text-slate-950 dark:text-white",
  },
  links: {
    className:
      "text-sm font-medium font-inter text-slate-700 hover:text-slate-950 focus:ring-[var(--navbar-ring)] dark:text-slate-200 dark:hover:text-white",
  },
  ctaButtonStyle: {
    variant: "default",
    size: "default",
    className:
      "shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg",
  },
  mobileMenu: {
    className: "border-t border-slate-200 dark:border-slate-800",
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
      "md:hidden flex items-center justify-center rounded-md border border-black/8 bg-white/70 p-2 transition-colors hover:bg-[var(--navbar-hover-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--navbar-ring)] dark:border-white/10 dark:bg-white/[0.04]",
  },
  colorModeWrapper: {
    className: "ml-2",
  },
  ctaButtonWrapper: {
    className: "ml-2",
  },
  mobileMenuInner: {
    className: "space-y-2 px-4 pt-2 pb-4",
  },
  mobileLinks: {
    className: "hover:bg-[var(--navbar-hover-bg)]",
  },
};

export function Navbar(overrides: PresetOverrides = {}) {
  const props: SharedNavbarProps = {
    ...defaultProps,
    ...overrides,
  };

  return <SharedNavbar {...props} />;
}
