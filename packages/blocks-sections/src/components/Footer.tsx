"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@nextworks/blocks-core";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

/**
 * Navigation link item interface representing a single link in the footer.
 */
export interface NavLinkItem {
  /** Display name of the link */
  name: string;
  /** URL or anchor for the navigation link */
  href: string;
  /** Whether the link should open in a new tab */
  external?: boolean;
}

/**
 * Grouping for navigation link items under a section heading.
 */
export interface NavLinkGroup {
  /** Section heading/title */
  heading: string;
  /** Collection of links under this section */
  links: NavLinkItem[];
}

/**
 * Social media link interface for footer social icons.
 * @public
 */
export interface SocialLink {
  // NOTE: exported for reuse by templates; keep name stable for backwards-compat

  /** Name of the social media platform */
  name: string;
  /** SVG icon component (e.g., Lucide). Should respect currentColor. */
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** URL to the social profile */
  url: string;
  /** Optional aria-label for accessibility */
  label?: string;
  /** Whether the link should open in a new tab */
  external?: boolean;
}

/**
 * Props for the Footer component.
 *
 * @remarks
 * Exposes slot-style className overrides for layout and typography. External
 * links automatically receive target and rel attributes for security.
 *
 * @public
 */
export interface FooterProps {
  /** Optional id to attach to the root footer element */
  id?: string;

  /** Brand name or logo text displayed in the footer */
  footerBrandName?: string;
  /** Optional custom brand node (e.g., logo). Rendered left of brand text */
  brandNode?: React.ReactNode;
  /** Optional link for the brand (wraps brand text) */
  brandHref?: string;

  /** Navigation link groups shown in the footer */
  footerNavLinks?: NavLinkGroup[];
  /** Social media links and icons shown in the footer */
  footerSocialLinks?: SocialLink[];

  /** Optional top-level class to override the footer root */
  className?: string;

  /** Styling configuration objects (slot-based API) */
  section?: { className?: string };
  container?: { className?: string };
  brand?: { className?: string };
  brandWrapper?: { className?: string };
  navSection?: { className?: string };
  navGroup?: { className?: string };
  navHeading?: { className?: string };
  navLink?: { className?: string };
  linksList?: { className?: string };
  socialSection?: { className?: string };
  socialLink?: { className?: string };
  socialIcon?: { className?: string };
  copyright?: { className?: string };

  /** Optional overrides for copyright */
  copyrightYear?: number;
  copyrightOverride?: React.ReactNode;

  /** ARIA label for the footer section */
  ariaLabel?: string;
}

/**
 * Default navigation link groups with common footer sections
 */
const defaultNavLinks: NavLinkGroup[] = [
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

/**
 * Default social media links shown in the footer
 */
const defaultSocialLinks: SocialLink[] = [
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://facebook.com",
    external: true,
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: "https://twitter.com",
    external: true,
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://instagram.com",
    external: true,
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://linkedin.com",
    external: true,
  },
];

/**
 * Site footer with brand, grouped navigation links, social icons, and copyright.
 *
 * @remarks
 * - Styling: slot-style className overrides are merged after defaults via cn().
 * - Accessibility: renders a semantic <footer> with aria-label and clear link
 *   names; external links open in a new tab with rel security attributes.
 *
 * @example
 * <Footer footerBrandName="Acme" />
 */
export function Footer({
  id,
  footerBrandName = "Brand Name",
  brandNode,
  brandHref,
  footerNavLinks = defaultNavLinks,
  footerSocialLinks = defaultSocialLinks,
  className,
  section = {
    className:
      "w-full bg-muted text-foreground bg-[var(--footer-bg)] text-[var(--footer-fg)]",
  },
  container = { className: "max-w-7xl mx-auto px-6" },
  brand = { className: "text-lg font-bold font-poppins text-foreground" },
  brandWrapper = {
    className: "flex flex-col items-center lg:items-start lg:pr-8",
  },
  navSection = {
    className:
      "flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-12 pt-6.5 pb-8",
  },
  navGroup = {
    className:
      "flex flex-col items-center lg:items-start text-center lg:text-left pt-1.5",
  },
  navHeading = {
    className:
      "font-bold font-poppins text-foreground mb-3 text-sm uppercase tracking-wider text-[var(--footer-heading-fg)]",
  },
  navLink = {
    className:
      "text-muted-foreground hover:text-primary transition-colors duration-200 text-sm mb-2 block font-inter text-[var(--footer-link-fg)] hover:text-[var(--footer-link-hover-fg)]",
  },
  linksList = { className: "space-y-2" },
  socialSection = { className: "flex items-center justify-center gap-4 py-4" },
  socialLink = {
    className:
      "text-muted-foreground hover:text-primary transition-colors duration-200 p-2 rounded-md hover:bg-accent text-[var(--footer-link-fg)] hover:text-[var(--footer-link-hover-fg)] hover:bg-[var(--footer-link-hover-bg)]",
  },
  socialIcon = { className: "h-5 w-5" },
  copyright = {
    className:
      "text-center text-xs text-muted-foreground py-4 border-t border-border font-inter text-[var(--footer-muted-fg)] border-[var(--footer-border)]",
  },
  copyrightYear,
  copyrightOverride,
  ariaLabel = "Footer section",
}: FooterProps) {
  const year = copyrightYear ?? new Date().getFullYear();

  return (
    <footer
      id={id}
      className={cn("w-full", section.className, className)}
      aria-label={ariaLabel}
    >
      <div className={cn(container.className)}>
        {/* Navigation link sections */}
        <div className={cn(navSection.className)}>
          {/* Brand name displayed in footer */}
          <div className={cn(brandWrapper.className)}>
            {brandNode}
            {footerBrandName &&
              (brandHref ? (
                <Link
                  href={brandHref}
                  className={cn(brand.className)}
                  aria-label={footerBrandName}
                >
                  {footerBrandName}
                </Link>
              ) : (
                <h3 className={cn(brand.className)}>{footerBrandName}</h3>
              ))}
          </div>

          {/* Iterate over nav link groups */}
          {footerNavLinks.map((group) => (
            <div key={group.heading} className={cn(navGroup.className)}>
              <h3 className={cn(navHeading.className)}>{group.heading}</h3>
              <div className={cn(linksList.className)}>
                {group.links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className={cn(navLink.className)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Social media icon links */}
        <div className={cn(socialSection.className)}>
          {footerSocialLinks.map((social) => {
            const IconComponent = social.icon;
            return (
              <Link
                key={social.name}
                href={social.url}
                target={social.external ? "_blank" : undefined}
                rel={social.external ? "noopener noreferrer" : undefined}
                aria-label={social.label || social.name}
                className={cn(socialLink.className)}
              >
                <IconComponent className={cn(socialIcon.className)} />
              </Link>
            );
          })}
        </div>

        {/* Copyright notice */}
        <div className={cn(copyright.className)}>
          {copyrightOverride ?? (
            <>
              © {year} {footerBrandName}. All rights reserved.
            </>
          )}
        </div>
      </div>
    </footer>
  );
}
