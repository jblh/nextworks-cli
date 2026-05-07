import React from "react";
import { cn } from "@/lib/utils";
import type {
  ProductDemoKnowledgePanelState,
  ProductDemoStatusTone,
} from "./types";

export interface KnowledgePanelProps {
  state: ProductDemoKnowledgePanelState;
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

export function KnowledgePanel({ state }: KnowledgePanelProps) {
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
              {source.kind ? ` • ${source.kind}` : ""}
            </span>
          ))}
        </div>
      ) : null}

      <div className="space-y-3">
        {state.snippets.map((snippet) => {
          const isActive =
            snippet.id === state.activeSnippetId || snippet.highlighted;
          const source = state.sources?.find(
            (item) => item.id === snippet.sourceId,
          );

          return (
            <div
              key={snippet.id}
              className={cn(
                "rounded-2xl border border-border/60 bg-background/80 p-3",
                isActive && "border-primary/45 bg-primary/6 shadow-sm",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-card-foreground">
                    {snippet.title}
                  </div>
                  {(snippet.excerptLabel || source?.label) && (
                    <div className="mt-1 text-[11px] text-muted-foreground">
                      {[snippet.excerptLabel, source?.label]
                        .filter(Boolean)
                        .join(" • ")}
                    </div>
                  )}
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
