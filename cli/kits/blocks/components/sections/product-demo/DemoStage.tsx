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
        "relative isolate min-h-[36rem] w-full overflow-hidden rounded-[14px] border border-black/6 bg-[#d8d5ce] shadow-[0_36px_100px_-48px_rgba(15,23,42,0.18)] dark:border-white/8 dark:bg-[#151518] dark:shadow-[0_24px_80px_-32px_rgba(15,23,42,0.62)] lg:min-h-[44rem]",
        className,
      )}
      aria-label={ariaLabel}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.05),transparent_38%),radial-gradient(circle_at_top_right,rgba(239,68,68,0.04),transparent_36%),linear-gradient(180deg,#e9e6df_0%,#d8d5ce_100%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.07),transparent_38%),radial-gradient(circle_at_top_right,rgba(239,68,68,0.06),transparent_36%),linear-gradient(180deg,#19191c_0%,#121215_100%)]" />
      <div className="pointer-events-none absolute inset-[1px] rounded-[13px] ring-1 ring-white/28 dark:ring-white/6" />

      <div className="relative z-10 flex min-h-[36rem] flex-col gap-3 p-5 sm:p-5 lg:min-h-[44rem] lg:p-6">
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
              >
                {windowData.content}
              </DemoWindow>
            );
          })}
        </div>

        <div className="hidden lg:grid lg:min-h-[30rem] lg:grid-cols-10 lg:gap-0 xl:min-h-[32rem]">
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
                className={cn("will-change-transform", shellClass)}
              >
                <DemoWindow
                  window={windowData.meta}
                  active={activeWindow}
                  dimmed={false}
                  enableMotion={enableMotion}
                  showControls={false}
                  showResizeHandle={false}
                  className={cn(
                    "min-h-[30rem] h-full border-y border-black/8 bg-white/96 shadow-none dark:border-white/8 dark:bg-[#050505] xl:min-h-[32rem]",
                    windowData.key === "taskList" &&
                      "rounded-none border-l-0 border-r-0",
                    windowData.key === "runConsole" &&
                      "rounded-none border-l-0 border-r-0",
                    windowData.key === "workflowStudio" &&
                      "border-l-0 border-r-0 rounded-none",
                  )}
                  chromeClassName={cn(
                    "border-black/8 bg-white/96 dark:border-white/8 dark:bg-[#060606]",
                    windowData.key === "taskList" && "rounded-none",
                    windowData.key === "workflowStudio" &&
                      "border-l-0 border-r-0 rounded-none",
                    windowData.key === "runConsole" &&
                      "px-3 py-2.5 sm:px-3 rounded-none",
                  )}
                  bodyClassName={cn(
                    "px-4 py-4 sm:px-4 sm:py-4",
                    windowData.key === "runConsole" &&
                      "px-2 py-2 sm:px-2 sm:py-2",
                  )}
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
