"use client";

import { TrustBadges as SharedTrustBadges } from "@nextworks/blocks-sections";

/**
 * Product Launch preset for TrustBadges wired to the upgraded shared TrustBadges component
 */
export function TrustBadges() {
  const badges = [
    {
      badgeText: "50,000+ AI Models",
      badgeDescription: "Powered by",
      badgeIcon: "🤖",
    },
    {
      badgeText: "99.9% Accuracy",
      badgeDescription: "AI Performance",
      badgeIcon: "🎯",
    },
    {
      badgeText: "SOC 2 Type II",
      badgeDescription: "Enterprise Security",
      badgeIcon: "🔒",
    },
    {
      badgeText: "24/7 Support",
      badgeDescription: "Always Available",
      badgeIcon: "⚡",
    },
    {
      badgeText: "Fortune 500",
      badgeDescription: "Trusted by",
      badgeIcon: "🏆",
    },
  ];

  return (
    <SharedTrustBadges
      id="trust-badges"
      badges={badges}
      trustBadgesSectionHeader="Trusted by Industry Leaders"
      section={{
        className:
          "py-12 md:py-16 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-t border-b border-gray-200 dark:border-gray-700",
      }}
      container={{ className: "max-w-7xl mx-auto px-6 md:px-8 lg:px-12" }}
      header={{ className: "text-center mb-12" }}
      heading={{
        className:
          "text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white font-outfit",
      }}
      badgesContainer={{
        className:
          "flex flex-col sm:flex-row justify-center items-center gap-8 md:gap-12 lg:gap-16 flex-wrap",
      }}
      badge={{
        className: "flex flex-col items-center text-center min-w-[180px] group",
      }}
      badgeContent={{ className: "flex flex-col items-center space-y-3" }}
      icon={{
        className:
          "text-3xl md:text-4xl mb-3 group-hover:scale-105 transition-transform duration-500 ease-out",
      }}
      description={{
        className:
          "text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors duration-500 ease-out",
      }}
      text={{
        className:
          "text-base md:text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-500 ease-out font-outfit",
      }}
      layout="horizontal"
      ariaLabel="Trust badges for IntelliOpAI"
    />
  );
}
