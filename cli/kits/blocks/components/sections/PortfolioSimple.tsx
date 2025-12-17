"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { CTAButton } from "@/components/ui/cta-button";
import { ExternalLink, TrendingUp } from "lucide-react";
import Image from "next/image";

// TypeScript Interfaces
export interface PortfolioProject {
  id: number;
  title: string;
  category: string;
  industry: string;
  result: string;
  description: string;
  image?: string;
  tags: string[];
  color: string;
  url?: string;
}

/**
 * Props for the PortfolioSimple section component.
 *
 * @remarks
 * - Styling: slot-style className overrides are merged after defaults via cn().
 * - Motion: entrance animations respect enableMotion; prefers-reduced-motion is supported.
 *
 * @public
 */
interface PortfolioSimpleProps {
  /** Optional id on root section */
  id?: string;
  /** Root className merged into section slot */
  className?: string;

  // Content
  projects?: PortfolioProject[];
  /**
   * List of filter labels. Filtering matches project.category exactly.
   * The first item is selected by default; a value of "All Projects" disables filtering.
   */
  filters?: string[];
  /** When false, disables entrance animations and hover transitions. */
  enableMotion?: boolean;

  // Section Content
  sectionTitle?: string;
  sectionSubtitle?: string;
  ctaTitle?: string;
  ctaDescription?: string;

  /** Label for the first call-to-action button */
  cta1Label?: string;
  /** URL or anchor target for the first CTA button */
  cta1Href?: string;
  /** Label for the second call-to-action button */
  cta2Label?: string;
  /** URL or anchor target for the second CTA button */
  cta2Href?: string;

  /** Styling configuration objects */
  section?: {
    className?: string;
  };
  container?: {
    className?: string;
  };
  header?: {
    className?: string;
  };
  title?: {
    className?: string;
  };
  subtitle?: {
    className?: string;
  };
  filterContainer?: {
    className?: string;
  };
  filterButton?: {
    className?: string;
  };
  activeFilterButton?: {
    className?: string;
  };
  grid?: {
    className?: string;
  };
  projectCard?: {
    className?: string;
  };
  imageContainer?: {
    className?: string;
  };
  projectInfo?: {
    className?: string;
  };
  projectTitle?: {
    className?: string;
  };
  projectDescription?: {
    className?: string;
  };
  tagsContainer?: {
    className?: string;
  };
  tagStyle?: {
    className?: string;
  };
  result?: {
    className?: string;
  };
  ctaSection?: {
    className?: string;
  };
  ctaTitleStyle?: {
    className?: string;
  };
  ctaDescriptionStyle?: {
    className?: string;
  };
  ctaButtons?: {
    className?: string;
  };
  cta1Button?: {
    className?: string;
  };
  cta2Button?: {
    className?: string;
  };

  // Callbacks
  /** Called when a project image or card is clicked. */
  onProjectClick?: (project: PortfolioProject) => void;
  onPrimaryCtaClick?: () => void;
  onSecondaryCtaClick?: () => void;

  /** ARIA label for the portfolio section */
  ariaLabel?: string;
}

// Simple project image component
interface ProjectImageProps {
  project: PortfolioProject;
  onClick?: () => void;
  imageContainer?: {
    className?: string;
  };
}

