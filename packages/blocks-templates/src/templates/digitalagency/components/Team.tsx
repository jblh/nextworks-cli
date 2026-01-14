"use client";

import React from "react";
import { Team as SharedTeam } from "@nextworks/blocks-sections";

export function Team() {
  return (
    <SharedTeam
      section={{
        className: "py-16 md:py-20 lg:py-24 bg-fuchsia-50 dark:bg-gray-900",
      }}
      card={{ className: "dark:bg-gray-800" }}
      heading={{
        className:
          "text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--heading-fg)]",
      }}
      subheading={{
        className:
          "text-xl md:text-2xl text-[var(--subheading-fg)] max-w-2xl mx-auto leading-relaxed",
      }}
      role={{
        className:
          "text-md font-semibold font-poppins text-fuchsia-600 dark:text-fuchsia-400",
      }}
      ariaLabel="Team section"
    />
  );
}
