"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * A social link shown on a team member card.
 * @public
 */
export interface SocialLink {
  /** Platform name (e.g., "LinkedIn") */
  platform: string;
  /** Destination URL */
  url: string;
  /** Icon identifier or emoji; replace with SVGs in real usage */
  icon: string;
}

/**
 * Team member data rendered by Team.
 * @public
 */
export interface TeamMemberData {
  /** Member name */
  name?: string;
  /** Job role or title */
  role?: string;
  /** Short bio or description */
  bio?: string;
  /** Avatar content (emoji or image URL if swapped out) */
  avatar?: string;
  /** Optional social links */
  socialLinks?: SocialLink[];
}

/**
 * Props for the Team section component.
 *
 * @remarks
 * - Styling: slot-style className overrides are merged after defaults via cn().
 * - Motion: enableMotion controls hover lift on cards.
 * - Accessibility: semantic <section> with aria-label.
 */
export interface TeamProps {
  /** Optional id on root. @defaultValue "team" */
  id?: string;
  /** Top-level className override */
  className?: string;
  /** Section heading text or object. @defaultValue "Meet Our Team" */
  teamHeadingText?: string | { text?: string; className?: string };
  /** Optional subheading text or object. @defaultValue "The talented people behind your success" */
  teamSubheadingText?: string | { text?: string; className?: string };
  /** Members to render. @defaultValue DefaultTeamData */
  teamMembers?: TeamMemberData[];

  /** Slot-style overrides */
  section?: { className?: string };
  container?: { className?: string };
  header?: { className?: string };
  heading?: { className?: string };
  subheading?: { className?: string };
  grid?: { className?: string };
  card?: { className?: string };
  cardContent?: { className?: string };
  avatar?: { className?: string };
  name?: { className?: string };
  role?: { className?: string };
  bio?: { className?: string };
  socialLinks?: { className?: string };
  socialLink?: { className?: string };

  /** When false, removes hover lift on cards */
  enableMotion?: boolean;

  /** ARIA label for the section. @defaultValue "Team section" */
  ariaLabel?: string;
}

const DefaultTeamData: TeamMemberData[] = [
  {
    name: "Alex Chen",
    role: "CEO & Founder",
    bio: "Full-stack developer with 8+ years.",
    avatar: "👨‍💼",
    socialLinks: [{ platform: "LinkedIn", url: "#", icon: "💼" }],
  },
  {
    name: "Sarah Martinez",
    role: "Lead Designer",
    bio: "UI/UX expert.",
    avatar: "👩‍🎨",
    socialLinks: [{ platform: "Dribbble", url: "#", icon: "🎨" }],
  },
  {
    name: "Jordan Patel",
    role: "DevOps Engineer",
    bio: "Automates cloud infra and CI/CD pipelines.",
    avatar: "🛠️",
    socialLinks: [{ platform: "GitHub", url: "#", icon: "🐙" }],
  },
  {
    name: "Maya Thompson",
    role: "Product Manager",
    bio: "Drives roadmap and aligns cross‑functional teams.",
    avatar: "🧭",
    socialLinks: [{ platform: "Twitter", url: "#", icon: "🐦" }],
  },
];

/**
 * Internal presentational card for a single team member.
 * Receives already-merged className strings from the parent.
 */
