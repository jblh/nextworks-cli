import React from "react";
import type {
  ProductDemoWorkflowStudioState,
  ProductDemoWorkflowTranscriptEntry,
} from "./types";

function useAnimatedPatchCount(target: number | undefined, visible: boolean) {
  const safeTarget =
    typeof target === "number" ? Math.max(target, 0) : undefined;
  const [displayValue, setDisplayValue] = React.useState(() =>
    typeof safeTarget === "number" ? 1 : 0,
  );

  React.useEffect(() => {
    if (typeof safeTarget !== "number") {
      return;
    }

    if (!visible) {
      setDisplayValue(safeTarget);
      return;
    }

    if (safeTarget <= 2) {
      setDisplayValue(safeTarget);
      return;
    }

    let frameId = 0;
    const duration = Math.min(900, Math.max(520, safeTarget * 26));
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextValue = Math.max(1, Math.round(safeTarget * eased));

      setDisplayValue(nextValue);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    setDisplayValue(1);
    frameId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameId);
  }, [safeTarget, visible]);

  return typeof safeTarget === "number" ? displayValue : undefined;
}

function PatchCount({
  prefix,
  value,
  visible,
  className,
}: {
  prefix: "+" | "-";
  value?: number;
  visible: boolean;
  className: string;
}) {
  const animatedValue = useAnimatedPatchCount(value, visible);

  if (typeof value !== "number" || typeof animatedValue !== "number") {
    return null;
  }

  return (
    <span className={className}>
      {prefix}
      {animatedValue}
    </span>
  );
}

export interface WorkflowStudioPanelProps {
  state: ProductDemoWorkflowStudioState;
}

type SessionEntry = ProductDemoWorkflowTranscriptEntry & {
  origin?: "user" | "system";
};

function normalizeEntry(
  entry: string | ProductDemoWorkflowTranscriptEntry,
  index: number,
): ProductDemoWorkflowTranscriptEntry {
  if (typeof entry !== "string") {
    return entry;
  }

  if (index === 0) {
    return { id: `entry-${index}`, kind: "title", text: entry };
  }

  if (/^thought/i.test(entry)) {
    return { id: `entry-${index}`, kind: "thought", text: entry };
  }

  return { id: `entry-${index}`, kind: "activity", text: entry };
}

function getEntryLabel(kind?: ProductDemoWorkflowTranscriptEntry["kind"]) {
  switch (kind) {
    case "prompt":
      return "Task";
    case "activity":
      return "Action";
    case "thought":
      return "Reasoning";
    case "message":
      return "Update";
    case "file":
      return "Patch";
    default:
      return "Session";
  }
}

