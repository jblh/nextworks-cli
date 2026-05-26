import React from "react";

import { cn } from "@/lib/utils";

type Props = React.PropsWithChildren<{ className?: string }>;

export function PresetThemeVars({ className, children }: Props) {
  return (
    <div
      className={cn(
        "[--btn-ring:theme(colors.amber.300)] dark:[--btn-ring:theme(colors.amber.200)]",

        // Navbar
        "[--navbar-bg:rgba(255,255,255,0.92)] dark:[--navbar-bg:rgba(15,23,42,0.98)]",
        "[--navbar-fg:theme(colors.slate.900)] dark:[--navbar-fg:theme(colors.slate.100)]",
        "[--navbar-accent:theme(colors.amber.500)] dark:[--navbar-accent:theme(colors.amber.300)]",
        "[--navbar-link-fg:theme(colors.slate.700)] dark:[--navbar-link-fg:theme(colors.slate.300)]",
        "[--navbar-link-hover-fg:theme(colors.slate.950)] dark:[--navbar-link-hover-fg:theme(colors.white)]",
        "[--navbar-toggle-bg:rgba(15,23,42,0.06)] dark:[--navbar-toggle-bg:rgba(255,255,255,0.08)]",
        "[--navbar-hover-bg:rgba(59,130,246,0.08)] dark:[--navbar-hover-bg:rgba(255,255,255,0.06)]",
        "[--navbar-ring:theme(colors.blue.500)] dark:[--navbar-ring:theme(colors.blue.400)]",
        "[--navbar-border:rgba(148,163,184,0.2)] dark:[--navbar-border:rgba(255,255,255,0.1)]",

        // Input
        "[--input-bg:rgba(255,255,255,0.94)] dark:[--input-bg:rgba(15,23,42,0.98)]",
        "[--input-fg:theme(colors.slate.900)] dark:[--input-fg:theme(colors.slate.100)]",
        "[--input-placeholder:rgba(100,116,139,0.82)] dark:[--input-placeholder:rgba(148,163,184,0.72)]",
        "[--input-border:rgba(148,163,184,0.3)] dark:[--input-border:rgba(148,163,184,0.25)]",
        "[--input-focus-ring:theme(colors.amber.400)] dark:[--input-focus-ring:theme(colors.amber.300)]",
        "[--input-ring-offset:theme(colors.slate.950)] dark:[--input-ring-offset:theme(colors.slate.950)]",

        // Card
        "[--card-bg:rgba(255,255,255,0.96)] dark:[--card-bg:rgba(15,23,42,0.98)]",
        "[--card-fg:theme(colors.slate.900)] dark:[--card-fg:theme(colors.slate.100)]",
        "[--card-title-fg:theme(colors.slate.900)] dark:[--card-title-fg:theme(colors.white)]",
        "[--card-muted-fg:rgba(71,85,105,0.9)] dark:[--card-muted-fg:rgba(203,213,225,0.85)]",
        "[--card-border:rgba(148,163,184,0.24)] dark:[--card-border:rgba(148,163,184,0.18)]",
        "[--card-shadow:0_28px_90px_rgba(2,6,23,0.48)] dark:[--card-shadow:0_34px_120px_rgba(0,0,0,0.72)]",

        // Badge
        "[--badge-bg:rgba(255,255,255,0.9)] dark:[--badge-bg:rgba(30,41,59,0.9)]",
        "[--badge-fg:theme(colors.slate.900)] dark:[--badge-fg:theme(colors.slate.100)]",
        "[--badge-border:rgba(148,163,184,0.24)] dark:[--badge-border:rgba(148,163,184,0.2)]",
        "[--badge-active-bg:theme(colors.blue.600)] dark:[--badge-active-bg:theme(colors.blue.500)]",
        "[--badge-active-fg:theme(colors.white)] dark:[--badge-active-fg:theme(colors.white)]",
        "[--badge-active-border:rgba(255,255,255,0.14)] dark:[--badge-active-border:rgba(255,255,255,0.12)]",

        // Headings
        "[--heading-fg:theme(colors.slate.950)] dark:[--heading-fg:theme(colors.white)]",
        "[--subheading-fg:theme(colors.blue.600)] dark:[--subheading-fg:theme(colors.sky.400)]",
        "[--description-fg:theme(colors.slate.600)] dark:[--description-fg:theme(colors.slate.300)]",

        // Hero CTA
        "[--hero-cta-primary-bg:theme(colors.blue.600)] dark:[--hero-cta-primary-bg:theme(colors.blue.500)]",
        "[--hero-cta-primary-hover-bg:theme(colors.blue.700)] dark:[--hero-cta-primary-hover-bg:theme(colors.blue.400)]",
        "[--hero-cta-primary-fg:theme(colors.white)] dark:[--hero-cta-primary-fg:theme(colors.white)]",
        "[--hero-cta-primary-hover-fg:theme(colors.white)] dark:[--hero-cta-primary-hover-fg:theme(colors.white)]",
        "[--hero-cta-secondary-bg:rgba(255,255,255,0.92)] dark:[--hero-cta-secondary-bg:rgba(30,41,59,0.9)]",
        "[--hero-cta-secondary-fg:theme(colors.slate.900)] dark:[--hero-cta-secondary-fg:theme(colors.slate.100)]",
        "[--hero-cta-secondary-border:rgba(148,163,184,0.3)] dark:[--hero-cta-secondary-border:rgba(148,163,184,0.2)]",
        "[--hero-cta-secondary-hover-bg:rgba(255,255,255,1)] dark:[--hero-cta-secondary-hover-bg:rgba(51,65,85,0.95)]",
        "[--hero-cta-secondary-hover-fg:theme(colors.slate.900)] dark:[--hero-cta-secondary-hover-fg:theme(colors.white)]",

        // Demo shell (hero app)
        "[--demo-shell-bg:rgba(15,23,42,1)] dark:[--demo-shell-bg:rgba(9,14,29,1)]",
        "[--demo-shell-muted-bg:rgba(7,10,22,1)] dark:[--demo-shell-muted-bg:rgba(4,7,15,1)]",
        "[--demo-shell-strong-bg:rgba(255,255,255,0.08)] dark:[--demo-shell-strong-bg:rgba(255,255,255,0.06)]",
        "[--demo-panel-bg:rgba(15,23,42,0.98)] dark:[--demo-panel-bg:rgba(9,14,29,1)]",
        "[--demo-panel-muted-bg:rgba(20,30,55,0.9)] dark:[--demo-panel-muted-bg:rgba(15,23,42,0.95)]",
        "[--demo-panel-subtle-bg:rgba(30,41,59,0.95)] dark:[--demo-panel-subtle-bg:rgba(22,32,50,1)]",
        "[--demo-panel-strong-bg:rgba(255,255,255,0.08)] dark:[--demo-panel-strong-bg:rgba(255,255,255,0.06)]",
        "[--demo-code-bg:rgba(9,14,29,1)] dark:[--demo-code-bg:rgba(6,9,20,1)]",
        "[--demo-code-gutter-bg:rgba(15,23,42,1)] dark:[--demo-code-gutter-bg:rgba(9,14,29,1)]",
        "[--demo-border:rgba(148,163,184,0.18)] dark:[--demo-border:rgba(148,163,184,0.12)]",
        "[--demo-border-strong:rgba(251,191,36,0.22)] dark:[--demo-border-strong:rgba(96,165,250,0.22)]",
        // Demo text — strong contrast on dark shell backgrounds
        "[--demo-fg:rgba(248,250,252,1)] dark:[--demo-fg:rgba(248,250,252,1)]",
        "[--demo-muted-fg:rgba(203,213,225,0.95)] dark:[--demo-muted-fg:rgba(203,213,225,0.9)]",
        "[--demo-subtle-fg:rgba(147,197,253,1)] dark:[--demo-subtle-fg:rgba(147,197,253,0.95)]",
        "[--demo-accent:theme(colors.amber.300)] dark:[--demo-accent:theme(colors.amber.300)]",
        "[--demo-accent-soft-bg:rgba(251,191,36,0.12)] dark:[--demo-accent-soft-bg:rgba(251,191,36,0.1)]",
        "[--demo-info:theme(colors.sky.300)] dark:[--demo-info:theme(colors.sky.300)]",
        "[--demo-info-border:rgba(125,211,252,0.3)] dark:[--demo-info-border:rgba(125,211,252,0.22)]",
        "[--demo-info-soft-bg:rgba(14,165,233,0.12)] dark:[--demo-info-soft-bg:rgba(14,165,233,0.1)]",
        "[--demo-success:theme(colors.emerald.300)] dark:[--demo-success:theme(colors.emerald.300)]",
        "[--demo-success-border:rgba(52,211,153,0.28)] dark:[--demo-success-border:rgba(52,211,153,0.2)]",
        "[--demo-success-soft-bg:rgba(16,185,129,0.12)] dark:[--demo-success-soft-bg:rgba(16,185,129,0.1)]",
        "[--demo-warning:theme(colors.amber.300)] dark:[--demo-warning:theme(colors.amber.300)]",
        "[--demo-warning-border:rgba(251,191,36,0.3)] dark:[--demo-warning-border:rgba(251,191,36,0.22)]",
        "[--demo-warning-soft-bg:rgba(245,158,11,0.12)] dark:[--demo-warning-soft-bg:rgba(245,158,11,0.1)]",
        "[--demo-danger:theme(colors.rose.300)] dark:[--demo-danger:theme(colors.rose.300)]",
        "[--demo-danger-border:rgba(253,164,175,0.3)] dark:[--demo-danger-border:rgba(253,164,175,0.22)]",
        "[--demo-danger-soft-bg:rgba(244,63,94,0.12)] dark:[--demo-danger-soft-bg:rgba(244,63,94,0.1)]",
        "[--demo-scroll-track:rgba(148,163,184,0.14)] dark:[--demo-scroll-track:rgba(148,163,184,0.08)]",
        "[--demo-scroll-thumb:rgba(96,165,250,0.7)] dark:[--demo-scroll-thumb:rgba(96,165,250,0.55)]",
        "[--demo-shell-shadow:0_34px_120px_-48px_rgba(2,6,23,0.75)] dark:[--demo-shell-shadow:0_40px_140px_-56px_rgba(0,0,0,0.92)]",
        "[--demo-shell-ring:rgba(251,191,36,0.2)] dark:[--demo-shell-ring:rgba(96,165,250,0.16)]",

        // Section
        "[--section-bg:theme(colors.slate.50)] dark:[--section-bg:theme(colors.slate.950)]",
        "[--section-border:rgba(148,163,184,0.18)] dark:[--section-border:rgba(148,163,184,0.1)]",

        // Contact section
        "[--contact-section-bg:theme(colors.slate.50)] dark:[--contact-section-bg:theme(colors.slate.950)]",
        "[--contact-submit-bg:theme(colors.blue.600)] dark:[--contact-submit-bg:theme(colors.blue.500)]",
        "[--contact-submit-fg:theme(colors.white)] dark:[--contact-submit-fg:theme(colors.white)]",
        "[--contact-submit-hover-bg:theme(colors.blue.700)] dark:[--contact-submit-hover-bg:theme(colors.blue.400)]",
        "[--contact-submit-hover-fg:theme(colors.white)] dark:[--contact-submit-hover-fg:theme(colors.white)]",
        "[--contact-submit-border:transparent]",

        // CTA section
        "[--cta-section-bg:theme(colors.slate.50)] dark:[--cta-section-bg:theme(colors.slate.950)]",
        "[--cta-heading-fg:theme(colors.slate.950)] dark:[--cta-heading-fg:theme(colors.white)]",
        "[--cta-subheading-fg:theme(colors.blue.600)] dark:[--cta-subheading-fg:theme(colors.sky.400)]",
        "[--cta-description-fg:theme(colors.slate.600)] dark:[--cta-description-fg:theme(colors.slate.300)]",
        "[--cta-primary-bg:theme(colors.blue.600)] dark:[--cta-primary-bg:theme(colors.blue.500)]",
        "[--cta-primary-fg:theme(colors.white)] dark:[--cta-primary-fg:theme(colors.white)]",
        "[--cta-primary-hover-bg:theme(colors.blue.700)] dark:[--cta-primary-hover-bg:theme(colors.blue.400)]",
        "[--cta-primary-hover-fg:theme(colors.white)] dark:[--cta-primary-hover-fg:theme(colors.white)]",
        "[--cta-primary-border:transparent]",
        "[--cta-secondary-bg:rgba(255,255,255,0.92)]",
        "[--cta-secondary-fg:theme(colors.slate.900)] dark:[--cta-secondary-fg:theme(colors.slate.100)]",
        "[--cta-secondary-border:rgba(148,163,184,0.28)] dark:[--cta-secondary-border:rgba(148,163,184,0.18)]",
        "[--cta-secondary-hover-bg:rgba(255,255,255,1)] dark:[--cta-secondary-hover-bg:rgba(30,41,59,0.9)]",
        "[--cta-secondary-hover-fg:theme(colors.slate.900)] dark:[--cta-secondary-hover-fg:theme(colors.white)]",

        // Process steps
        "[--process-step-bg:theme(colors.blue.600)] dark:[--process-step-bg:theme(colors.blue.500)]",
        "[--process-step-fg:theme(colors.white)] dark:[--process-step-fg:theme(colors.white)]",
        "[--process-connector:rgba(148,163,184,0.24)] dark:[--process-connector:rgba(148,163,184,0.22)]",

        // Footer
        "[--footer-bg:theme(colors.slate.100)] dark:[--footer-bg:rgba(9,14,29,1)]",
        "[--footer-fg:theme(colors.slate.600)] dark:[--footer-fg:theme(colors.slate.400)]",
        "[--footer-heading-fg:theme(colors.slate.900)] dark:[--footer-heading-fg:theme(colors.white)]",
        "[--footer-link-fg:theme(colors.slate.700)] dark:[--footer-link-fg:theme(colors.slate.400)]",
        "[--footer-link-hover-fg:theme(colors.slate.950)] dark:[--footer-link-hover-fg:theme(colors.white)]",
        "[--footer-link-hover-bg:rgba(59,130,246,0.06)] dark:[--footer-link-hover-bg:rgba(255,255,255,0.06)]",
        "[--footer-muted-fg:theme(colors.blue.600)] dark:[--footer-muted-fg:theme(colors.slate.500)]",
        "[--footer-border:rgba(148,163,184,0.18)] dark:[--footer-border:rgba(148,163,184,0.1)]",

        // Table
        "[--table-fg:theme(colors.slate.900)] dark:[--table-fg:theme(colors.slate.100)]",
        "[--table-muted-fg:theme(colors.slate.600)] dark:[--table-muted-fg:theme(colors.slate.400)]",
        "[--table-head-fg:theme(colors.slate.900)] dark:[--table-head-fg:theme(colors.sky.200)]",
        "[--table-border:rgba(148,163,184,0.18)] dark:[--table-border:rgba(148,163,184,0.12)]",
        "[--table-row-hover-bg:rgba(59,130,246,0.06)] dark:[--table-row-hover-bg:rgba(96,165,250,0.06)]",

        // FAQ
        "[--faq-btn-bg:rgba(255,255,255,0.9)] dark:[--faq-btn-bg:rgba(20,28,48,0.9)]",
        "[--faq-btn-fg:theme(colors.slate.900)] dark:[--faq-btn-fg:theme(colors.slate.100)]",
        "[--faq-btn-hover-bg:rgba(255,255,255,1)] dark:[--faq-btn-hover-bg:rgba(30,41,59,0.95)]",
        "[--faq-btn-hover-fg:theme(colors.slate.900)] dark:[--faq-btn-hover-fg:theme(colors.white)]",
        "[--faq-answer-bg:rgba(255,255,255,0.96)] dark:[--faq-answer-bg:rgba(15,23,42,0.98)]",
        "[--faq-answer-fg:theme(colors.slate.800)] dark:[--faq-answer-fg:theme(colors.slate.200)]",

        className,
      )}
    >
      {children}
    </div>
  );
}
