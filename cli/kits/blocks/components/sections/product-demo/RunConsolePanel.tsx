import React from "react";
import { cn } from "@/lib/utils";
import type { ProductDemoRunConsoleState, ProductDemoStatusTone } from "./types";

export interface RunConsolePanelProps {
  state: ProductDemoRunConsoleState;
}

const STATUS_TONE_CLASSES: Record<ProductDemoStatusTone, string> = {
  neutral: "border-border/60 bg-muted/55 text-muted-foreground",
  info: "border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-300",
  success:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
  warning:
    "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  danger: "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-300",
};

function getStatusClass(tone: ProductDemoStatusTone = "neutral") {
  return STATUS_TONE_CLASSES[tone];
}

function getProgressPercent(value: number | undefined) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return undefined;
  }

  return Math.min(100, Math.max(0, value));
}

export function RunConsolePanel({ state }: RunConsolePanelProps) {
  const progressPercent = getProgressPercent(state.progressPercent);

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1.5">
          {state.title && (
            <h4 className="text-sm font-semibold text-card-foreground">
              {state.title}
            </h4>
          )}
          {state.subtitle && (
            <p className="text-xs leading-relaxed text-muted-foreground">
              {state.subtitle}
            </p>
          )}
        </div>

        {(state.statusLabel || state.progressLabel) && (
          <div className="space-y-1 text-right">
            {state.statusLabel && (
              <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                {state.statusLabel}
              </div>
            )}
            {state.progressLabel && (
              <div className="text-sm font-semibold text-card-foreground">
                {state.progressLabel}
              </div>
            )}
          </div>
        )}
      </div>

      {typeof progressPercent === "number" ? (
        <div className="space-y-2">
          <div className="h-2 overflow-hidden rounded-full bg-muted/70">
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="text-[11px] text-muted-foreground">
            {progressPercent}% complete
          </div>
        </div>
      ) : null}

      {state.metrics?.length ? (
        <div className="grid grid-cols-2 gap-2">
          {state.metrics.map((metric) => (
            <div
              key={metric.id}
              className={cn(
                "rounded-xl border px-3 py-2",
                getStatusClass(metric.tone),
              )}
            >
              <div className="text-[10px] font-medium uppercase tracking-[0.14em] opacity-80">
                {metric.label}
              </div>
              <div className="mt-1 text-sm font-semibold">{metric.value}</div>
            </div>
          ))}
        </div>
      ) : null}

      <div className="space-y-2">
        {state.entries.map((entry) => {
          const isActive = entry.id === state.activeEntryId || entry.highlighted;

          return (
            <div
              key={entry.id}
              className={cn(
                "rounded-xl border border-border/60 bg-background/70 px-3 py-2.5",
                isActive && "border-primary/40 bg-primary/6",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-card-foreground">{entry.message}</div>
                  {(entry.source || entry.timestamp) && (
                    <div className="mt-1 text-[11px] text-muted-foreground">
                      {[entry.source, entry.timestamp].filter(Boolean).join(" • ")}
                    </div>
                  )}
                  {entry.detail && (
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {entry.detail}
                    </p>
                  )}
                </div>
                {entry.status && (
                  <span
                    className={cn(
                      "rounded-full border px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em]",
                      getStatusClass(entry.status),
                    )}
                  >
                    {entry.status}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
