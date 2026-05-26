import React from "react";

import { cn } from "@/lib/utils";

type Props = React.PropsWithChildren<{ className?: string }>;

export function PresetThemeVars({ className, children }: Props) {
  return (
    <div
      className={cn(
        "[--btn-ring:theme(colors.red.500)] dark:[--btn-ring:theme(colors.rose.300)]",

        "[--navbar-bg:rgba(255,245,245,0.82)] dark:[--navbar-bg:rgba(14,10,10,0.76)]",
        "[--navbar-fg:theme(colors.rose.950)] dark:[--navbar-fg:theme(colors.red.50)]",
        "[--navbar-accent:theme(colors.red.600)] dark:[--navbar-accent:theme(colors.rose.300)]",
        "[--navbar-link-fg:theme(colors.rose.700)] dark:[--navbar-link-fg:theme(colors.rose.200)]",
        "[--navbar-link-hover-fg:theme(colors.red.700)] dark:[--navbar-link-hover-fg:theme(colors.white)]",
        "[--navbar-toggle-bg:theme(colors.white)] dark:[--navbar-toggle-bg:theme(colors.red.950)]",
        "[--navbar-hover-bg:color-mix(in_oklab,theme(colors.red.500)_12%,white)] dark:[--navbar-hover-bg:color-mix(in_oklab,theme(colors.red.400)_14%,transparent)]",
        "[--navbar-ring:theme(colors.red.500)] dark:[--navbar-ring:theme(colors.rose.300)]",
        "[--navbar-border:rgba(190,18,60,0.12)] dark:[--navbar-border:rgba(255,255,255,0.08)]",

        "[--input-bg:theme(colors.white)] dark:[--input-bg:theme(colors.red.950)]",
        "[--input-fg:theme(colors.rose.950)] dark:[--input-fg:theme(colors.red.50)]",
        "[--input-placeholder:theme(colors.rose.400)] dark:[--input-placeholder:theme(colors.rose.500)]",
        "[--input-border:theme(colors.rose.200)] dark:[--input-border:theme(colors.red.900)]",
        "[--input-focus-ring:theme(colors.red.600)] dark:[--input-focus-ring:theme(colors.rose.300)]",
        "[--input-ring-offset:theme(colors.white)] dark:[--input-ring-offset:theme(colors.red.950)]",

        "[--card-bg:linear-gradient(180deg,rgba(255,248,248,0.96)_0%,rgba(255,240,240,0.9)_100%)] dark:[--card-bg:linear-gradient(180deg,rgba(18,8,10,0.96)_0%,rgba(31,10,14,0.9)_100%)]",
        "[--card-fg:theme(colors.rose.950)] dark:[--card-fg:theme(colors.red.50)]",
        "[--card-title-fg:theme(colors.red.700)] dark:[--card-title-fg:theme(colors.rose.200)]",
        "[--card-muted-fg:theme(colors.rose.600)] dark:[--card-muted-fg:theme(colors.rose.300)]",
        "[--card-border:rgba(190,18,60,0.14)] dark:[--card-border:rgba(255,255,255,0.08)]",
        "[--card-shadow:0_18px_60px_rgba(127,29,29,0.12)] dark:[--card-shadow:0_24px_72px_rgba(0,0,0,0.5)]",

        "[--badge-bg:theme(colors.rose.50)] dark:[--badge-bg:theme(colors.red.950)]",
        "[--badge-fg:theme(colors.rose.700)] dark:[--badge-fg:theme(colors.rose.200)]",
        "[--badge-border:theme(colors.rose.200)] dark:[--badge-border:theme(colors.red.800)]",
        "[--badge-active-bg:theme(colors.red.600)] dark:[--badge-active-bg:theme(colors.rose.300)]",
        "[--badge-active-fg:theme(colors.white)] dark:[--badge-active-fg:theme(colors.red.950)]",
        "[--badge-active-border:theme(colors.red.600)] dark:[--badge-active-border:theme(colors.rose.300)]",

        "[--heading-fg:theme(colors.red.700)] dark:[--heading-fg:theme(colors.white)]",
        "[--subheading-fg:theme(colors.rose.600)] dark:[--subheading-fg:theme(colors.rose.300)]",
        "[--description-fg:theme(colors.rose.700)] dark:[--description-fg:theme(colors.rose.200)]",

        "[--hero-cta-primary-bg:theme(colors.red.600)] dark:[--hero-cta-primary-bg:theme(colors.rose.400)]",
        "[--hero-cta-primary-hover-bg:theme(colors.red.700)] dark:[--hero-cta-primary-hover-bg:theme(colors.rose.300)]",
        "[--hero-cta-primary-fg:theme(colors.white)] dark:[--hero-cta-primary-fg:theme(colors.red.950)]",
        "[--hero-cta-primary-hover-fg:theme(colors.white)] dark:[--hero-cta-primary-hover-fg:theme(colors.red.950)]",
        "[--hero-cta-secondary-bg:transparent]",
        "[--hero-cta-secondary-fg:theme(colors.rose.800)] dark:[--hero-cta-secondary-fg:theme(colors.rose.100)]",
        "[--hero-cta-secondary-border:rgba(190,18,60,0.18)] dark:[--hero-cta-secondary-border:rgba(255,255,255,0.14)]",
        "[--hero-cta-secondary-hover-bg:rgba(190,18,60,0.06)] dark:[--hero-cta-secondary-hover-bg:rgba(255,255,255,0.06)]",
        "[--hero-cta-secondary-hover-fg:theme(colors.red.700)] dark:[--hero-cta-secondary-hover-fg:theme(colors.white)]",

        "[--section-bg:linear-gradient(180deg,#fff3f3_0%,#ffe7e7_38%,#fff7f7_100%)] dark:[--section-bg:linear-gradient(180deg,#14090a_0%,#220c10_20%,#1a0a0c_48%,#0f090a_78%,#160b0c_100%)]",
        "[--section-border:rgba(244,114,182,0.18)] dark:[--section-border:theme(colors.red.900)]",

        "[--contact-section-bg:linear-gradient(180deg,#fff1f1_0%,#ffe4e4_40%,#fff7f7_100%)] dark:[--contact-section-bg:linear-gradient(180deg,#14090a_0%,#220c10_20%,#1a0a0c_48%,#0f090a_78%,#160b0c_100%)]",

        "[--contact-submit-bg:theme(colors.red.600)] dark:[--contact-submit-bg:theme(colors.rose.400)]",
        "[--contact-submit-fg:theme(colors.white)] dark:[--contact-submit-fg:theme(colors.red.950)]",
        "[--contact-submit-hover-bg:theme(colors.red.700)] dark:[--contact-submit-hover-bg:theme(colors.rose.300)]",
        "[--contact-submit-hover-fg:theme(colors.white)] dark:[--contact-submit-hover-fg:theme(colors.red.950)]",
        "[--contact-submit-border:transparent]",

        "[--cta-section-bg:linear-gradient(180deg,#fff0f0_0%,#ffe2e2_42%,#fff6f6_100%)] dark:[--cta-section-bg:linear-gradient(180deg,#14090a_0%,#220c10_20%,#1a0a0c_48%,#0f090a_78%,#160b0c_100%)]",
        "[--cta-heading-fg:theme(colors.red.700)] dark:[--cta-heading-fg:theme(colors.white)]",
        "[--cta-subheading-fg:theme(colors.rose.600)] dark:[--cta-subheading-fg:rgba(255,255,255,0.84)]",
        "[--cta-description-fg:theme(colors.rose.700)] dark:[--cta-description-fg:rgba(255,255,255,0.76)]",
        "[--cta-primary-bg:theme(colors.red.600)] dark:[--cta-primary-bg:theme(colors.rose.400)]",
        "[--cta-primary-fg:theme(colors.white)] dark:[--cta-primary-fg:theme(colors.red.950)]",
        "[--cta-primary-hover-bg:theme(colors.red.700)] dark:[--cta-primary-hover-bg:theme(colors.rose.300)]",
        "[--cta-primary-hover-fg:theme(colors.white)] dark:[--cta-primary-hover-fg:theme(colors.red.950)]",
        "[--cta-primary-border:transparent]",
        "[--cta-secondary-bg:transparent]",
        "[--cta-secondary-fg:theme(colors.rose.800)] dark:[--cta-secondary-fg:theme(colors.rose.100)]",
        "[--cta-secondary-border:rgba(190,18,60,0.18)] dark:[--cta-secondary-border:rgba(255,255,255,0.16)]",
        "[--cta-secondary-hover-bg:rgba(190,18,60,0.06)] dark:[--cta-secondary-hover-bg:rgba(255,255,255,0.08)]",
        "[--cta-secondary-hover-fg:theme(colors.red.700)] dark:[--cta-secondary-hover-fg:theme(colors.white)]",

        "[--process-step-bg:theme(colors.red.600)] dark:[--process-step-bg:theme(colors.rose.300)]",
        "[--process-step-fg:theme(colors.white)] dark:[--process-step-fg:theme(colors.red.950)]",
        "[--process-connector:theme(colors.rose.300)] dark:[--process-connector:theme(colors.red.800)]",

        "[--footer-bg:linear-gradient(180deg,rgba(255,245,245,0.54)_0%,rgba(255,236,236,0.18)_100%)] dark:[--footer-bg:linear-gradient(180deg,rgba(24,10,12,0.3)_0%,rgba(10,6,7,0.08)_100%)]",

        "[--footer-fg:theme(colors.rose.800)] dark:[--footer-fg:theme(colors.rose.100)]",
        "[--footer-heading-fg:theme(colors.red.700)] dark:[--footer-heading-fg:theme(colors.white)]",
        "[--footer-link-fg:theme(colors.rose.700)] dark:[--footer-link-fg:theme(colors.rose.300)]",
        "[--footer-link-hover-fg:theme(colors.red.700)] dark:[--footer-link-hover-fg:theme(colors.white)]",
        "[--footer-link-hover-bg:theme(colors.rose.100)] dark:[--footer-link-hover-bg:rgba(255,255,255,0.06)]",
        "[--footer-muted-fg:theme(colors.rose.500)] dark:[--footer-muted-fg:theme(colors.rose.400)]",
        "[--footer-border:theme(colors.rose.200)] dark:[--footer-border:theme(colors.red.900)]",

        "[--table-fg:inherit]",
        "[--table-muted-fg:theme(colors.rose.500)] dark:[--table-muted-fg:theme(colors.rose.400)]",
        "[--table-head-fg:theme(colors.rose.700)] dark:[--table-head-fg:theme(colors.rose.300)]",
        "[--table-border:theme(colors.rose.200)] dark:[--table-border:theme(colors.red.900)]",
        "[--table-row-hover-bg:theme(colors.rose.50)] dark:[--table-row-hover-bg:theme(colors.red.950)]",

        "[--faq-btn-bg:theme(colors.white)] dark:[--faq-btn-bg:theme(colors.red.950)]",
        "[--faq-btn-fg:theme(colors.rose.950)] dark:[--faq-btn-fg:theme(colors.red.50)]",
        "[--faq-btn-hover-bg:theme(colors.rose.50)] dark:[--faq-btn-hover-bg:rgba(255,255,255,0.04)]",
        "[--faq-btn-hover-fg:theme(colors.red.700)] dark:[--faq-btn-hover-fg:theme(colors.white)]",
        "[--faq-answer-bg:theme(colors.white)] dark:[--faq-answer-bg:theme(colors.red.950)]",
        "[--faq-answer-fg:theme(colors.rose.700)] dark:[--faq-answer-fg:theme(colors.rose.200)]",

        className,
      )}
    >
      {children}
    </div>
  );
}
