"use client";

import React from "react";
import { cn } from "../lib/utils";

export interface TestimonialCardProps {
  /** Optional id for root card */
  id?: string;
  /** Optional root className merged with card.className */
  className?: string;

  /** Legacy props (kept for backward compatibility) */
  testimonialText?: string;
  testimonialAuthor?: string;
  testimonialAuthorInitials?: string;

  /** New props to align with upgraded sections */
  quote?: string;
  name?: string;
  role?: string;

  /** Styling configuration objects */
  card?: {
    className?: string;
  };
  content?: {
    className?: string;
  };
  text?: {
    className?: string;
  };
  author?: {
    className?: string;
  };
  avatar?: {
    className?: string;
  };
  avatarText?: {
    className?: string;
  };
}

function getInitials(from?: string) {
  if (!from) return undefined;
  const parts = from.trim().split(/\s+/);
  const first = parts[0]?.[0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] || "" : "";
  const res = `${first}${last}`.toUpperCase();
  return res || undefined;
}

export function TestimonialCard({
  id,
  className,
  // legacy defaults
  testimonialText = "Lorem ipsum dolor sit amet! Consectetur adipiscing elit.",
  testimonialAuthor = " - Cillum Dolore",
  testimonialAuthorInitials = "JD",
  // new props (no defaults, we derive below)
  quote,
  name,
  role,
  card = {
    className:
      "bg-card text-card-foreground p-6 rounded-lg border border-border shadow-md transition-transform duration-200 hover:-translate-y-1 bg-[var(--card-bg)] text-[var(--card-fg)] border-[var(--card-border)] shadow-[var(--card-shadow)]",
  },
  content = {
    className: "flex flex-col space-y-4",
  },
  text = {
    className:
      "text-muted-foreground text-base leading-relaxed italic text-[var(--card-fg)]",
  },
  author = {
    className:
      "text-muted-foreground text-sm font-medium text-[var(--card-muted-fg)]",
  },
  avatar = {
    className:
      "w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold bg-[var(--badge-bg)] text-[var(--badge-fg)] border-[var(--badge-border)]",
  },
  avatarText = {
    className: "text-white font-bold",
  },
}: TestimonialCardProps) {
  const displayText = quote ?? testimonialText;
  const computedAuthor =
    testimonialAuthor ??
    (name ? ` - ${name}${role ? `, ${role}` : ""}` : " - Cillum Dolore");
  const initials = testimonialAuthorInitials ?? getInitials(name) ?? "JD";

  return (
    <div id={id} className={cn(card.className, className)}>
      <div className={content.className}>
        {/* Avatar */}
        <div className={avatar.className}>
          <span className={avatarText.className}>{initials}</span>
        </div>

        {/* Testimonial Text */}
        <p className={text.className}>&ldquo;{displayText}&rdquo;</p>

        {/* Author */}
        <p className={author.className}>{computedAuthor}</p>
      </div>
    </div>
  );
}
