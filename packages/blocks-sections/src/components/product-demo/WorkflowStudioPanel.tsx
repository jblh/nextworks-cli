import React from "react";
import { cn } from "@nextworks/blocks-core";
import type {
  ProductDemoStatusTone,
  ProductDemoWorkflowRegion,
  ProductDemoWorkflowStudioState,
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

function getRegionState(
  region: ProductDemoWorkflowRegion,
  activeRegionId: string | undefined,
) {
  const isActive = region.id === activeRegionId || region.active;
  const isHighlighted = region.highlighted || isActive;

  return { isActive, isHighlighted };
}

export function WorkflowStudioPanel({ state }: WorkflowStudioPanelProps) {
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

      {state.regions?.length ? (
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {state.regions.map((region) => {
            const { isActive, isHighlighted } = getRegionState(
              region,
              state.activeRegionId,
            );

            return (
              <div
                key={region.id}
                className={cn(
                  "rounded-2xl border border-border/60 bg-background/75 p-3",
                  isActive && "border-primary/45 bg-primary/8 shadow-sm",
                  isHighlighted && "ring-1 ring-primary/20",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                      Region
                    </div>
                    <div className="mt-1 text-sm font-semibold text-card-foreground">
                      {region.label}
                    </div>
                  </div>
                  {region.status && (
                    <span
                      className={cn(
                        "rounded-full border px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em]",
                        getStatusClass(region.status),
                      )}
                    >
                      {region.status}
                    </span>
                  )}
                </div>
                {region.description && (
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {region.description}
                  </p>
                )}
                {region.nodeIds?.length ? (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {region.nodeIds.map((nodeId) => {
                      const node = state.nodes.find((item) => item.id === nodeId);

                      return (
                        <span
                          key={nodeId}
                          className="rounded-full border border-border/60 bg-background/80 px-2 py-0.5 text-[10px] text-muted-foreground"
                        >
                          {node?.label ?? nodeId}
                        </span>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {state.nodes.map((node) => {
          const isActive = node.id === state.activeNodeId || node.active;

          return (
            <div
              key={node.id}
              className={cn(
                "rounded-2xl border border-border/60 bg-background/80 p-3 shadow-sm",
                isActive && "border-primary/45 bg-primary/6 shadow-md",
                node.emphasized && "ring-1 ring-primary/30",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    {node.type ?? "step"}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-card-foreground">
                    {node.label}
                  </div>
                </div>
                {node.status && (
                  <span
                    className={cn(
                      "rounded-full border px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em]",
                      getStatusClass(node.status),
                    )}
                  >
                    {node.status}
                  </span>
                )}
              </div>
              {node.description && (
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {node.description}
                </p>
              )}
              {node.metadata && (
                <div className="mt-3 text-[11px] text-muted-foreground/90">
                  {node.metadata}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {state.branches?.length ? (
        <div className="rounded-2xl border border-dashed border-border/60 bg-background/60 p-3">
          <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Transitions
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {state.branches.map((branch) => (
              <div
                key={branch.id}
                className={cn(
                  "rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em]",
                  getStatusClass(branch.status),
                  branch.active && "border-primary/45 bg-primary/10 text-primary",
                )}
              >
                {branch.label ?? `${branch.fromNodeId} → ${branch.toNodeId}`}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
