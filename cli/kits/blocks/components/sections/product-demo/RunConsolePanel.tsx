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
    <div className="flex h-full min-h-0 flex-col text-[var(--demo-fg)] [font-synthesis:none] antialiased">
      <div className="flex min-h-0 flex-1 overflow-hidden rounded-none border border-[var(--demo-border)] bg-[var(--demo-code-bg)] shadow-none">
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <div className="grid min-h-0 flex-1 grid-cols-[3.5rem_minmax(0,1fr)] overflow-y-auto bg-[var(--demo-code-bg)] lg:overflow-hidden">
            <div className="border-r border-[var(--demo-border)] bg-[var(--demo-code-gutter-bg)] px-2 py-3 font-mono text-[11px] leading-7 text-[var(--demo-subtle-fg)]">
              {visibleCode.map((line, index) => {
                const isAdded = line.trimStart().startsWith("+");
                const isRemoved = line.trimStart().startsWith("-");

                return (
                  <div
                    key={`${startLine + index}`}
                    className={cn(
                      "text-right",
                      isAdded && "text-[var(--demo-info)]",
                      isRemoved && "text-[var(--demo-danger)]",
                    )}
                  >
                    {startLine + index}
                  </div>
                );
              })}
            </div>

            <div className="relative min-h-full bg-[var(--demo-code-bg)] px-3 py-3 font-mono text-[12px] leading-7 text-[var(--demo-fg)]">
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
                          "border-[var(--demo-info-border)] bg-[var(--demo-info-soft-bg)] text-[var(--demo-fg)]",
                        isRemoved &&
                          "border-[var(--demo-danger-border)] bg-[var(--demo-danger-soft-bg)] text-[var(--demo-fg)]",
                        !isAdded && !isRemoved && "text-[var(--demo-muted-fg)]",

                        displayEntry?.highlighted &&
                          index === Math.min(1, visibleCode.length - 1) &&
                          "animate-pulse",
                      )}
                    >
                      <span
                        className={cn(
                          "mr-3 w-3 shrink-0 text-center text-[11px]",
                          isAdded
                            ? "text-[var(--demo-info)]"
                            : isRemoved
                              ? "text-[var(--demo-danger)]"
                              : "text-[var(--demo-subtle-fg)]",
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
                  <div className="mt-2 flex items-center gap-2 pl-3 text-[11px] text-[var(--demo-subtle-fg)]">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--demo-accent)]" />
                    Applying change...
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {state.metrics?.length ? (
          <div className="hidden w-[6.75rem] shrink-0 border-l border-[var(--demo-border)] bg-[var(--demo-panel-muted-bg)] p-2 lg:flex lg:flex-col lg:gap-2">
            {state.metrics.map((metric) => (
              <div
                key={metric.id}
                className="rounded-md border border-[var(--demo-border)] bg-[var(--demo-panel-bg)] px-2 py-2 text-center"
              >
                <div className="text-[10px] uppercase tracking-[0.16em] text-[var(--demo-subtle-fg)]">
                  {metric.label}
                </div>
                <div className="mt-1 font-mono text-[12px] text-[var(--demo-fg)]">
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
