"use client";

import React from "react";
import { Testimonials as SharedTestimonials } from "@nextworks/blocks-sections";

export function Testimonials() {
  return (
    <section id="testimonials">
      <SharedTestimonials
        testimonialSectionHeader="What Our Customers Say"
        section={{
          className: "py-16 md:py-20 lg:py-24 bg-fuchsia-50 dark:bg-gray-800",
        }}
        container={{ className: "max-w-7xl mx-auto px-6" }}
        header={{ className: "text-center mb-12 md:mb-16" }}
        heading={{
          className:
            "text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-gray-800 dark:text-white",
        }}
        grid={{
          className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
        }}
        card={{
          className:
            "bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md transition-transform duration-200 hover:-translate-y-1 border border-fuchsia-200/60 dark:border-fuchsia-800/40",
        }}
        text={{
          className:
            "text-gray-700 dark:text-gray-300 text-base leading-relaxed italic font-inter",
        }}
        author={{
          className:
            "text-gray-600 dark:text-gray-400 text-sm font-medium font-poppins",
        }}
        avatar={{
          className:
            "w-12 h-12 bg-fuchsia-600 text-white rounded-full flex items-center justify-center text-lg font-bold",
        }}
        avatarText={{
          className: "text-white font-bold",
        }}
        testimonials={[
          {
            testimonialText:
              "Nexus Digital transformed our online presence completely.",
            testimonialAuthor: "- Sarah Chen, CEO of TechFlow",
            testimonialAuthorInitials: "SC",
          },
          {
            testimonialText: "The team delivered beyond expectations.",
            testimonialAuthor: "- Marcus Rodriguez, GreenLeaf Wellness",
            testimonialAuthorInitials: "MR",
          },
          {
            testimonialText:
              "Professional, fast, and results-driven. They understood our vision and brought it to life perfectly.",
            testimonialAuthor: "- Jennifer Walsh, UrbanFit",
            testimonialAuthorInitials: "JW",
          },
        ]}
        ariaLabel="Testimonials section"
      />
    </section>
  );
}
