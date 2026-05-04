"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface HeroProductDemoTextContent {
  text?: string;
  className?: string;
}

export interface HeroProductDemoCta {
  label?: string;
  href?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  unstyled?: boolean;
  style?: React.CSSProperties;
}

export interface HeroProductDemoStageConfig {
  scenarios?: unknown[];
  initialScenarioIndex?: number;
  autoCycle?: boolean;
  cycleIntervalMs?: number;
  className?: string;
}

export interface HeroProductDemoSlots {
  section?: { className?: string };
  container?: { className?: string };
  textContainer?: { className?: string };
  demoContainer?: { className?: string };
  buttonsContainer?: { className?: string };
}

export interface HeroProductDemoProps extends HeroProductDemoSlots {
  id?: string;
  className?: string;
  heading?: string | HeroProductDemoTextContent;
  subheading?: string | HeroProductDemoTextContent;
  cta1?: HeroProductDemoCta;
  cta2?: HeroProductDemoCta;
  stage?: HeroProductDemoStageConfig;
  demo?: React.ReactNode;
  ariaLabel?: string;
  enableMotion?: boolean;
}

interface DemoStageProps {
  config?: HeroProductDemoStageConfig;
  enableMotion?: boolean;
  children?: React.ReactNode;
}

function normalizeTextContent(
  value: string | HeroProductDemoTextContent | undefined,
  defaults: Required<HeroProductDemoTextContent>,
) {
  if (typeof value === "string") {
    return { text: value, className: defaults.className };
  }

  return {
    text: value?.text ?? defaults.text,
    className: cn(defaults.className, value?.className),
  };
}

