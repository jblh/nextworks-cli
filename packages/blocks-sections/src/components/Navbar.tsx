// components/sections/Navbar.tsx

"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@nextworks/blocks-core";
import { ThemeToggle, type ThemeToggleProps } from "@nextworks/blocks-core";
import { cn } from "@nextworks/blocks-core";
import { Menu, X } from "lucide-react";

/**
 * Props for the Navbar component.
 *
 * @remarks
 * Slot-style className overrides are available for structural parts. The mobile
 * menu locks body scroll when open and restores it on close/unmount.
 *
 * @public
 */
export interface NavbarProps {
  /** Optional id to attach to the root nav element */
  id?: string;

  /** The height of the navbar as a Tailwind class. Example: "h-16" or "h-[13vh]" */
  navHeight?: string;

  /**
   * The text displayed as the brand/logo.
   * @defaultValue "Brand Name"
   */
  brand?: string;
  /** Optional custom brand node (e.g., logo). Rendered left of brand text */
  brandNode?: React.ReactNode;

  /** Navigation links array. Each item has a label and href */
  menuItems?: { label: string; href: string }[];

  /**
   * Call to action button config or null to hide it.
   * Example: { label: "Get Started", href: "#contact" }
   */
  ctaButton?: { label: string; href: string } | null;

  /**
   * Whether to display the color mode toggle.
   * @defaultValue true
   */
  showColorModeToggle?: boolean;

  /**
   * Whether navbar should stick to top when scrolling.
   * @defaultValue true
   */
  sticky?: boolean;

  /** Optional top-level class to override the nav root */
  className?: string;

  /** Styling configuration objects */
  nav?: {
    className?: string;
  };

  brandText?: {
    className?: string;
  };
  links?: {
    className?: string;
  };
  ctaButtonStyle?: {
    unstyled?: boolean;
    style?: React.CSSProperties;
    variant?:
      | "default"
      | "destructive"
      | "outline"
      | "secondary"
      | "ghost"
      | "link";
    size?: "default" | "sm" | "lg" | "icon";
    className?: string;
  };
  mobileMenu?: {
    className?: string;
  };

  /* Additional style slots for targeted overrides */
  container?: { className?: string };
  brandWrapper?: { className?: string };
  desktopMenu?: { className?: string };
  toggleButton?: { className?: string };
  colorModeWrapper?: { className?: string };
  ctaButtonWrapper?: { className?: string };
  mobileMenuInner?: { className?: string };
  /** Additional class overrides for mobile menu link hover/background, etc. */
  mobileLinks?: { className?: string };

  /** Props forwarded to ThemeToggle so templates can fully style it */
  themeToggle?: ThemeToggleProps;

  /** ARIA label for the navbar. */
  ariaLabel?: string;
}

const defaultMenuItems = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

/**
 * Responsive navbar with brand, menu links, color mode toggle, and optional CTA.
 *
 * @remarks
 * - Sticky behavior is enabled by default (sticky top-0 z-50).
 * - Mobile menu toggles with a button and traps body scroll while open.
 * - Accessibility: Focus rings are applied to interactive elements; aria
 *   attributes are set on the toggle button for state.
 *
 * @example
 * <Navbar brand="Acme" />
 */
