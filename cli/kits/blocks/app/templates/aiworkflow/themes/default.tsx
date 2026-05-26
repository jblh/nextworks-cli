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

        "[--demo-shell-bg:#f9fbfe] dark:[--demo-shell-bg:#050505]",
        "[--demo-shell-muted-bg:#eef3f8] dark:[--demo-shell-muted-bg:#060606]",
        "[--demo-shell-strong-bg:#ffffff] dark:[--demo-shell-strong-bg:rgba(255,255,255,0.06)]",
        "[--demo-panel-bg:rgba(255,255,255,0.76)] dark:[--demo-panel-bg:rgba(255,255,255,0.03)]",
        "[--demo-panel-muted-bg:#f4f5f1] dark:[--demo-panel-muted-bg:#090909]",
        "[--demo-panel-subtle-bg:#eef0eb] dark:[--demo-panel-subtle-bg:#0b0b0b]",
        "[--demo-panel-strong-bg:#f6f7f4] dark:[--demo-panel-strong-bg:#0a0a0a]",
        "[--demo-code-bg:#f7f7f4] dark:[--demo-code-bg:#0b0b0b]",
        "[--demo-code-gutter-bg:#eff1ec] dark:[--demo-code-gutter-bg:#0d0d0d]",
        "[--demo-border:rgba(15,23,42,0.055)] dark:[--demo-border:rgba(255,255,255,0.07)]",
        "[--demo-border-strong:rgba(15,23,42,0.08)] dark:[--demo-border-strong:rgba(255,255,255,0.11)]",
        "[--demo-fg:theme(colors.slate.900)] dark:[--demo-fg:rgba(255,255,255,0.94)]",
        "[--demo-muted-fg:theme(colors.slate.600)] dark:[--demo-muted-fg:rgba(255,255,255,0.58)]",
        "[--demo-subtle-fg:theme(colors.slate.500)] dark:[--demo-subtle-fg:rgba(255,255,255,0.42)]",
        "[--demo-accent:theme(colors.sky.600)] dark:[--demo-accent:theme(colors.sky.400)]",
        "[--demo-accent-soft-bg:rgba(2,132,199,0.1)] dark:[--demo-accent-soft-bg:rgba(56,189,248,0.14)]",
        "[--demo-info:theme(colors.sky.600)] dark:[--demo-info:theme(colors.sky.300)]",
        "[--demo-info-border:rgba(2,132,199,0.24)] dark:[--demo-info-border:rgba(125,211,252,0.28)]",
        "[--demo-info-soft-bg:rgba(2,132,199,0.08)] dark:[--demo-info-soft-bg:rgba(56,189,248,0.12)]",
        "[--demo-success:theme(colors.emerald.600)] dark:[--demo-success:theme(colors.emerald.300)]",
        "[--demo-success-border:rgba(5,150,105,0.24)] dark:[--demo-success-border:rgba(110,231,183,0.26)]",
        "[--demo-success-soft-bg:rgba(16,185,129,0.08)] dark:[--demo-success-soft-bg:rgba(16,185,129,0.12)]",
        "[--demo-warning:theme(colors.amber.700)] dark:[--demo-warning:theme(colors.amber.300)]",
        "[--demo-warning-border:rgba(217,119,6,0.24)] dark:[--demo-warning-border:rgba(252,211,77,0.26)]",
        "[--demo-warning-soft-bg:rgba(245,158,11,0.1)] dark:[--demo-warning-soft-bg:rgba(245,158,11,0.14)]",
        "[--demo-danger:theme(colors.rose.600)] dark:[--demo-danger:theme(colors.rose.300)]",
        "[--demo-danger-border:rgba(225,29,72,0.24)] dark:[--demo-danger-border:rgba(253,164,175,0.28)]",
        "[--demo-danger-soft-bg:rgba(244,63,94,0.08)] dark:[--demo-danger-soft-bg:rgba(251,113,133,0.14)]",
        "[--demo-scroll-track:rgba(15,23,42,0.045)] dark:[--demo-scroll-track:rgba(255,255,255,0.05)]",
        "[--demo-scroll-thumb:linear-gradient(180deg,rgba(15,23,42,0.26),rgba(15,23,42,0.42))] dark:[--demo-scroll-thumb:linear-gradient(180deg,rgba(226,232,240,0.24),rgba(226,232,240,0.4))]",
        "[--demo-shell-shadow:0_24px_80px_-44px_rgba(15,23,42,0.24)] dark:[--demo-shell-shadow:0_30px_100px_-52px_rgba(0,0,0,0.82)]",
        "[--demo-shell-ring:rgba(15,23,42,0.018)] dark:[--demo-shell-ring:rgba(255,255,255,0.03)]",

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
