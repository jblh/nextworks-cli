import React from "react";
import { cn } from "@/lib/utils";
import type {
  ProductDemoStatusTone,
  ProductDemoWorkflowStudioState,
  ProductDemoWorkflowTranscriptEntry,
} from "./types";

export interface WorkflowStudioPanelProps {
  state: ProductDemoWorkflowStudioState;
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
  const activeStep = activeIndex >= 0 ? activeIndex + 1 : undefined;
  const activeNode = activeIndex >= 0 ? state.nodes[activeIndex] : undefined;
  const transcript = (state.transcript ?? []).map(normalizeEntry);
  const composer = state.composer;

  return (
    <div className="flex h-full flex-col overflow-hidden bg-[#08111c]">
      <div className="border-b border-white/8 px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            {state.title && (
              <h4 className="text-[13px] font-medium text-white/92">
                {state.title}
              </h4>
            )}
            {state.subtitle && (
              <p className="mt-1 max-w-sm text-[11px] leading-relaxed text-slate-400">
                {state.subtitle}
              </p>
            )}
          </div>

          {typeof activeStep === "number" ? (
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-slate-400">
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  activeNode?.status === "success"
                    ? "bg-emerald-400"
                    : "bg-cyan-400",
                )}
              />
              Step {activeStep}/{state.nodes.length}
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex-1 overflow-auto px-4 py-4">
        <div className="space-y-3.5">
          {transcript.map((entry, index) => {
            if (entry.kind === "title") {
              return (
                <div key={entry.id} className="space-y-2">
                  <div className="text-[11px] font-medium tracking-[0.02em] text-slate-500">
                    {entry.text}
                  </div>
                  {activeNode?.description ? (
                    <div className="rounded-xl border border-white/8 bg-white/[0.035] px-3 py-2.5 text-[12px] leading-relaxed text-slate-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                      {activeNode.description}
                    </div>
                  ) : null}
                </div>
              );
            }

            if (entry.kind === "message") {
              return (
                <div
                  key={entry.id}
                  className="max-w-[92%] text-[12px] leading-relaxed text-slate-200"
                >
                  {entry.text}
                </div>
              );
            }

            if (entry.kind === "file") {
              return (
                <div
                  key={entry.id}
                  className="flex items-center justify-between gap-3 rounded-md border border-white/7 bg-white/[0.025] px-3 py-2 text-[11px] text-slate-300"
                >
                  <span className="truncate font-mono text-[11px] text-slate-300">
                    {entry.path ?? entry.text}
                  </span>
                  <div className="flex items-center gap-2 font-mono text-[11px] tabular-nums">
                    {typeof entry.added === "number" ? (
                      <span className="text-emerald-400">+{entry.added}</span>
                    ) : null}
                    {typeof entry.removed === "number" ? (
                      <span className="text-rose-400">-{entry.removed}</span>
                    ) : null}
                  </div>
                </div>
              );
            }

            if (entry.kind === "thought") {
              return (
                <div
                  key={entry.id}
                  className="text-[11px] leading-relaxed text-slate-500"
                >
                  {entry.text}
                </div>
              );
            }

            const isLastActivity =
              index === transcript.length - 1 ||
              (index < transcript.length - 1 &&
                transcript[index + 1]?.kind === "file");

            return (
              <div key={entry.id} className="space-y-1.5">
                <div className="text-[11px] leading-relaxed text-slate-500">
                  {entry.text}
                </div>
                {isLastActivity && activeNode?.metadata ? (
                  <div className="pt-1 text-[11px] leading-relaxed text-slate-300">
                    {activeNode.metadata}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      {composer ? (
        <div className="border-t border-white/8 px-4 py-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
            <div className="text-[11px] text-slate-500">
              {composer.placeholder ??
                "Ask the agent to inspect, search, or build..."}
            </div>
            <div className="mt-3 flex items-center gap-2 text-[10px] text-slate-400">
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1">
                {composer.modeLabel ?? "Agent"}
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1">
                {composer.modelLabel ?? "Model 2"}
              </span>
              <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300">
                ↑
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