const ProjectImage: React.FC<ProjectImageProps> = ({
  project,
  onClick,
  imageContainer = {
    className:
      "relative rounded-lg overflow-hidden bg-muted shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer aspect-[16/10]",
  },
}) => {
  const colorClasses = {
    blue: "bg-blue-100 dark:bg-blue-900",
    green: "bg-green-100 dark:bg-green-900",
    purple: "bg-purple-100 dark:bg-purple-900",
    red: "bg-red-100 dark:bg-red-900",
    yellow: "bg-yellow-100 dark:bg-yellow-900",
    indigo: "bg-indigo-100 dark:bg-indigo-900",
  } as const;

  const fallbackBg =
    colorClasses[project.color as keyof typeof colorClasses] ||
    colorClasses.blue;

  return (
    <div className={imageContainer.className} onClick={onClick}>
      {project.image ? (
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        <div
          className={`flex h-full w-full items-center justify-center ${fallbackBg}`}
        >
          <div className="p-8 text-center">
            <div className="bg-background/20 dark:bg-foreground/20 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <ExternalLink className="h-8 w-8 text-[var(--card-muted-fg)]" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-[var(--card-title-fg)]">
              {project.title}
            </h3>
            <p className="text-sm text-[var(--card-muted-fg)]">
              {project.category}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const defaultProjects = [
  {
    id: 1,
    title: "TechStartup Growth Campaign",
    category: "Digital Marketing",
    industry: "Technology",
    result: "+300% Leads",
    description:
      "Comprehensive digital marketing campaign that increased qualified leads by 300% through targeted SEO, social media marketing, and conversion optimization strategies.",
    tags: ["SEO", "Social Media", "PPC", "Analytics"],
    color: "blue",
    url: "#",
  },
  {
    id: 2,
    title: "E-Commerce Brand Launch",
    category: "Brand Marketing",
    industry: "Retail",
    result: "+250% Revenue",
    description:
      "Complete brand launch and digital marketing strategy for a new e-commerce platform, resulting in 250% revenue growth within the first 6 months.",
    tags: ["Brand Strategy", "Content Marketing", "Influencer", "Email"],
    color: "green",
    url: "#",
  },
  {
    id: 3,
    title: "Healthcare Practice Expansion",
    category: "Local Marketing",
    industry: "Healthcare",
    result: "+180% Patients",
    description:
      "Local SEO and digital marketing campaign that helped a healthcare practice expand to three new locations and increase patient acquisition by 180%.",
    tags: ["Local SEO", "Google Ads", "Reputation", "Content"],
    color: "purple",
    url: "#",
  },
  {
    id: 4,
    title: "SaaS Product Launch",
    category: "B2B Marketing",
    industry: "Software",
    result: "+400% Signups",
    description:
      "Strategic B2B marketing campaign for a SaaS product launch, achieving 400% increase in trial signups through targeted content marketing and account-based marketing.",
    tags: ["B2B Strategy", "Content", "LinkedIn Ads", "Webinars"],
    color: "indigo",
    url: "#",
  },
  {
    id: 5,
    title: "Restaurant Chain Rebrand",
    category: "Brand Marketing",
    industry: "Food & Beverage",
    result: "+220% Foot Traffic",
    description:
      "Complete rebrand and digital marketing transformation for a restaurant chain, resulting in 220% increase in foot traffic and 150% growth in online orders.",
    tags: ["Rebranding", "Social Media", "Local SEO", "Delivery"],
    color: "red",
    url: "#",
  },
  {
    id: 6,
    title: "Fitness App User Acquisition",
    category: "Mobile Marketing",
    industry: "Health & Fitness",
    result: "+500% Downloads",
    description:
      "Mobile-first marketing campaign that achieved 500% increase in app downloads through app store optimization, influencer partnerships, and targeted social media advertising.",
    tags: ["ASO", "Influencer", "Social Ads", "Retention"],
    color: "yellow",
    url: "#",
  },
];

const defaultFilters = [
  "All Projects",
  "Digital Marketing",
  "Brand Marketing",
  "B2B Marketing",
  "Local Marketing",
  "Mobile Marketing",
];

/**
 * Responsive portfolio/gallery grid with simple category filtering and CTA block.
 *
 * @remarks
 * - Filtering uses exact category match; include "All Projects" to disable filtering.
 * - Accessibility: Renders a semantic <section> with aria-label; ensure images have informative titles or alt text.
 *
 * @example
 * <PortfolioSimple sectionTitle="Our Work" />
 */
export function PortfolioSimple({
  id,
  className,
  projects = defaultProjects,
  filters = defaultFilters,
  enableMotion = true,
  sectionTitle = "Our Recent Work",
  sectionSubtitle = "Take a look at some of our successful projects that have helped businesses transform their digital presence and achieve remarkable growth.",
  ctaTitle = "Ready to See Your Project Here?",
  ctaDescription = "Let's discuss how we can help transform your business with a custom digital solution.",
  cta1Label = "Get Free Quote",
  cta1Href = "#contact",
  cta2Label,
  cta2Href,
  section = {
    className: "py-16 md:py-24 bg-background",
  },
  container = {
    className: "max-w-7xl mx-auto px-6",
  },
  header = {
    className: "space-y-6 text-center mb-12",
  },
  title = {
    className:
      "text-3xl md:text-4xl font-bold font-poppins text-foreground text-[var(--heading-fg)]",
  },
  subtitle = {
    className:
      "text-xl font-inter text-muted-foreground max-w-2xl mx-auto leading-relaxed text-[var(--subheading-fg)]",
  },
  filterContainer = {
    className: "flex gap-4 flex-wrap justify-center mt-8",
  },
  filterButton = {
    className:
      "px-6 py-2 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md border-[var(--badge-border)] text-[var(--badge-fg)] bg-[var(--badge-bg)]",
  },
  activeFilterButton = {
    className:
      "px-6 py-2 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md bg-[var(--badge-active-bg)] text-[var(--badge-active-fg)] border-[var(--badge-active-border)]",
  },
  grid = {
    className:
      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mt-12",
  },
  projectCard = {
    className: "group cursor-pointer transition-all duration-300",
  },
  imageContainer = {
    className:
      "relative rounded-lg overflow-hidden bg-muted shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer aspect-[16/10]",
  },
  projectInfo = {
    className: "space-y-4 px-2 mt-4",
  },
  projectTitle = {
    className:
      "text-xl font-bold font-poppins transition-colors duration-200 text-[var(--card-title-fg)] group-hover:text-[var(--card-title-hover-fg)]",
  },
  projectDescription = {
    className: "text-base font-inter text-[var(--card-muted-fg)]",
  },
  tagsContainer = {
    className: "flex gap-2 flex-wrap",
  },
  tagStyle = {
    className:
      "px-2 py-1 text-xs border border-border rounded-full text-muted-foreground border-[var(--badge-border)] text-[var(--badge-fg)] bg-[var(--badge-bg)]",
  },
  result = {
    className:
      "font-bold text-[var(--metric-fg)] text-sm whitespace-nowrap ml-4",
  },
  ctaSection = {
    className: "space-y-6 text-center mt-16 pt-12 border-t border-border",
  },
  ctaTitleStyle = {
    className: "text-xl font-bold text-foreground text-[var(--heading-fg)]",
  },
  ctaDescriptionStyle = {
    className:
      "text-muted-foreground max-w-md mx-auto text-[var(--subheading-fg)]",
  },
  ctaButtons = {
    className: "flex gap-4 justify-center",
  },
  cta1Button = {
    className:
      "bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90 text-primary-foreground font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 border-[var(--btn-border)] focus-visible:ring-[var(--btn-ring)]",
  },
  cta2Button = {
    className:
      "border-primary text-primary hover:bg-primary/10 font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 border-[var(--btn-border)] focus-visible:ring-[var(--btn-ring)]",
  },
  onProjectClick,
  onPrimaryCtaClick,
  onSecondaryCtaClick,
  ariaLabel = "Portfolio showcase section",
}: PortfolioSimpleProps) {
  const [activeFilter, setActiveFilter] = useState(
    filters[0] || "All Projects",
  );

  const filteredProjects = projects.filter(
    (project) =>
      activeFilter === "All Projects" || project.category === activeFilter,
  );

  return (
    <section
      id={id}
      className={cn(section.className, className)}
      aria-label={ariaLabel}
    >
      <div className={container.className}>
        {/* Section Header */}
        <div className={header.className}>
          <h2 className={title.className}>{sectionTitle}</h2>
          <p className={subtitle.className}>{sectionSubtitle}</p>

          {/* Filter Buttons */}
          <div className={filterContainer.className}>
            {filters.map((filter) => (
              <button
                key={filter}
                className={
                  activeFilter === filter
                    ? activeFilterButton.className
                    : filterButton.className
                }
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className={grid.className}>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={
                enableMotion ? { opacity: 0, y: 12 } : { opacity: 1, y: 0 }
              }
              whileInView={
                enableMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }
              }
              viewport={
                enableMotion
                  ? { once: true, amount: 0.2 }
                  : { once: true, amount: 0 }
              }
              transition={
                enableMotion
                  ? {
                      type: "spring",
                      stiffness: 125,
                      damping: 50,
                      mass: 1,
                      delay: 0.1 + index * 0.05,
                    }
                  : { type: "tween", duration: 0 }
              }
              className="motion-reduce:transform-none motion-reduce:transition-none"
            >
              <div
                className={cn(
                  projectCard.className,
                  enableMotion
                    ? "transition-all duration-200 hover:-translate-y-1"
                    : "cursor-default transition-none hover:!translate-y-0 hover:shadow-none",
                )}
              >
                <div className="space-y-4">
                  {/* Project Image */}
                  <ProjectImage
                    project={project}
                    onClick={() => onProjectClick?.(project)}
                    imageContainer={imageContainer}
                  />

                  {/* Project Info */}
                  <div className={projectInfo.className}>
                    <div className="flex w-full items-start justify-between">
                      <div className="flex-1 space-y-2">
                        <h3 className={projectTitle.className}>
                          {project.title}
                        </h3>
                        <p className={projectDescription.className}>
                          {project.description}
                        </p>
                      </div>
                    </div>

                    {/* Tags & Result */}
                    <div className="flex w-full items-center justify-between">
                      <div className={tagsContainer.className}>
                        {project.tags.map((tag, index) => (
                          <span key={index} className={tagStyle.className}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-[var(--metric-fg)]" />
                        <span className={result.className}>
                          {project.result}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className={ctaSection.className}>
          <h3 className={ctaTitleStyle.className}>{ctaTitle}</h3>
          <p className={ctaDescriptionStyle.className}>{ctaDescription}</p>
          <div className={ctaButtons.className}>
            <CTAButton
              ctaButtonLabel={cta1Label}
              ctaButtonHref={cta1Href}
              button={{
                className: cta1Button.className,
              }}
              onClick={onPrimaryCtaClick}
            />
            {cta2Label && (
              <CTAButton
                ctaButtonLabel={cta2Label}
                ctaButtonHref={cta2Href}
                button={{
                  variant: "outline",
                  size: "lg",
                  className: cta2Button.className,
                }}
                onClick={onSecondaryCtaClick}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
