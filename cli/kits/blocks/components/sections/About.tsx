"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * Data used to render a single statistic in the About section.
 *
 * @remarks
 * Typical examples include counts like projects completed or years of
 * experience. The suffix lets you append symbols such as "+", "%", or "/7".
 *
 * @public
 */
export interface AboutStatData {
  /** The main numeric/text value (e.g., "50") */
  value?: string;
  /** Short label describing the stat (e.g., "Successful Projects") */
  label?: string;
  /** Optional suffix appended to the value (e.g., "+") */
  suffix?: string;
}

/**
 * Props for the About section component.
 *
 * @remarks
 * - Styling: exposes slot-style className overrides (section, container,
 *   inner, contentContainer, contentStack, subheading, heading, content,
 *   statsSection, statsGrid, statItem, statNumber, statLabel). Consumer
 *   classes are merged after defaults via cn().
 * - Layout: text alignment can be set via aboutTextAlign.
 * - Motion: animateStats enables a count-up animation for numeric stats on first viewport visibility.
 * - Accessibility: rendered as a semantic <section> with aria-label.
 */
interface AboutProps {
  /** Main heading text displayed in the section header. @defaultValue "Your Success Is Our Mission" */
  aboutHeadingText?: string;
  /** Optional subheading text displayed above the heading. */
  aboutSubheadingText?: string;
  /** Primary paragraph/content body. @defaultValue a short marketing blurb */
  aboutContentText?: string;
  /** Optional list of statistics to render below the content. @defaultValue defaultStatsData */
  aboutStats?: AboutStatData[];

  /** Optional top-level class to override the section root */
  className?: string;

  /** Slot-style overrides */
  section?: { className?: string };
  container?: { className?: string };
  inner?: { className?: string };
  contentContainer?: { className?: string };
  contentStack?: { className?: string };
  subheading?: { className?: string };
  heading?: { className?: string };
  content?: { className?: string };
  statsSection?: { className?: string };
  statsGrid?: { className?: string };
  statItem?: { className?: string };
  statNumber?: { className?: string };
  statLabel?: { className?: string };

  /** Controls text alignment at various breakpoints. @defaultValue "center" */
  aboutTextAlign?: "left" | "center" | "right";
  /** Whether to render the stats block at the bottom. @defaultValue true */
  showStats?: boolean;
  /** Enable count-up animation for numeric stats when they enter the viewport. @defaultValue false */
  animateStats?: boolean;

  /** ARIA label for the section. @defaultValue "About section" */
  ariaLabel?: string;
}

/**
 * Default statistics displayed if no aboutStats are provided.
 */
const defaultStatsData: AboutStatData[] = [
  { value: "50", label: "Successful Projects", suffix: "+" },
  { value: "5", label: "Years Experience", suffix: "+" },
  { value: "100", label: "Happy Clients", suffix: "%" },
  { value: "24", label: "Support Hours", suffix: "/7" },
];

/**
 * About section with a heading, optional subheading/content, and an optional
 * stats block.
 *
 * @remarks
 * - Styling: exposes slot-style className overrides. Consumer classes are
 *   merged after defaults via cn().
 * - Layout: control text alignment with aboutTextAlign.
 * - Accessibility: rendered as a semantic <section> with aria-label.
 *
 * @example
 * <About
 *   aboutHeadingText="Your Success Is Our Mission"
 *   aboutContentText="We build digital products that convert."
 *   aboutStats={[{ value: "50", label: "Successful Projects", suffix: "+" }]}
 * />
 */
/**
 * About section with a heading, optional subheading/content, and an optional
 * stats block.
 *
 * @remarks
 * - Styling: exposes slot-style className overrides. Consumer classes are
 *   merged after defaults via cn().
 * - Layout: control text alignment with aboutTextAlign.
 * - Accessibility: rendered as a semantic <section> with aria-label.
 *
 * @example
 * <About
 *   aboutHeadingText="Your Success Is Our Mission"
 *   aboutContentText="We build digital products that convert."
 *   aboutStats={[{ value: "50", label: "Successful Projects", suffix: "+" }]}
 * />
 */
