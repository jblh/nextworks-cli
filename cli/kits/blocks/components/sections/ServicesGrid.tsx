"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Data structure representing a single service card.
 */
export interface ServiceCardData {
  icon: string;
  title: string;
  description: string;
}

/**
 * Props to configure the ServicesGrid component (upgraded slots + cn).
 */
export interface ServicesGridProps {
  /** Optional id on root */
  id?: string;
  /** Root className merged into section slot */
  className?: string;
  sectionHeading?: string;
  servicesData?: ServiceCardData[];
  /** When false, disables entrance animations and hover transitions */
  enableMotion?: boolean;
  /** Styling configuration objects */
  section?: {
    className?: string;
  };
  container?: {
    className?: string;
  };
  heading?: {
    className?: string;
  };
  grid?: {
    className?: string;
  };
  card?: {
    className?: string;
  };
  cardContent?: {
    className?: string;
  };
  icon?: {
    className?: string;
  };
  title?: {
    className?: string;
  };
  description?: {
    className?: string;
  };
  /** ARIA label for the services section */
  ariaLabel?: string;
}

/**
 * Default services data for digital agency
 */
const defaultServicesData: ServiceCardData[] = [
  {
    icon: "💻",
    title: "Web Design & Development",
    description:
      "Custom websites that capture your brand and convert visitors into customers",
  },
  {
    icon: "📈",
    title: "SEO & Digital Marketing",
    description:
      "Get found on Google and drive qualified traffic to your website",
  },
  {
    icon: "🛒",
    title: "E-commerce Solutions",
    description: "Online stores that maximize sales and customer experience",
  },
  {
    icon: "🎨",
    title: "Brand Identity & Design",
    description: "Logo, branding, and visual identity that makes you stand out",
  },
];

/**
 * Responsive services grid with subtle motion and slot-style overrides.
 *
 * @remarks
 * - Motion can be disabled globally with enableMotion.
 * - Each card uses simple emoji icons by default; replace with real icons if preferred.
 *
 * @example
 * <ServicesGrid servicesData={[{ icon: '⚙️', title: 'Automation', description: '...' }]} />
 */
export function ServicesGrid({
  id,
  className,
  sectionHeading = "Our Services",
  servicesData = defaultServicesData,
  enableMotion = true,
  section = {
    className: "py-16 md:py-20 lg:py-24 bg-muted",
  },
  container = {
    className: "max-w-6xl mx-auto px-4 md:px-6 lg:px-8",
  },
  heading = {
    className:
      "text-3xl md:text-4xl lg:text-5xl font-bold font-poppins text-foreground text-center mb-8 md:mb-12",
  },
  grid = {
    className: "grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch",
  },
  card = {
    className:
      "bg-card/90 backdrop-blur p-6 md:p-8 rounded-lg border border-border shadow-sm hover:shadow-md transition-all duration-300 bg-[var(--card-bg)] text-[var(--card-fg)] border-[var(--card-border)] shadow-[var(--card-shadow)]",
  },
  cardContent = {
    className: "flex flex-col h-full space-y-4",
  },
  icon = {
    className: "text-4xl",
  },
  title = {
    className:
      "text-lg md:text-xl font-semibold font-poppins text-card-foreground leading-tight text-[var(--card-title-fg)]",
  },
  description = {
    className:
      "text-sm md:text-base font-inter leading-relaxed flex-1 text-[var(--card-muted-fg)]",
  },
  ariaLabel = "Services section",
}: ServicesGridProps) {
  return (
    <section
      id={id}
      className={cn(section.className, className)}
      aria-label={ariaLabel}
    >
      <div className={container.className}>
        {/* Section Heading */}
        <h2 className={heading.className}>{sectionHeading}</h2>

        {/* Services Grid */}
        <div className={grid.className}>
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
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
                      delay: 0.12 + index * 0.05,
                    }
                  : { type: "tween", duration: 0 }
              }
              className={cn(
                "h-full motion-reduce:transform-none motion-reduce:transition-none",
              )}
            >
              <div
                className={cn(
                  card.className,
                  "flex h-full flex-col",
                  enableMotion
                    ? "transition-transform duration-200 hover:-translate-y-1"
                    : "transition-none hover:!translate-y-0 hover:shadow-none",
                )}
              >
                <div className={cardContent.className}>
                  {/* Service Icon */}
                  <div
                    className={icon.className}
                    role="img"
                    aria-label={service.title}
                  >
                    {service.icon}
                  </div>

                  {/* Service Title */}
                  <h3 className={title.className}>{service.title}</h3>

                  {/* Service Description */}
                  <p className={description.className}>{service.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
