import React from "react";
import { cn } from "@/lib/utils";
import type {
  ProductDemoWorkflowStudioState,
  ProductDemoWorkflowTranscriptEntry,
} from "./types";

function useAnimatedPatchCount(target: number | undefined, visible: boolean) {
  const safeTarget =
    typeof target === "number" ? Math.max(target, 0) : undefined;
  const [displayValue, setDisplayValue] = React.useState(safeTarget ?? 0);

  React.useEffect(() => {
    if (typeof safeTarget !== "number") {
      return;
    }

    if (!visible) {
      setDisplayValue(safeTarget);
      return;
    }

    if (safeTarget <= 2) {
      setDisplayValue(safeTarget);
      return;
    }

    let frameId = 0;
    const duration = Math.min(900, Math.max(520, safeTarget * 26));
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextValue = Math.max(1, Math.round(safeTarget * eased));

      setDisplayValue(nextValue);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    setDisplayValue(1);
    frameId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameId);
  }, [safeTarget, visible]);

  return typeof safeTarget === "number" ? displayValue : undefined;
}

function PatchCount({
  prefix,
  value,
  visible,
  className,
}: {
  prefix: "+" | "-";
  value?: number;
  visible: boolean;
  className: string;
}) {
  const animatedValue = useAnimatedPatchCount(value, visible);

  if (typeof value !== "number" || typeof animatedValue !== "number") {
    return null;
  }

  return (
    <span className={className}>
      {prefix}
      {animatedValue}
    </span>
  );
}

export interface WorkflowStudioPanelProps {
  state: ProductDemoWorkflowStudioState;
}

function normalizeEntry(
  entry: string | ProductDemoWorkflowTranscriptEntry,
  index: number,
): ProductDemoWorkflowTranscriptEntry {
  if (typeof entry !== "string") {
    return entry;
  }

  if (index === 0) {
    return { id: `entry-${index}`, kind: "title", text: entry };
  }

  if (/^thought/i.test(entry)) {
    return { id: `entry-${index}`, kind: "thought", text: entry };
  }

  return { id: `entry-${index}`, kind: "activity", text: entry };
}

function getEntryLabel(kind?: ProductDemoWorkflowTranscriptEntry["kind"]) {
  switch (kind) {
    case "prompt":
      return "Task";
    case "activity":
      return "Action";
    case "thought":
      return "Reasoning";
    case "message":
      return "Update";
    case "file":
      return "Patch";
    default:
      return "Session";
  }
}