/**
 * Animated count-up for integers using requestAnimationFrame.
 * Eases out and runs once when shouldStart becomes true.
 */
function AnimatedCount({
  end,
  shouldStart,
  duration = 1500,
}: {
  end: number;
  shouldStart: boolean;
  duration?: number;
}) {
  const [value, setValue] = React.useState(0);
  const [done, setDone] = React.useState(false);

  const prefersReduced = React.useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  React.useEffect(() => {
    if (prefersReduced) return; // show end value immediately below
    if (!shouldStart || done) return;
    let raf: number;
    const startTs = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = Math.round(eased * end);
      setValue(next);
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDone(true);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shouldStart, end, duration, done, prefersReduced]);

  if (prefersReduced) return <>{end}</>;
  return <>{value}</>;
}

export function About({
  aboutHeadingText = "Your Success Is Our Mission",
  aboutSubheadingText,
  aboutContentText = "With 50+ successful projects and 5 years of experience, we specialize in creating digital solutions that drive real business growth.",
  aboutStats = defaultStatsData,
  className,
  section = { className: "py-20 bg-muted text-foreground" },
  container = { className: "max-w-7xl mx-auto px-6" },
  inner = { className: "flex flex-col gap-12" },
  contentContainer = { className: "max-w-4xl mx-auto" },
  contentStack = { className: "flex flex-col gap-6" },
  subheading = {
    className:
      "text-sm font-semibold font-poppins text-primary uppercase tracking-wider",
  },
  heading = {
    className: "text-3xl font-bold font-poppins text-foreground leading-tight",
  },
  content = {
    className:
      "text-lg font-inter text-foreground leading-relaxed opacity-90 max-w-3xl",
  },
  statsSection = {
    className:
      "bg-card p-8 rounded-xl shadow-lg mx-auto max-w-5xl w-full border border-border",
  },
  statsGrid = {
    className: "grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center",
  },
  statItem = { className: "flex flex-col items-center gap-2" },
  statNumber = {
    className: "text-4xl font-bold font-poppins text-foreground leading-none",
  },
  statLabel = {
    className:
      "text-sm font-medium font-inter text-foreground text-center opacity-80",
  },
  aboutTextAlign = "center",
  showStats = true,
  animateStats = false,
  ariaLabel = "About section",
}: AboutProps) {
  const textAlignClasses = {
    left: "text-left",
    right: "text-right",
    center: "text-center",
  } as const;

  const statsSectionRef = React.useRef<HTMLDivElement | null>(null);
  const [shouldStartCount, setShouldStartCount] = React.useState(false);

  React.useEffect(() => {
    if (!animateStats) return;
    if (!statsSectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShouldStartCount(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(statsSectionRef.current);

    return () => observer.disconnect();
  }, [animateStats]);

  return (
    <section
      className={cn(section.className, className)}
      aria-label={ariaLabel}
    >
      <div className={cn(container.className)}>
        <div className={cn(inner.className)}>
          <div
            className={cn(
              contentContainer.className,
              textAlignClasses[aboutTextAlign],
            )}
          >
            <div className={cn(contentStack.className)}>
              {aboutSubheadingText && (
                <div className={cn(subheading.className)}>
                  {aboutSubheadingText}
                </div>
              )}
              <h2 className={cn(heading.className)}>{aboutHeadingText}</h2>
              <p className={cn(content.className)}>{aboutContentText}</p>
            </div>
          </div>
          {showStats && aboutStats?.length ? (
            <div ref={statsSectionRef} className={cn(statsSection.className)}>
              <div className={cn(statsGrid.className)}>
                {aboutStats.map((s, i) => (
                  <div
                    key={`${s.label ?? "stat"}-${i}`}
                    className={cn(statItem.className)}
                  >
                    <div className={cn(statNumber.className)}>
                      {animateStats && Number.isFinite(Number(s.value)) ? (
                        <AnimatedCount
                          end={Number(s.value)}
                          shouldStart={shouldStartCount}
                        />
                      ) : (
                        s.value
                      )}
                      {s.suffix}
                    </div>
                    <div className={cn(statLabel.className)}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
