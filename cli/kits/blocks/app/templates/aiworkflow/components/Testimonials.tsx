"use client";

import { Testimonials as SharedTestimonials } from "@/components/sections/Testimonials";

export function Testimonials() {
  return (
    <SharedTestimonials
      testimonialSectionHeader="Operators, RevOps, and IT teams keep the loop closed"
      testimonials={[
        {
          testimonialText:
            "We replaced manual intake, Slack follow-up, and CRM updates with one workflow that now runs end-to-end in minutes.",
          testimonialAuthor: "- Maya Chen, RevOps Lead at Northstar",
          testimonialAuthorInitials: "MC",
        },
        {
          testimonialText:
            "Approvals used to stall launches for hours. Now legal only sees the exceptions and everyone else gets live status automatically.",
          testimonialAuthor: "- Daniel Ruiz, GTM Systems Manager",
          testimonialAuthorInitials: "DR",
        },
        {
          testimonialText:
            "The audit trail made adoption easy. Teams trust the automations because every action is grounded, visible, and recoverable.",
          testimonialAuthor: "- Priya Patel, Director of Operations",
          testimonialAuthorInitials: "PP",
        },
      ]}
      section={{ className: "bg-background py-18 px-6 md:py-22" }}
      container={{ className: "max-w-7xl mx-auto" }}
      header={{ className: "mb-12 text-center" }}
      heading={{
        className:
          "font-outfit text-3xl font-semibold text-[var(--heading-fg)] md:text-4xl",
      }}
      grid={{ className: "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" }}
      card={{
        className:
          "rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 text-[var(--card-fg)] shadow-[var(--card-shadow)] transition-transform duration-200 hover:-translate-y-1",
      }}
      text={{
        className: "font-inter text-base italic leading-7 text-[var(--card-fg)]",
      }}
      author={{
        className:
          "font-inter text-sm font-medium text-[var(--card-muted-fg)]",
      }}
      avatar={{
        className:
          "flex h-12 w-12 items-center justify-center rounded-full border border-[var(--badge-border)] bg-[var(--badge-bg)] text-[var(--badge-fg)]",
      }}
      avatarText={{ className: "font-inter text-sm font-bold" }}
      ariaLabel="AI workflow customer testimonials"
    />
  );
}
