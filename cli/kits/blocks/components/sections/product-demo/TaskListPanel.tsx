import React from "react";

import { cn } from "@/lib/utils";
import type { ProductDemoTaskListState } from "./types";

export interface TaskListPanelProps {
  state: ProductDemoTaskListState;
  onSelect?: (taskId: string) => void;
}

export function TaskListPanel({ state, onSelect }: TaskListPanelProps) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-[#f2f1eb] text-slate-900 dark:bg-[#070707] dark:text-slate-100">
      <div className="space-y-0 overflow-hidden">
        {state.items.map((item, index) => {
          const isActive = item.id === state.activeItemId;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect?.(item.id)}
              className={cn(
                "relative isolate w-full overflow-hidden rounded-none border-x-0 border-y border-b-0 px-3 py-3 text-left transition-colors duration-200 first:border-t-0",
                "border-black/[0.06] bg-white/72 hover:border-black/[0.08] hover:bg-white/86 dark:border-white/[0.07] dark:bg-white/[0.018] dark:hover:border-white/[0.08] dark:hover:bg-white/[0.03]",
                isActive &&
                  "border-black/[0.08] bg-white/92 shadow-none dark:border-white/[0.09] dark:bg-white/[0.045] dark:shadow-none",
              )}
            >
              {isActive ? (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-none bg-[linear-gradient(135deg,rgba(59,130,246,0.1),rgba(255,255,255,0)_42%,rgba(239,68,68,0.1))] dark:bg-[linear-gradient(135deg,rgba(59,130,246,0.12),rgba(255,255,255,0)_42%,rgba(239,68,68,0.12))]"
                />
              ) : null}

              <div className="relative z-10 flex items-start gap-3">
                <span
                  className={cn(
                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold",
                    isActive
                      ? "border-black/[0.08] bg-[#f7f5ee] text-slate-900 dark:border-white/[0.14] dark:bg-white/[0.07] dark:text-white"
                      : "border-black/[0.08] bg-[#ebe8df] text-slate-500 dark:border-white/[0.08] dark:bg-white/[0.035] dark:text-slate-400",
                  )}
                >
                  {index + 1}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {item.title}
                  </div>
                  {item.description && (
                    <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                      {item.description}
                    </p>
                  )}
                  {item.meta && (
                    <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400/90">
                      {item.meta}
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
