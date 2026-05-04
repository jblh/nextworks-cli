"use client";

import { TrustBadges as SharedTrustBadges } from "@nextworks/blocks-sections";

export function TrustBadges() {
  return (
    <SharedTrustBadges
      id="trust-badges"
      trustBadgesSectionHeader="Teams replacing manual ops with AI workflows"
      badges={[
        {
          badgeText: "72% faster routing",
          badgeDescription: "Workflow handoffs",
          badgeIcon: "⚡",
        },
        {
          badgeText: "40+ integrations",
          badgeDescription: "Connected systems",
          badgeIcon: "🔌",
        },
        {
          badgeText: "SOC 2 ready",
          badgeDescription: "Security posture",
          badgeIcon: "🔒",
        },
        {
          badgeText: "Full audit trail",
          badgeDescription: "Approvals + logs",
          badgeIcon: "🧾",
        },
      ]}
      section={{
        className:
          "border-y border-slate-200/80 bg-white/70 py-10 dark:border-slate-800 dark:bg-slate-950/60",
      }}
      container={{ className: "max-w-7xl mx-auto px-6 md:px-8 lg:px-12" }}
      header={{ className: "mb-10 text-center" }}
      heading={{
        className:
          "font-outfit text-2xl font-semibold text-[var(--heading-fg)] md:text-3xl",
      }}
      badgesContainer={{
        className: "flex flex-wrap items-center justify-center gap-8 md:gap-12",
      }}
      badge={{ className: "min-w-[170px] text-center" }}
      badgeContent={{ className: "flex flex-col items-center gap-3" }}
      icon={{ className: "text-3xl" }}
      description={{
        className: "text-sm font-inter text-[var(--card-muted-fg)]",
      }}
      text={{
        className:
          "font-inter text-base font-semibold text-[var(--card-title-fg)]",
      }}
      layout="horizontal"
      ariaLabel="AI workflow trust badges"
    />
  );
}
