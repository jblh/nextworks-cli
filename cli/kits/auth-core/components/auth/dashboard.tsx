"use client";

import React from "react";
import type { Session } from "next-auth";
import Link from "next/link";
import { cn } from "@/lib/utils";
import LogoutButton from "@/components/auth/logout-button";
import {
  Settings,
  Key,
  FolderGit2,
  BookOpen,
  MessageCircle,
} from "lucide-react";

export interface DashboardProps {
  id?: string;
  className?: string;
  session?: Session | null;

  headingText?: { text?: string; className?: string };
  subheadingText?: { text?: string; className?: string };

  container?: { className?: string };
  card?: { className?: string };
  heading?: { className?: string };
  subheading?: { className?: string };
  actions?: { className?: string };

  // MVP blocks
  showProfileCard?: boolean;
  quickLinks?: Array<{ label: string; href: string; icon?: React.ReactNode }>;
  quickLinksTitle?: { text?: string; className?: string };

  // Slots for blocks
  profileCard?: { className?: string };
  profileAvatar?: { className?: string };
  profileContent?: { className?: string };
  quickLinksCard?: { className?: string };
  quickLinksGrid?: { className?: string };
  quickLinkItem?: { className?: string };
  quickLinkIcon?: { className?: string };

  showLogout?: boolean;
  ariaLabel?: string;
}

export default function Dashboard({
  id,
  className,
  session,
  headingText = {
    text: "Welcome",
    className: "text-2xl font-semibold text-foreground",
  },
  subheadingText,
  container = { className: "mx-auto max-w-5xl p-6" },
  card = {
    className:
      "rounded-lg border border-border bg-card p-6 shadow-sm text-card-foreground",
  },
  heading = { className: "" },
  subheading = { className: "mt-2 text-sm text-muted-foreground" },
  actions = { className: "flex items-center gap-3" },

  // MVP blocks defaults
  showProfileCard = true,
  quickLinks = [
    {
      label: "Settings",
      href: "/settings/profile/",
      icon: <Settings className="h-4 w-4" />,
    },
    {
      label: "API Keys",
      href: "/settings/api-keys",
      icon: <Key className="h-4 w-4" />,
    },
    {
      label: "Projects",
      href: "/projects",
      icon: <FolderGit2 className="h-4 w-4" />,
    },
    { label: "Docs", href: "/docs", icon: <BookOpen className="h-4 w-4" /> },
    {
      label: "Support",
      href: "/support",
      icon: <MessageCircle className="h-4 w-4" />,
    },
  ],
  quickLinksTitle = {
    text: "Quick links",
    className: "text-sm font-medium text-muted-foreground",
  },

  profileCard = {
    className: "rounded-lg border border-border bg-card p-6 shadow-sm",
  },
  profileAvatar = {
    className:
      "h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-base font-semibold",
  },
  profileContent = { className: "mt-3" },
  quickLinksCard = {
    className: "rounded-lg border border-border bg-card p-6 shadow-sm",
  },
  quickLinksGrid = { className: "mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2" },
  quickLinkItem = {
    className:
      "group flex items-center gap-3 rounded-md border border-border bg-secondary/30 p-3 text-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-secondary/50",
  },
  quickLinkIcon = {
    className:
      "text-muted-foreground group-hover:text-foreground transition-colors",
  },

  showLogout = true,
  ariaLabel = "Dashboard",
}: DashboardProps) {
  const displayName =
    (session?.user?.name && session.user.name.trim().length > 0
      ? session.user.name
      : session?.user?.email) ?? "";

  const computedSubheading =
    subheadingText?.text ?? (displayName ? `Signed in as ${displayName}` : "");

  const nameOrEmail = displayName || session?.user?.email || "";
  const initials = nameOrEmail
    .split(" ")
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const createdAtRaw = (() => {
    const s = session as unknown;
    if (!s || typeof s !== "object") return null;

    const sessionCreatedAt =
      "createdAt" in s &&
      (typeof (s as { createdAt?: unknown }).createdAt === "string" ||
        (s as { createdAt?: unknown }).createdAt instanceof Date)
        ? (s as { createdAt?: string | Date }).createdAt
        : null;

    const user = "user" in s && (s as { user?: unknown }).user && typeof (s as { user?: unknown }).user === "object"
      ? (s as { user: Record<string, unknown> }).user
      : null;

    const userCreatedAt =
      user &&
      "createdAt" in user &&
      (typeof (user as { createdAt?: unknown }).createdAt === "string" ||
        (user as { createdAt?: unknown }).createdAt instanceof Date)
        ? (user as { createdAt?: string | Date }).createdAt
        : null;

    return userCreatedAt ?? sessionCreatedAt;
  })();
  const createdAt = createdAtRaw ? new Date(createdAtRaw) : null;

  return (
    <main
      id={id}
      aria-label={ariaLabel}
      className={cn(container.className, className)}
    >
      {/* Header card */}
      <div className={cn(card.className)}>
        <div className="flex items-center justify-between">
          {headingText?.text && (
            <h1 className={cn(headingText.className, heading.className)}>
              {headingText.text}
            </h1>
          )}
          {showLogout && (
            <div className={cn(actions.className)}>
              <LogoutButton />
            </div>
          )}
        </div>

        {computedSubheading && (
          <p className={cn(subheading.className, subheadingText?.className)}>
            {computedSubheading}
          </p>
        )}
      </div>

      {/* Content grid */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {showProfileCard && (
          <div className={cn(profileCard.className)}>
            <div className="flex items-center gap-4">
              {session?.user?.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={session.user.image}
                  alt="Avatar"
                  className={cn(
                    "h-12 w-12 rounded-full object-cover",
                    profileAvatar.className,
                  )}
                />
              ) : (
                <div className={cn(profileAvatar.className)}>
                  {initials || "U"}
                </div>
              )}
              <div className="min-w-0">
                <div className="text-foreground truncate text-base font-medium">
                  {session?.user?.name || session?.user?.email || "User"}
                </div>
                {session?.user?.email && (
                  <div className="text-muted-foreground truncate text-sm">
                    {session.user.email}
                  </div>
                )}
              </div>
            </div>
            <div className={cn(profileContent.className)}>
              {createdAt && !Number.isNaN(createdAt.getTime()) && (
                <p className="text-muted-foreground text-sm">
                  Member since {createdAt.toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Quick links */}
        <div className={cn(quickLinksCard.className)}>
          {quickLinksTitle?.text && (
            <div className={cn(quickLinksTitle.className)}>
              {quickLinksTitle.text}
            </div>
          )}
          <div className={cn(quickLinksGrid.className)}>
            {quickLinks?.map((item, i) => (
              <Link
                key={`${item.label}-${i}`}
                href={item.href || "#"}
                className={cn(quickLinkItem.className)}
              >
                {item.icon && (
                  <span className={cn(quickLinkIcon.className)}>
                    {item.icon}
                  </span>
                )}
                <span className="text-foreground truncate">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
