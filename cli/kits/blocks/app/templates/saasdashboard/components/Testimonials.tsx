"use client";

import { Testimonials as SharedTestimonials } from "@/components/sections/Testimonials";
import { cn } from "@/lib/utils";

export function Testimonials() {
  return (
    <div className="relative">
      {/* Gradient mesh + fine noise overlays for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(60rem_60rem_at_0%_0%,rgba(59,130,246,0.08),transparent_40%),radial-gradient(50rem_50rem_at_100%_100%,rgba(168,85,247,0.06),transparent_40%)] opacity-20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:14px_14px] opacity-[0.05]"
      />
      <SharedTestimonials
        testimonials={[
          {
            testimonialText:
              "DashFlow replaced 6 different tools for us. Our team productivity increased 40% in the first month.",
            testimonialAuthor: "- Sarah Chen, Marketing Director at TechStart",
            testimonialAuthorInitials: "SC",
          },
          {
            testimonialText:
              "Finally, a dashboard that actually makes sense. Setup took 10 minutes, not 10 hours.",
            testimonialAuthor: "- Mike Rodriguez, Operations Manager",
            testimonialAuthorInitials: "MR",
          },
          {
            testimonialText:
              "The analytics alone pay for the subscription. We spot trends weeks earlier now.",
            testimonialAuthor: "- Lisa Park, CEO of GrowthCo",
            testimonialAuthorInitials: "LP",
          },
        ]}
        testimonialSectionHeader="What Our Customers Say"
        className={cn("relative")}
        section={{ className: "py-16 px-6 bg-background" }}
        container={{ className: "max-w-7xl mx-auto" }}
        header={{ className: "text-center mb-12" }}
        heading={{
          className:
            "text-3xl md:text-4xl font-bold font-inter text-[var(--heading-fg)]",
        }}
        grid={{
          className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
        }}
        card={{
          className:
            "p-6 rounded-lg transition-transform duration-200 hover:-translate-y-1 bg-[var(--card-bg)] text-[var(--card-fg)] border-[var(--card-border)] shadow-[var(--card-shadow)]",
        }}
        text={{
          className:
            "italic font-inter font-normal text-base text-[var(--card-fg)]",
        }}
        author={{
          className:
            "text-sm font-medium font-inter text-[var(--card-muted-fg)]",
        }}
        avatar={{
          className:
            "w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold bg-[var(--badge-bg)] text-[var(--badge-fg)] border-[var(--badge-border)]",
        }}
        avatarText={{ className: "font-bold" }}
        ariaLabel="Customer testimonials"
      />
    </div>
  );
}
