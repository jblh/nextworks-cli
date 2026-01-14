"use client";

import React from "react";
import { About as SharedAbout } from "@/components/sections/About";

export function About() {
  return (
    <SharedAbout
      // Content
      aboutSubheadingText="About Us"
      aboutHeadingText="Your Success Is Our Mission"
      aboutContentText="With 50+ successful projects and 5 years of experience, we specialize in creating digital solutions that drive real business growth. Our team combines creative design with data-driven strategy."
      aboutTextAlign="center"
      // Stats
      showStats={true}
      animateStats={true}
      aboutStats={[
        { value: "2.5", suffix: "k+", label: "Leads Generated" },
        { value: "4.8", suffix: "%", label: "Avg. CTR" },
        { value: "92", suffix: "%", label: "Client Retention" },
        { value: "12", suffix: "M", label: "Ad Spend Managed" },
      ]}
      // Slots / styling
      section={{
        className: "py-16 md:py-20 lg:py-24 bg-white dark:bg-gray-800",
      }}
      container={{
        className: "max-w-7xl mx-auto px-6",
      }}
      inner={{
        className: "flex flex-col gap-12",
      }}
      contentContainer={{
        className: "max-w-4xl mx-auto",
      }}
      contentStack={{
        className: "flex flex-col gap-6",
      }}
      subheading={{
        className:
          "text-sm font-semibold font-poppins uppercase tracking-wider text-[var(--about-accent)]",
      }}
      heading={{
        className:
          "text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[var(--heading-fg)]",
      }}
      content={{
        className:
          "text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-[var(--subheading-fg)]",
      }}
      statsSection={{
        className:
          "bg-card p-8 rounded-xl shadow-lg mx-auto max-w-5xl w-full border border-border bg-[var(--card-bg)] text-[var(--card-fg)] border-[var(--card-border)]",
      }}
      statsGrid={{
        className: "grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center",
      }}
      statItem={{
        className: "flex flex-col items-center gap-2",
      }}
      statNumber={{
        className:
          "text-4xl md:text-5xl font-bold font-poppins leading-none text-[var(--about-accent)]",
      }}
      statLabel={{
        className:
          "text-sm font-medium font-inter text-center text-[var(--card-muted-fg)]",
      }}
    />
  );
}

// "use client";

// import React from "react";
// import { About as SharedAbout } from "@/components/sections/About";

// export function About() {
//   return (
//     <SharedAbout
//       aboutHeadingText="Your Success Is Our Mission"
//       aboutContentText="With 50+ successful projects and 5 years of experience, we specialize in creating digital solutions that drive real business growth. Our team combines creative design with data-driven strategy."
//       aboutTextAlign="center"
//       showStats={true}
//       section={{
//         className: "py-16 md:py-20 lg:py-24 bg-white dark:bg-gray-800",
//       }}
//       heading={{
//         className: "text-4xl md:text-5xl lg:text-6xl font-bold text-foreground",
//       }}
//       content={{
//         className:
//           "text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed",
//       }}
//     />
//   );
// }

// export default About;
