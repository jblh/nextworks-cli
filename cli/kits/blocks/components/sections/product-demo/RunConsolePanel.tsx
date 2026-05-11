import React from "react";
import { cn } from "@/lib/utils";
import type {
  ProductDemoRunConsoleState,
  ProductDemoStatusTone,
} from "./types";

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
  const activeEntry = state.entries.find(
    (entry) => entry.id === state.activeEntryId || entry.highlighted,
  );
  const activeCode = activeEntry?.code ?? [];
  const startLine = Number(activeEntry?.lineNumber ?? 24);

  return (
    <div className="flex h-full flex-col gap-4 text-white/95">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1.5">
          {state.title && (
            <h4 className="text-sm font-semibold text-white/95">
              {state.title}
            </h4>
          )}
          {state.subtitle && (
            <p className="text-xs leading-relaxed text-slate-400">
              {state.subtitle}
            </p>
          )}
        </div>

        {(state.statusLabel || state.progressLabel) && (
          <div className="space-y-1 text-right">
            {state.statusLabel && (
              <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                {state.statusLabel}
              </div>
            )}
            {state.progressLabel && (
              <div className="text-sm font-semibold text-white/95">
                {state.progressLabel}
              </div>
            )}
          </div>
        )}
      </div>

      {typeof progressPercent === "number" ? (
        <div className="space-y-2">
          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-cyan-400 transition-[width] duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-500">
            {progressPercent}% complete
          </div>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
        {state.metrics?.map((metric) => (
          <div
            key={metric.id}
            className={cn(
              "rounded-full border px-2.5 py-1 font-medium uppercase tracking-[0.14em]",
              getStatusClass(metric.tone),
            )}
          >
            {metric.label}: {metric.value}
          </div>
        ))}
      </div>

      {activeEntry ? (
        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-[11px] text-slate-400">
          <div className="min-w-0 truncate">
            <span className="mr-2 uppercase tracking-[0.14em] text-slate-500">
              {activeEntry.source}
            </span>
            {activeEntry.message}
          </div>
          <div className="shrink-0 text-slate-500">{activeEntry.timestamp}</div>
        </div>
      ) : null}

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#08111d] shadow-[0_20px_60px_-30px_rgba(2,8,23,0.95)]">
        <div className="flex items-center gap-2 border-b border-white/8 bg-[#0b1525] px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
          <div className="ml-3 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-slate-300">
            {state.editorTabLabel ?? state.title}
          </div>
          {state.editorLanguage ? (
            <div className="ml-auto font-mono text-[11px] text-slate-500">
              {state.editorLanguage}
            </div>
          ) : null}
        </div>

        {state.editorSummary ? (
          <div className="border-b border-white/8 px-4 py-2 text-[11px] text-slate-400">
            {state.editorSummary}
          </div>
        ) : null}

        <div className="grid min-h-[20rem] grid-cols-[4rem_minmax(0,1fr)]">
          <div className="border-r border-white/8 bg-[#07101b] px-2 py-4 font-mono text-[11px] leading-7 text-slate-600">
            {activeCode.map((_, index) => (
              <div key={`${startLine + index}`} className="text-right">
                {startLine + index}
              </div>
            ))}
          </div>

          <div className="px-4 py-4 font-mono text-[12px] leading-7 text-slate-300">
            {activeCode.map((line, index) => {
              const isAdded = line.trimStart().startsWith("+");
              const isRemoved = line.trimStart().startsWith("-");

              return (
                <div
                  key={`${line}-${index}`}
                  className={cn(
                    "flex border-l border-transparent pl-3",
                    isAdded &&
                      "border-emerald-400/40 bg-emerald-400/[0.08] text-emerald-200",
                    isRemoved &&
                      "border-rose-400/35 bg-rose-400/[0.08] text-rose-200",
                    !isAdded && !isRemoved && "text-slate-300",
                  )}
                >
                  <span
                    className={cn(
                      "mr-3 w-3 shrink-0 text-center text-[11px]",
                      isAdded
                        ? "text-emerald-300"
                        : isRemoved
                          ? "text-rose-300"
                          : "text-slate-500",
                    )}
                  >
                    {isAdded ? "+" : isRemoved ? "-" : " "}
                  </span>
                  <span className="min-w-0 flex-1 whitespace-pre-wrap break-words">
                    {isAdded || isRemoved ? line.slice(1).trimStart() : line}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
