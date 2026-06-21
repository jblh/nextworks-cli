import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
 
type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface HeroWithVideoCta {
  label?: string;
  href?: string;
  ariaLabel?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  unstyled?: boolean;
  style?: React.CSSProperties;
  target?: string;
  rel?: string;
}

export interface HeroWithVideoTextContent {
  text?: React.ReactNode;
  className?: string;
}

export interface HeroWithVideoTitleContent extends HeroWithVideoTextContent {
  highlight?: string;
  highlightClassName?: string;
}

export interface HeroWithVideoMedia {
  src?: string;
  poster?: string;
  title?: string;
  ariaLabel?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  controls?: boolean;
  preload?: "none" | "metadata" | "auto";
}

export interface HeroWithVideoClassNames {
  section?: string;
  backgroundGlow?: string;
  container?: string;
  content?: string;
  eyebrow?: string;
  title?: string;
  titleHighlight?: string;
  description?: string;
  credibility?: string;
  buttons?: string;
  primaryCta?: string;
  secondaryCta?: string;
  command?: string;
  videoOuter?: string;
  videoFrame?: string;
  videoChrome?: string;
  video?: string;
  videoFallback?: string;
}

export interface HeroWithVideoProps {
  id?: string;
  className?: string;
  eyebrow?: string | HeroWithVideoTextContent;
  title?: string | HeroWithVideoTitleContent;
  heading?: string | HeroWithVideoTitleContent;
  description?: string | HeroWithVideoTextContent;
  subheading?: string | HeroWithVideoTextContent;
  credibility?: string | HeroWithVideoTextContent;
  command?: string | HeroWithVideoTextContent;
  primaryCta?: HeroWithVideoCta;
  secondaryCta?: HeroWithVideoCta;
  cta1?: HeroWithVideoCta;
  cta2?: HeroWithVideoCta;
  video?: HeroWithVideoMedia;
  embed?: React.ReactNode;
  fallback?: React.ReactNode;
  previewId?: string;
  ariaLabel?: string;
  titleId?: string;
  enableMotion?: boolean;
  classNames?: HeroWithVideoClassNames;
  section?: { className?: string };
  container?: { className?: string };
  content?: { className?: string };
  eyebrowSlot?: { className?: string };
  titleSlot?: { className?: string };
  descriptionSlot?: { className?: string };
  credibilitySlot?: { className?: string };
  buttonsContainer?: { className?: string };
  commandSlot?: { className?: string };
  videoOuter?: { className?: string };
  videoFrame?: { className?: string };
  videoChrome?: { className?: string };
  videoSlot?: { className?: string };
}

function normalizeTextContent<T extends HeroWithVideoTextContent>(
  value: string | T | undefined,
  defaults: Required<HeroWithVideoTextContent>,
): Required<HeroWithVideoTextContent> {
  if (typeof value === "string") {
    return { text: value, className: defaults.className };
  }

  return {
    text: value?.text ?? defaults.text,
    className: cn(defaults.className, value?.className),
  };
}

function normalizeTitleContent(
  value: string | HeroWithVideoTitleContent | undefined,
  defaults: Required<HeroWithVideoTitleContent>,
): Required<HeroWithVideoTitleContent> {
  if (typeof value === "string") {
    return {
      text: value,
      className: defaults.className,
      highlight: defaults.highlight,
      highlightClassName: defaults.highlightClassName,
    };
  }

  return {
    text: value?.text ?? defaults.text,
    className: cn(defaults.className, value?.className),
    highlight: value?.highlight ?? defaults.highlight,
    highlightClassName: cn(
      defaults.highlightClassName,
      value?.highlightClassName,
    ),
  };
}

function renderHighlightedTitle(
  title: Required<HeroWithVideoTitleContent>,
  className?: string,
) {
  if (!title.highlight || typeof title.text !== "string") {
    return title.text;
  }

  const [before, ...rest] = title.text.split(title.highlight);

  if (rest.length === 0) {
    return title.text;
  }

  return (
    <>
      {before}
      <span className={cn(title.highlightClassName, className)}>
        {title.highlight}
      </span>
      {rest.join(title.highlight)}
    </>
  );
}

