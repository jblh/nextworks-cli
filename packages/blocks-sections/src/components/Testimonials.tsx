"use client";

import React from "react";
import { cn } from "@nextworks/blocks-core";
import { TestimonialCard } from "@nextworks/blocks-core";

/**
 * Data used to render a TestimonialCard.
 * @public
 */
export interface TestimonialCardData {
  /** The testimonial quote text */
  testimonialText: string;
  /** The author's display name (prefixed with hyphen in defaults) */
  testimonialAuthor: string;
  /** Author initials displayed in the avatar */
  testimonialAuthorInitials: string;
}

/**
 * Props for the Testimonials section component.
 *
 * @remarks
 * - Styling: slot-style className overrides are merged after defaults via cn().
 * - Motion: enableMotion toggles card hover transitions.
 * - Accessibility: semantic <section> with aria-label.
 */
export interface TestimonialsProps {
  /** Optional id */
  id?: string;
  /** Root className merged into slots */
  className?: string;

  /** Testimonial items to render. @defaultValue defaultTestimonialData */
  testimonials?: TestimonialCardData[];
  /** Heading displayed above the grid. @defaultValue "What Our Customers Say" */
  testimonialSectionHeader?: string;

  /** When false, disables hover transitions on cards */
  enableMotion?: boolean;

  /** Slot-style overrides */
  section?: { className?: string };
  container?: { className?: string };
  header?: { className?: string };
  heading?: { className?: string };
  grid?: { className?: string };
  card?: { className?: string };
  content?: { className?: string };
  text?: { className?: string };
  author?: { className?: string };
  avatar?: { className?: string };
  avatarText?: { className?: string };

  /** ARIA label for the section. @defaultValue "Testimonials section" */
  ariaLabel?: string;
}

const defaultTestimonialData: TestimonialCardData[] = [
  {
    testimonialText: "Lorem ipsum dolor sit amet! Consectetur adipiscing elit.",
    testimonialAuthor: " - Cillum Dolore",
    testimonialAuthorInitials: "CD",
  },
  {
    testimonialText:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi!",
    testimonialAuthor: " - Voluptate Velit",
    testimonialAuthorInitials: "VV",
  },
  {
    testimonialText: "Cillum dolore eu fugiat nulla pariatur!",
    testimonialAuthor: " - Laboris Nisi",
    testimonialAuthorInitials: "LN",
  },
];

/**
 * Testimonials section that renders a grid of TestimonialCard items.
 *
 * @remarks
 * - Slot-style overrides match TestimonialCard sub-slots (card, content, text, etc.).
 * - Motion can be disabled via enableMotion.
 *
 * @example
 * <Testimonials testimonials={[{ testimonialText: 'Great!', testimonialAuthor: ' - Jane', testimonialAuthorInitials: 'J' }]} />
 */
export function Testimonials({
  id,
  className,
  testimonials = defaultTestimonialData,
  testimonialSectionHeader = "What Our Customers Say",
  enableMotion = true,
  section = { className: "py-16 px-6 bg-muted" },
  container = { className: "max-w-7xl mx-auto" },
  header = { className: "text-center mb-12" },
  heading = {
    className: "text-3xl md:text-4xl font-bold font-poppins text-foreground",
  },
  grid = { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" },
  card = {
    className:
      "bg-card/90 backdrop-blur p-6 rounded-lg shadow-md transition-transform duration-200 hover:-translate-y-1 border border-border bg-[var(--card-bg)] text-[var(--card-fg)] border-[var(--card-border)] shadow-[var(--card-shadow)]",
  },
  content = { className: "flex flex-col space-y-4" },
  text = {
    className:
      "text-card-foreground text-base leading-relaxed italic font-inter text-[var(--card-fg)]",
  },
  author = {
    className:
      "text-muted-foreground text-sm font-medium font-poppins text-[var(--card-muted-fg)]",
  },
  avatar = {
    className:
      "w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold bg-[var(--badge-bg)] text-[var(--badge-fg)] border-[var(--badge-border)]",
  },
  avatarText = { className: "text-primary-foreground font-bold" },
  ariaLabel = "Testimonials section",
}: TestimonialsProps) {
  return (
    <section
      id={id || "testimonials"}
      className={cn(section.className, className)}
      aria-label={ariaLabel}
    >
      <div className={container.className}>
        {/* Section Header */}
        <div className={header.className}>
          <h2 className={heading.className}>{testimonialSectionHeader}</h2>
        </div>

        {/* Testimonials Grid */}
        <div className={grid.className}>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonialText={testimonial.testimonialText}
              testimonialAuthor={testimonial.testimonialAuthor}
              testimonialAuthorInitials={testimonial.testimonialAuthorInitials}
              card={{
                className: cn(
                  card.className,
                  !enableMotion && "transition-none hover:!translate-y-0",
                ),
              }}
              content={content}
              text={text}
              author={author}
              avatar={avatar}
              avatarText={avatarText}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
