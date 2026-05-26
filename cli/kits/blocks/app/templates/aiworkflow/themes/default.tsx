import React from "react";

import { cn } from "@/lib/utils";

type Props = React.PropsWithChildren<{ className?: string }>;

export function PresetThemeVars({ className, children }: Props) {
  return (
    <div
      className={cn(
        "[--btn-ring:theme(colors.slate.950)] dark:[--btn-ring:theme(colors.white)]",

        "[--navbar-bg:rgba(255,255,255,0.76)] dark:[--navbar-bg:rgba(0,0,0,0.72)]",
        "[--navbar-fg:theme(colors.slate.900)] dark:[--navbar-fg:theme(colors.white)]",
        "[--navbar-accent:theme(colors.slate.950)] dark:[--navbar-accent:theme(colors.white)]",
        "[--navbar-link-fg:theme(colors.slate.700)] dark:[--navbar-link-fg:theme(colors.slate.200)]",
        "[--navbar-link-hover-fg:theme(colors.slate.950)] dark:[--navbar-link-hover-fg:theme(colors.white)]",
        "[--navbar-toggle-bg:theme(colors.white)] dark:[--navbar-toggle-bg:theme(colors.black)]",
        "[--navbar-hover-bg:color-mix(in_oklab,theme(colors.sky.500)_9%,white)] dark:[--navbar-hover-bg:color-mix(in_oklab,theme(colors.sky.500)_12%,transparent)]",
        "[--navbar-ring:theme(colors.sky.500)] dark:[--navbar-ring:theme(colors.sky.400)]",
        "[--navbar-border:rgba(15,23,42,0.08)] dark:[--navbar-border:rgba(255,255,255,0.1)]",

        "[--input-bg:theme(colors.white)] dark:[--input-bg:theme(colors.slate.950)]",
        "[--input-fg:theme(colors.slate.900)] dark:[--input-fg:theme(colors.slate.100)]",
        "[--input-placeholder:theme(colors.slate.400)] dark:[--input-placeholder:theme(colors.slate.500)]",
        "[--input-border:theme(colors.slate.200)] dark:[--input-border:theme(colors.slate.800)]",
        "[--input-focus-ring:theme(colors.slate.950)] dark:[--input-focus-ring:theme(colors.white)]",
        "[--input-ring-offset:theme(colors.white)] dark:[--input-ring-offset:theme(colors.slate.950)]",

        "[--card-bg:theme(colors.white)] dark:[--card-bg:theme(colors.slate.950)]",
        "[--card-fg:theme(colors.slate.900)] dark:[--card-fg:theme(colors.slate.100)]",
        "[--card-title-fg:theme(colors.slate.950)] dark:[--card-title-fg:theme(colors.white)]",
        "[--card-muted-fg:theme(colors.slate.600)] dark:[--card-muted-fg:theme(colors.slate.300)]",
        "[--card-border:theme(colors.slate.200)] dark:[--card-border:rgba(255,255,255,0.1)]",
        "[--card-shadow:0_10px_30px_rgba(8,15,30,0.08)] dark:[--card-shadow:0_12px_32px_rgba(0,0,0,0.35)]",

        "[--badge-bg:theme(colors.slate.50)] dark:[--badge-bg:theme(colors.slate.900)]",
        "[--badge-fg:theme(colors.slate.700)] dark:[--badge-fg:theme(colors.slate.200)]",
        "[--badge-border:theme(colors.slate.200)] dark:[--badge-border:theme(colors.slate.700)]",
        "[--badge-active-bg:theme(colors.slate.950)] dark:[--badge-active-bg:theme(colors.white)]",
        "[--badge-active-fg:theme(colors.white)] dark:[--badge-active-fg:theme(colors.slate.950)]",
        "[--badge-active-border:theme(colors.slate.950)] dark:[--badge-active-border:theme(colors.white)]",

        "[--heading-fg:theme(colors.slate.950)] dark:[--heading-fg:theme(colors.white)]",
        "[--subheading-fg:theme(colors.slate.600)] dark:[--subheading-fg:theme(colors.slate.300)]",
        "[--description-fg:theme(colors.slate.700)] dark:[--description-fg:theme(colors.slate.200)]",

        "[--hero-cta-primary-bg:theme(colors.slate.950)] dark:[--hero-cta-primary-bg:theme(colors.white)]",
        "[--hero-cta-primary-hover-bg:theme(colors.slate.800)] dark:[--hero-cta-primary-hover-bg:theme(colors.slate.100)]",
        "[--hero-cta-primary-fg:theme(colors.white)] dark:[--hero-cta-primary-fg:theme(colors.slate.950)]",
        "[--hero-cta-primary-hover-fg:theme(colors.white)] dark:[--hero-cta-primary-hover-fg:theme(colors.slate.950)]",
        "[--hero-cta-secondary-bg:transparent]",
        "[--hero-cta-secondary-fg:theme(colors.slate.800)] dark:[--hero-cta-secondary-fg:theme(colors.slate.100)]",
        "[--hero-cta-secondary-border:rgba(15,23,42,0.12)] dark:[--hero-cta-secondary-border:rgba(255,255,255,0.12)]",
        "[--hero-cta-secondary-hover-bg:rgba(15,23,42,0.03)] dark:[--hero-cta-secondary-hover-bg:rgba(255,255,255,0.05)]",
        "[--hero-cta-secondary-hover-fg:theme(colors.slate.800)] dark:[--hero-cta-secondary-hover-fg:theme(colors.slate.100)]",

        "[--section-bg:linear-gradient(180deg,#eef3f8_0%,#f6f8fb_48%,#eef3f8_100%)] dark:[--section-bg:linear-gradient(180deg,#171717_0%,#121212_18%,#1d1d1d_46%,#131313_76%,#1b1b1b_100%)]",
        "[--section-border:rgba(226,232,240,0.8)] dark:[--section-border:theme(colors.slate.800)]",

        "[--contact-section-bg:linear-gradient(180deg,#eef3f8_0%,#f6f8fb_48%,#eef3f8_100%)] dark:[--contact-section-bg:linear-gradient(180deg,#171717_0%,#121212_18%,#1d1d1d_46%,#131313_76%,#1b1b1b_100%)]",

        "[--contact-submit-bg:theme(colors.slate.950)] dark:[--contact-submit-bg:theme(colors.white)]",
        "[--contact-submit-fg:theme(colors.white)] dark:[--contact-submit-fg:theme(colors.slate.950)]",
        "[--contact-submit-hover-bg:theme(colors.slate.800)] dark:[--contact-submit-hover-bg:theme(colors.slate.100)]",
        "[--contact-submit-hover-fg:theme(colors.white)] dark:[--contact-submit-hover-fg:theme(colors.slate.950)]",
        "[--contact-submit-border:transparent]",

        "[--cta-section-bg:linear-gradient(180deg,#eef3f8_0%,#f6f8fb_48%,#eef3f8_100%)] dark:[--cta-section-bg:linear-gradient(180deg,#171717_0%,#121212_18%,#1d1d1d_46%,#131313_76%,#1b1b1b_100%)]",
        "[--cta-heading-fg:theme(colors.slate.950)] dark:[--cta-heading-fg:theme(colors.white)]",
        "[--cta-subheading-fg:theme(colors.slate.600)] dark:[--cta-subheading-fg:rgba(255,255,255,0.82)]",
        "[--cta-description-fg:theme(colors.slate.700)] dark:[--cta-description-fg:rgba(255,255,255,0.74)]",
        "[--cta-primary-bg:theme(colors.slate.950)] dark:[--cta-primary-bg:theme(colors.white)]",
        "[--cta-primary-fg:theme(colors.white)] dark:[--cta-primary-fg:theme(colors.slate.950)]",
        "[--cta-primary-hover-bg:theme(colors.slate.800)] dark:[--cta-primary-hover-bg:theme(colors.slate.100)]",
        "[--cta-primary-hover-fg:theme(colors.white)] dark:[--cta-primary-hover-fg:theme(colors.slate.950)]",
        "[--cta-primary-border:transparent]",
        "[--cta-secondary-bg:transparent]",
        "[--cta-secondary-fg:theme(colors.slate.800)] dark:[--cta-secondary-fg:theme(colors.slate.100)]",
        "[--cta-secondary-border:rgba(15,23,42,0.12)] dark:[--cta-secondary-border:rgba(255,255,255,0.18)]",
        "[--cta-secondary-hover-bg:rgba(15,23,42,0.03)] dark:[--cta-secondary-hover-bg:rgba(255,255,255,0.08)]",
        "[--cta-secondary-hover-fg:theme(colors.slate.800)] dark:[--cta-secondary-hover-fg:theme(colors.slate.100)]",

        "[--process-step-bg:theme(colors.slate.950)] dark:[--process-step-bg:theme(colors.white)]",
        "[--process-step-fg:theme(colors.white)] dark:[--process-step-fg:theme(colors.slate.950)]",
        "[--process-connector:theme(colors.slate.300)] dark:[--process-connector:theme(colors.slate.700)]",

        "[--footer-bg:linear-gradient(180deg,rgba(255,255,255,0.42)_0%,rgba(255,255,255,0.14)_100%)] dark:[--footer-bg:linear-gradient(180deg,rgba(0,0,0,0.22)_0%,rgba(0,0,0,0.04)_100%)]",

        "[--footer-fg:theme(colors.slate.800)] dark:[--footer-fg:theme(colors.slate.100)]",
        "[--footer-heading-fg:theme(colors.slate.950)] dark:[--footer-heading-fg:theme(colors.white)]",
        "[--footer-link-fg:theme(colors.slate.700)] dark:[--footer-link-fg:theme(colors.slate.300)]",
        "[--footer-link-hover-fg:theme(colors.slate.950)] dark:[--footer-link-hover-fg:theme(colors.white)]",
        "[--footer-link-hover-bg:theme(colors.slate.100)] dark:[--footer-link-hover-bg:rgba(255,255,255,0.06)]",
        "[--footer-muted-fg:theme(colors.slate.500)] dark:[--footer-muted-fg:theme(colors.slate.400)]",
        "[--footer-border:theme(colors.slate.200)] dark:[--footer-border:theme(colors.slate.800)]",

        "[--table-fg:inherit]",
        "[--table-muted-fg:theme(colors.slate.500)] dark:[--table-muted-fg:theme(colors.slate.400)]",
        "[--table-head-fg:theme(colors.slate.700)] dark:[--table-head-fg:theme(colors.slate.300)]",
        "[--table-border:theme(colors.slate.200)] dark:[--table-border:theme(colors.slate.800)]",
        "[--table-row-hover-bg:theme(colors.slate.50)] dark:[--table-row-hover-bg:theme(colors.slate.900)]",

        "[--faq-btn-bg:theme(colors.white)] dark:[--faq-btn-bg:theme(colors.slate.900)]",
        "[--faq-btn-fg:theme(colors.slate.900)] dark:[--faq-btn-fg:theme(colors.slate.100)]",
        "[--faq-btn-hover-bg:theme(colors.slate.50)] dark:[--faq-btn-hover-bg:rgba(255,255,255,0.04)]",
        "[--faq-btn-hover-fg:theme(colors.slate.900)] dark:[--faq-btn-hover-fg:theme(colors.slate.100)]",
        "[--faq-answer-bg:theme(colors.white)] dark:[--faq-answer-bg:theme(colors.slate.950)]",
        "[--faq-answer-fg:theme(colors.slate.700)] dark:[--faq-answer-fg:theme(colors.slate.200)]",

        className,
      )}
    >
      {children}
    </div>
  );
}
