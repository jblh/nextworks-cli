"use client";

import { TrustBadges as SharedTrustBadges } from "@/components/sections/TrustBadges";
import { cn } from "@/lib/utils";

const defaultBadgesInfo = [
  {
    badgeText: "10,000+ businesses",
    badgeDescription: "Trusted by",
    badgeIcon: "📊",
  },
  {
    badgeText: "SOC 2 Compliant",
    badgeDescription: "Enterprise security",
    badgeIcon: "🔒",
  },
  {
    badgeText: "99.9% Uptime",
    badgeDescription: "Reliable service",
    badgeIcon: "⚡",
  },
  {
    badgeText: "4.9/5 Rating",
    badgeDescription: "Customer satisfaction",
    badgeIcon: "⭐",
  },
];

export function TrustBadges() {
  return (
    <SharedTrustBadges
      badges={defaultBadgesInfo}
      className={cn("relative")}
      section={{ className: "py-8 px-6 bg-blue-950/10 dark:bg-blue-950" }}
      heading={{
        className:
          "text-2xl font-bold font-inter text-gray-700 dark:text-gray-200",
      }}
      badgesContainer={{
        className: "flex flex-wrap items-center justify-center gap-8",
      }}
      badge={{
        className:
          "transition-all duration-200 grayscale hover:grayscale-0 hover:-translate-y-0.5",
      }}
      text={{
        className:
          "text-base font-medium font-inter text-gray-900 dark:text-white",
      }}
      ariaLabel="Trust badges section"
    />
  );
}
