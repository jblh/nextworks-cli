import React from "react";
import { cn } from "@/lib/utils";
import type { ProductDemoRunConsoleState } from "./types";

export interface RunConsolePanelProps {
  state: ProductDemoRunConsoleState;
}

function getProgressPercent(value: number | undefined) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return undefined;
  }

  return Math.min(100, Math.max(0, value));
}

export function RunConsolePanel({ state }: RunConsolePanelProps) {
  const progressPercent = getProgressPercent(state.progressPercent);
  const playbackMs = state.playbackMs ?? 1800;
  const [activeIndex, setActiveIndex] = React.useState(
    Math.max(
      0,
      state.entries.findIndex(
        (entry) => entry.id === state.activeEntryId || entry.highlighted,
      ),
    ),
  );

  React.useEffect(() => {
    const preferredIndex = state.entries.findIndex(
      (entry) => entry.id === state.activeEntryId || entry.highlighted,
    );

    if (typeof state.playbackStep === "number") {
      const syncedIndex = Math.min(
        Math.max(state.playbackStep - 2, 0),
        Math.max(state.entries.length - 1, 0),
      );
      setActiveIndex(syncedIndex);
      return;
    }

    setActiveIndex(Math.max(0, preferredIndex));

    if (state.entries.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % state.entries.length);
    }, playbackMs);

    return () => window.clearInterval(interval);
  }, [
    playbackMs,
    state.activeEntryId,
    state.entries,
    state.title,
    state.playbackStep,
  ]);

  const fallbackCodeEntry =
    state.entries.find((entry) => (entry.code?.length ?? 0) > 0) ??
    state.entries[0];
  const activeEntry = state.entries[activeIndex] ?? state.entries[0];
  const displayEntry =
    (activeEntry?.code?.length ?? 0) > 0 ? activeEntry : fallbackCodeEntry;
  const activeCode = displayEntry?.code ?? [];
  const startLine = Number(
    displayEntry?.lineNumber ?? activeEntry?.lineNumber ?? 24,
  );
  const activeLineCount = Math.max(1, activeCode.length || 1);
  const [visibleLineCount, setVisibleLineCount] = React.useState(
    Math.max(1, Math.min(2, activeCode.length || 1)),
  );

  React.useEffect(() => {
    if (typeof state.playbackStep === "number") {
      const revealFromStep = Math.max(state.playbackStep - 1, 1);
      const syncedVisibleCount = Math.min(
        activeCode.length || 1,
        Math.max(1, revealFromStep * 2),
      );
      setVisibleLineCount(syncedVisibleCount);
      return;
    }

    setVisibleLineCount(Math.max(1, Math.min(2, activeCode.length || 1)));

    if (activeCode.length <= 2) {
      return;
    }

    const interval = window.setInterval(
      () => {
        setVisibleLineCount((current) => {
          if (current >= activeCode.length) {
            return Math.max(1, Math.min(2, activeCode.length));
          }

          return current + 1;
        });
      },
      Math.max(
        520,
        Math.round(playbackMs / Math.max(activeCode.length - 1, 1)),
      ),
    );

    return () => window.clearInterval(interval);
  }, [activeCode, playbackMs, activeEntry?.id, state.playbackStep]);

  const visibleCode = activeCode.slice(0, visibleLineCount);

  return (
    <div className="flex h-full flex-col text-slate-900 [text-rendering:geometricPrecision] [font-synthesis:none] antialiased dark:text-white/95">
      <div className="mb-2 flex items-center justify-between gap-3 text-[11px] tracking-[0.005em]">
        <div className="min-w-0 truncate font-mono text-slate-500 dark:text-slate-400">
          <span className="mr-2 uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
            {activeEntry?.source ??
              displayEntry?.source ??
              state.statusLabel ??
              "active"}
          </span>

          <span className="truncate text-slate-800 dark:text-slate-300/95">
            {activeEntry?.message ??
              displayEntry?.message ??
              state.editorSummary ??
              state.subtitle}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-3 text-slate-400 dark:text-slate-500">
          {state.progressLabel ? (
            <span className="font-medium text-slate-500 dark:text-slate-400">
              {state.progressLabel}
            </span>
          ) : null}
          {typeof progressPercent === "number" ? (
            <span>{progressPercent}%</span>
          ) : null}
          {activeEntry?.timestamp ? <span>{activeEntry.timestamp}</span> : null}
        </div>
      </div>

      <div className="flex min-h-0 flex-1 overflow-hidden rounded-[8px] border border-black/10 bg-[#f6f6f3] shadow-[0_20px_60px_-30px_rgba(15,23,42,0.18)] dark:border-white/10 dark:bg-[#0b0b0b] dark:shadow-[0_20px_60px_-30px_rgba(2,8,23,0.95)]">
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <div className="flex items-center gap-2 border-b border-black/8 bg-black/[0.035] px-3 py-2 dark:border-white/8 dark:bg-white/[0.03]">
            <span className="h-2.5 w-2.5 rounded-full bg-white/75 dark:bg-white/65" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/35 dark:bg-white/25" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20 dark:bg-white/15" />
            <div className="ml-3 rounded-md border border-black/10 bg-white/88 px-2.5 py-1 font-mono text-[11px] text-slate-800 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300">
              {state.editorTabLabel ?? state.title}
            </div>
            {state.editorLanguage ? (
              <div className="ml-auto font-mono text-[11px] uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
                {state.editorLanguage}
              </div>
            ) : null}
          </div>

          <div className="grid min-h-0 flex-1 grid-cols-[3.5rem_minmax(0,1fr)] bg-[#f6f6f3] dark:bg-[#0b0b0b]">
            <div className="border-r border-black/8 bg-black/[0.018] px-2 py-3 font-mono text-[11px] leading-7 text-slate-400 dark:border-white/8 dark:bg-white/[0.02] dark:text-slate-600">
              {visibleCode.map((line, index) => {
                const isAdded = line.trimStart().startsWith("+");
                const isRemoved = line.trimStart().startsWith("-");

                return (
                  <div
                    key={`${startLine + index}`}
                    className={cn(
                      "text-right",
                      isAdded && "text-[#3b82f6]",
                      isRemoved && "text-[#ef4444]",
                    )}
                  >
                    {startLine + index}
                  </div>
                );
              })}
            </div>

            <div className="relative px-3 py-3 font-mono text-[12px] leading-7 text-slate-800 dark:text-slate-300">
              {visibleCode.map((line, index) => {
                const isAdded = line.trimStart().startsWith("+");
                const isRemoved = line.trimStart().startsWith("-");

                return (
                  <div
                    key={`${line}-${index}`}
                    className={cn(
                      "flex rounded-r-md border-l border-transparent pl-3 transition-colors duration-300",
                      isAdded &&
                        "border-[#3b82f6]/80 bg-[#3b82f6]/10 text-slate-950 dark:text-[#dbeafe]",
                      isRemoved &&
                        "border-[#ef4444]/80 bg-[#ef4444]/10 text-slate-950 dark:text-[#fecdd3]",
                      !isAdded &&
                        !isRemoved &&
                        "text-slate-800 dark:text-slate-300",
                      displayEntry?.highlighted &&
                        index === Math.min(1, visibleCode.length - 1) &&
                        "animate-pulse",
                    )}
                  >
                    <span
                      className={cn(
                        "mr-3 w-3 shrink-0 text-center text-[11px]",
                        isAdded
                          ? "text-[#3b82f6]"
                          : isRemoved
                            ? "text-[#ef4444]"
                            : "text-slate-400 dark:text-slate-600",
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

              {displayEntry?.highlighted &&
              visibleLineCount < activeLineCount ? (
                <div className="mt-2 flex items-center gap-2 pl-3 text-[11px] text-slate-400 dark:text-slate-500">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#3b82f6]" />
                  Applying change...
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {state.metrics?.length ? (
          <div className="hidden w-[6.75rem] shrink-0 border-l border-black/8 bg-black/[0.02] p-2 lg:flex lg:flex-col lg:gap-2 dark:border-white/8 dark:bg-white/[0.02]">
            {state.metrics.map((metric) => (
              <div
                key={metric.id}
                className="rounded-md border border-black/8 bg-white/65 px-2 py-2 text-center dark:border-white/8 dark:bg-white/[0.03]"
              >
                <div className="text-[10px] uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">
                  {metric.label}
                </div>
                <div className="mt-1 font-mono text-[12px] text-slate-800 dark:text-slate-200">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
