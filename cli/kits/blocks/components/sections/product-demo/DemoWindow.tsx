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
  showHeader?: boolean;
  children?: React.ReactNode;
}

const STATUS_TONE_CLASSES: Record<ProductDemoStatusTone, string> = {
  neutral: "border-border/60 bg-muted/60 text-muted-foreground",
  info: "border-black/[0.07] bg-black/[0.045] text-slate-700 dark:border-white/[0.09] dark:bg-white/[0.045] dark:text-slate-200",

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
  showHeader = true,
  children,
}: DemoWindowProps) {
  const statusTone = window.status?.tone ?? "neutral";

  return (
    <section
      className={cn(
        "group relative flex h-full min-h-[14rem] flex-col overflow-hidden border border-black/[0.055] bg-[#fcfcfa] shadow-none [font-synthesis:none] antialiased dark:border-white/[0.065] dark:bg-[#050505]",
        "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.68),transparent)] before:opacity-70 dark:before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.16),transparent)] dark:before:opacity-100",
        "after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-8 after:bg-[linear-gradient(180deg,transparent,rgba(15,23,42,0.03))] dark:after:bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.02))]",
        enableMotion &&
          "transition-[opacity,border-color,background-color] duration-500 ease-out motion-reduce:transition-none",
        active && "border-black/[0.075] dark:border-white/[0.085]",
        dimmed && "opacity-90",
        className,
      )}
      data-product-demo-window={window.key}
      data-active={active ? "true" : "false"}
      aria-label={window.title}
    >
      {showHeader ? (
        <header
          className={cn(
            "relative flex min-h-[3.25rem] items-center justify-between gap-3 border-b border-black/[0.06] px-4 py-2.5 [font-synthesis:none] antialiased sm:px-5 dark:border-white/[0.065]",

            chromeClassName,
          )}
        >
          <div className="flex min-w-0 items-center gap-3">
            {showControls && (
              <div className="flex items-center gap-1.5 opacity-75 transition-opacity duration-200 group-hover:opacity-100">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400/90" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
              </div>
            )}

            <div className="min-w-0 flex items-center gap-2 overflow-hidden">
              <div className="flex min-w-0 items-center gap-2 whitespace-nowrap">
                <h3 className="shrink-0 text-sm font-semibold tracking-[-0.02em] text-slate-950 sm:text-[0.95rem] dark:text-slate-100">
                  {window.title}
                </h3>
                {window.badge && (
                  <span className="rounded-full border border-slate-200 bg-slate-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400">
                    {window.badge}
                  </span>
                )}
                {window.subtitle && (
                  <p className="min-w-0 truncate text-[11px] leading-5 tracking-[0.005em] text-slate-600 dark:text-slate-400 sm:text-[0.8rem]">
                    {window.subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>

          {window.status?.label && (
            <span
              className={cn(
                "shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em]",
                STATUS_TONE_CLASSES[statusTone],
                "hidden sm:inline-flex",
              )}
            >
              {window.status.label}
            </span>
          )}
        </header>
      ) : null}

      <div
        className={cn(
          "relative flex-1 min-h-0 px-4 py-4 sm:px-5 sm:py-5",

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
