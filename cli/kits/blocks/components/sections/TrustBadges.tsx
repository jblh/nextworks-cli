"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * A single trust badge (stat or certification).
 * @public
 */
export interface TrustBadgeData {
  /** Main badge text (e.g., "99.9% Uptime") */
  badgeText: string;
  /** Optional short descriptor above/below the text */
  badgeDescription?: string;
  /** Optional icon/emoji representation */
  badgeIcon?: string;
}

/**
 * Props for the TrustBadges section component.
 *
 * @remarks
 * - Layout: choose horizontal row or vertical stack via layout.
 * - Styling: slot-style overrides are merged after defaults via cn().
 * - Motion: enableMotion toggles hover scale.
 */
export interface TrustBadgesProps {
  /** Optional id on root. @defaultValue "trust-badges" */
  id?: string;
  /** Root className merged into section slot */
  className?: string;

  /** Badges to display. @defaultValue defaultTrustBadgeData */
  badges?: TrustBadgeData[];
  /** Optional heading above badges */
  trustBadgesSectionHeader?: string;

  /** Slot-style overrides */
  section?: { className?: string };
  container?: { className?: string };
  header?: { className?: string };
  heading?: { className?: string };
  badgesContainer?: { className?: string };
  badge?: { className?: string };
  badgeContent?: { className?: string };
  icon?: { className?: string };
  description?: { className?: string };
  text?: { className?: string };

  /** Layout orientation. @defaultValue "horizontal" */
  layout?: "horizontal" | "vertical";
  /** When false, disables hover scale */
  enableMotion?: boolean;
  /** ARIA label for the section. @defaultValue "Trust badges section" */
  ariaLabel?: string;
}

const defaultTrustBadgeData: TrustBadgeData[] = [
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
];

/**
 * Compact section to showcase trust signals like usage stats and compliance.
 *
 * @remarks
 * - Horizontal by default; switch to vertical with layout="vertical".
 * - Hover motion can be disabled via enableMotion.
 *
 * @example
 * <TrustBadges badges={[{ badgeText: 'SOC 2', badgeDescription: 'Security', badgeIcon: '🔒' }]} />
 */
export function TrustBadges({
  id,
  className,
  badges = defaultTrustBadgeData,
  trustBadgesSectionHeader,
  section = { className: "py-8 px-6 bg-muted" },
  container = { className: "max-w-7xl mx-auto" },
  header = { className: "text-center mb-6" },
  heading = {
    className: "text-xl font-semibold text-foreground text-[var(--heading-fg)]",
  },
  badgesContainer = {
    className:
      "flex flex-col md:flex-row justify-center items-center gap-8 flex-wrap",
  },
  badge = {
    className:
      "flex flex-col items-center text-center min-w-[200px] transition-all duration-300 ease-in-out hover:scale-[1.02]",
  },
  badgeContent = { className: "flex flex-col items-center space-y-2" },
  icon = { className: "text-2xl mb-2" },
  description = {
    className:
      "text-sm font-medium text-muted-foreground text-[var(--card-muted-fg)]",
  },
  text = {
    className: "text-lg font-bold text-foreground text-[var(--card-fg)]",
  },
  layout = "horizontal",
  enableMotion = true,
  ariaLabel = "Trust badges section",
}: TrustBadgesProps) {
  const containerClasses =
    layout === "vertical"
      ? "flex flex-col justify-center items-center gap-8"
      : badgesContainer.className;

  return (
    <section
      id={id || "trust-badges"}
      className={cn(section.className, className)}
      aria-label={ariaLabel}
    >
      <div className={container.className}>
        {trustBadgesSectionHeader && (
          <div className={header.className}>
            <h2 className={heading.className}>{trustBadgesSectionHeader}</h2>
          </div>
        )}

        <div className={containerClasses}>
          {badges.map((badgeData, index) => (
            <div
              key={index}
              className={cn(
                badge.className,
                !enableMotion && "transition-none hover:!scale-100",
              )}
            >
              <div className={badgeContent.className}>
                {badgeData.badgeIcon && (
                  <div className={icon.className}>{badgeData.badgeIcon}</div>
                )}
                {badgeData.badgeDescription && (
                  <p className={description.className}>
                    {badgeData.badgeDescription}
                  </p>
                )}
                <p className={text.className}>{badgeData.badgeText}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