function DemoStage({ config, enableMotion = true, children }: DemoStageProps) {
  const normalizedScenarioCount = config?.scenarios?.length ?? 0;
  const normalizedInitialScenarioIndex = Math.max(
    0,
    Math.min(config?.initialScenarioIndex ?? 0, normalizedScenarioCount || 0),
  );

  return (
    <div
      data-product-demo-stage
      data-auto-cycle={config?.autoCycle ? "true" : "false"}
      data-enable-motion={enableMotion ? "true" : "false"}
      data-scenario-count={normalizedScenarioCount}
      data-initial-scenario-index={normalizedInitialScenarioIndex}
      data-cycle-interval-ms={config?.cycleIntervalMs ?? 0}
      className={cn(
        "relative isolate min-h-[24rem] w-full overflow-hidden rounded-[2rem] border border-border/60 bg-gradient-to-br from-background via-background to-muted/40 shadow-2xl",
        enableMotion &&
          "transition-transform duration-300 hover:-translate-y-1",
        config?.className,
      )}
      aria-hidden="true"
    >
      {children ?? (
        <div className="absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary/8 to-transparent" />
          <div className="absolute inset-4 rounded-[1.5rem] border border-border/50 bg-background/80 backdrop-blur-sm" />
          <div className="absolute left-6 top-6 flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-rose-400/80" />
            <span className="h-3 w-3 rounded-full bg-amber-400/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
          </div>
          <div className="absolute left-6 right-6 top-16 grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[1.25rem] border border-border/60 bg-card/90 p-5 shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="h-3 w-24 rounded-full bg-muted" />
                  <div className="mt-2 h-2.5 w-36 rounded-full bg-muted/80" />
                </div>
                <div className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  Active flow
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/80 p-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/15" />
                  <div className="flex-1 space-y-2">
                    <div className="h-2.5 w-28 rounded-full bg-muted" />
                    <div className="h-2.5 w-40 rounded-full bg-muted/80" />
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-primary/35 bg-primary/8 p-3 shadow-sm">
                  <div className="h-8 w-8 rounded-lg bg-primary/20" />
                  <div className="flex-1 space-y-2">
                    <div className="h-2.5 w-24 rounded-full bg-primary/35" />
                    <div className="h-2.5 w-44 rounded-full bg-primary/20" />
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/80 p-3">
                  <div className="h-8 w-8 rounded-lg bg-muted" />
                  <div className="flex-1 space-y-2">
                    <div className="h-2.5 w-20 rounded-full bg-muted" />
                    <div className="h-2.5 w-32 rounded-full bg-muted/80" />
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-[1.25rem] border border-border/60 bg-card/90 p-5 shadow-lg">
                <div className="mb-4 flex items-center justify-between">
                  <div className="h-3 w-28 rounded-full bg-muted" />
                  <div className="h-6 w-20 rounded-full bg-emerald-500/15" />
                </div>
                <div className="space-y-3">
                  <div className="h-2.5 w-full rounded-full bg-muted" />
                  <div className="h-2.5 w-5/6 rounded-full bg-muted/80" />
                  <div className="h-2.5 w-2/3 rounded-full bg-muted/70" />
                </div>
              </div>
              <div className="rounded-[1.25rem] border border-border/60 bg-card/90 p-5 shadow-lg">
                <div className="mb-3 h-3 w-24 rounded-full bg-muted" />
                <div className="space-y-3">
                  <div className="rounded-xl border border-border/50 bg-background/80 p-3">
                    <div className="h-2.5 w-16 rounded-full bg-muted" />
                    <div className="mt-2 h-2.5 w-28 rounded-full bg-muted/80" />
                  </div>
                  <div className="rounded-xl border border-border/50 bg-background/80 p-3">
                    <div className="h-2.5 w-20 rounded-full bg-muted" />
                    <div className="mt-2 h-2.5 w-24 rounded-full bg-muted/80" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function HeroProductDemo({
  id,
  className,
  heading,
  subheading,
  cta1,
  cta2,
  stage,
  demo,
  section,
  container,
  textContainer,
  demoContainer,
  buttonsContainer,
  ariaLabel = "Product demo hero section",
  enableMotion = true,
}: HeroProductDemoProps) {
  const defaultHeading = {
    text: "Show your product in motion",
    className:
      "text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl",
  };

  const defaultSubheading = {
    text: "Pair clear positioning with a layered product demo that makes the workflow feel real before anyone clicks.",
    className:
      "mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg lg:text-xl",
  };

  const normalizedHeading = normalizeTextContent(heading, defaultHeading);
  const normalizedSubheading = normalizeTextContent(
    subheading,
    defaultSubheading,
  );

  const buttonLift = enableMotion
    ? "transition-all duration-200 hover:-translate-y-0.5"
    : "transition-none hover:!translate-y-0";

  const defaultCta1 = {
    label: "Get Started",
    href: "#contact",
    variant: "default" as const,
    size: "lg" as const,
    className: "shadow-lg hover:shadow-xl",
  };

  const mergedCta1 = {
    ...defaultCta1,
    ...(cta1 ?? {}),
    className: cn(defaultCta1.className, cta1?.className, buttonLift),
  };

  const defaultCta2 = {
    label: "Learn More",
    href: "#",
    variant: "outline" as const,
    size: "lg" as const,
    className: "",
  };

  const mergedCta2 = cta2
    ? {
        ...defaultCta2,
        ...cta2,
        className: cn(defaultCta2.className, cta2.className, buttonLift),
      }
    : undefined;

  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden px-6 py-16 sm:px-8 lg:px-10 lg:py-24",
        section?.className,
        className,
      )}
      aria-label={ariaLabel}
    >
      <div
        className={cn(
          "mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-16",
          container?.className,
        )}
      >
        <div
          className={cn(
            "relative z-10 flex flex-col items-start",
            textContainer?.className,
          )}
        >
          <h1 className={cn(normalizedHeading.className)}>
            {normalizedHeading.text}
          </h1>

          <p className={cn(normalizedSubheading.className)}>
            {normalizedSubheading.text}
          </p>

          <div
            className={cn(
              "mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center",
              buttonsContainer?.className,
            )}
          >
            {mergedCta1.label && (
              <Button
                asChild
                variant={mergedCta1.variant}
                size={mergedCta1.size}
                className={mergedCta1.className}
                unstyled={mergedCta1.unstyled}
                style={mergedCta1.style}
              >
                <Link
                  href={mergedCta1.href || "#"}
                  aria-label={mergedCta1.label}
                >
                  {mergedCta1.label}
                </Link>
              </Button>
            )}

            {mergedCta2?.label && (
              <Button
                asChild
                variant={mergedCta2.variant}
                size={mergedCta2.size}
                className={mergedCta2.className}
                unstyled={mergedCta2.unstyled}
                style={mergedCta2.style}
              >
                <Link
                  href={mergedCta2.href || "#"}
                  aria-label={mergedCta2.label}
                >
                  {mergedCta2.label}
                </Link>
              </Button>
            )}
          </div>
        </div>

        <div className={cn("relative", demoContainer?.className)}>
          <DemoStage config={stage} enableMotion={enableMotion}>
            {demo}
          </DemoStage>
        </div>
      </div>
    </section>
  );
}
