"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { DemoWindow } from "./DemoWindow";
import { KnowledgePanel } from "./KnowledgePanel";
import { RunConsolePanel } from "./RunConsolePanel";
import { TaskListPanel } from "./TaskListPanel";
import { WorkflowStudioPanel } from "./WorkflowStudioPanel";
import type {
  ProductDemoHighlightTarget,
  ProductDemoHighlightTone,
  ProductDemoRunConsolePlaybackConfig,
  ProductDemoScenario,
  ProductDemoWindowKey,
  ProductDemoWindowMeta,
  ProductDemoWorkflowPlaybackConfig,
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
  "taskList",
  "workflowStudio",
  "runConsole",
  "knowledgePanel",
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

function clampInitialScenarioIndex(index: number | undefined, count: number) {
  if (count <= 0) {
    return 0;
  }

  return Math.max(0, Math.min(index ?? 0, count - 1));
}

function getHighlightClass(tone: ProductDemoHighlightTone = "accent") {
  return HIGHLIGHT_TONE_CLASSES[tone];
}

function useActiveScenario({
  scenarios,
  initialScenarioIndex,
  activeScenarioKey,
}: {
  scenarios: ProductDemoScenario[];
  initialScenarioIndex?: number;
  activeScenarioKey?: string;
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

  return {
    activeScenario: scenarios[activeIndex] ?? scenarios[0],
    activeIndex,
    setActiveIndex: setInternalIndex,
  };
}

type PlaybackTimelineConfig = {
  stepCount: number;
  playbackMs?: number;
  playbackStepDurationsMs?: number[];
  playbackResetDelayMs?: number;
  scenarioKey: string;
};

function getWorkflowPlaybackConfig(
  scenario: ProductDemoScenario,
): ProductDemoWorkflowPlaybackConfig {
  return {
    playbackMs:
      scenario.playback?.workflowStudio?.playbackMs ??
      scenario.workflowStudio.playbackMs,
    playbackStepDurationsMs:
      scenario.playback?.workflowStudio?.playbackStepDurationsMs ??
      scenario.workflowStudio.playbackStepDurationsMs,
    playbackResetDelayMs:
      scenario.playback?.workflowStudio?.playbackResetDelayMs ??
      scenario.workflowStudio.playbackResetDelayMs,
  };
}

function getRunConsolePlaybackConfig(
  scenario: ProductDemoScenario,
): ProductDemoRunConsolePlaybackConfig {
  return {
    playbackMs:
      scenario.playback?.runConsole?.playbackMs ??
      scenario.runConsole.playbackMs,
    playbackStepDurationsMs:
      scenario.playback?.runConsole?.playbackStepDurationsMs ??
      scenario.runConsole.playbackStepDurationsMs,
    playbackResetDelayMs:
      scenario.playback?.runConsole?.playbackResetDelayMs ??
      scenario.runConsole.playbackResetDelayMs,
    playbackStepEntryIndices:
      scenario.playback?.runConsole?.playbackStepEntryIndices ??
      scenario.runConsole.playbackStepEntryIndices,
    playbackStepVisibleLineCounts:
      scenario.playback?.runConsole?.playbackStepVisibleLineCounts ??
      scenario.runConsole.playbackStepVisibleLineCounts,
  };
}

function useDeterministicPlaybackStep({
  stepCount,
  playbackMs,
  playbackStepDurationsMs,
  playbackResetDelayMs,
  scenarioKey,
}: PlaybackTimelineConfig) {
  const basePlaybackMs = playbackMs ?? 1800;
  const stepDurations = playbackStepDurationsMs ?? [];
  const resetDelayMs =
    playbackResetDelayMs ?? Math.max(basePlaybackMs + 240, 1600);
  const [playbackStep, setPlaybackStep] = React.useState(1);

  React.useEffect(() => {
    const initialStep = Math.max(1, Math.min(2, stepCount));
    setPlaybackStep(initialStep);

    if (stepCount <= 2) {
      return;
    }

    let timeoutId = 0;
    let cancelled = false;

    const scheduleStep = (step: number) => {
      const delay = Math.max(260, stepDurations[step - 3] ?? basePlaybackMs);

      timeoutId = window.setTimeout(() => {
        if (cancelled) {
          return;
        }

        setPlaybackStep(step);

        if (step >= stepCount) {
          timeoutId = window.setTimeout(
            () => {
              if (cancelled) {
                return;
              }

              setPlaybackStep(initialStep);
              scheduleStep(initialStep + 1);
            },
            Math.max(600, resetDelayMs),
          );

          return;
        }

        scheduleStep(step + 1);
      }, delay);
    };

    scheduleStep(initialStep + 1);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [basePlaybackMs, stepCount, resetDelayMs, stepDurations, scenarioKey]);

  return playbackStep;
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

function getWindowRenderData(
  scenario: ProductDemoScenario,
  onSelectTask: (taskId: string) => void,
): WindowRenderData[] {
  return [
    {
      key: "taskList",
      meta: scenario.taskList.window,
      content: (
        <TaskListPanel state={scenario.taskList} onSelect={onSelectTask} />
      ),
    },
    {
      key: "workflowStudio",
      meta: scenario.workflowStudio.window,
      content: <WorkflowStudioPanel state={scenario.workflowStudio} />,
    },
    {
      key: "runConsole",
      meta: scenario.runConsole.window,
      content: <RunConsolePanel state={scenario.runConsole} />,
    },
    {
      key: "knowledgePanel",
      meta: scenario.knowledgePanel.window,
      content: (
        <>
          <HighlightPills highlights={scenario.knowledgePanel.highlights} />
          <KnowledgePanel state={scenario.knowledgePanel} />
        </>
      ),
    },
  ];
}

function getWindowShellClass(key: ProductDemoWindowKey) {
  switch (key) {
    case "taskList":
      return "lg:col-span-2";
    case "workflowStudio":
      return "lg:col-span-3";
    case "runConsole":
      return "lg:col-span-5";
    case "knowledgePanel":
    case "approvalInbox":
      return "hidden";
    default:
      return "";
  }
}

function getMobileWindowClass(key: ProductDemoWindowKey) {
  switch (key) {
    case "taskList":
      return "h-[15rem] sm:h-[16rem] lg:h-full";
    case "workflowStudio":
      return "h-[18rem] sm:h-[19rem] lg:h-full";
    case "runConsole":
      return "h-[18rem] sm:h-[19rem] lg:h-full";
    default:
      return "lg:h-full";
  }
}

export function DemoStage({
  scenarios = [],
  initialScenarioIndex,
  activeScenarioKey,
  className,
  enableMotion = true,
  ariaLabel = "Product demo stage",
}: DemoStageProps) {
  const { activeScenario, activeIndex, setActiveIndex } = useActiveScenario({
    scenarios,
    initialScenarioIndex,
    activeScenarioKey,
  });

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

  const workflowPlayback = getWorkflowPlaybackConfig(activeScenario);
  const runConsolePlayback = getRunConsolePlaybackConfig(activeScenario);

  const workflowPlaybackStep = useDeterministicPlaybackStep({
    stepCount: Math.max(
      1,
      activeScenario.workflowStudio.transcript?.length ?? 1,
    ),
    playbackMs: workflowPlayback.playbackMs,
    playbackStepDurationsMs: workflowPlayback.playbackStepDurationsMs,
    playbackResetDelayMs: workflowPlayback.playbackResetDelayMs,
    scenarioKey: `${activeScenario.key}-workflowStudio`,
  });

  const runConsolePlaybackStep = useDeterministicPlaybackStep({
    stepCount: Math.max(
      1,
      runConsolePlayback.playbackStepEntryIndices?.length ?? 0,
      runConsolePlayback.playbackStepVisibleLineCounts?.length ?? 0,
      activeScenario.runConsole.entries.length,
    ),
    playbackMs: runConsolePlayback.playbackMs,
    playbackStepDurationsMs: runConsolePlayback.playbackStepDurationsMs,
    playbackResetDelayMs: runConsolePlayback.playbackResetDelayMs,
    scenarioKey: `${activeScenario.key}-runConsole`,
  });

  const scenarioWithPlayback: ProductDemoScenario = {
    ...activeScenario,
    workflowStudio: {
      ...activeScenario.workflowStudio,
      ...workflowPlayback,
      playbackStep: workflowPlaybackStep,
    },
    runConsole: {
      ...activeScenario.runConsole,
      ...runConsolePlayback,
      playbackStep: runConsolePlaybackStep,
    },
  };

  const windows = getWindowRenderData(scenarioWithPlayback, (taskId) => {
    const nextIndex = scenarios.findIndex(
      (scenario) => scenario.key === taskId,
    );

    if (nextIndex >= 0) {
      setActiveIndex(nextIndex);
    }
  }).sort((a, b) => WINDOW_ORDER.indexOf(a.key) - WINDOW_ORDER.indexOf(b.key));

  return (
    <div
      data-product-demo-stage
      data-enable-motion={enableMotion ? "true" : "false"}
      data-scenario-count={scenarios.length}
      data-active-scenario-key={activeScenario.key}
      data-active-scenario-index={activeIndex}
      className={cn(
        "relative isolate min-h-[36rem] w-full overflow-visible rounded-none border-0 bg-transparent shadow-none lg:h-full lg:min-h-0",
        className,
      )}
      aria-label={ariaLabel}
    >
      <div className="relative z-10 flex min-h-[36rem] flex-col gap-4 lg:h-full lg:min-h-0 lg:gap-0">
        <div className="grid auto-rows-max gap-4 lg:hidden">
          {windows.map((windowData) => {
            if (getWindowShellClass(windowData.key) === "hidden") {
              return null;
            }

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
                showControls={false}
                showResizeHandle={false}
                showHeader={false}
                className={getMobileWindowClass(windowData.key)}
                bodyClassName="px-0 py-0 sm:px-0 sm:py-0"
              >
                {windowData.content}
              </DemoWindow>
            );
          })}
        </div>

        <div className="hidden overflow-hidden rounded-[0.4rem] border border-[var(--demo-border)] bg-[var(--demo-shell-bg)] shadow-[var(--demo-shell-shadow)] ring-1 ring-[var(--demo-shell-ring)] lg:flex lg:h-full lg:min-h-0 lg:flex-col">
          <div className="relative flex h-[3.2rem] items-center justify-between border-b border-[var(--demo-border)] bg-[var(--demo-shell-muted-bg)] px-4 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:px-5">
            <div className="flex min-w-0 items-center gap-3.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-[0.4rem] border border-[var(--demo-border)] bg-[var(--demo-shell-strong-bg)] text-[var(--demo-fg)] shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <span className="grid grid-cols-2 gap-[2px]">
                  <span className="h-[3px] w-[3px] rounded-[1px] bg-[var(--demo-fg)]" />
                  <span className="h-[3px] w-[3px] rounded-[1px] bg-[var(--demo-muted-fg)]" />
                  <span className="h-[3px] w-[3px] rounded-[1px] bg-[var(--demo-muted-fg)]" />
                  <span className="h-[3px] w-[3px] rounded-[1px] bg-[var(--demo-fg)]" />
                </span>
              </div>
              <div className="min-w-0 space-y-0.5">
                <div className="flex min-w-0 items-center gap-2">
                  <div className="truncate text-[12px] font-semibold tracking-[-0.02em] text-[var(--demo-fg)]">
                    Agent workspace
                  </div>
                  <span className="hidden rounded-full border border-[var(--demo-border)] bg-[var(--demo-panel-bg)] px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.14em] text-[var(--demo-subtle-fg)] xl:inline-flex">
                    session 03
                  </span>
                </div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--demo-subtle-fg)]">
                  Session · live repo
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2.5 text-[10px] uppercase tracking-[0.16em] text-[var(--demo-subtle-fg)]">
              <div className="hidden items-center gap-2 text-[10px] text-[var(--demo-subtle-fg)] xl:flex">
                <span>repo</span>
                <span className="font-mono text-[var(--demo-muted-fg)]">
                  apps/web
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--demo-border)] bg-[var(--demo-panel-bg)] px-2.5 py-1 text-[var(--demo-muted-fg)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--demo-success)]" />
                Active
              </span>
            </div>
          </div>

          <div className="grid min-h-0 flex-1 lg:grid-cols-10 lg:gap-0">
            {windows.map((windowData) => {
              const shellClass = getWindowShellClass(windowData.key);

              if (shellClass === "hidden") {
                return null;
              }

              const activeWindow =
                activeScenario.activeWindow === windowData.key ||
                (!activeScenario.activeWindow &&
                  windowData.key === "workflowStudio");

              return (
                <div key={windowData.key} className={cn("min-h-0", shellClass)}>
                  <DemoWindow
                    window={windowData.meta}
                    active={activeWindow}
                    dimmed={false}
                    enableMotion={enableMotion}
                    showControls={false}
                    showResizeHandle={false}
                    showHeader={false}
                    className={cn(
                      "h-full min-h-0 border-0 shadow-none",
                      windowData.key === "taskList" &&
                        "rounded-none border-r border-[var(--demo-border)]",
                      windowData.key === "workflowStudio" &&
                        "rounded-none border-r border-[var(--demo-border)]",

                      windowData.key === "runConsole" && "rounded-none",
                    )}
                    bodyClassName="px-0 py-0 sm:px-0 sm:py-0"
                  >
                    {windowData.content}
                  </DemoWindow>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
