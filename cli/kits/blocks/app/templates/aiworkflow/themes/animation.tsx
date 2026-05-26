import React from "react";

import { cn } from "@/lib/utils";

type Props = React.PropsWithChildren<{ className?: string }>;

export function PresetThemeVars({ className, children }: Props) {
  return (
    <div
      className={cn(
        "[--btn-ring:theme(colors.yellow.300)] dark:[--btn-ring:theme(colors.yellow.200)]",

        "[--navbar-bg:linear-gradient(135deg,rgba(11,19,74,0.92)_0%,rgba(164,28,28,0.88)_34%,rgba(245,158,11,0.84)_68%,rgba(29,78,216,0.9)_100%)] dark:[--navbar-bg:linear-gradient(135deg,rgba(8,12,26,0.96)_0%,rgba(96,15,15,0.92)_34%,rgba(161,98,7,0.9)_68%,rgba(30,64,175,0.94)_100%)]",
        "[--navbar-fg:theme(colors.white)] dark:[--navbar-fg:theme(colors.white)]",
        "[--navbar-accent:theme(colors.yellow.300)] dark:[--navbar-accent:theme(colors.cyan.200)]",
        "[--navbar-link-fg:rgba(255,241,242,0.92)] dark:[--navbar-link-fg:rgba(224,242,254,0.9)]",
        "[--navbar-link-hover-fg:theme(colors.white)] dark:[--navbar-link-hover-fg:theme(colors.white)]",
        "[--navbar-toggle-bg:rgba(255,255,255,0.18)] dark:[--navbar-toggle-bg:rgba(255,255,255,0.12)]",
        "[--navbar-hover-bg:color-mix(in_oklab,theme(colors.red.500)_22%,transparent)] dark:[--navbar-hover-bg:color-mix(in_oklab,theme(colors.blue.400)_20%,transparent)]",
        "[--navbar-ring:theme(colors.red.400)] dark:[--navbar-ring:theme(colors.yellow.300)]",
        "[--navbar-border:rgba(255,255,255,0.22)] dark:[--navbar-border:rgba(255,255,255,0.14)]",

        "[--input-bg:linear-gradient(180deg,rgba(30,64,175,0.95)_0%,rgba(190,24,93,0.9)_52%,rgba(245,158,11,0.9)_100%)] dark:[--input-bg:linear-gradient(180deg,rgba(17,24,39,0.96)_0%,rgba(30,41,59,0.92)_52%,rgba(91,33,182,0.9)_100%)]",
        "[--input-fg:theme(colors.white)] dark:[--input-fg:theme(colors.white)]",
        "[--input-placeholder:rgba(255,255,255,0.78)] dark:[--input-placeholder:rgba(226,232,240,0.72)]",
        "[--input-border:rgba(255,255,255,0.24)] dark:[--input-border:rgba(255,255,255,0.16)]",
        "[--input-focus-ring:theme(colors.yellow.300)] dark:[--input-focus-ring:theme(colors.cyan.300)]",
        "[--input-ring-offset:theme(colors.slate.950)] dark:[--input-ring-offset:theme(colors.slate.950)]",

        "[--card-bg:linear-gradient(180deg,rgba(220,38,38,0.9)_0%,rgba(29,78,216,0.84)_48%,rgba(245,158,11,0.82)_100%)] dark:[--card-bg:linear-gradient(180deg,rgba(15,23,42,0.98)_0%,rgba(126,34,206,0.92)_52%,rgba(30,64,175,0.95)_100%)]",
        "[--card-fg:theme(colors.white)] dark:[--card-fg:theme(colors.white)]",
        "[--card-title-fg:theme(colors.white)] dark:[--card-title-fg:theme(colors.white)]",
        "[--card-muted-fg:rgba(255,247,237,0.88)] dark:[--card-muted-fg:rgba(224,231,255,0.86)]",
        "[--card-border:rgba(255,255,255,0.22)] dark:[--card-border:rgba(255,255,255,0.14)]",
        "[--card-shadow:0_24px_70px_rgba(30,64,175,0.36)] dark:[--card-shadow:0_28px_90px_rgba(0,0,0,0.55)]",

        "[--badge-bg:linear-gradient(180deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.08)_100%)] dark:[--badge-bg:linear-gradient(180deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.05)_100%)]",
        "[--badge-fg:rgba(255,255,255,0.96)] dark:[--badge-fg:rgba(255,255,255,0.96)]",
        "[--badge-border:rgba(255,255,255,0.24)] dark:[--badge-border:rgba(255,255,255,0.16)]",
        "[--badge-active-bg:linear-gradient(135deg,theme(colors.red.500)_0%,theme(colors.yellow.400)_48%,theme(colors.blue.500)_100%)] dark:[--badge-active-bg:linear-gradient(135deg,theme(colors.red.400)_0%,theme(colors.yellow.300)_48%,theme(colors.blue.400)_100%)]",
        "[--badge-active-fg:theme(colors.white)] dark:[--badge-active-fg:theme(colors.white)]",
        "[--badge-active-border:rgba(255,255,255,0.16)] dark:[--badge-active-border:rgba(255,255,255,0.14)]",

        "[--heading-fg:theme(colors.white)] dark:[--heading-fg:theme(colors.white)]",
        "[--subheading-fg:rgba(254,240,138,0.95)] dark:[--subheading-fg:rgba(147,197,253,0.95)]",
        "[--description-fg:rgba(255,247,237,0.92)] dark:[--description-fg:rgba(224,242,254,0.88)]",

        "[--hero-cta-primary-bg:linear-gradient(135deg,theme(colors.red.500)_0%,theme(colors.yellow.400)_50%,theme(colors.blue.500)_100%)] dark:[--hero-cta-primary-bg:linear-gradient(135deg,theme(colors.red.400)_0%,theme(colors.yellow.300)_50%,theme(colors.blue.400)_100%)]",
        "[--hero-cta-primary-hover-bg:linear-gradient(135deg,theme(colors.yellow.400)_0%,theme(colors.red.500)_34%,theme(colors.blue.500)_68%,theme(colors.green.400)_100%)] dark:[--hero-cta-primary-hover-bg:linear-gradient(135deg,theme(colors.yellow.300)_0%,theme(colors.red.400)_34%,theme(colors.blue.400)_68%,theme(colors.green.300)_100%)]",
        "[--hero-cta-primary-fg:theme(colors.slate.950)] dark:[--hero-cta-primary-fg:theme(colors.slate.950)]",
        "[--hero-cta-primary-hover-fg:theme(colors.slate.950)] dark:[--hero-cta-primary-hover-fg:theme(colors.slate.950)]",
        "[--hero-cta-secondary-bg:rgba(255,255,255,0.12)] dark:[--hero-cta-secondary-bg:rgba(255,255,255,0.08)]",
        "[--hero-cta-secondary-fg:theme(colors.white)] dark:[--hero-cta-secondary-fg:theme(colors.white)]",
        "[--hero-cta-secondary-border:rgba(255,255,255,0.22)] dark:[--hero-cta-secondary-border:rgba(255,255,255,0.16)]",
        "[--hero-cta-secondary-hover-bg:rgba(255,255,255,0.2)] dark:[--hero-cta-secondary-hover-bg:rgba(255,255,255,0.12)]",
        "[--hero-cta-secondary-hover-fg:theme(colors.white)] dark:[--hero-cta-secondary-hover-fg:theme(colors.white)]",

        "[--demo-shell-bg:linear-gradient(180deg,#1d1a64_0%,#c026d3_34%,#dc2626_66%,#f59e0b_100%)] dark:[--demo-shell-bg:linear-gradient(180deg,#0f172a_0%,#312e81_34%,#7c2d12_66%,#1e3a8a_100%)]",
        "[--demo-shell-muted-bg:#2563eb] dark:[--demo-shell-muted-bg:#0f172a]",
        "[--demo-shell-strong-bg:rgba(255,255,255,0.14)] dark:[--demo-shell-strong-bg:rgba(255,255,255,0.08)]",
        "[--demo-panel-bg:linear-gradient(180deg,rgba(37,99,235,0.82)_0%,rgba(217,70,239,0.8)_100%)] dark:[--demo-panel-bg:linear-gradient(180deg,rgba(15,23,42,0.9)_0%,rgba(30,41,59,0.88)_100%)]",
        "[--demo-panel-muted-bg:linear-gradient(180deg,rgba(220,38,38,0.68)_0%,rgba(59,130,246,0.72)_100%)] dark:[--demo-panel-muted-bg:linear-gradient(180deg,rgba(30,41,59,0.94)_0%,rgba(124,58,237,0.9)_100%)]",
        "[--demo-panel-subtle-bg:linear-gradient(180deg,rgba(250,204,21,0.58)_0%,rgba(59,130,246,0.7)_100%)] dark:[--demo-panel-subtle-bg:linear-gradient(180deg,rgba(51,65,85,0.94)_0%,rgba(30,64,175,0.9)_100%)]",
        "[--demo-panel-strong-bg:rgba(255,255,255,0.16)] dark:[--demo-panel-strong-bg:rgba(255,255,255,0.08)]",
        "[--demo-code-bg:linear-gradient(180deg,rgba(30,64,175,0.96)_0%,rgba(190,24,93,0.94)_100%)] dark:[--demo-code-bg:linear-gradient(180deg,rgba(3,7,18,0.98)_0%,rgba(30,41,59,0.98)_100%)]",
        "[--demo-code-gutter-bg:linear-gradient(180deg,rgba(37,99,235,0.98)_0%,rgba(234,88,12,0.94)_100%)] dark:[--demo-code-gutter-bg:linear-gradient(180deg,rgba(15,23,42,0.98)_0%,rgba(55,48,163,0.98)_100%)]",
        "[--demo-border:rgba(255,255,255,0.24)] dark:[--demo-border:rgba(255,255,255,0.14)]",
        "[--demo-border-strong:rgba(255,255,255,0.34)] dark:[--demo-border-strong:rgba(255,255,255,0.2)]",
        "[--demo-fg:rgba(255,255,255,0.98)] dark:[--demo-fg:rgba(255,255,255,0.98)]",
        "[--demo-muted-fg:rgba(255,255,255,0.9)] dark:[--demo-muted-fg:rgba(224,231,255,0.9)]",
        "[--demo-subtle-fg:rgba(255,255,255,0.86)] dark:[--demo-subtle-fg:rgba(191,219,254,0.88)]",
        "[--demo-accent:theme(colors.yellow.300)] dark:[--demo-accent:theme(colors.cyan.200)]",
        "[--demo-accent-soft-bg:rgba(250,204,21,0.2)] dark:[--demo-accent-soft-bg:rgba(34,211,238,0.14)]",
        "[--demo-info:theme(colors.blue.300)] dark:[--demo-info:theme(colors.cyan.200)]",
        "[--demo-info-border:rgba(96,165,250,0.34)] dark:[--demo-info-border:rgba(103,232,249,0.24)]",
        "[--demo-info-soft-bg:rgba(59,130,246,0.16)] dark:[--demo-info-soft-bg:rgba(34,211,238,0.1)]",
        "[--demo-success:theme(colors.green.300)] dark:[--demo-success:theme(colors.green.300)]",
        "[--demo-success-border:rgba(74,222,128,0.28)] dark:[--demo-success-border:rgba(110,231,183,0.22)]",
        "[--demo-success-soft-bg:rgba(34,197,94,0.16)] dark:[--demo-success-soft-bg:rgba(16,185,129,0.1)]",
        "[--demo-warning:theme(colors.yellow.300)] dark:[--demo-warning:theme(colors.yellow.300)]",
        "[--demo-warning-border:rgba(250,204,21,0.32)] dark:[--demo-warning-border:rgba(252,211,77,0.22)]",
        "[--demo-warning-soft-bg:rgba(245,158,11,0.14)] dark:[--demo-warning-soft-bg:rgba(245,158,11,0.1)]",
        "[--demo-danger:theme(colors.red.300)] dark:[--demo-danger:theme(colors.red.300)]",
        "[--demo-danger-border:rgba(248,113,113,0.32)] dark:[--demo-danger-border:rgba(251,113,133,0.22)]",
        "[--demo-danger-soft-bg:rgba(239,68,68,0.14)] dark:[--demo-danger-soft-bg:rgba(244,63,94,0.1)]",
        "[--demo-scroll-track:rgba(255,255,255,0.12)] dark:[--demo-scroll-track:rgba(255,255,255,0.08)]",
        "[--demo-scroll-thumb:linear-gradient(180deg,rgba(34,211,238,0.75),rgba(245,158,11,0.8),rgba(239,68,68,0.82))] dark:[--demo-scroll-thumb:linear-gradient(180deg,rgba(34,211,238,0.58),rgba(245,158,11,0.66),rgba(239,68,68,0.7))]",
        "[--demo-shell-shadow:0_30px_110px_-44px_rgba(30,64,175,0.6)] dark:[--demo-shell-shadow:0_34px_130px_-50px_rgba(0,0,0,0.92)]",
        "[--demo-shell-ring:rgba(255,255,255,0.16)] dark:[--demo-shell-ring:rgba(255,255,255,0.1)]",

        "[--section-bg:radial-gradient(circle_at_top,rgba(255,214,10,0.2)_0%,rgba(239,68,68,0.2)_20%,rgba(59,130,246,0.18)_40%,rgba(124,58,237,0.36)_62%,rgba(3,7,18,1)_100%)] dark:[--section-bg:radial-gradient(circle_at_top,rgba(34,211,238,0.16)_0%,rgba(239,68,68,0.16)_20%,rgba(59,130,246,0.14)_40%,rgba(124,58,237,0.34)_62%,rgba(2,5,12,1)_100%)]",

        "[--section-border:rgba(255,255,255,0.18)] dark:[--section-border:rgba(255,255,255,0.12)]",

        "[--contact-section-bg:radial-gradient(circle_at_top,rgba(34,211,238,0.2)_0%,rgba(250,204,21,0.18)_24%,rgba(239,68,68,0.18)_46%,rgba(9,15,35,0.98)_74%,rgba(3,7,18,1)_100%)] dark:[--contact-section-bg:radial-gradient(circle_at_top,rgba(34,211,238,0.14)_0%,rgba(250,204,21,0.12)_24%,rgba(239,68,68,0.12)_46%,rgba(6,10,24,0.99)_74%,rgba(2,5,12,1)_100%)]",

        "[--contact-submit-bg:linear-gradient(135deg,theme(colors.red.500)_0%,theme(colors.yellow.400)_26%,theme(colors.green.400)_58%,theme(colors.blue.500)_100%)] dark:[--contact-submit-bg:linear-gradient(135deg,theme(colors.red.400)_0%,theme(colors.yellow.300)_26%,theme(colors.green.300)_58%,theme(colors.blue.400)_100%)]",
        "[--contact-submit-fg:theme(colors.slate.950)] dark:[--contact-submit-fg:theme(colors.slate.950)]",
        "[--contact-submit-hover-bg:linear-gradient(135deg,theme(colors.yellow.400)_0%,theme(colors.red.500)_26%,theme(colors.blue.500)_58%,theme(colors.green.400)_100%)] dark:[--contact-submit-hover-bg:linear-gradient(135deg,theme(colors.yellow.300)_0%,theme(colors.red.400)_26%,theme(colors.blue.400)_58%,theme(colors.green.300)_100%)]",
        "[--contact-submit-hover-fg:theme(colors.slate.950)] dark:[--contact-submit-hover-fg:theme(colors.slate.950)]",
        "[--contact-submit-border:transparent]",

        "[--cta-section-bg:radial-gradient(circle_at_top,rgba(250,204,21,0.22)_0%,rgba(239,68,68,0.18)_18%,rgba(59,130,246,0.16)_36%,rgba(217,70,239,0.2)_56%,rgba(8,12,28,0.98)_78%,rgba(2,5,12,1)_100%)] dark:[--cta-section-bg:radial-gradient(circle_at_top,rgba(250,204,21,0.14)_0%,rgba(239,68,68,0.12)_18%,rgba(59,130,246,0.12)_36%,rgba(217,70,239,0.14)_56%,rgba(6,10,24,0.99)_78%,rgba(2,5,12,1)_100%)]",
        "[--cta-heading-fg:theme(colors.white)] dark:[--cta-heading-fg:theme(colors.white)]",
        "[--cta-subheading-fg:rgba(254,240,138,0.92)] dark:[--cta-subheading-fg:rgba(191,219,254,0.9)]",
        "[--cta-description-fg:rgba(255,247,237,0.9)] dark:[--cta-description-fg:rgba(224,242,254,0.86)]",
        "[--cta-primary-bg:linear-gradient(135deg,theme(colors.red.500)_0%,theme(colors.yellow.400)_48%,theme(colors.blue.500)_100%)] dark:[--cta-primary-bg:linear-gradient(135deg,theme(colors.red.400)_0%,theme(colors.yellow.300)_48%,theme(colors.blue.400)_100%)]",
        "[--cta-primary-fg:theme(colors.slate.950)] dark:[--cta-primary-fg:theme(colors.slate.950)]",
        "[--cta-primary-hover-bg:linear-gradient(135deg,theme(colors.yellow.400)_0%,theme(colors.red.500)_30%,theme(colors.blue.500)_68%,theme(colors.green.400)_100%)] dark:[--cta-primary-hover-bg:linear-gradient(135deg,theme(colors.yellow.300)_0%,theme(colors.red.400)_30%,theme(colors.blue.400)_68%,theme(colors.green.300)_100%)]",
        "[--cta-primary-hover-fg:theme(colors.slate.950)] dark:[--cta-primary-hover-fg:theme(colors.slate.950)]",
        "[--cta-primary-border:transparent]",
        "[--cta-secondary-bg:rgba(255,255,255,0.12)]",
        "[--cta-secondary-fg:theme(colors.white)] dark:[--cta-secondary-fg:theme(colors.white)]",
        "[--cta-secondary-border:rgba(255,255,255,0.22)] dark:[--cta-secondary-border:rgba(255,255,255,0.14)]",
        "[--cta-secondary-hover-bg:rgba(255,255,255,0.2)] dark:[--cta-secondary-hover-bg:rgba(255,255,255,0.1)]",
        "[--cta-secondary-hover-fg:theme(colors.white)] dark:[--cta-secondary-hover-fg:theme(colors.white)]",

        "[--process-step-bg:linear-gradient(135deg,theme(colors.red.500)_0%,theme(colors.yellow.400)_48%,theme(colors.blue.500)_100%)] dark:[--process-step-bg:linear-gradient(135deg,theme(colors.red.400)_0%,theme(colors.yellow.300)_48%,theme(colors.blue.400)_100%)]",
        "[--process-step-fg:theme(colors.slate.950)] dark:[--process-step-fg:theme(colors.slate.950)]",
        "[--process-connector:rgba(255,255,255,0.34)] dark:[--process-connector:rgba(255,255,255,0.26)]",

        "[--footer-bg:linear-gradient(180deg,rgba(255,255,255,0.1)_0%,rgba(59,130,246,0.12)_34%,rgba(239,68,68,0.1)_68%,rgba(255,255,255,0.04)_100%)] dark:[--footer-bg:linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(37,99,235,0.08)_34%,rgba(220,38,38,0.06)_68%,rgba(255,255,255,0.02)_100%)]",

        "[--footer-fg:rgba(255,247,237,0.9)] dark:[--footer-fg:rgba(224,242,254,0.88)]",
        "[--footer-heading-fg:theme(colors.white)] dark:[--footer-heading-fg:theme(colors.white)]",
        "[--footer-link-fg:rgba(255,255,255,0.86)] dark:[--footer-link-fg:rgba(224,242,254,0.84)]",
        "[--footer-link-hover-fg:theme(colors.white)] dark:[--footer-link-hover-fg:theme(colors.white)]",
        "[--footer-link-hover-bg:rgba(255,255,255,0.12)] dark:[--footer-link-hover-bg:rgba(255,255,255,0.08)]",
        "[--footer-muted-fg:rgba(254,240,138,0.82)] dark:[--footer-muted-fg:rgba(148,163,184,0.8)]",
        "[--footer-border:rgba(255,255,255,0.16)] dark:[--footer-border:rgba(255,255,255,0.08)]",

        "[--table-fg:inherit]",
        "[--table-muted-fg:rgba(255,255,255,0.82)] dark:[--table-muted-fg:rgba(148,163,184,0.84)]",
        "[--table-head-fg:rgba(255,255,255,0.98)] dark:[--table-head-fg:rgba(191,219,254,0.96)]",
        "[--table-border:rgba(255,255,255,0.16)] dark:[--table-border:rgba(255,255,255,0.1)]",
        "[--table-row-hover-bg:rgba(59,130,246,0.12)] dark:[--table-row-hover-bg:rgba(34,211,238,0.06)]",

        "[--faq-btn-bg:rgba(255,255,255,0.1)] dark:[--faq-btn-bg:rgba(255,255,255,0.06)]",
        "[--faq-btn-fg:theme(colors.white)] dark:[--faq-btn-fg:theme(colors.white)]",
        "[--faq-btn-hover-bg:rgba(255,255,255,0.16)] dark:[--faq-btn-hover-bg:rgba(255,255,255,0.1)]",
        "[--faq-btn-hover-fg:theme(colors.white)] dark:[--faq-btn-hover-fg:theme(colors.white)]",
        "[--faq-answer-bg:linear-gradient(180deg,rgba(30,64,175,0.88)_0%,rgba(190,24,93,0.86)_100%)] dark:[--faq-answer-bg:linear-gradient(180deg,rgba(7,10,22,0.94)_0%,rgba(30,41,59,0.92)_100%)]",
        "[--faq-answer-fg:rgba(255,247,237,0.94)] dark:[--faq-answer-fg:rgba(241,245,249,0.92)]",

        className,
      )}
    >
      {children}
    </div>
  );
}
