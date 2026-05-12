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
  info: "border-black/10 bg-black/[0.04] text-slate-600 dark:border-white/12 dark:bg-white/[0.04] dark:text-slate-300",

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
        "group relative flex h-full min-h-[14rem] flex-col overflow-hidden border border-black/8 bg-white/96 shadow-[0_28px_80px_-34px_rgba(15,23,42,0.18)] dark:border-white/10 dark:bg-[#050505] dark:shadow-[0_24px_70px_-32px_rgba(2,8,23,0.82)]",

        enableMotion &&
          "transition-[transform,opacity,box-shadow,border-color] duration-500 ease-out motion-reduce:transition-none",
        active &&
          "border-black/14 shadow-[0_28px_84px_-36px_rgba(15,23,42,0.14)] dark:border-white/14 dark:shadow-[0_24px_60px_-26px_rgba(255,255,255,0.06)]",

        dimmed && "opacity-90",
        className,
      )}
      data-product-demo-window={window.key}
      data-active={active ? "true" : "false"}
      aria-label={window.title}
    >
      <header
        className={cn(
          "relative flex min-h-[3.25rem] items-center justify-between gap-3 border-b border-black/8 px-4 py-2.5 [text-rendering:geometricPrecision] sm:px-5 dark:border-white/10",

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
              <h3 className="shrink-0 text-sm font-semibold tracking-[-0.01em] text-slate-900 sm:text-[0.95rem] dark:text-slate-100">
                {window.title}
              </h3>
              {window.badge && (
                <span className="rounded-full border border-slate-200 bg-slate-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400">
                  {window.badge}
                </span>
              )}
              {window.subtitle && (
                <p className="min-w-0 truncate text-[11px] leading-5 tracking-[0.01em] text-slate-500 dark:text-slate-400 sm:text-[0.8rem]">
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
