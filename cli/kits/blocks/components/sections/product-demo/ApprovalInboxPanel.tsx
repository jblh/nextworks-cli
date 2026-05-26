import React from "react";
import { cn } from "@/lib/utils";
import type {
  ProductDemoApprovalInboxState,
  ProductDemoStatusTone,
} from "./types";

export interface ApprovalInboxPanelProps {
  state: ProductDemoApprovalInboxState;
}

const STATUS_TONE_CLASSES: Record<ProductDemoStatusTone, string> = {
  neutral:
    "border-[var(--demo-border)] bg-[var(--demo-panel-bg)] text-[var(--demo-muted-fg)]",
  info: "border-[var(--demo-info-border)] bg-[var(--demo-info-soft-bg)] text-[var(--demo-info)]",
  success:
    "border-[var(--demo-success-border)] bg-[var(--demo-success-soft-bg)] text-[var(--demo-success)]",
  warning:
    "border-[var(--demo-warning-border)] bg-[var(--demo-warning-soft-bg)] text-[var(--demo-warning)]",
  danger:
    "border-[var(--demo-danger-border)] bg-[var(--demo-danger-soft-bg)] text-[var(--demo-danger)]",
};

function getStatusClass(tone: ProductDemoStatusTone = "neutral") {
  return STATUS_TONE_CLASSES[tone];
}

export function ApprovalInboxPanel({ state }: ApprovalInboxPanelProps) {
  return (
    <div className="flex h-full flex-col gap-4 text-[var(--demo-fg)]">
      <div className="space-y-1.5">
        {state.title && (
          <h4 className="text-sm font-semibold text-[var(--demo-fg)]">
            {state.title}
          </h4>
        )}
        {state.subtitle && (
          <p className="text-xs leading-relaxed text-[var(--demo-muted-fg)]">
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
                "rounded-2xl border border-[var(--demo-border)] bg-[var(--demo-panel-bg)] p-3",
                isActive &&
                  "border-[var(--demo-info-border)] bg-[var(--demo-info-soft-bg)] shadow-sm",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-[var(--demo-fg)]">
                    {item.title}
                  </div>
                  {item.description && (
                    <p className="mt-1 text-xs leading-relaxed text-[var(--demo-muted-fg)]">
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
                <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-[var(--demo-muted-fg)]">
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
