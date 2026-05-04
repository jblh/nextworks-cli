"use client";

import React from "react";
import { cn } from "@/lib/utils";
import type { ProductDemoStatusTone, ProductDemoWindowMeta } from "./types";

export interface DemoWindowProps {
  window: ProductDemoWindowMeta;
  className?: string;
  contentClassName?: string;
  chromeClassName?: string;
  bodyClassName?: string;
  active?: boolean;
  dimmed?: boolean;
  enableMotion?: boolean;
  showControls?: boolean;
  showResizeHandle?: boolean;
  children?: React.ReactNode;
}

const STATUS_TONE_CLASSES: Record<ProductDemoStatusTone, string> = {
  neutral: "border-border/60 bg-muted/60 text-muted-foreground",
  info: "border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-300",
  success:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
  warning:
    "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  danger: "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-300",
};

export function DemoWindow({
  window,
  className,
  contentClassName,
  chromeClassName,
  bodyClassName,
  active = false,
  dimmed = false,
  enableMotion = true,
  showControls = true,
  showResizeHandle = true,
  children,
}: DemoWindowProps) {
  const statusTone = window.status?.tone ?? "neutral";

  return (
    <section
      className={cn(
        "group relative flex h-full min-h-[14rem] flex-col overflow-hidden rounded-[1.5rem] border border-border/60 bg-card/92 shadow-[0_18px_48px_-24px_rgba(15,23,42,0.45)] backdrop-blur-xl",
        enableMotion &&
          "transition-[transform,opacity,box-shadow,border-color] duration-500 ease-out motion-reduce:transition-none",
        active &&
          "border-primary/45 shadow-[0_24px_60px_-26px_rgba(59,130,246,0.45)]",
        dimmed && "opacity-90",
        className,
      )}
      data-product-demo-window={window.key}
      data-active={active ? "true" : "false"}
      aria-label={window.title}
    >
      <header
        className={cn(
          "relative flex items-start justify-between gap-3 border-b border-border/50 px-4 py-3 sm:px-5",
          chromeClassName,
        )}
      >
        <div className="flex items-start gap-3">
          {showControls && (
            <div className="mt-1 flex items-center gap-1.5 opacity-75 transition-opacity duration-200 group-hover:opacity-100">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400/90" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
            </div>
          )}

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate text-sm font-semibold text-card-foreground sm:text-[0.95rem]">
                {window.title}
              </h3>
              {window.badge && (
                <span className="rounded-full border border-border/60 bg-muted/70 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  {window.badge}
                </span>
              )}
            </div>
            {window.subtitle && (
              <p className="mt-1 truncate text-xs text-muted-foreground sm:text-[0.8rem]">
                {window.subtitle}
              </p>
            )}
          </div>
        </div>

        {window.status?.label && (
          <span
            className={cn(
              "shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em]",
              STATUS_TONE_CLASSES[statusTone],
            )}
          >
            {window.status.label}
          </span>
        )}
      </header>

      <div
        className={cn(
          "relative flex-1 px-4 py-4 sm:px-5 sm:py-5",
          bodyClassName,
        )}
      >
        <div className={cn("h-full", contentClassName)}>{children}</div>

        {showResizeHandle && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 opacity-0 transition-opacity duration-200 group-hover:opacity-70"
          >
            <span className="absolute bottom-0 right-0 h-px w-3 rotate-45 bg-border/80" />
            <span className="absolute bottom-1 right-0 h-px w-2 rotate-45 bg-border/70" />
            <span className="absolute bottom-0 right-1 h-px w-2 rotate-45 bg-border/60" />
          </div>
        )}
      </div>
    </section>
  );
}
