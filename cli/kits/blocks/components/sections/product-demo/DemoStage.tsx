"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { DemoWindow } from "./DemoWindow";
import type {
  ProductDemoApprovalInboxState,
  ProductDemoHighlightTarget,
  ProductDemoHighlightTone,
  ProductDemoKnowledgePanelState,
  ProductDemoRunConsoleState,
  ProductDemoScenario,
  ProductDemoStatusTone,
  ProductDemoWindowKey,
  ProductDemoWindowMeta,
  ProductDemoWorkflowStudioState,
} from "./types";

export interface DemoStageProps {
  scenarios?: ProductDemoScenario[];
  initialScenarioIndex?: number;
  activeScenarioKey?: string;
  autoCycle?: boolean;
  cycleIntervalMs?: number;
  className?: string;
  enableMotion?: boolean;
  ariaLabel?: string;
}

type WindowRenderData = {
  key: ProductDemoWindowKey;
  meta: ProductDemoWindowMeta;
  content: React.ReactNode;
};

const WINDOW_ORDER: ProductDemoWindowKey[] = [
  "workflowStudio",
  "knowledgePanel",
  "runConsole",
  "approvalInbox",
];

const HIGHLIGHT_TONE_CLASSES: Record<ProductDemoHighlightTone, string> = {
  neutral: "border-border/60 bg-muted/60 text-muted-foreground",
  info: "border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-300",
  success:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
  warning:
    "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  danger: "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-300",
  accent: "border-primary/35 bg-primary/10 text-primary",
  muted: "border-border/60 bg-background/70 text-muted-foreground",
};

const STATUS_TONE_CLASSES: Record<ProductDemoStatusTone, string> = {
  neutral: "border-border/60 bg-muted/55 text-muted-foreground",
  info: "border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-300",
  success:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
  warning:
    "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  danger: "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-300",
};

function clampInitialScenarioIndex(index: number | undefined, count: number) {
  if (count <= 0) {
    return 0;
  }

  return Math.max(0, Math.min(index ?? 0, count - 1));
}

function getHighlightClass(tone: ProductDemoHighlightTone = "accent") {
  return HIGHLIGHT_TONE_CLASSES[tone];
}

function getStatusClass(tone: ProductDemoStatusTone = "neutral") {
  return STATUS_TONE_CLASSES[tone];
}

