import React from "react";
import { cn } from "@/lib/utils";
import type { ProductDemoRunConsoleState } from "./types";

export interface RunConsolePanelProps {
  state: ProductDemoRunConsoleState;
}

export function RunConsolePanel({ state }: RunConsolePanelProps) {
  const playbackMs = state.playbackMs ?? 1800;
  const playbackStepEntryIndices = state.playbackStepEntryIndices ?? [];
  const playbackStepVisibleLineCounts =
    state.playbackStepVisibleLineCounts ?? [];
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
      const mappedIndex = playbackStepEntryIndices[state.playbackStep - 1];
      const syncedIndex = Math.min(
        Math.max(
          typeof mappedIndex === "number"
            ? mappedIndex
            : state.playbackStep - 2,
          0,
        ),
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
    playbackStepEntryIndices,
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
      const mappedVisibleCount =
        playbackStepVisibleLineCounts[state.playbackStep - 1];
      const revealFromStep = Math.max(state.playbackStep - 1, 1);
      const syncedVisibleCount = Math.min(
        activeCode.length || 1,
        Math.max(
          1,
          typeof mappedVisibleCount === "number"
            ? mappedVisibleCount
            : revealFromStep * 2,
        ),
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
  }, [
    activeCode,
    playbackMs,
    playbackStepVisibleLineCounts,
    activeEntry?.id,
    state.playbackStep,
  ]);

  const visibleCode = activeCode.slice(0, visibleLineCount);

  return (
    <div className="flex h-full min-h-0 flex-col text-slate-900 [font-synthesis:none] antialiased dark:text-white/95">
      <div className="flex min-h-0 flex-1 overflow-hidden rounded-none border border-black/[0.065] bg-[#f6f7f4] shadow-none dark:border-white/[0.08] dark:bg-[#0a0a0a] dark:shadow-none">
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <div className="grid min-h-0 flex-1 grid-cols-[3.5rem_minmax(0,1fr)] bg-[#f6f7f4] dark:bg-[#0a0a0a]">
            <div className="border-r border-black/[0.05] bg-[#eff1ec] px-2 py-3 font-mono text-[11px] leading-7 text-slate-400/88 dark:border-white/[0.06] dark:bg-[#0d0d0d] dark:text-slate-600/88">
              {visibleCode.map((line, index) => {
                const isAdded = line.trimStart().startsWith("+");
                const isRemoved = line.trimStart().startsWith("-");

                return (
                  <div
                    key={`${startLine + index}`}
                    className={cn(
                      "text-right",
                      isAdded && "text-[#2563eb] dark:text-[#3b82f6]",
                      isRemoved && "text-[#dc2626] dark:text-[#f87171]",
                    )}
                  >
                    {startLine + index}
                  </div>
                );
              })}
            </div>

            <div className="relative flex h-full min-h-0 flex-col overflow-hidden bg-[#f7f7f4] px-3 py-3 font-mono text-[12px] leading-7 text-slate-800 dark:bg-[#0b0b0b] dark:text-slate-300/92">
              <div>
                {visibleCode.map((line, index) => {
                  const isAdded = line.trimStart().startsWith("+");
                  const isRemoved = line.trimStart().startsWith("-");

                  return (
                    <div
                      key={`${line}-${index}`}
                      className={cn(
                        "flex border-l border-transparent pl-3 transition-colors duration-300",
                        isAdded &&
                          "border-[#2563eb]/38 bg-[#2563eb]/[0.045] text-slate-950 dark:border-[#3b82f6]/38 dark:bg-[#3b82f6]/[0.08] dark:text-[#dbeafe]",
                        isRemoved &&
                          "border-[#dc2626]/34 bg-[#dc2626]/[0.042] text-slate-950 dark:border-[#f87171]/34 dark:bg-[#f87171]/[0.08] dark:text-[#fecdd3]",
                        !isAdded &&
                          !isRemoved &&
                          "text-slate-700 dark:text-slate-300/90",
                        displayEntry?.highlighted &&
                          index === Math.min(1, visibleCode.length - 1) &&
                          "animate-pulse",
                      )}
                    >
                      <span
                        className={cn(
                          "mr-3 w-3 shrink-0 text-center text-[11px]",
                          isAdded
                            ? "text-[#2563eb] dark:text-[#60a5fa]"
                            : isRemoved
                              ? "text-[#dc2626] dark:text-[#f87171]"
                              : "text-slate-400/90 dark:text-slate-600/90",
                        )}
                      >
                        {isAdded ? "+" : isRemoved ? "-" : " "}
                      </span>
                      <span className="min-w-0 flex-1 whitespace-pre-wrap break-words">
                        {isAdded || isRemoved
                          ? line.slice(1).trimStart()
                          : line}
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

              <div className="flex-1" />
            </div>
          </div>
        </div>

        {state.metrics?.length ? (
          <div className="hidden w-[6.75rem] shrink-0 border-l border-black/[0.05] bg-[#f1f3ee] p-2 lg:flex lg:flex-col lg:gap-2 dark:border-white/[0.07] dark:bg-white/[0.025]">
            {state.metrics.map((metric) => (
              <div
                key={metric.id}
                className="rounded-md border border-black/[0.065] bg-white/76 px-2 py-2 text-center dark:border-white/[0.08] dark:bg-white/[0.03]"
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