function renderCta(cta: HeroWithVideoCta | undefined) {
  if (!cta?.label) {
    return null;
  }

  return (
    <Button
      asChild
      variant={cta.variant}
      size={cta.size}
      className={cta.className}
      unstyled={cta.unstyled}
      style={cta.style}
    >
      <Link
        href={cta.href || "#"}
        aria-label={cta.ariaLabel ?? cta.label}
        target={cta.target}
        rel={cta.rel ?? (cta.target === "_blank" ? "noreferrer" : undefined)}
      >
        {cta.label}
      </Link>
    </Button>
  );
}

export function HeroWithVideo({
  id,
  className,
  eyebrow,
  title,
  heading,
  description,
  subheading,
  credibility,
  command,
  primaryCta,
  secondaryCta,
  cta1,
  cta2,
  video,
  embed,
  fallback,
  previewId,
  ariaLabel = "Video hero section",
  titleId,
  enableMotion = true,
  classNames,
  section,
  container,
  content,
  eyebrowSlot,
  titleSlot,
  descriptionSlot,
  credibilitySlot,
  buttonsContainer,
  commandSlot,
  videoOuter,
  videoFrame,
  videoChrome,
  videoSlot,
}: HeroWithVideoProps) {
  const normalizedEyebrow = normalizeTextContent(eyebrow, {
    text: "Product demo · Launch page · Video preview",
    className:
      "hidden text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground sm:block sm:text-sm",
  });

  const normalizedTitle = normalizeTitleContent(heading ?? title, {
    text: "Show your product with a clear video-first hero.",
    className:
      "mx-auto max-w-5xl text-balance text-4xl font-semibold tracking-[-0.055em] text-foreground sm:text-6xl lg:text-7xl",
    highlight: "video-first",
    highlightClassName: "text-foreground",
  });

  const normalizedDescription = normalizeTextContent(subheading ?? description, {
    text: "Introduce a product, service, or project with a focused headline, simple calls to action, and a large demo preview.",
    className:
      "mx-auto mt-5 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg lg:text-xl",
  });

  const normalizedCredibility = normalizeTextContent(credibility, {
    text: "Designed for landing pages, launches, and product walkthroughs.",
    className: "mt-4 text-sm text-muted-foreground",
  });

  const normalizedCommand = normalizeTextContent(command, {
    text: "Add a short setup command or product note here.",
    className:
      "mt-6 inline-flex max-w-full items-center rounded-full border border-border bg-muted/60 px-4 py-2 font-mono text-xs text-muted-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:text-sm dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
  });

  const buttonMotion = enableMotion
    ? "transition-all duration-200 hover:-translate-y-0.5"
    : "transition-none hover:!translate-y-0";

  const resolvedPreviewId =
    previewId ?? (id ? `${id}-preview` : "video-preview");

  const resolvedPrimaryCta: HeroWithVideoCta = {
    label: "View demo",
    href: `#${resolvedPreviewId}`,
    variant: "default",
    size: "lg",
    unstyled: true,
    ...(primaryCta ?? cta1 ?? {}),
    className: cn(
      "h-11 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-lg hover:bg-primary/90",
      buttonMotion,
      classNames?.primaryCta,
      primaryCta?.className ?? cta1?.className,
    ),
  };

  const secondaryInput = secondaryCta ?? cta2;
  const resolvedSecondaryCta: HeroWithVideoCta = {
    label: "Learn more",
    href: "#",
    variant: "outline",
    size: "lg",
    unstyled: true,
    ...(secondaryInput ?? {}),
    className: cn(
      "h-11 rounded-full border border-border bg-background/80 px-6 text-sm font-medium text-foreground hover:bg-muted",
      buttonMotion,
      classNames?.secondaryCta,
      secondaryInput?.className,
    ),
  };

  const videoMotion = enableMotion
    ? "transition-transform duration-300 hover:-translate-y-1"
    : "transition-none hover:!translate-y-0";

  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden bg-background px-4 py-20 text-foreground sm:px-6 lg:px-8 lg:py-24",
        section?.className,
        classNames?.section,
        className,
      )}
      aria-label={ariaLabel}
      aria-labelledby={titleId}
    >
      <div
        className={cn(
          "pointer-events-none absolute left-1/2 top-[34rem] h-[30rem] w-[72rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.03)_24%,transparent_68%)] blur-3xl dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.08)_24%,transparent_68%)]",
          classNames?.backgroundGlow,
        )}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-foreground/5 to-transparent"
        aria-hidden="true"
      />

      <div
        className={cn(
          "relative z-10 mx-auto flex max-w-7xl flex-col items-center",
          container?.className,
          classNames?.container,
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-5xl flex-col items-center text-center",
            content?.className,
            classNames?.content,
          )}
        >
          {normalizedEyebrow.text ? (
            <p
              className={cn(
                normalizedEyebrow.className,
                eyebrowSlot?.className,
                classNames?.eyebrow,
              )}
            >
              {normalizedEyebrow.text}
            </p>
          ) : null}

          <h1
            id={titleId}
            className={cn(
              "mt-5",
              normalizedTitle.className,
              titleSlot?.className,
              classNames?.title,
            )}
          >
            {renderHighlightedTitle(normalizedTitle, classNames?.titleHighlight)}
          </h1>

          {normalizedDescription.text ? (
            <p
              className={cn(
                normalizedDescription.className,
                descriptionSlot?.className,
                classNames?.description,
              )}
            >
              {normalizedDescription.text}
            </p>
          ) : null}

          <div
            className={cn(
              "mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row",
              buttonsContainer?.className,
              classNames?.buttons,
            )}
          >
            {renderCta(resolvedPrimaryCta)}
            {renderCta(resolvedSecondaryCta)}
          </div>

          {normalizedCredibility.text ? (
            <p
              className={cn(
                normalizedCredibility.className,
                credibilitySlot?.className,
                classNames?.credibility,
              )}
            >
              {normalizedCredibility.text}
            </p>
          ) : null}

          {normalizedCommand.text ? (
            <code
              className={cn(
                normalizedCommand.className,
                commandSlot?.className,
                classNames?.command,
              )}
            >
              <span className="mr-2 text-muted-foreground/60" aria-hidden="true">
                $
              </span>
              <span className="truncate">{normalizedCommand.text}</span>
            </code>
          ) : null}
        </div>

        <div
          id={resolvedPreviewId}
          className={cn(
            "relative mt-12 w-full max-w-6xl sm:mt-14 lg:mt-16",
            videoOuter?.className,
            classNames?.videoOuter,
          )}
        >
          <div
            className={cn(
              "relative overflow-hidden rounded-[1.75rem] border border-border bg-card/80 p-2 shadow-[0_28px_90px_rgba(0,0,0,0.12)] backdrop-blur dark:shadow-[0_28px_90px_rgba(0,0,0,0.72),0_0_0_1px_rgba(255,255,255,0.04)]",
              videoMotion,
              videoFrame?.className,
              classNames?.videoFrame,
            )}
          >
            <div
              className={cn(
                "flex h-10 items-center gap-2 border-b border-border px-4",
                videoChrome?.className,
                classNames?.videoChrome,
              )}
              aria-hidden="true"
            >
              <span className="size-2.5 rounded-full bg-foreground/24" />
              <span className="size-2.5 rounded-full bg-foreground/16" />
              <span className="size-2.5 rounded-full bg-foreground/10" />
              <span className="ml-3 h-2 w-28 rounded-full bg-foreground/8" />
            </div>

            <div className="relative aspect-video overflow-hidden rounded-[1.25rem] bg-muted">
              {embed ??
                (video?.src ? (
                  <video
                    src={video.src}
                    poster={video.poster}
                    title={video.title ?? video.ariaLabel ?? "Hero video"}
                    aria-label={video.ariaLabel ?? video.title ?? "Hero video"}
                    className={cn(
                      "size-full object-cover",
                      video.className,
                      videoSlot?.className,
                      classNames?.video,
                    )}
                    autoPlay={video.autoPlay}
                    muted={video.muted ?? video.autoPlay ?? false}
                    loop={video.loop}
                    playsInline={video.playsInline ?? true}
                    controls={video.controls ?? true}
                    preload={video.preload ?? "metadata"}
                  />
                ) : (
                  <div
                    className={cn(
                      "flex size-full items-center justify-center bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.28),rgba(255,255,255,0.1)_38%,rgba(255,255,255,0)_72%)] px-6 text-center dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.11),rgba(255,255,255,0.035)_38%,rgba(0,0,0,1)_72%)]",
                      classNames?.videoFallback,
                    )}
                  >
                    {fallback ?? (
                      <p className="max-w-md text-sm leading-6 text-muted-foreground">
                        Add a demo video source to show a product walkthrough,
                        launch preview, or selected project here.
                      </p>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

