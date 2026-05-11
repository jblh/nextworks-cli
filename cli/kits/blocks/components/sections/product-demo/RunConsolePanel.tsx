import React from "react";
import { cn } from "@/lib/utils";
import type {
  ProductDemoRunConsoleState,
  ProductDemoStatusTone,
} from "./types";

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
  const activeEntry = state.entries.find(
    (entry) => entry.id === state.activeEntryId || entry.highlighted,
  );
  const activeCode = activeEntry?.code ?? [];
  const startLine = Number(activeEntry?.lineNumber ?? 24);

  return (
    <div className="flex h-full flex-col text-white/95">
      <div className="mb-2 flex items-center justify-between gap-3 text-[11px]">
        <div className="min-w-0 truncate font-mono text-slate-400">
          <span className="mr-2 uppercase tracking-[0.18em] text-slate-500">
            {activeEntry?.source ?? state.statusLabel ?? "active"}
          </span>

          <span className="truncate text-slate-300/95">
            {activeEntry?.message ?? state.editorSummary ?? state.subtitle}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-3 text-slate-500">
          {state.progressLabel ? (
            <span className="font-medium text-slate-400">
              {state.progressLabel}
            </span>
          ) : null}
          {typeof progressPercent === "number" ? (
            <span>{progressPercent}%</span>
          ) : null}
          {activeEntry?.timestamp ? <span>{activeEntry.timestamp}</span> : null}
        </div>
      </div>

      <div className="flex min-h-0 flex-1 overflow-hidden rounded-2xl border border-white/10 bg-[#08111d] shadow-[0_20px_60px_-30px_rgba(2,8,23,0.95)]">
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <div className="flex items-center gap-2 border-b border-white/8 bg-[#0b1525] px-3 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400/90" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
            <div className="ml-3 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-slate-300">
              {state.editorTabLabel ?? state.title}
            </div>
            {state.editorLanguage ? (
              <div className="ml-auto font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">
                {state.editorLanguage}
              </div>
            ) : null}
          </div>

          <div className="grid min-h-0 flex-1 grid-cols-[3.5rem_minmax(0,1fr)] bg-[#08111d]">
            <div className="border-r border-white/8 bg-[#07101b] px-2 py-3 font-mono text-[11px] leading-7 text-slate-600">
              {activeCode.map((line, index) => {
                const isAdded = line.trimStart().startsWith("+");
                const isRemoved = line.trimStart().startsWith("-");

                return (
                  <div
                    key={`${startLine + index}`}
                    className={cn(
                      "text-right",
                      isAdded && "text-emerald-500/80",
                      isRemoved && "text-rose-500/80",
                    )}
                  >
                    {startLine + index}
                  </div>
                );
              })}
            </div>

            <div className="px-3 py-3 font-mono text-[12px] leading-7 text-slate-300">
              {activeCode.map((line, index) => {
                const isAdded = line.trimStart().startsWith("+");
                const isRemoved = line.trimStart().startsWith("-");

                return (
                  <div
                    key={`${line}-${index}`}
                    className={cn(
                      "flex rounded-r-md border-l border-transparent pl-3 transition-colors",
                      isAdded &&
                        "border-emerald-400/70 bg-emerald-500/[0.16] text-emerald-100 shadow-[inset_0_1px_0_rgba(52,211,153,0.16)]",
                      isRemoved &&
                        "border-rose-400/70 bg-rose-500/[0.16] text-rose-100 shadow-[inset_0_1px_0_rgba(251,113,133,0.14)]",
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
                            : "text-slate-600",
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

        {state.metrics?.length ? (
          <div className="hidden w-[6.75rem] shrink-0 border-l border-white/8 bg-[#0a1422] p-2 lg:flex lg:flex-col lg:gap-2">
            {state.metrics.map((metric) => (
              <div
                key={metric.id}
                className="rounded-lg border border-white/8 bg-white/[0.03] px-2 py-2 text-center"
              >
                <div className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
                  {metric.label}
                </div>
                <div className="mt-1 font-mono text-[12px] text-slate-200">
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
