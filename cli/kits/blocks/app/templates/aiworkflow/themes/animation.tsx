import React from "react";

import { cn } from "@/lib/utils";

type Props = React.PropsWithChildren<{ className?: string }>;

export function PresetThemeVars({ className, children }: Props) {
  return (
    <div
      className={cn(
        "[--btn-ring:theme(colors.amber.300)] dark:[--btn-ring:theme(colors.amber.200)]",

        "[--navbar-bg:rgba(255,255,255,0.92)] dark:[--navbar-bg:linear-gradient(135deg,rgba(2,6,23,0.99)_0%,rgba(15,23,42,0.98)_32%,rgba(29,78,216,0.9)_66%,rgba(146,64,14,0.92)_100%)]",
        "[--navbar-fg:theme(colors.slate.900)] dark:[--navbar-fg:theme(colors.white)]",
        "[--navbar-accent:theme(colors.amber.300)] dark:[--navbar-accent:theme(colors.cyan.200)]",
        "[--navbar-link-fg:rgba(71,85,105,0.95)] dark:[--navbar-link-fg:rgba(226,232,240,0.88)]",
        "[--navbar-link-hover-fg:theme(colors.slate.950)] dark:[--navbar-link-hover-fg:theme(colors.white)]",
        "[--navbar-toggle-bg:rgba(15,23,42,0.06)] dark:[--navbar-toggle-bg:rgba(255,255,255,0.06)]",
        "[--navbar-hover-bg:rgba(59,130,246,0.08)] dark:[--navbar-hover-bg:rgba(34,211,238,0.12)]",
        "[--navbar-ring:theme(colors.blue.400)] dark:[--navbar-ring:theme(colors.amber.300)]",
        "[--navbar-border:rgba(148,163,184,0.18)] dark:[--navbar-border:rgba(255,255,255,0.1)]",

        "[--input-bg:rgba(255,255,255,0.94)] dark:[--input-bg:linear-gradient(180deg,rgba(2,6,23,0.98)_0%,rgba(15,23,42,0.96)_52%,rgba(30,41,59,0.94)_100%)]",
        "[--input-fg:theme(colors.slate.900)] dark:[--input-fg:theme(colors.white)]",
        "[--input-placeholder:rgba(100,116,139,0.82)] dark:[--input-placeholder:rgba(148,163,184,0.68)]",
        "[--input-border:rgba(148,163,184,0.3)] dark:[--input-border:rgba(148,163,184,0.18)]",
        "[--input-focus-ring:theme(colors.amber.300)] dark:[--input-focus-ring:theme(colors.cyan.300)]",
        "[--input-ring-offset:theme(colors.slate.950)] dark:[--input-ring-offset:theme(colors.slate.950)]",

        "[--card-bg:rgba(255,255,255,0.96)] dark:[--card-bg:linear-gradient(180deg,rgba(2,6,23,0.98)_0%,rgba(15,23,42,0.96)_52%,rgba(30,41,59,0.94)_100%)]",
        "[--card-fg:theme(colors.slate.900)] dark:[--card-fg:theme(colors.white)]",
        "[--card-title-fg:theme(colors.slate.900)] dark:[--card-title-fg:theme(colors.white)]",
        "[--card-muted-fg:rgba(71,85,105,0.9)] dark:[--card-muted-fg:rgba(203,213,225,0.82)]",
        "[--card-border:rgba(148,163,184,0.24)] dark:[--card-border:rgba(148,163,184,0.14)]",
        "[--card-shadow:0_28px_90px_rgba(2,6,23,0.48)] dark:[--card-shadow:0_34px_120px_rgba(0,0,0,0.72)]",

        "[--badge-bg:rgba(255,255,255,0.9)] dark:[--badge-bg:linear-gradient(180deg,rgba(15,23,42,0.86)_0%,rgba(30,41,59,0.8)_100%)]",
        "[--badge-fg:theme(colors.slate.900)] dark:[--badge-fg:rgba(255,255,255,0.95)]",
        "[--badge-border:rgba(148,163,184,0.24)] dark:[--badge-border:rgba(148,163,184,0.16)]",
        "[--badge-active-bg:linear-gradient(135deg,theme(colors.blue.500)_0%,theme(colors.amber.300)_52%,theme(colors.cyan.400)_100%)] dark:[--badge-active-bg:linear-gradient(135deg,theme(colors.blue.400)_0%,theme(colors.amber.200)_52%,theme(colors.cyan.300)_100%)]",
        "[--badge-active-fg:theme(colors.slate.950)] dark:[--badge-active-fg:theme(colors.slate.950)]",
        "[--badge-active-border:rgba(255,255,255,0.14)] dark:[--badge-active-border:rgba(255,255,255,0.12)]",

        "[--heading-fg:theme(colors.slate.950)] dark:[--heading-fg:theme(colors.white)]",
        "[--subheading-fg:rgba(37,99,235,0.92)] dark:[--subheading-fg:rgba(125,211,252,0.94)]",
        "[--description-fg:rgba(71,85,105,0.92)] dark:[--description-fg:rgba(226,232,240,0.86)]",

        "[--hero-cta-primary-bg:linear-gradient(135deg,theme(colors.blue.600)_0%,theme(colors.amber.400)_52%,theme(colors.slate.900)_100%)] dark:[--hero-cta-primary-bg:linear-gradient(135deg,theme(colors.blue.500)_0%,theme(colors.amber.300)_52%,theme(colors.slate.900)_100%)]",
        "[--hero-cta-primary-hover-bg:linear-gradient(135deg,theme(colors.amber.400)_0%,theme(colors.blue.600)_36%,theme(colors.cyan.400)_70%,theme(colors.slate.900)_100%)] dark:[--hero-cta-primary-hover-bg:linear-gradient(135deg,theme(colors.amber.300)_0%,theme(colors.blue.500)_36%,theme(colors.cyan.300)_70%,theme(colors.slate.900)_100%)]",
        "[--hero-cta-primary-fg:theme(colors.slate.950)] dark:[--hero-cta-primary-fg:theme(colors.slate.950)]",
        "[--hero-cta-primary-hover-fg:theme(colors.slate.950)] dark:[--hero-cta-primary-hover-fg:theme(colors.slate.950)]",
        "[--hero-cta-secondary-bg:rgba(255,255,255,0.86)] dark:[--hero-cta-secondary-bg:rgba(15,23,42,0.8)]",
        "[--hero-cta-secondary-fg:theme(colors.slate.900)] dark:[--hero-cta-secondary-fg:theme(colors.white)]",
        "[--hero-cta-secondary-border:rgba(148,163,184,0.28)] dark:[--hero-cta-secondary-border:rgba(148,163,184,0.18)]",
        "[--hero-cta-secondary-hover-bg:rgba(255,255,255,0.98)] dark:[--hero-cta-secondary-hover-bg:rgba(30,41,59,0.9)]",
        "[--hero-cta-secondary-hover-fg:theme(colors.white)] dark:[--hero-cta-secondary-hover-fg:theme(colors.white)]",

        "[--demo-shell-bg:linear-gradient(180deg,#020617_0%,#0f172a_26%,#1e3a8a_64%,#78350f_100%)] dark:[--demo-shell-bg:linear-gradient(180deg,#020617_0%,#0f172a_30%,#1e3a8a_64%,#78350f_100%)]",
        "[--demo-shell-muted-bg:#020617] dark:[--demo-shell-muted-bg:#020617]",
        "[--demo-shell-strong-bg:rgba(255,255,255,0.08)] dark:[--demo-shell-strong-bg:rgba(255,255,255,0.06)]",
        "[--demo-panel-bg:linear-gradient(180deg,rgba(2,6,23,0.98)_0%,rgba(15,23,42,0.96)_100%)] dark:[--demo-panel-bg:linear-gradient(180deg,rgba(2,6,23,0.98)_0%,rgba(15,23,42,0.96)_100%)]",
        "[--demo-panel-muted-bg:linear-gradient(180deg,rgba(30,64,175,0.34)_0%,rgba(180,83,9,0.36)_100%)] dark:[--demo-panel-muted-bg:linear-gradient(180deg,rgba(15,23,42,0.92)_0%,rgba(30,41,59,0.9)_100%)]",
        "[--demo-panel-subtle-bg:linear-gradient(180deg,rgba(30,41,59,0.94)_0%,rgba(15,23,42,0.96)_100%)] dark:[--demo-panel-subtle-bg:linear-gradient(180deg,rgba(51,65,85,0.9)_0%,rgba(30,64,175,0.84)_100%)]",
        "[--demo-panel-strong-bg:rgba(255,255,255,0.08)] dark:[--demo-panel-strong-bg:rgba(255,255,255,0.06)]",
        "[--demo-code-bg:linear-gradient(180deg,rgba(2,6,23,0.98)_0%,rgba(15,23,42,0.96)_100%)] dark:[--demo-code-bg:linear-gradient(180deg,rgba(2,6,23,0.99)_0%,rgba(15,23,42,0.98)_100%)]",
        "[--demo-code-gutter-bg:linear-gradient(180deg,rgba(15,23,42,0.98)_0%,rgba(30,64,175,0.9)_100%)] dark:[--demo-code-gutter-bg:linear-gradient(180deg,rgba(2,6,23,0.98)_0%,rgba(30,41,59,0.96)_100%)]",
        "[--demo-border:rgba(148,163,184,0.22)] dark:[--demo-border:rgba(148,163,184,0.12)]",
        "[--demo-border-strong:rgba(251,191,36,0.18)] dark:[--demo-border-strong:rgba(96,165,250,0.2)]",
        "[--demo-fg:rgba(255,255,255,0.98)] dark:[--demo-fg:rgba(255,255,255,0.98)]",
        "[--demo-muted-fg:rgba(226,232,240,0.9)] dark:[--demo-muted-fg:rgba(226,232,240,0.86)]",
        "[--demo-subtle-fg:rgba(191,219,254,0.94)] dark:[--demo-subtle-fg:rgba(147,197,253,0.9)]",
        "[--demo-accent:theme(colors.amber.300)] dark:[--demo-accent:theme(colors.cyan.200)]",
        "[--demo-accent-soft-bg:rgba(251,191,36,0.1)] dark:[--demo-accent-soft-bg:rgba(34,211,238,0.12)]",
        "[--demo-info:theme(colors.blue.300)] dark:[--demo-info:theme(colors.cyan.200)]",
        "[--demo-info-border:rgba(96,165,250,0.28)] dark:[--demo-info-border:rgba(103,232,249,0.22)]",
        "[--demo-info-soft-bg:rgba(59,130,246,0.1)] dark:[--demo-info-soft-bg:rgba(34,211,238,0.08)]",
        "[--demo-success:theme(colors.green.300)] dark:[--demo-success:theme(colors.green.300)]",
        "[--demo-success-border:rgba(74,222,128,0.24)] dark:[--demo-success-border:rgba(110,231,183,0.18)]",
        "[--demo-success-soft-bg:rgba(34,197,94,0.1)] dark:[--demo-success-soft-bg:rgba(16,185,129,0.08)]",
        "[--demo-warning:theme(colors.amber.300)] dark:[--demo-warning:theme(colors.amber.300)]",
        "[--demo-warning-border:rgba(251,191,36,0.28)] dark:[--demo-warning-border:rgba(251,191,36,0.2)]",
        "[--demo-warning-soft-bg:rgba(245,158,11,0.1)] dark:[--demo-warning-soft-bg:rgba(245,158,11,0.08)]",
        "[--demo-danger:theme(colors.red.300)] dark:[--demo-danger:theme(colors.red.300)]",
        "[--demo-danger-border:rgba(248,113,113,0.28)] dark:[--demo-danger-border:rgba(251,113,133,0.2)]",
        "[--demo-danger-soft-bg:rgba(239,68,68,0.1)] dark:[--demo-danger-soft-bg:rgba(244,63,94,0.08)]",
        "[--demo-scroll-track:rgba(148,163,184,0.14)] dark:[--demo-scroll-track:rgba(148,163,184,0.08)]",
        "[--demo-scroll-thumb:linear-gradient(180deg,rgba(59,130,246,0.82),rgba(251,191,36,0.82),rgba(34,211,238,0.82))] dark:[--demo-scroll-thumb:linear-gradient(180deg,rgba(59,130,246,0.64),rgba(251,191,36,0.64),rgba(34,211,238,0.64))]",
        "[--demo-shell-shadow:0_34px_120px_-48px_rgba(2,6,23,0.75)] dark:[--demo-shell-shadow:0_40px_140px_-56px_rgba(0,0,0,0.92)]",
        "[--demo-shell-ring:rgba(251,191,36,0.18)] dark:[--demo-shell-ring:rgba(96,165,250,0.14)]",

        "[--section-bg:radial-gradient(circle_at_top,rgba(59,130,246,0.08)_0%,rgba(14,165,233,0.06)_18%,rgba(251,191,36,0.06)_34%,rgba(248,250,252,1)_62%,rgba(241,245,249,1)_100%)] dark:[--section-bg:radial-gradient(circle_at_top,rgba(59,130,246,0.14)_0%,rgba(14,165,233,0.08)_18%,rgba(251,191,36,0.1)_34%,rgba(2,6,23,0.72)_62%,rgba(2,6,23,1)_100%)]",

        "[--section-border:rgba(148,163,184,0.18)] dark:[--section-border:rgba(148,163,184,0.1)]",

        "[--contact-section-bg:radial-gradient(circle_at_top,rgba(59,130,246,0.06)_0%,rgba(251,191,36,0.06)_24%,rgba(239,68,68,0.05)_46%,rgba(248,250,252,1)_74%,rgba(241,245,249,1)_100%)] dark:[--contact-section-bg:radial-gradient(circle_at_top,rgba(59,130,246,0.1)_0%,rgba(251,191,36,0.08)_24%,rgba(239,68,68,0.08)_46%,rgba(2,6,23,0.94)_74%,rgba(2,6,23,1)_100%)]",

        "[--contact-submit-bg:linear-gradient(135deg,theme(colors.blue.600)_0%,theme(colors.amber.400)_28%,theme(colors.cyan.400)_58%,theme(colors.slate.900)_100%)] dark:[--contact-submit-bg:linear-gradient(135deg,theme(colors.blue.500)_0%,theme(colors.amber.300)_28%,theme(colors.cyan.300)_58%,theme(colors.slate.900)_100%)]",
        "[--contact-submit-fg:theme(colors.slate.950)] dark:[--contact-submit-fg:theme(colors.slate.950)]",
        "[--contact-submit-hover-bg:linear-gradient(135deg,theme(colors.amber.400)_0%,theme(colors.blue.600)_28%,theme(colors.cyan.400)_58%,theme(colors.slate.900)_100%)] dark:[--contact-submit-hover-bg:linear-gradient(135deg,theme(colors.amber.300)_0%,theme(colors.blue.500)_28%,theme(colors.cyan.300)_58%,theme(colors.slate.900)_100%)]",
        "[--contact-submit-hover-fg:theme(colors.slate.950)] dark:[--contact-submit-hover-fg:theme(colors.slate.950)]",
        "[--contact-submit-border:transparent]",

        "[--cta-section-bg:radial-gradient(circle_at_top,rgba(59,130,246,0.06)_0%,rgba(251,191,36,0.06)_18%,rgba(14,165,233,0.05)_36%,rgba(99,102,241,0.06)_56%,rgba(248,250,252,1)_78%,rgba(241,245,249,1)_100%)] dark:[--cta-section-bg:radial-gradient(circle_at_top,rgba(59,130,246,0.1)_0%,rgba(251,191,36,0.08)_18%,rgba(14,165,233,0.08)_36%,rgba(99,102,241,0.1)_56%,rgba(2,6,23,0.98)_78%,rgba(2,6,23,1)_100%)]",
        "[--cta-heading-fg:theme(colors.slate.950)] dark:[--cta-heading-fg:theme(colors.white)]",
        "[--cta-subheading-fg:rgba(37,99,235,0.9)] dark:[--cta-subheading-fg:rgba(125,211,252,0.88)]",
        "[--cta-description-fg:rgba(71,85,105,0.92)] dark:[--cta-description-fg:rgba(226,232,240,0.86)]",
        "[--cta-primary-bg:linear-gradient(135deg,theme(colors.blue.600)_0%,theme(colors.amber.400)_50%,theme(colors.slate.900)_100%)] dark:[--cta-primary-bg:linear-gradient(135deg,theme(colors.blue.500)_0%,theme(colors.amber.300)_50%,theme(colors.slate.900)_100%)]",
        "[--cta-primary-fg:theme(colors.slate.950)] dark:[--cta-primary-fg:theme(colors.slate.950)]",
        "[--cta-primary-hover-bg:linear-gradient(135deg,theme(colors.amber.400)_0%,theme(colors.blue.600)_34%,theme(colors.cyan.400)_68%,theme(colors.slate.900)_100%)] dark:[--cta-primary-hover-bg:linear-gradient(135deg,theme(colors.amber.300)_0%,theme(colors.blue.500)_34%,theme(colors.cyan.300)_68%,theme(colors.slate.900)_100%)]",
        "[--cta-primary-hover-fg:theme(colors.slate.950)] dark:[--cta-primary-hover-fg:theme(colors.slate.950)]",
        "[--cta-primary-border:transparent]",
        "[--cta-secondary-bg:rgba(255,255,255,0.86)]",
        "[--cta-secondary-fg:theme(colors.slate.900)] dark:[--cta-secondary-fg:theme(colors.white)]",
        "[--cta-secondary-border:rgba(148,163,184,0.26)] dark:[--cta-secondary-border:rgba(148,163,184,0.16)]",
        "[--cta-secondary-hover-bg:rgba(255,255,255,0.98)] dark:[--cta-secondary-hover-bg:rgba(30,41,59,0.86)]",
        "[--cta-secondary-hover-fg:theme(colors.slate.900)] dark:[--cta-secondary-hover-fg:theme(colors.white)]",

        "[--process-step-bg:linear-gradient(135deg,theme(colors.blue.600)_0%,theme(colors.amber.400)_48%,theme(colors.cyan.400)_100%)] dark:[--process-step-bg:linear-gradient(135deg,theme(colors.blue.500)_0%,theme(colors.amber.300)_48%,theme(colors.cyan.300)_100%)]",
        "[--process-step-fg:theme(colors.slate.950)] dark:[--process-step-fg:theme(colors.slate.950)]",
        "[--process-connector:rgba(148,163,184,0.24)] dark:[--process-connector:rgba(148,163,184,0.22)]",

        "[--footer-bg:linear-gradient(180deg,rgba(248,250,252,1)_0%,rgba(241,245,249,1)_34%,rgba(226,232,240,1)_68%,rgba(248,250,252,1)_100%)] dark:[--footer-bg:linear-gradient(180deg,rgba(2,6,23,0.9)_0%,rgba(15,23,42,0.92)_34%,rgba(30,41,59,0.88)_68%,rgba(2,6,23,0.98)_100%)]",

        "[--footer-fg:rgba(71,85,105,0.92)] dark:[--footer-fg:rgba(226,232,240,0.88)]",
        "[--footer-heading-fg:theme(colors.slate.900)] dark:[--footer-heading-fg:theme(colors.white)]",
        "[--footer-link-fg:rgba(51,65,85,0.9)] dark:[--footer-link-fg:rgba(203,213,225,0.86)]",
        "[--footer-link-hover-fg:theme(colors.slate.950)] dark:[--footer-link-hover-fg:theme(colors.white)]",
        "[--footer-link-hover-bg:rgba(59,130,246,0.06)] dark:[--footer-link-hover-bg:rgba(255,255,255,0.06)]",
        "[--footer-muted-fg:rgba(37,99,235,0.76)] dark:[--footer-muted-fg:rgba(148,163,184,0.76)]",
        "[--footer-border:rgba(148,163,184,0.18)] dark:[--footer-border:rgba(148,163,184,0.08)]",

        "[--table-fg:theme(colors.slate.900)]",
        "[--table-muted-fg:rgba(71,85,105,0.88)] dark:[--table-muted-fg:rgba(148,163,184,0.8)]",
        "[--table-head-fg:theme(colors.slate.900)] dark:[--table-head-fg:rgba(191,219,254,0.96)]",
        "[--table-border:rgba(148,163,184,0.18)] dark:[--table-border:rgba(148,163,184,0.1)]",
        "[--table-row-hover-bg:rgba(59,130,246,0.1)] dark:[--table-row-hover-bg:rgba(34,211,238,0.06)]",

        "[--faq-btn-bg:rgba(255,255,255,0.88)] dark:[--faq-btn-bg:rgba(15,23,42,0.72)]",
        "[--faq-btn-fg:theme(colors.slate.900)] dark:[--faq-btn-fg:theme(colors.white)]",
        "[--faq-btn-hover-bg:rgba(255,255,255,0.98)] dark:[--faq-btn-hover-bg:rgba(30,41,59,0.86)]",
        "[--faq-btn-hover-fg:theme(colors.slate.900)] dark:[--faq-btn-hover-fg:theme(colors.white)]",
        "[--faq-answer-bg:rgba(255,255,255,0.96)] dark:[--faq-answer-bg:linear-gradient(180deg,rgba(2,6,23,0.98)_0%,rgba(15,23,42,0.96)_100%)]",
        "[--faq-answer-fg:theme(colors.slate.900)] dark:[--faq-answer-fg:rgba(241,245,249,0.92)]",

        className,
      )}
    >
      {children}
    </div>
  );
}
