import React from "react";
import { cn } from "@/lib/utils";
import type {
  ProductDemoWorkflowStudioState,
  ProductDemoWorkflowTranscriptEntry,
} from "./types";

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

export function WorkflowStudioPanel({ state }: WorkflowStudioPanelProps) {
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

  const visibleTranscript = transcript.slice(0, visibleCount);
  const placeholderCount = Math.max(transcript.length, 8);
  const hiddenTranscriptCount = Math.max(
    placeholderCount - visibleTranscript.length,
    0,
  );
  const isRunning = visibleCount < transcript.length;

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[#f7f6f1] text-slate-900 [text-rendering:geometricPrecision] [font-synthesis:none] antialiased dark:bg-[#090909] dark:text-slate-100">
      <div className="min-h-0 flex-1 overflow-hidden px-4 py-4">
        <div className="flex min-h-full flex-col">
          <div className="space-y-3.5">
            {visibleTranscript.map((entry, index) => {
              if (entry.kind === "title") {
                return (
                  <div key={entry.id} className="space-y-2">
                    <div className="text-[11px] font-medium tracking-[0.02em] text-slate-500 dark:text-slate-500">
                      {entry.text}
                    </div>
                    {activeNode?.description ? (
                      <div className="rounded-lg border border-black/10 bg-white/88 px-3 py-2.5 text-[12px] leading-relaxed text-slate-800 shadow-[0_10px_24px_-18px_rgba(15,23,42,0.06)] dark:border-white/8 dark:bg-white/[0.035] dark:text-slate-200 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
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
                    className="rounded-lg border border-black/10 bg-white/88 px-3 py-2.5 text-[12px] leading-relaxed text-slate-800 dark:border-white/8 dark:bg-white/[0.03] dark:text-slate-300"
                  >
                    {entry.text}
                  </div>
                );
              }

              if (entry.kind === "message") {
                return (
                  <div
                    key={entry.id}
                    className="max-w-[92%] text-[12px] leading-relaxed text-slate-800 dark:text-slate-200"
                  >
                    {entry.text}
                  </div>
                );
              }

              if (entry.kind === "file") {
                return (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between gap-3 rounded-md border border-black/10 bg-white/76 px-3 py-2 text-[11px] text-slate-700 dark:border-white/7 dark:bg-white/[0.025] dark:text-slate-300"
                  >
                    <span className="truncate font-mono text-[11px] text-slate-700 dark:text-slate-300">
                      {entry.path ?? entry.text}
                    </span>
                    <div className="flex items-center gap-2 font-mono text-[11px] tabular-nums">
                      {typeof entry.added === "number" ? (
                        <span className="text-[#3b82f6]">+{entry.added}</span>
                      ) : null}
                      {typeof entry.removed === "number" ? (
                        <span className="text-[#ef4444]">-{entry.removed}</span>
                      ) : null}
                    </div>
                  </div>
                );
              }

              if (entry.kind === "thought") {
                return (
                  <div
                    key={entry.id}
                    className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-500"
                  >
                    {entry.text}
                  </div>
                );
              }

              const isLastActivity =
                index === visibleTranscript.length - 1 ||
                (index < visibleTranscript.length - 1 &&
                  visibleTranscript[index + 1]?.kind === "file");

              return (
                <div key={entry.id} className="space-y-1.5">
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

          {hiddenTranscriptCount > 0 ? (
            <div
              aria-hidden="true"
              className="pointer-events-none mt-3 space-y-3.5 opacity-[0.16]"
            >
              {Array.from({ length: hiddenTranscriptCount }).map((_, index) => (
                <div
                  key={`transcript-placeholder-${index}`}
                  className="h-4 rounded bg-black/[0.045] dark:bg-white/[0.05]"
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {composer ? (
        <div className="border-t border-black/8 bg-[#f3f2ec] px-4 py-3 dark:border-white/8 dark:bg-[#090909]">
          <div className="rounded-lg border border-black/10 bg-white px-3 py-3 shadow-[0_10px_30px_-22px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/[0.03] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
            <div className="text-[11px] text-slate-500 dark:text-slate-500">
              {composer.placeholder ??
                "Ask the agent to inspect, search, or build..."}
            </div>
            <div className="mt-3 flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400">
              <span className="rounded-full border border-black/10 bg-[#f6f5ef] px-2.5 py-1 text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300">
                {composer.modeLabel ?? "Agent"}
              </span>
              <span className="rounded-full border border-black/10 bg-[#f6f5ef] px-2.5 py-1 text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300">
                {composer.modelLabel ?? "Model 2"}
              </span>
              <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full border border-black/10 bg-[#f6f5ef] text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300">
                ?
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