export function WorkflowStudioPanel({ state }: WorkflowStudioPanelProps) {
  const scrollViewportRef = React.useRef<HTMLDivElement | null>(null);
  const scrollbarTrackRef = React.useRef<HTMLDivElement | null>(null);
  const dragStateRef = React.useRef<{
    pointerId: number;
    startY: number;
    startScrollTop: number;
    scrollRatio: number;
    pointerOffsetY: number;
  } | null>(null);
  const activeIndex = state.nodes.findIndex(
    (node) => node.id === state.activeNodeId || node.active,
  );

  const activeNode = activeIndex >= 0 ? state.nodes[activeIndex] : undefined;
  const transcript = (state.transcript ?? []).map(normalizeEntry);
  const composer = state.composer;
  const playbackMs = state.playbackMs ?? 1800;
  const [visibleCount, setVisibleCount] = React.useState(
    state.playbackStep ?? Math.max(1, Math.min(2, transcript.length)),
  );
  const [scrollMetrics, setScrollMetrics] = React.useState({
    scrollTop: 0,
    scrollHeight: 1,
    clientHeight: 1,
  });
  const [composerValue, setComposerValue] = React.useState("");
  const [localItems, setLocalItems] = React.useState<
    Array<SessionEntry & { insertionIndex: number; order: number }>
  >([]);
  const submissionSeqRef = React.useRef(0);
  const pendingTimeoutsRef = React.useRef<number[]>([]);
  const previousPlaybackStepRef = React.useRef<number | undefined>(
    state.playbackStep,
  );

  React.useEffect(() => {
    setComposerValue("");
    setLocalItems([]);
    submissionSeqRef.current = 0;

    pendingTimeoutsRef.current.forEach((timeoutId) => {
      window.clearTimeout(timeoutId);
    });
    pendingTimeoutsRef.current = [];
  }, [state.title, state.subtitle, state.activeNodeId, state.window.key]);

  React.useEffect(() => {
    return () => {
      pendingTimeoutsRef.current.forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });
      pendingTimeoutsRef.current = [];
    };
  }, []);

  const scrollToBottom = React.useCallback(() => {
    const viewport = scrollViewportRef.current;

    if (!viewport) {
      return;
    }

    viewport.scrollTop = viewport.scrollHeight;
  }, []);

  const handleComposerSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const trimmedValue = composerValue.trim();

      if (!trimmedValue) {
        return;
      }

      const submissionIndex = submissionSeqRef.current + 1;
      submissionSeqRef.current = submissionIndex;
      const insertionIndex = Math.max(visibleCount, 1);

      const promptEntry: SessionEntry & {
        insertionIndex: number;
        order: number;
      } = {
        id: `local-prompt-${submissionIndex}`,
        kind: "prompt",
        text: trimmedValue,
        origin: "user",
        insertionIndex,
        order: 0,
      };
      const responseEntry: SessionEntry & {
        insertionIndex: number;
        order: number;
      } = {
        id: `local-response-${submissionIndex}`,
        kind: "message",
        text: "Added to session.",
        origin: "system",
        insertionIndex,
        order: 1,
      };

      setLocalItems((currentItems) => [...currentItems, promptEntry]);
      setComposerValue("");
      window.requestAnimationFrame(scrollToBottom);

      const timeoutId = window.setTimeout(() => {
        setLocalItems((currentItems) => [...currentItems, responseEntry]);
        window.requestAnimationFrame(scrollToBottom);
      }, 680);

      pendingTimeoutsRef.current.push(timeoutId);
    },
    [composerValue, scrollToBottom, visibleCount],
  );

  React.useEffect(() => {
    if (typeof state.playbackStep === "number") {
      const previousPlaybackStep = previousPlaybackStepRef.current;
      const isPlaybackLoopReset =
        typeof previousPlaybackStep === "number" &&
        previousPlaybackStep > 2 &&
        state.playbackStep <= 2;

      if (isPlaybackLoopReset) {
        setLocalItems([]);
        pendingTimeoutsRef.current.forEach((timeoutId) => {
          window.clearTimeout(timeoutId);
        });
        pendingTimeoutsRef.current = [];
      }

      previousPlaybackStepRef.current = state.playbackStep;
      setVisibleCount(
        Math.max(1, Math.min(state.playbackStep, transcript.length)),
      );
      return;
    }

    setVisibleCount(Math.max(1, Math.min(2, transcript.length)));

    if (transcript.length <= 2) {
      return;
    }

    const interval = window.setInterval(() => {
      setVisibleCount((current) => {
        if (current >= transcript.length) {
          return 2;
        }

        return current + 1;
      });
    }, playbackMs);

    return () => window.clearInterval(interval);
  }, [playbackMs, transcript.length, state.window.title, state.playbackStep]);

  React.useEffect(() => {
    const viewport = scrollViewportRef.current;

    if (!viewport) {
      return;
    }

    const updateScrollMetrics = () => {
      setScrollMetrics({
        scrollTop: viewport.scrollTop,
        scrollHeight: viewport.scrollHeight,
        clientHeight: viewport.clientHeight,
      });
    };

    updateScrollMetrics();

    viewport.addEventListener("scroll", updateScrollMetrics, {
      passive: true,
    });

    const resizeObserver = new ResizeObserver(() => {
      updateScrollMetrics();
    });

    resizeObserver.observe(viewport);

    if (viewport.firstElementChild instanceof HTMLElement) {
      resizeObserver.observe(viewport.firstElementChild);
    }

    window.addEventListener("resize", updateScrollMetrics);

    return () => {
      viewport.removeEventListener("scroll", updateScrollMetrics);
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateScrollMetrics);
    };
  }, [visibleCount, transcript.length]);

  const visibleTranscript = transcript.slice(0, visibleCount);
  const injectedItemsByIndex = React.useMemo(() => {
    const map = new Map<number, Array<SessionEntry & { order: number }>>();

    localItems.forEach((item) => {
      const itemsAtIndex = map.get(item.insertionIndex) ?? [];
      itemsAtIndex.push(item);
      map.set(item.insertionIndex, itemsAtIndex);
    });

    for (const itemsAtIndex of map.values()) {
      itemsAtIndex.sort((a, b) => a.order - b.order);
    }

    return map;
  }, [localItems]);
  const isRunning = visibleCount < transcript.length;

  const hasOverflow =
    scrollMetrics.scrollHeight > scrollMetrics.clientHeight + 1;
  const thumbHeight = hasOverflow
    ? Math.max(
        36,
        (scrollMetrics.clientHeight / scrollMetrics.scrollHeight) *
          scrollMetrics.clientHeight,
      )
    : 0;
  const maxThumbOffset = Math.max(scrollMetrics.clientHeight - thumbHeight, 0);
  const maxScrollTop = Math.max(
    scrollMetrics.scrollHeight - scrollMetrics.clientHeight,
    1,
  );
  const thumbOffset = hasOverflow
    ? (scrollMetrics.scrollTop / maxScrollTop) * maxThumbOffset
    : 0;

  const updateScrollTopFromPointer = React.useCallback(
    (clientY: number) => {
      const viewport = scrollViewportRef.current;
      const track = scrollbarTrackRef.current;

      if (!viewport || !track || !hasOverflow) {
        return;
      }

      const trackRect = track.getBoundingClientRect();
      const nextThumbTop = Math.min(
        Math.max(
          clientY - trackRect.top - dragStateRef.current!.pointerOffsetY,
          0,
        ),
        maxThumbOffset,
      );
      const nextScrollTop =
        maxThumbOffset > 0 ? (nextThumbTop / maxThumbOffset) * maxScrollTop : 0;

      viewport.scrollTop = nextScrollTop;
    },
    [hasOverflow, maxScrollTop, maxThumbOffset],
  );

  const handleScrollbarPointerDown = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const viewport = scrollViewportRef.current;
      const track = scrollbarTrackRef.current;

      if (!viewport || !track || !hasOverflow) {
        return;
      }

      const trackRect = track.getBoundingClientRect();
      const targetElement = event.target as HTMLElement | null;
      const clickedThumb = targetElement?.dataset.scrollbarThumb === "true";
      const pointerOffsetY = clickedThumb
        ? event.clientY - trackRect.top - thumbOffset
        : thumbHeight / 2;

      dragStateRef.current = {
        pointerId: event.pointerId,
        startY: event.clientY,
        startScrollTop: viewport.scrollTop,
        scrollRatio: maxThumbOffset > 0 ? maxScrollTop / maxThumbOffset : 0,
        pointerOffsetY,
      };

      if (!clickedThumb) {
        updateScrollTopFromPointer(event.clientY);
      }

      (event.currentTarget as HTMLDivElement).setPointerCapture(
        event.pointerId,
      );
      event.preventDefault();
    },
    [
      hasOverflow,
      maxScrollTop,
      maxThumbOffset,
      thumbHeight,
      thumbOffset,
      updateScrollTopFromPointer,
    ],
  );

  const handleScrollbarPointerMove = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const dragState = dragStateRef.current;

      if (!dragState || dragState.pointerId !== event.pointerId) {
        return;
      }

      const viewport = scrollViewportRef.current;
      const track = scrollbarTrackRef.current;

      if (!viewport || !track || !hasOverflow) {
        return;
      }

      const deltaY = event.clientY - dragState.startY;
      const nextScrollTop = Math.min(
        Math.max(dragState.startScrollTop + deltaY * dragState.scrollRatio, 0),
        maxScrollTop,
      );

      viewport.scrollTop = nextScrollTop;
      event.preventDefault();
    },
    [hasOverflow, maxScrollTop],
  );

  const handleScrollbarPointerUp = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const dragState = dragStateRef.current;

      if (dragState?.pointerId === event.pointerId) {
        dragStateRef.current = null;
      }
    },
    [],
  );

  const renderSessionEntry = (
    entry: SessionEntry,
    index: number,
    isLocalEntry = false,
  ) => {
    if (entry.kind === "title") {
      return (
        <div key={entry.id} className="space-y-2.5">
          <div className="flex items-center justify-between gap-3 text-[9px] uppercase tracking-[0.15em] text-[var(--demo-subtle-fg)]">
            <div className="flex min-w-0 items-center gap-2">
              <span>Session focus</span>
              <span className="h-1 w-1 rounded-full bg-[var(--demo-border-strong)]" />
              <span className="truncate">{entry.text}</span>
            </div>
            {activeNode?.type ? (
              <span className="rounded-full border border-[var(--demo-border)] bg-[var(--demo-panel-bg)] px-2 py-1 text-[8px] tracking-[0.16em] text-[var(--demo-muted-fg)]">
                {activeNode.type}
              </span>
            ) : null}
          </div>
          {activeNode?.description ? (
            <div className="rounded-lg border border-[var(--demo-border)] bg-[var(--demo-panel-bg)] px-3 py-2.5 text-[12px] leading-relaxed text-[var(--demo-fg)] shadow-none">
              {activeNode.description}
            </div>
          ) : null}
        </div>
      );
    }

    if (entry.kind === "prompt" && isLocalEntry) {
      return (
        <div
          key={entry.id}
          className="space-y-1.5 rounded-lg border border-[var(--demo-border-strong)] bg-[var(--demo-shell-strong-bg)] px-3 py-2.5"
        >
          <div className="flex items-center justify-between gap-3 text-[9px] uppercase tracking-[0.15em] text-[var(--demo-subtle-fg)]">
            <span>Prompt</span>
            <span className="text-[8px] tracking-[0.18em] text-[var(--demo-subtle-fg)]">
              Sent
            </span>
          </div>
          <div className="text-[12px] leading-relaxed text-[var(--demo-fg)]">
            {entry.text}
          </div>
        </div>
      );
    }

    if (entry.kind === "prompt") {
      return (
        <div
          key={entry.id}
          className="space-y-1.5 rounded-lg border border-[var(--demo-border)] bg-[var(--demo-panel-bg)] px-3 py-2.5"
        >
          <div className="text-[9px] uppercase tracking-[0.15em] text-[var(--demo-subtle-fg)]">
            {getEntryLabel(entry.kind)}
          </div>
          <div className="text-[12px] leading-relaxed text-[var(--demo-fg)]">
            {entry.text}
          </div>
        </div>
      );
    }

    if (entry.kind === "message") {
      return (
        <div key={entry.id} className="max-w-[92%] space-y-1">
          <div className="text-[9px] uppercase tracking-[0.15em] text-[var(--demo-subtle-fg)]">
            {getEntryLabel(entry.kind)}
          </div>
          <div className="text-[12px] leading-relaxed text-[var(--demo-fg)]">
            {isLocalEntry ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--demo-accent)]" />

                <span>{entry.text}</span>
              </span>
            ) : (
              entry.text
            )}
          </div>
        </div>
      );
    }

    if (entry.kind === "file") {
      const isNewestVisibleFile =
        entry.id ===
        [...visibleTranscript]
          .reverse()
          .find((transcriptEntry) => transcriptEntry.kind === "file")?.id;

      return (
        <div
          key={entry.id}
          className="space-y-1.5 rounded-md border border-[var(--demo-border)] bg-[var(--demo-panel-bg)] px-3 py-2"
        >
          <div className="text-[9px] uppercase tracking-[0.15em] text-[var(--demo-subtle-fg)]">
            {getEntryLabel(entry.kind)}
          </div>
          <div className="flex items-center justify-between gap-3 text-[11px] text-[var(--demo-fg)]">
            <span className="truncate font-mono text-[11px] text-[var(--demo-fg)]">
              {entry.path ?? entry.text}
            </span>
            <div className="flex items-center gap-2 font-mono text-[11px] tabular-nums">
              <PatchCount
                prefix="+"
                value={entry.added}
                visible={isNewestVisibleFile}
                className="text-[var(--demo-info)]"
              />
              <PatchCount
                prefix="-"
                value={entry.removed}
                visible={isNewestVisibleFile}
                className="text-[var(--demo-danger)]"
              />
            </div>
          </div>
        </div>
      );
    }

    if (entry.kind === "thought") {
      return (
        <div key={entry.id} className="space-y-1">
          <div className="text-[9px] uppercase tracking-[0.15em] text-[var(--demo-subtle-fg)]">
            {getEntryLabel(entry.kind)}
          </div>
          <div className="text-[11px] leading-relaxed text-[var(--demo-muted-fg)]">
            {entry.text}
          </div>
        </div>
      );
    }

    const isLastActivity =
      !isLocalEntry &&
      (index === visibleTranscript.length - 1 ||
        (index < visibleTranscript.length - 1 &&
          visibleTranscript[index + 1]?.kind === "file"));

    return (
      <div key={entry.id} className="space-y-1.5">
        {/*
        <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.15em] text-slate-400/90 dark:text-slate-500/90">
          <span>{getEntryLabel(entry.kind)}</span>
          <span className="h-1 w-1 rounded-full bg-[var(--demo-border-strong)]" />
          <span className="truncate">
            {activeNode?.type ?? "Agent"}
          </span>
        </div>
        */}
        <div className="text-[11px] leading-relaxed text-[var(--demo-muted-fg)]">
          {entry.text}
        </div>
        {isLastActivity && activeNode?.metadata ? (
          <div className="pt-1 text-[11px] leading-relaxed text-[var(--demo-muted-fg)]">
            {activeNode.metadata}
          </div>
        ) : null}
        {isRunning && index === visibleTranscript.length - 1 ? (
          <div className="flex items-center gap-2 pt-1 text-[11px] text-[var(--demo-subtle-fg)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--demo-accent)]" />
            Running
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[var(--demo-panel-muted-bg)] text-[var(--demo-fg)] [font-synthesis:none] antialiased">
      <div className="relative min-h-0 flex-1">
        <div
          ref={scrollViewportRef}
          className="min-h-0 h-full overflow-y-auto px-4 py-4 pr-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex min-h-full flex-col pr-1.5">
            <div className="space-y-3">
              {visibleTranscript.map((entry, index) => (
                <React.Fragment key={entry.id}>
                  {renderSessionEntry(entry, index)}
                  {injectedItemsByIndex.has(index + 1)
                    ? injectedItemsByIndex
                        .get(index + 1)
                        ?.map((item) =>
                          renderSessionEntry(item, index + 0.5, true),
                        )
                    : null}
                </React.Fragment>
              ))}
            </div>

            <div className="flex-1" />
          </div>
        </div>

        {hasOverflow ? (
          <div
            ref={scrollbarTrackRef}
            aria-hidden="true"
            onPointerDown={handleScrollbarPointerDown}
            onPointerMove={handleScrollbarPointerMove}
            onPointerUp={handleScrollbarPointerUp}
            onPointerCancel={handleScrollbarPointerUp}
            className="absolute inset-y-3 right-1.5 w-[10px] cursor-pointer overflow-hidden rounded-full bg-[var(--demo-scroll-track)]"
          >
            <div
              data-scrollbar-thumb="true"
              className="absolute inset-x-1 rounded-full bg-[var(--demo-scroll-thumb)] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] will-change-transform"
              style={{
                height: `${thumbHeight}px`,
                transform: `translateY(${thumbOffset}px)`,
              }}
            />
          </div>
        ) : null}
      </div>

      {composer ? (
        <div className="border-t border-[var(--demo-border)] bg-[var(--demo-panel-subtle-bg)] px-4 py-3">
          <form
            className="rounded-lg border border-[var(--demo-border)] bg-[var(--demo-panel-bg)] px-3 py-3 shadow-none"
            onSubmit={handleComposerSubmit}
          >
            <label className="block text-[11px] text-[var(--demo-subtle-fg)]">
              <span className="sr-only">
                {composer.placeholder ??
                  "Ask the agent to inspect, search, or build..."}
              </span>
              <input
                type="text"
                value={composerValue}
                onChange={(event) => setComposerValue(event.target.value)}
                placeholder={
                  composer.placeholder ??
                  "Ask the agent to inspect, search, or build..."
                }
                className="w-full bg-transparent text-[11px] leading-5 text-[var(--demo-fg)] outline-none placeholder:text-[var(--demo-subtle-fg)]"
              />
            </label>

            <div className="mt-3 flex items-center gap-2 text-[10px] text-[var(--demo-muted-fg)]">
              <span className="rounded-full border border-[var(--demo-border)] bg-[var(--demo-shell-strong-bg)] px-2.5 py-1 text-[var(--demo-muted-fg)]">
                {composer.modeLabel ?? "Agent"}
              </span>
              <span className="rounded-full border border-[var(--demo-border)] bg-[var(--demo-shell-strong-bg)] px-2.5 py-1 text-[var(--demo-muted-fg)]">
                {composer.modelLabel ?? "Model 2"}
              </span>
              <div className="ml-auto flex items-center gap-2">
                <button
                  type="submit"
                  disabled={!composerValue.trim()}
                  aria-label="Submit prompt"
                  className="flex h-6 w-6 items-center justify-center rounded-full border border-[var(--demo-border)] bg-[var(--demo-shell-strong-bg)] text-[var(--demo-muted-fg)] transition hover:border-[var(--demo-border-strong)] hover:bg-[var(--demo-panel-bg)] hover:text-[var(--demo-fg)] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    className="h-3.5 w-3.5"
                    fill="none"
                  >
                    <path
                      d="M8 3.25v9.5M8 3.25 4.75 6.5M8 3.25 11.25 6.5"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}
