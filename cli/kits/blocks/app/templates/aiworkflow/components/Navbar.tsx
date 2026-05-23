"use client";

import type { ComponentProps } from "react";
import { Navbar as SharedNavbar } from "@/components/sections/Navbar";

type SharedNavbarProps = ComponentProps<typeof SharedNavbar>;
type PresetOverrides = Partial<SharedNavbarProps>;

const defaultProps: SharedNavbarProps = {
  brand: "FlowPilot AI",
  brandNode: (
    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--navbar-border)] bg-[var(--navbar-accent)] text-[var(--navbar-toggle-bg)] shadow-sm ring-1 ring-white/20 dark:ring-white/10">
      <span className="grid grid-cols-2 gap-[2px]">
        <span className="h-[4px] w-[4px] rounded-[1px] bg-current/95" />
        <span className="h-[4px] w-[4px] rounded-[1px] bg-current/55" />
        <span className="h-[4px] w-[4px] rounded-[1px] bg-current/55" />
        <span className="h-[4px] w-[4px] rounded-[1px] bg-current/95" />
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
      "border-b border-[var(--navbar-border)] bg-[var(--navbar-bg)] text-[var(--navbar-fg)] backdrop-blur supports-[backdrop-filter]:bg-[var(--navbar-bg)] supports-[backdrop-filter]:dark:bg-[var(--navbar-bg)]",
  },
  brandText: {
    className: "text-xl font-semibold font-outfit text-[var(--navbar-accent)]",
  },
  links: {
    className:
      "text-sm font-medium font-inter text-[var(--navbar-link-fg)] hover:text-[var(--navbar-link-hover-fg)] focus:ring-[var(--navbar-ring)]",
  },
  ctaButtonStyle: {
    variant: "default",
    size: "default",
    className:
      "shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg",
  },
  mobileMenu: {
    className: "border-t border-[var(--navbar-border)]",
  },
  container: {
    className: "max-w-7xl mx-auto",
  },
  brandWrapper: {
    className: "-ml-2",
  },
  desktopMenu: {
    className: "hidden items-center space-x-1 md:flex lg:space-x-6",
  },
  toggleButton: {
    className:
      "md:hidden flex items-center justify-center rounded-md border border-[var(--navbar-border)] bg-[var(--navbar-toggle-bg)] p-2 transition-colors hover:bg-[var(--navbar-hover-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--navbar-ring)]",
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
