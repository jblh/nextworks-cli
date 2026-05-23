"use client";

import { TrustBadges as SharedTrustBadges } from "@/components/sections/TrustBadges";

export function TrustBadges() {
  return (
    <SharedTrustBadges
      id="trust-badges"
      trustBadgesSectionHeader="Teams shipping code with agents in the loop"
      badges={[
        {
          badgeText: "Faster fixes, fewer handoffs",
          badgeDescription: "Code handoffs",
          badgeIcon: "⚡",
        },
        {
          badgeText: "GitHub-native",
          badgeDescription: "Repo + CI aware",
          badgeIcon: "🔌",
        },
        {
          badgeText: "Review gates ready",
          badgeDescription: "Approval posture",
          badgeIcon: "🔒",
        },
        {
          badgeText: "Full change trail",
          badgeDescription: "Reads + edits + reviews",
          badgeIcon: "🧾",
        },
      ]}
      section={{
        className:
          "border-y border-slate-200/80 bg-[linear-gradient(180deg,#eef3f8_0%,#f6f8fb_48%,#eef3f8_100%)] py-10 dark:border-slate-800 dark:bg-[linear-gradient(180deg,#171717_0%,#121212_18%,#1d1d1d_46%,#131313_76%,#1b1b1b_100%)]",
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
      badge={{
        className:
          "min-w-[170px] rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] px-4 py-5 text-center shadow-[var(--card-shadow)]",
      }}
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
      ariaLabel="AI coding agent trust badges"
    />
  );
}