function TeamCard({
  member,
  card = { className: "" },
  cardContent = { className: "" },
  avatar = { className: "" },
  name = { className: "" },
  role = { className: "" },
  bio = { className: "" },
  socialLinks = { className: "" },
  socialLink = { className: "" },
}: {
  member: TeamMemberData;
  card?: { className?: string };
  cardContent?: { className?: string };
  avatar?: { className?: string };
  name?: { className?: string };
  role?: { className?: string };
  bio?: { className?: string };
  socialLinks?: { className?: string };
  socialLink?: { className?: string };
}) {
  return (
    <div className={card.className}>
      <div className={cardContent.className}>
        <div className={avatar.className}>{member.avatar}</div>
        <h3 className={name.className}>{member.name}</h3>
        <p className={role.className}>{member.role}</p>
        <p className={bio.className}>{member.bio}</p>
        {member.socialLinks && member.socialLinks.length > 0 && (
          <div className={socialLinks.className}>
            {member.socialLinks.map((social, index) => (
              <Link
                key={index}
                href={social.url}
                className={socialLink.className}
                title={social.platform}
                aria-label={`${member.name}'s ${social.platform} profile`}
              >
                {social.icon}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Team section with heading, subheading, and a responsive member grid.
 *
 * @remarks
 * - Uses a slot-style API for className overrides merged via cn().
 * - Motion: enableMotion toggles hover lift on cards.
 * - Accessibility: semantic <section> with aria-label.
 *
 * @example
 * <Team teamMembers={[{ name: 'Alex', role: 'Engineer' }]} />
 */
export function Team({
  id,
  className,
  teamMembers = DefaultTeamData,
  teamHeadingText = "Meet Our Team",
  teamSubheadingText = "The talented people behind your success",
  section,
  container,
  header,
  heading,
  subheading,
  grid,
  card,
  cardContent,
  avatar,
  name,
  role,
  bio,
  socialLinks,
  socialLink,
  enableMotion = true,
  ariaLabel = "Team section",
}: TeamProps) {
  // Defaults for slots
  const defaultSection = "py-16 px-6 bg-muted";
  const defaultContainer = "max-w-7xl mx-auto";
  const defaultHeader = "space-y-12 items-center";
  const defaultHeadingClass =
    "text-3xl font-bold font-poppins text-foreground text-center text-[var(--heading-fg)]";
  const defaultSubheadingClass =
    "text-lg font-inter text-muted-foreground opacity-80 leading-relaxed text-center max-w-2xl text-[var(--subheading-fg)]";
  const defaultGrid =
    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full";
  const defaultCardBase =
    "bg-card p-6 rounded-lg shadow-md text-center border border-border bg-[var(--card-bg)] text-[var(--card-fg)] border-[var(--card-border)] shadow-[var(--card-shadow)]";
  const defaultCardContent = "flex flex-col items-center space-y-4";
  const defaultAvatar = "text-4xl mb-2";
  const defaultName =
    "text-xl font-bold font-poppins text-card-foreground text-[var(--card-fg)]";
  const defaultRole = "text-md font-semibold font-poppins text-primary";
  const defaultBio =
    "text-sm font-inter text-muted-foreground opacity-80 leading-relaxed text-[var(--card-muted-fg)]";
  const defaultSocialLinks = "flex gap-3 mt-2";
  const defaultSocialLink =
    "text-lg text-primary hover:text-accent-foreground transition-colors duration-200";

  // Motion control for card
  const motionCard = enableMotion
    ? "transition-transform duration-200 hover:-translate-y-1"
    : "transition-none hover:!translate-y-0";

  // Merge slot classes using cn (defaults first, then overrides)
  const finalSectionClass = cn(defaultSection, section?.className, className);
  const finalContainerClass = cn(defaultContainer, container?.className);
  const finalHeaderClass = cn(defaultHeader, header?.className);
  const finalGridClass = cn(defaultGrid, grid?.className);

  const finalCardClass = cn(defaultCardBase, motionCard, card?.className);
  const finalCardContentClass = cn(defaultCardContent, cardContent?.className);
  const finalAvatarClass = cn(defaultAvatar, avatar?.className);
  const finalNameClass = cn(defaultName, name?.className);
  const finalRoleClass = cn(defaultRole, role?.className);
  const finalBioClass = cn(defaultBio, bio?.className);
  const finalSocialLinksClass = cn(defaultSocialLinks, socialLinks?.className);
  const finalSocialLinkClass = cn(defaultSocialLink, socialLink?.className);

  // Normalize heading/subheading allowing string or object, plus slot class merges
  const normalizedHeading =
    typeof teamHeadingText === "string"
      ? {
          text: teamHeadingText,
          className: cn(defaultHeadingClass, heading?.className),
        }
      : {
          text: teamHeadingText?.text ?? "Meet Our Team",
          className: cn(
            defaultHeadingClass,
            teamHeadingText?.className,
            heading?.className,
          ),
        };

  const normalizedSubheading =
    typeof teamSubheadingText === "string"
      ? {
          text: teamSubheadingText,
          className: cn(defaultSubheadingClass, subheading?.className),
        }
      : {
          text:
            teamSubheadingText?.text ??
            "The talented people behind your success",
          className: cn(
            defaultSubheadingClass,
            teamSubheadingText?.className,
            subheading?.className,
          ),
        };

  return (
    <section
      id={id || "team"}
      className={finalSectionClass}
      aria-label={ariaLabel}
    >
      <div className={finalContainerClass}>
        <div className={finalHeaderClass}>
          <div className="mx-auto flex max-w-2xl flex-col items-center space-y-4 text-center">
            <h2 className={normalizedHeading.className}>
              {normalizedHeading.text}
            </h2>
            <p className={normalizedSubheading.className}>
              {normalizedSubheading.text}
            </p>
          </div>
          <div className={finalGridClass}>
            {teamMembers.map((member, index) => (
              <TeamCard
                key={index}
                member={member}
                card={{ className: finalCardClass }}
                cardContent={{ className: finalCardContentClass }}
                avatar={{ className: finalAvatarClass }}
                name={{ className: finalNameClass }}
                role={{ className: finalRoleClass }}
                bio={{ className: finalBioClass }}
                socialLinks={{ className: finalSocialLinksClass }}
                socialLink={{ className: finalSocialLinkClass }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
