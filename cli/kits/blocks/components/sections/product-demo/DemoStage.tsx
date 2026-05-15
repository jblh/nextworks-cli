"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { DemoWindow } from "./DemoWindow";
import { KnowledgePanel } from "./KnowledgePanel";
import { RunConsolePanel } from "./RunConsolePanel";
import { TaskListPanel } from "./TaskListPanel";
import { WorkflowStudioPanel } from "./WorkflowStudioPanel";
import type {
  ProductDemoHighlightTarget,
  ProductDemoHighlightTone,
  ProductDemoScenario,
  ProductDemoWindowKey,
  ProductDemoWindowMeta,
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

  const workflowPlaybackMs = activeScenario.workflowStudio.playbackMs ?? 1800;
  const transcriptLength = Math.max(
    1,
    activeScenario.workflowStudio.transcript?.length ?? 1,
  );
  const [playbackStep, setPlaybackStep] = React.useState(1);

  React.useEffect(() => {
    setPlaybackStep(Math.max(1, Math.min(2, transcriptLength)));

    if (transcriptLength <= 2) {
      return;
    }

    const interval = window.setInterval(() => {
      setPlaybackStep((current) => {
        if (current >= transcriptLength) {
          return 2;
        }

        return current + 1;
      });
    }, workflowPlaybackMs);

    return () => window.clearInterval(interval);
  }, [workflowPlaybackMs, transcriptLength, activeScenario.key]);

  const scenarioWithPlayback: ProductDemoScenario = {
    ...activeScenario,
    workflowStudio: {
      ...activeScenario.workflowStudio,
      playbackStep,
    },
    runConsole: {
      ...activeScenario.runConsole,
      playbackStep,
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
        "relative isolate min-h-[36rem] w-full overflow-hidden rounded-none border-0 bg-[#faf9f4] shadow-none dark:bg-[#050505] lg:min-h-[44rem]",
        className,
      )}
      aria-label={ariaLabel}
    >
      <div className="absolute inset-0 bg-[#faf9f4] dark:bg-[#050505]" />

      <div className="relative z-10 flex h-[36rem] min-h-[36rem] flex-col gap-3 p-4 sm:p-4 lg:h-[44rem] lg:min-h-[44rem] lg:p-5">
        <div className="grid gap-4 lg:hidden">
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
              >
                {windowData.content}
              </DemoWindow>
            );
          })}
        </div>

        <div className="hidden lg:flex lg:h-full lg:min-h-0 lg:flex-col">
          <div className="flex h-[3.25rem] items-center justify-between border border-black/10 border-b-0 bg-[#faf9f4] px-4 py-2.5 dark:border-white/8 dark:bg-[#050505] sm:px-5">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md border border-black/10 bg-white text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] dark:border-white/10 dark:bg-white/[0.06] dark:text-white/90 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <span className="grid grid-cols-2 gap-[2px]">
                  <span className="h-[3px] w-[3px] rounded-[1px] bg-slate-900 dark:bg-white/90" />
                  <span className="h-[3px] w-[3px] rounded-[1px] bg-slate-500 dark:bg-white/55" />
                  <span className="h-[3px] w-[3px] rounded-[1px] bg-slate-500 dark:bg-white/55" />
                  <span className="h-[3px] w-[3px] rounded-[1px] bg-slate-900 dark:bg-white/90" />
                </span>
              </div>
              <div className="min-w-0">
                <div className="text-[12px] font-semibold tracking-[-0.02em] text-slate-900 dark:text-white/94">
                  Agent workspace
                </div>
                <div className="text-[10px] uppercase tracking-[0.16em] text-slate-500 dark:text-white/40">
                  Live session
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-slate-500 dark:text-white/42">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-2.5 py-1 text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/58">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Active
              </span>
            </div>
          </div>

          <div className="grid min-h-0 flex-1 lg:grid-cols-10 lg:gap-0 lg:pb-5">
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
                <motion.div
                  key={windowData.key}
                  initial={enableMotion ? { opacity: 0, y: 10 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={
                    enableMotion
                      ? {
                          type: "tween",
                          duration: 0.3,
                        }
                      : { duration: 0 }
                  }
                  className={cn("min-h-0 will-change-transform", shellClass)}
                >
                  <DemoWindow
                    window={windowData.meta}
                    active={activeWindow}
                    dimmed={false}
                    enableMotion={enableMotion}
                    showControls={false}
                    showResizeHandle={false}
                    showHeader={false}
                    className={cn(
                      "h-full min-h-0 border border-black/10 bg-[#faf9f4] shadow-none dark:border-white/8 dark:bg-[#050505]",
                      windowData.key === "taskList" &&
                        "rounded-none border-r-0",
                      windowData.key === "workflowStudio" &&
                        "rounded-none border-l-0 border-r-0",
                      windowData.key === "runConsole" &&
                        "rounded-none border-l-0",
                    )}
                    bodyClassName="px-0 py-0 sm:px-0 sm:py-0"
                  >
                    {windowData.content}
                  </DemoWindow>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