function useActiveScenario({
  scenarios,
  initialScenarioIndex,
  activeScenarioKey,
  autoCycle,
  cycleIntervalMs,
}: {
  scenarios: ProductDemoScenario[];
  initialScenarioIndex?: number;
  activeScenarioKey?: string;
  autoCycle?: boolean;
  cycleIntervalMs?: number;
}) {
  const fallbackIndex = React.useMemo(
    () => clampInitialScenarioIndex(initialScenarioIndex, scenarios.length),
    [initialScenarioIndex, scenarios.length],
  );

  const keyedIndex = React.useMemo(() => {
    if (!activeScenarioKey) {
      return -1;
    }

    return scenarios.findIndex(
      (scenario) => scenario.key === activeScenarioKey,
    );
  }, [activeScenarioKey, scenarios]);

  const controlledIndex = keyedIndex >= 0 ? keyedIndex : fallbackIndex;
  const [internalIndex, setInternalIndex] = React.useState(controlledIndex);
  const activeIndex = activeScenarioKey ? controlledIndex : internalIndex;

  React.useEffect(() => {
    if (activeScenarioKey) {
      setInternalIndex(controlledIndex);
    }
  }, [activeScenarioKey, controlledIndex]);

  React.useEffect(() => {
    if (activeScenarioKey || !autoCycle || scenarios.length <= 1) {
      return;
    }

    const intervalMs = Math.max(cycleIntervalMs ?? 4500, 1200);
    const timer = window.setInterval(() => {
      setInternalIndex((currentIndex) => (currentIndex + 1) % scenarios.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [activeScenarioKey, autoCycle, cycleIntervalMs, scenarios.length]);

  return scenarios[activeIndex] ?? scenarios[0];
}

function HighlightPills({
  highlights,
}: {
  highlights?: ProductDemoHighlightTarget[];
}) {
  if (!highlights?.length) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {highlights.map((highlight) => (
        <span
          key={highlight.id}
          className={cn(
            "rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em]",
            getHighlightClass(highlight.tone),
          )}
        >
          {highlight.label ?? highlight.id}
        </span>
      ))}
    </div>
  );
}

function WorkflowStudioPanel({
  state,
}: {
  state: ProductDemoWorkflowStudioState;
}) {
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

      <HighlightPills highlights={state.highlights} />

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
    </div>
  );
}

function RunConsolePanel({ state }: { state: ProductDemoRunConsoleState }) {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
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

        {(state.statusLabel || state.progressLabel) && (
          <div className="space-y-1 text-right">
            {state.statusLabel && (
              <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                {state.statusLabel}
              </div>
            )}
            {state.progressLabel && (
              <div className="text-sm font-semibold text-card-foreground">
                {state.progressLabel}
              </div>
            )}
          </div>
        )}
      </div>

      {state.metrics?.length ? (
        <div className="grid grid-cols-2 gap-2">
          {state.metrics.map((metric) => (
            <div
              key={metric.id}
              className={cn(
                "rounded-xl border px-3 py-2",
                getStatusClass(metric.tone),
              )}
            >
              <div className="text-[10px] font-medium uppercase tracking-[0.14em] opacity-80">
                {metric.label}
              </div>
              <div className="mt-1 text-sm font-semibold">{metric.value}</div>
            </div>
          ))}
        </div>
      ) : null}

      <HighlightPills highlights={state.highlights} />

      <div className="space-y-2">
        {state.entries.map((entry) => {
          const isActive =
            entry.id === state.activeEntryId || entry.highlighted;

          return (
            <div
              key={entry.id}
              className={cn(
                "rounded-xl border border-border/60 bg-background/70 px-3 py-2.5",
                isActive && "border-primary/40 bg-primary/6",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-card-foreground">
                    {entry.message}
                  </div>
                  {(entry.source || entry.timestamp) && (
                    <div className="mt-1 text-[11px] text-muted-foreground">
                      {[entry.source, entry.timestamp]
                        .filter(Boolean)
                        .join(" • ")}
                    </div>
                  )}
                </div>
                {entry.status && (
                  <span
                    className={cn(
                      "rounded-full border px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em]",
                      getStatusClass(entry.status),
                    )}
                  >
                    {entry.status}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ApprovalInboxPanel({
  state,
}: {
  state: ProductDemoApprovalInboxState;
}) {
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

      <HighlightPills highlights={state.highlights} />

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

function KnowledgePanel({ state }: { state: ProductDemoKnowledgePanelState }) {
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

      {state.query && (
        <div className="rounded-xl border border-primary/25 bg-primary/8 px-3 py-2 text-xs text-primary">
          {state.query}
        </div>
      )}

      {state.summary && (
        <p className="text-xs leading-relaxed text-muted-foreground">
          {state.summary}
        </p>
      )}

      {state.sources?.length ? (
        <div className="flex flex-wrap gap-2">
          {state.sources.map((source) => (
            <span
              key={source.id}
              className={cn(
                "rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em]",
                getStatusClass(source.status),
              )}
            >
              {source.label}
            </span>
          ))}
        </div>
      ) : null}

      <HighlightPills highlights={state.highlights} />

      <div className="space-y-3">
        {state.snippets.map((snippet) => {
          const isActive =
            snippet.id === state.activeSnippetId || snippet.highlighted;

          return (
            <div
              key={snippet.id}
              className={cn(
                "rounded-2xl border border-border/60 bg-background/80 p-3",
                isActive && "border-primary/45 bg-primary/6 shadow-sm",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="text-sm font-semibold text-card-foreground">
                  {snippet.title}
                </div>
                {snippet.confidence && (
                  <span className="rounded-full border border-border/60 bg-muted/60 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    {snippet.confidence}
                  </span>
                )}
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {snippet.content}
              </p>
              {snippet.tags?.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {snippet.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border/60 bg-background/70 px-2 py-0.5 text-[10px] text-muted-foreground"
                    >
                      {tag}
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

function getWindowRenderData(
  scenario: ProductDemoScenario,
): WindowRenderData[] {
  return [
    {
      key: "workflowStudio",
      meta: scenario.workflowStudio.window,
      content: <WorkflowStudioPanel state={scenario.workflowStudio} />,
    },
    {
      key: "knowledgePanel",
      meta: scenario.knowledgePanel.window,
      content: <KnowledgePanel state={scenario.knowledgePanel} />,
    },
    {
      key: "runConsole",
      meta: scenario.runConsole.window,
      content: <RunConsolePanel state={scenario.runConsole} />,
    },
    {
      key: "approvalInbox",
      meta: scenario.approvalInbox.window,
      content: <ApprovalInboxPanel state={scenario.approvalInbox} />,
    },
  ];
}

function getWindowShellClass(key: ProductDemoWindowKey) {
  switch (key) {
    case "workflowStudio":
      return "lg:absolute lg:left-[3%] lg:top-[8%] lg:h-[72%] lg:w-[58%]";
    case "knowledgePanel":
      return "lg:absolute lg:right-[6%] lg:top-[6%] lg:h-[42%] lg:w-[34%]";
    case "runConsole":
      return "lg:absolute lg:left-[12%] lg:bottom-[5%] lg:h-[34%] lg:w-[42%]";
    case "approvalInbox":
      return "lg:absolute lg:right-[8%] lg:bottom-[8%] lg:h-[40%] lg:w-[32%]";
    default:
      return "";
  }
}

function getTransformStyle(
  meta: ProductDemoWindowMeta,
): React.CSSProperties | undefined {
  const layoutHint = meta.layoutHint;

  if (!layoutHint) {
    return undefined;
  }

  const translateX = layoutHint.x ?? 0;
  const translateY = layoutHint.y ?? 0;
  const rotate = layoutHint.rotateDeg ?? 0;

  return {
    zIndex: layoutHint.zIndex,
    transform: `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`,
  };
}

export function DemoStage({
  scenarios = [],
  initialScenarioIndex,
  activeScenarioKey,
  autoCycle = false,
  cycleIntervalMs = 4500,
  className,
  enableMotion = true,
  ariaLabel = "Product demo stage",
}: DemoStageProps) {
  const activeScenario = useActiveScenario({
    scenarios,
    initialScenarioIndex,
    activeScenarioKey,
    autoCycle,
    cycleIntervalMs,
  });

  const activeIndex = React.useMemo(() => {
    if (!activeScenario) {
      return 0;
    }

    return scenarios.findIndex(
      (scenario) => scenario.key === activeScenario.key,
    );
  }, [activeScenario, scenarios]);

  if (!activeScenario) {
    return (
      <div
        data-product-demo-stage
        className={cn(
          "relative isolate min-h-[24rem] w-full overflow-hidden rounded-[2rem] border border-border/60 bg-gradient-to-br from-background via-background to-muted/40 shadow-2xl",
          enableMotion &&
            "transition-transform duration-300 hover:-translate-y-1 motion-reduce:transition-none",
          className,
        )}
        aria-label={ariaLabel}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_38%),linear-gradient(135deg,rgba(148,163,184,0.08),transparent_55%)]" />
        <div className="absolute inset-4 rounded-[1.5rem] border border-dashed border-border/60 bg-background/70" />
      </div>
    );
  }

  const windows = getWindowRenderData(activeScenario).sort(
    (a, b) => WINDOW_ORDER.indexOf(a.key) - WINDOW_ORDER.indexOf(b.key),
  );

  return (
    <div
      data-product-demo-stage
      data-auto-cycle={autoCycle ? "true" : "false"}
      data-enable-motion={enableMotion ? "true" : "false"}
      data-scenario-count={scenarios.length}
      data-active-scenario-key={activeScenario.key}
      data-active-scenario-index={activeIndex}
      data-cycle-interval-ms={cycleIntervalMs}
      className={cn(
        "relative isolate min-h-[30rem] w-full overflow-hidden rounded-[2rem] border border-border/60 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.13),transparent_35%),linear-gradient(135deg,rgba(15,23,42,0.04),transparent_55%)] shadow-2xl",
        className,
      )}
      aria-label={ariaLabel}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/96 to-muted/45" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary/8 to-transparent" />

      <div className="relative z-10 flex min-h-[30rem] flex-col gap-4 p-4 sm:p-5 lg:block lg:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-1">
          <div>
            {activeScenario.label && (
              <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary/80">
                {activeScenario.label}
              </div>
            )}
            {activeScenario.description && (
              <p className="mt-1 max-w-xl text-xs leading-relaxed text-muted-foreground">
                {activeScenario.description}
              </p>
            )}
          </div>

          <HighlightPills highlights={activeScenario.highlights} />
        </div>

        <div className="grid gap-4 lg:hidden">
          {windows.map((windowData) => {
            const activeWindow =
              activeScenario.activeWindow === windowData.key ||
              (!activeScenario.activeWindow &&
                windowData.key === "workflowStudio");

            return (
              <DemoWindow
                key={windowData.key}
                window={windowData.meta}
                active={activeWindow}
                enableMotion={enableMotion}
              >
                {windowData.content}
              </DemoWindow>
            );
          })}
        </div>

        <div className="hidden lg:block lg:h-[32rem] xl:h-[34rem]">
          {windows.map((windowData) => {
            const activeWindow =
              activeScenario.activeWindow === windowData.key ||
              (!activeScenario.activeWindow &&
                windowData.key === "workflowStudio");

            return (
              <motion.div
                key={windowData.key}
                initial={
                  enableMotion ? { opacity: 0, y: 18, scale: 0.98 } : false
                }
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: activeWindow ? 1 : 0.985,
                }}
                transition={
                  enableMotion
                    ? {
                        type: "tween",
                        duration: 0.45,
                      }
                    : { duration: 0 }
                }
                className={cn(
                  "will-change-transform",
                  getWindowShellClass(windowData.key),
                )}
                style={getTransformStyle(windowData.meta)}
              >
                <DemoWindow
                  window={windowData.meta}
                  active={activeWindow}
                  dimmed={!activeWindow}
                  enableMotion={enableMotion}
                  className="h-full"
                >
                  {windowData.content}
                </DemoWindow>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
