"use client";

import { Features as SharedFeatures } from "@nextworks/blocks-sections";
import { cn } from "@nextworks/blocks-core";

const defaultFeaturesData = [
  {
    imageSrc: "/placeholders/saas_dashboard/projectBoard.png",
    imageAlt: "Project Management Dashboard",
    headingText: "Track Every Project",
    subheadingText:
      "Kanban boards, Gantt charts, and timeline views keep your team aligned and deadlines met",
  },
  {
    imageSrc: "/placeholders/saas_dashboard/analytics.png",
    imageAlt: "Analytics Dashboard",
    headingText: "Data-Driven Insights",
    subheadingText:
      "Real-time metrics, custom reports, and forecasting tools to make smarter business decisions",
  },
  {
    imageSrc: "/placeholders/saas_dashboard/chat.png",
    imageAlt: "Team Collaboration Tools",
    headingText: "Seamless Teamwork",
    subheadingText:
      "Built-in chat, file sharing, and @mentions keep everyone connected and productive",
  },
];

export function Features() {
  return (
    <SharedFeatures
      sectionHeading="Everything You Need to Run Your Business"
      sectionSubheading="Powerful tools and insights to streamline your workflow and boost productivity"
      featuresData={defaultFeaturesData}
      className={cn("relative")}
      section={{ className: "py-16 md:py-20 lg:py-24 bg-background" }}
      container={{ className: "max-w-7xl mx-auto px-4 md:px-6 lg:px-8" }}
      header={{ className: "text-center mb-12 md:mb-16" }}
      heading={{
        className: cn(
          "font-inter mb-4 text-3xl font-bold text-[var(--heading-fg)] md:text-4xl lg:text-5xl",
        ),
      }}
      subheading={{
        className: cn(
          "font-inter mx-auto max-w-3xl text-lg leading-relaxed text-[var(--subheading-fg)] md:text-xl",
        ),
      }}
      grid={{
        className:
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8",
      }}
      cardWrapper={{
        className:
          "group motion-reduce:transform-none motion-reduce:transition-none",
      }}
      card={{
        className:
          "h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl bg-[var(--card-bg)] text-[var(--card-fg)] border-[var(--card-border)] rounded-lg shadow-md overflow-hidden",
      }}
      image={{
        className:
          "w-full h-48 md:h-56 object-cover transition-transform duration-300 group-hover:scale-[1.03]",
      }}
      cardHeading={{
        className: cn(
          "font-inter mb-3 text-xl leading-tight font-semibold text-[var(--card-title-fg)] md:text-2xl",
        ),
      }}
      cardSubheading={{
        className: cn(
          "font-inter text-sm leading-relaxed text-[var(--card-muted-fg)] md:text-base",
        ),
      }}
      // Motion config showcasing upgraded API
      motionConfig={{
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: {
          type: "spring",
          stiffness: 125,
          damping: 50,
          delay: 0.12,
        },
      }}
      ariaLabel="Features section"
    />
  );
}