export function WorkflowStudioPanel({ state }: WorkflowStudioPanelProps) {
  const scrollViewportRef = React.useRef<HTMLDivElement | null>(null);
  const activeIndex = state.nodes.findIndex(
    (node) => node.id === state.activeNodeId || node.active,
  );
  const activeNode = activeIndex >= 0 ? state.nodes[activeIndex] : undefined;
  const transcript = (state.transcript ?? []).map(normalizeEntry);
  const composer = state.composer;
  const playbackMs = state.playbackMs ?? 1800;
  const [visibleCount, setVisibleCount] = React.useState(
    state.playbackStep ?? Math.max(1, Math.min(2, transcript.length)),
  );
  const [scrollMetrics, setScrollMetrics] = React.useState({
    scrollTop: 0,
    scrollHeight: 1,
    clientHeight: 1,
  });

  React.useEffect(() => {
    if (typeof state.playbackStep === "number") {
      setVisibleCount(
        Math.max(1, Math.min(state.playbackStep, transcript.length)),
      );
      return;
    }

    setVisibleCount(Math.max(1, Math.min(2, transcript.length)));

    if (transcript.length <= 2) {
      return;
    }

    const interval = window.setInterval(() => {
      setVisibleCount((current) => {
        if (current >= transcript.length) {
          return 2;
        }

        return current + 1;
      });
    }, playbackMs);

    return () => window.clearInterval(interval);
  }, [playbackMs, transcript.length, state.window.title, state.playbackStep]);

  React.useEffect(() => {
    const viewport = scrollViewportRef.current;

    if (!viewport) {
      return;
    }

    const updateScrollMetrics = () => {
      setScrollMetrics({
        scrollTop: viewport.scrollTop,
        scrollHeight: viewport.scrollHeight,
        clientHeight: viewport.clientHeight,
      });
    };

    updateScrollMetrics();

    viewport.addEventListener("scroll", updateScrollMetrics, {
      passive: true,
    });

    const resizeObserver = new ResizeObserver(() => {
      updateScrollMetrics();
    });

    resizeObserver.observe(viewport);

    if (viewport.firstElementChild instanceof HTMLElement) {
      resizeObserver.observe(viewport.firstElementChild);
    }

    window.addEventListener("resize", updateScrollMetrics);

    return () => {
      viewport.removeEventListener("scroll", updateScrollMetrics);
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateScrollMetrics);
    };
  }, [visibleCount, transcript.length]);

  const visibleTranscript = transcript.slice(0, visibleCount);
  const isRunning = visibleCount < transcript.length;
  const hasOverflow =
    scrollMetrics.scrollHeight > scrollMetrics.clientHeight + 1;
  const thumbHeight = hasOverflow
    ? Math.max(
        36,
        (scrollMetrics.clientHeight / scrollMetrics.scrollHeight) *
          scrollMetrics.clientHeight,
      )
    : 0;
  const maxThumbOffset = Math.max(scrollMetrics.clientHeight - thumbHeight, 0);
  const maxScrollTop = Math.max(
    scrollMetrics.scrollHeight - scrollMetrics.clientHeight,
    1,
  );
  const thumbOffset = hasOverflow
    ? (scrollMetrics.scrollTop / maxScrollTop) * maxThumbOffset
    : 0;

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[#f4f5f1] text-slate-900 [font-synthesis:none] antialiased dark:bg-[#090909] dark:text-slate-100">
      <div className="relative min-h-0 flex-1">
        <div
          ref={scrollViewportRef}
          className="min-h-0 h-full overflow-y-auto px-4 py-4 pr-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex min-h-full flex-col pr-1.5">
            <div className="space-y-3">
              {visibleTranscript.map((entry, index) => {
                if (entry.kind === "title") {
                  return (
                    <div key={entry.id} className="space-y-2.5">
                      <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.15em] text-slate-500/90 dark:text-slate-500/90">
                        <span>{getEntryLabel(entry.kind)}</span>
                        <span className="h-1 w-1 rounded-full bg-black/20 dark:bg-white/20" />
                        <span>{entry.text}</span>
                      </div>
                      {activeNode?.description ? (
                        <div className="rounded-lg border border-black/[0.07] bg-white/62 px-3 py-2.5 text-[12px] leading-relaxed text-slate-800 shadow-none dark:border-white/[0.08] dark:bg-white/[0.028] dark:text-slate-200 dark:shadow-none">
                          {activeNode.description}
                        </div>
                      ) : null}
                    </div>
                  );
                }

                if (entry.kind === "prompt") {
                  return (
                    <div
                      key={entry.id}
                      className="space-y-1.5 rounded-lg border border-black/[0.07] bg-white/62 px-3 py-2.5 dark:border-white/[0.08] dark:bg-white/[0.028]"
                    >
                      <div className="text-[9px] uppercase tracking-[0.15em] text-slate-500/90 dark:text-slate-500/90">
                        {getEntryLabel(entry.kind)}
                      </div>
                      <div className="text-[12px] leading-relaxed text-slate-800 dark:text-slate-300">
                        {entry.text}
                      </div>
                    </div>
                  );
                }

                if (entry.kind === "message") {
                  return (
                    <div key={entry.id} className="max-w-[92%] space-y-1">
                      <div className="text-[9px] uppercase tracking-[0.15em] text-slate-500/90 dark:text-slate-500/90">
                        {getEntryLabel(entry.kind)}
                      </div>
                      <div className="text-[12px] leading-relaxed text-slate-800 dark:text-slate-200">
                        {entry.text}
                      </div>
                    </div>
                  );
                }

                if (entry.kind === "file") {
                  const isNewestVisibleFile =
                    entry.id ===
                    [...visibleTranscript]
                      .reverse()
                      .find(
                        (transcriptEntry) => transcriptEntry.kind === "file",
                      )?.id;

                  return (
                    <div
                      key={entry.id}
                      className="space-y-1.5 rounded-md border border-black/[0.07] bg-white/58 px-3 py-2 dark:border-white/[0.075] dark:bg-white/[0.022]"
                    >
                      <div className="text-[9px] uppercase tracking-[0.15em] text-slate-500/90 dark:text-slate-500/90">
                        {getEntryLabel(entry.kind)}
                      </div>
                      <div className="flex items-center justify-between gap-3 text-[11px] text-slate-700 dark:text-slate-300">
                        <span className="truncate font-mono text-[11px] text-slate-700 dark:text-slate-300">
                          {entry.path ?? entry.text}
                        </span>
                        <div className="flex items-center gap-2 font-mono text-[11px] tabular-nums">
                          <PatchCount
                            prefix="+"
                            value={entry.added}
                            visible={isNewestVisibleFile}
                            className="text-[#3b82f6]"
                          />
                          <PatchCount
                            prefix="-"
                            value={entry.removed}
                            visible={isNewestVisibleFile}
                            className="text-[#ef4444]"
                          />
                        </div>
                      </div>
                    </div>
                  );
                }

                if (entry.kind === "thought") {
                  return (
                    <div key={entry.id} className="space-y-1">
                      <div className="text-[9px] uppercase tracking-[0.15em] text-slate-400/90 dark:text-slate-500/90">
                        {getEntryLabel(entry.kind)}
                      </div>
                      <div className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-500">
                        {entry.text}
                      </div>
                    </div>
                  );
                }

                const isLastActivity =
                  index === visibleTranscript.length - 1 ||
                  (index < visibleTranscript.length - 1 &&
                    visibleTranscript[index + 1]?.kind === "file");

                return (
                  <div key={entry.id} className="space-y-1.5">
                    <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.15em] text-slate-400/90 dark:text-slate-500/90">
                      <span>{getEntryLabel(entry.kind)}</span>
                      <span className="h-1 w-1 rounded-full bg-black/20 dark:bg-white/20" />
                      <span className="truncate">
                        {activeNode?.type ?? "Agent"}
                      </span>
                    </div>
                    <div className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-500">
                      {entry.text}
                    </div>
                    {isLastActivity && activeNode?.metadata ? (
                      <div className="pt-1 text-[11px] leading-relaxed text-slate-500 dark:text-slate-300">
                        {activeNode.metadata}
                      </div>
                    ) : null}
                    {isRunning && index === visibleTranscript.length - 1 ? (
                      <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400 dark:text-slate-500">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#3b82f6]" />
                        Running
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>

            <div className="flex-1" />
          </div>
        </div>

        {hasOverflow ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-3 right-1.5 w-[6px] rounded-full bg-black/[0.045] dark:bg-white/[0.05]"
          >
            <div
              className="absolute inset-x-0 rounded-full bg-[linear-gradient(180deg,rgba(15,23,42,0.26),rgba(15,23,42,0.42))] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] dark:bg-[linear-gradient(180deg,rgba(226,232,240,0.24),rgba(226,232,240,0.4))] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
              style={{
                height: `${thumbHeight}px`,
                transform: `translateY(${thumbOffset}px)`,
              }}
            />
          </div>
        ) : null}
      </div>

      {composer ? (
        <div className="border-t border-black/[0.055] bg-[#eef0eb] px-4 py-3 dark:border-white/[0.07] dark:bg-[#090909]">
          <div className="rounded-lg border border-black/[0.07] bg-white/72 px-3 py-3 shadow-none dark:border-white/[0.08] dark:bg-white/[0.03] dark:shadow-none">
            <div className="text-[11px] text-slate-500 dark:text-slate-500">
              {composer.placeholder ??
                "Ask the agent to inspect, search, or build..."}
            </div>
            <div className="mt-3 flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400">
              <span className="rounded-full border border-black/[0.07] bg-[#f5f6f2] px-2.5 py-1 text-slate-600 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-300">
                {composer.modeLabel ?? "Agent"}
              </span>
              <span className="rounded-full border border-black/[0.07] bg-[#f5f6f2] px-2.5 py-1 text-slate-600 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-300">
                {composer.modelLabel ?? "Model 2"}
              </span>
              <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full border border-black/[0.07] bg-[#f5f6f2] text-slate-600 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-300">
                ?
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
