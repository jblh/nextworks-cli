import React from "react";

import { cn } from "@/lib/utils";
import type { ProductDemoTaskListState } from "./types";

export interface TaskListPanelProps {
  state: ProductDemoTaskListState;
  onSelect?: (taskId: string) => void;
}

export function TaskListPanel({ state, onSelect }: TaskListPanelProps) {
  return (
    <div className="flex h-full flex-col gap-4">
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

      <div className="space-y-2.5">
        {state.items.map((item, index) => {
          const isActive = item.id === state.activeItemId;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect?.(item.id)}
              className={cn(
                "w-full rounded-2xl border px-3 py-3 text-left transition-colors duration-200",
                "border-border/60 bg-background/72 hover:border-primary/30 hover:bg-primary/[0.05]",
                isActive &&
                  "border-primary/45 bg-primary/[0.08] shadow-[0_12px_30px_-22px_rgba(59,130,246,0.65)]",
              )}
            >
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold",
                    isActive
                      ? "border-primary/40 bg-primary/12 text-primary"
                      : "border-border/70 bg-muted/60 text-muted-foreground",
                  )}
                >
                  {index + 1}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-card-foreground">
                    {item.title}
                  </div>
                  {item.description && (
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  )}
                  {item.meta && (
                    <div className="mt-2 text-[11px] text-muted-foreground/90">
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
