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
    highlightClassName: cn(defaults.highlightClassName, value?.highlightClassName),
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
    text: "Next.js landing pages · UI systems · developer tools",
    className:
      "hidden text-xs font-medium uppercase tracking-[0.28em] text-white/55 sm:block sm:text-sm",
  });

  const normalizedTitle = normalizeTitleContent(heading ?? title, {
    text: "I build polished Next.js products, landing pages, and developer tools.",
    className:
      "mx-auto max-w-5xl text-balance text-4xl font-semibold tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl",
    highlight: "Next.js",
    highlightClassName: "text-white",
  });

  const normalizedDescription = normalizeTextContent(subheading ?? description, {
    text: "Freelance Next.js developer building fast, modern product sites, reusable UI systems, and developer tooling with TypeScript.",
    className:
      "mx-auto mt-5 max-w-2xl text-pretty text-base leading-7 text-white/62 sm:text-lg lg:text-xl",
  });

  const normalizedCredibility = normalizeTextContent(credibility, {
    text: "Built with the same Blocks kit this page can install.",
    className: "mt-4 text-sm text-white/42",
  });

  const normalizedCommand = normalizeTextContent(command, {
    text: "npx nextworks@latest add blocks --templates",
    className:
      "mt-6 inline-flex max-w-full items-center rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 font-mono text-xs text-white/58 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:text-sm",
  });

  const buttonMotion = enableMotion
    ? "transition-all duration-200 hover:-translate-y-0.5"
    : "transition-none hover:!translate-y-0";

  const resolvedPrimaryCta: HeroWithVideoCta = {
    label: "Start a project",
    href: "#contact",
    variant: "default",
    size: "lg",
    unstyled: true,
    ...(primaryCta ?? cta1 ?? {}),
    className: cn(
      "h-11 rounded-full bg-white px-6 text-sm font-medium text-black shadow-[0_16px_45px_rgba(255,255,255,0.16)] hover:bg-white/90",
      buttonMotion,
      classNames?.primaryCta,
      primaryCta?.className ?? cta1?.className,
    ),
  };

  const secondaryInput = secondaryCta ?? cta2;
  const resolvedSecondaryCta: HeroWithVideoCta = {
    label: "Watch demo",
    href: "#demo",
    variant: "outline",
    size: "lg",
    unstyled: true,
    ...(secondaryInput ?? {}),
    className: cn(
      "h-11 rounded-full border border-white/16 bg-white/[0.03] px-6 text-sm font-medium text-white/86 hover:border-white/28 hover:bg-white/[0.07]",
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
        "relative overflow-hidden bg-[#030303] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-24",
        section?.className,
        classNames?.section,
        className,
      )}
      aria-label={ariaLabel}
      aria-labelledby={titleId}
    >
      <div
        className={cn(
          "pointer-events-none absolute left-1/2 top-[34rem] h-[30rem] w-[72rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.08)_24%,transparent_68%)] blur-3xl",
          classNames?.backgroundGlow,
        )}
        aria-hidden="true"
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/[0.04] to-transparent",
        )}
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
              <span className="mr-2 text-white/28" aria-hidden="true">
                $
              </span>
              <span className="truncate">{normalizedCommand.text}</span>
            </code>
          ) : null}
        </div>

        <div
          id="demo"
          className={cn(
            "relative mt-12 w-full max-w-6xl sm:mt-14 lg:mt-16",
            videoOuter?.className,
            classNames?.videoOuter,
          )}
        >
          <div
            className={cn(
              "relative overflow-hidden rounded-[1.75rem] border border-white/12 bg-white/[0.035] p-2 shadow-[0_28px_90px_rgba(0,0,0,0.72),0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur",
              videoMotion,
              videoFrame?.className,
              classNames?.videoFrame,
            )}
          >
            <div
              className={cn(
                "flex h-10 items-center gap-2 border-b border-white/10 px-4",
                videoChrome?.className,
                classNames?.videoChrome,
              )}
              aria-hidden="true"
            >
              <span className="size-2.5 rounded-full bg-white/24" />
              <span className="size-2.5 rounded-full bg-white/16" />
              <span className="size-2.5 rounded-full bg-white/10" />
              <span className="ml-3 h-2 w-28 rounded-full bg-white/8" />
            </div>

            <div className="relative aspect-video overflow-hidden rounded-[1.25rem] bg-black">
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
                      "flex size-full items-center justify-center bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.11),rgba(255,255,255,0.035)_38%,rgba(0,0,0,1)_72%)] px-6 text-center",
                      classNames?.videoFallback,
                    )}
                  >
                    {fallback ?? (
                      <p className="max-w-md text-sm leading-6 text-white/45">
                        Add your demo video source to show templates, CLI setup,
                        or selected product work here.
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
