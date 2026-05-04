import React from "react";
import { cn } from "@nextworks/blocks-core";
import type {
  ProductDemoApprovalInboxState,
  ProductDemoStatusTone,
} from "./types";

export interface ApprovalInboxPanelProps {
  state: ProductDemoApprovalInboxState;
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

export function ApprovalInboxPanel({ state }: ApprovalInboxPanelProps) {
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

      {state.counts?.length ? (
        <div className="flex flex-wrap gap-2">
          {state.counts.map((count) => (
            <div
              key={count.id}
              className={cn(
                "rounded-xl border px-3 py-2",
                getStatusClass(count.tone),
              )}
            >
              <div className="text-[10px] font-medium uppercase tracking-[0.14em] opacity-80">
                {count.label}
              </div>
              <div className="mt-1 text-sm font-semibold">{count.value}</div>
            </div>
          ))}
        </div>
      ) : null}

      <div className="space-y-3">
        {state.items.map((item) => {
          const isActive = item.id === state.activeItemId || item.highlighted;

          return (
            <div
              key={item.id}
              className={cn(
                "rounded-2xl border border-border/60 bg-background/80 p-3",
                isActive && "border-primary/45 bg-primary/6 shadow-sm",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-card-foreground">
                    {item.title}
                  </div>
                  {item.description && (
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  )}
                </div>
                {item.status && (
                  <span
                    className={cn(
                      "rounded-full border px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em]",
                      getStatusClass(item.status),
                    )}
                  >
                    {item.status}
                  </span>
                )}
              </div>

              {(item.requester || item.priorityLabel || item.dueLabel) && (
                <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-muted-foreground">
                  {item.requester && <span>By {item.requester}</span>}
                  {item.priorityLabel && <span>{item.priorityLabel}</span>}
                  {item.dueLabel && <span>{item.dueLabel}</span>}
                </div>
              )}

              {item.actions?.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.actions.map((action) => (
                    <span
                      key={action.id}
                      className={cn(
                        "rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em]",
                        getStatusClass(action.tone),
                      )}
                    >
                      {action.label}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