export function Navbar({
  id,
  navHeight = "h-16",
  brand = "Brand Name",
  brandNode,
  menuItems = defaultMenuItems,
  ctaButton = { label: "Get Started", href: "#contact" },
  showColorModeToggle = true,
  sticky = true,
  className,
  nav = {
    className: "bg-background text-foreground border-b border-border",
  },
  brandText = {
    className: "text-2xl font-bold text-primary",
  },
  links = {
    className:
      "text-base font-normal text-foreground hover:text-gray-500 dark:hover-text-gray-400 transition-colors",
  },
  ctaButtonStyle = {
    variant: "default",
    size: "default",
    className:
      "shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5",
  },
  mobileMenu = {
    className: "border-t border-border",
  },

  /* new slot defaults */
  container = { className: "" },
  brandWrapper = { className: "" },
  desktopMenu = {
    className: "hidden items-center space-x-1 lg:flex lg:space-x-6",
  },
  toggleButton = {
    className:
      "hover:bg-accent flex items-center justify-center rounded-md p-2 transition-colors",
  },
  colorModeWrapper = { className: "ml-2" },
  ctaButtonWrapper = { className: "ml-2" },
  mobileMenuInner = { className: "space-y-2 px-4 pt-2 pb-4" },
  mobileLinks = { className: "hover:bg-accent" },

  themeToggle = {},

  ariaLabel = "Main navigation",
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuId = "navbar-mobile-menu";

  // Measure header height for reliable max height on mobile menu
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [headerHeightPx, setHeaderHeightPx] = useState(0);

  useEffect(() => {
    const update = () =>
      setHeaderHeightPx(headerRef.current?.offsetHeight ?? 0);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalOverflow || "";
    }
    return () => {
      document.body.style.overflow = originalOverflow || "";
    };
  }, [isMobileMenuOpen]);

  return (
    <nav
      id={id}
      className={cn(
        "w-full",
        sticky && "sticky top-0 z-50",
        nav.className,
        className,
      )}
      aria-label={ariaLabel}
    >
      <div
        ref={headerRef}
        className={cn(
          "flex items-center justify-between px-4 py-2",
          navHeight,
          container.className,
        )}
      >
        <div
          className={cn(
            "mr-2 flex items-center gap-2 pl-2",
            brandWrapper.className,
          )}
        >
          {brandNode}
          {brand && <h1 className={cn(brandText.className)}>{brand}</h1>}
        </div>

        <button
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls={mobileMenuId}
          className={cn("lg:hidden", toggleButton.className)}
          // className={cn("lg:hidden", toggleButton.className)}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        <div className={cn("hidden md:flex", desktopMenu.className)}>
          {/* <div className={cn("hidden lg:flex", desktopMenu.className)}> */}
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "rounded-md px-2 py-2 transition-colors duration-200 lg:px-4",
                "focus:ring-ring focus:ring-2 focus:ring-offset-2 focus:outline-none",
                "focus-visible:ring-[var(--navbar-ring)]",
                links.className,
              )}
            >
              {item.label}
            </Link>
          ))}

          {showColorModeToggle && (
            <div className={cn(colorModeWrapper.className)}>
              <ThemeToggle {...themeToggle} />
            </div>
          )}

          {ctaButton && (
            <Button
              asChild
              unstyled={ctaButtonStyle.unstyled}
              variant={ctaButtonStyle.variant}
              size={ctaButtonStyle.size}
              className={cn(
                ctaButtonWrapper.className,
                ctaButtonStyle.className,
              )}
              style={ctaButtonStyle.style}
            >
              <Link href={ctaButton.href} aria-label={ctaButton.label}>
                {ctaButton.label}
              </Link>
            </Button>
          )}
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          id={mobileMenuId}
          className={cn(
            "md:hidden",
            // "lg:hidden",
            "overflow-y-auto overscroll-y-contain",
            nav.className,
            mobileMenu.className,
          )}
          style={{
            maxHeight: `calc(100dvh - ${headerHeightPx}px)`,
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div className={cn(mobileMenuInner.className)}>
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "block w-full rounded-md px-2 py-4 text-center transition-colors duration-200",
                  mobileLinks.className,
                  "focus:ring-ring focus:ring-2 focus:ring-offset-2 focus:outline-none",
                  "focus-visible:ring-[var(--navbar-ring)]",
                  links.className,
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {showColorModeToggle && (
              <div className="flex w-full justify-center pt-4">
                <ThemeToggle {...themeToggle} />
              </div>
            )}

            {ctaButton && (
              <div className="flex w-full justify-center pt-6">
                <Button
                  asChild
                  unstyled={ctaButtonStyle.unstyled}
                  variant={ctaButtonStyle.variant}
                  size={ctaButtonStyle.size}
                  className={cn("w-full max-w-xs", ctaButtonStyle.className)}
                  style={ctaButtonStyle.style}
                >
                  <Link href={ctaButton.href} aria-label={ctaButton.label}>
                    {ctaButton.label}
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
