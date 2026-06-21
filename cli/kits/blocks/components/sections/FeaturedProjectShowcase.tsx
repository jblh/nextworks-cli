import React from "react";
import Image from "next/image";
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

export interface FeaturedProjectShowcaseCta {
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

export interface FeaturedProjectShowcaseTag {
  label: string;
  className?: string;
}

export interface FeaturedProjectShowcaseFeature {
  title?: string;
  description: React.ReactNode;
  className?: string;
}

export interface FeaturedProjectShowcaseMetaItem {
  label: string;
  value: React.ReactNode;
  className?: string;
}

export interface FeaturedProjectShowcaseBreakdownItem {
  label: string;
  description: React.ReactNode;
  className?: string;
}

export interface FeaturedProjectShowcaseMediaConfig {
  type?: "image" | "video" | "terminal" | "custom";
  src?: string;
  alt?: string;
  title?: string;
  ariaLabel?: string;
  poster?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  controls?: boolean;
  preload?: "none" | "metadata" | "auto";
  commands?: string[];
  output?: string[];
  caption?: React.ReactNode;
  className?: string;
  content?: React.ReactNode;
}

export interface FeaturedProjectShowcaseClassNames {
  section?: string;
  backgroundGlow?: string;
  container?: string;
  contentGrid?: string;
  content?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  tags?: string;
  tag?: string;
  features?: string;
  feature?: string;
  featureMarker?: string;
  featureTitle?: string;
  featureDescription?: string;
  breakdown?: string;
  breakdownItem?: string;
  breakdownLabel?: string;
  breakdownDescription?: string;
  meta?: string;
  metaItem?: string;
  metaLabel?: string;
  metaValue?: string;
  buttons?: string;
  primaryCta?: string;
  secondaryCta?: string;
  mediaOuter?: string;
  mediaFrame?: string;
  mediaChrome?: string;
  mediaContent?: string;
  mediaCaption?: string;
  terminal?: string;
  terminalLine?: string;
  terminalOutput?: string;
  image?: string;
  video?: string;
}

export interface FeaturedProjectShowcaseProps {
  id?: string;
  className?: string;
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  tags?: Array<string | FeaturedProjectShowcaseTag>;
  features?: Array<string | FeaturedProjectShowcaseFeature>;
  breakdown?: FeaturedProjectShowcaseBreakdownItem[];
  meta?: FeaturedProjectShowcaseMetaItem[];
  primaryCta?: FeaturedProjectShowcaseCta;
  secondaryCta?: FeaturedProjectShowcaseCta;
    media?: React.ReactNode | FeaturedProjectShowcaseMediaConfig | false;
  mediaId?: string;
  detailsId?: string;
  ariaLabel?: string;
  titleId?: string;
  enableMotion?: boolean;
  classNames?: FeaturedProjectShowcaseClassNames;
  section?: { className?: string };
  container?: { className?: string };
  content?: { className?: string };
  mediaSlot?: { className?: string };
}
 
const defaultTags = [
  "Product",
  "Frontend",
  "Launch",
  "Case study",
  "Design system",
  "Workflow",
];

const defaultFeatures: FeaturedProjectShowcaseFeature[] = [
  { description: "Clear project positioning with room for technical details." },
  { description: "Flexible media area for screenshots, video, terminal output, or custom content." },
  { description: "Optional tags, metadata, and calls to action." },
  { description: "Works for products, tools, portfolios, and case studies." },
];

const defaultBreakdown: FeaturedProjectShowcaseBreakdownItem[] = [
  {
    label: "What it is",
    description: "A focused project highlight with enough context to understand the work.",
  },
  {
    label: "What it shows",
    description: "Key features, implementation notes, supporting details, and proof points.",
  },
  {
    label: "How to use it",
    description: "Wrap it with project-specific copy, links, media, and metadata.",
  },
];

const defaultMeta: FeaturedProjectShowcaseMetaItem[] = [
  { label: "Type", value: "Featured project" },
  { label: "Focus", value: "Product story" },
  { label: "Status", value: "Demo content" },
];

const defaultMedia: FeaturedProjectShowcaseMediaConfig = {
  type: "terminal",
  title: "Project preview",
  ariaLabel: "Terminal-style preview showing example project notes",
  commands: [
    "open project-brief.md",
    "review design-system-notes.md",
    "ship polished-preview",
  ],
  output: [
    "✔ summary, tags, and project metadata ready",
    "✔ feature bullets and implementation notes added",
    "✔ media area available for screenshots or video",
  ],
  caption: "Use the media area for a screenshot, video, terminal preview, or custom visual.",
};

function isMediaConfig(
  media: FeaturedProjectShowcaseProps["media"],
): media is FeaturedProjectShowcaseMediaConfig {
  return Boolean(
    media &&
      typeof media === "object" &&
      !React.isValidElement(media) &&
      ("type" in media || "src" in media || "content" in media),
  );
}

function normalizeTag(tag: string | FeaturedProjectShowcaseTag) {
  return typeof tag === "string" ? { label: tag } : tag;
}

function normalizeFeature(feature: string | FeaturedProjectShowcaseFeature) {
  return typeof feature === "string" ? { description: feature } : feature;
}

function renderCta(cta: FeaturedProjectShowcaseCta | undefined) {
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

function renderMediaContent(
  media: FeaturedProjectShowcaseMediaConfig,
  classNames?: FeaturedProjectShowcaseClassNames,
) {
  if (media.content) {
    return media.content;
  }

  if (media.type === "image" && media.src) {
    return (
      <div
        className={cn(
          "relative min-h-[24rem] overflow-hidden",
          media.className,
          classNames?.image,
        )}
      >
        <Image
          src={media.src}
          alt={media.alt ?? media.title ?? "Featured project preview"}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          unoptimized
        />
      </div>
    );
  }

  if (media.type === "video" && media.src) {
    return (
      <video
        src={media.src}
        poster={media.poster}
        title={media.title ?? media.ariaLabel ?? "Featured project video"}
        aria-label={media.ariaLabel ?? media.title ?? "Featured project video"}
        className={cn("size-full object-cover", media.className, classNames?.video)}
        autoPlay={media.autoPlay}
        muted={media.muted ?? media.autoPlay ?? false}
        loop={media.loop}
        playsInline={media.playsInline ?? true}
        controls={media.controls ?? true}
        preload={media.preload ?? "metadata"}
      />
    );
  }

  return (
    <div
      className={cn(
                "flex min-h-[24rem] flex-col justify-between bg-muted p-5 font-mono text-xs text-muted-foreground sm:p-6",

        media.className,
        classNames?.terminal,
      )}
      role="img"
      aria-label={media.ariaLabel ?? media.title ?? "Terminal preview"}
    >
      <div className="space-y-3">
        {(media.commands ?? defaultMedia.commands ?? []).map((command) => (
          <p key={command} className={cn("break-all", classNames?.terminalLine)}>
                        <span className="mr-2 text-muted-foreground/60" aria-hidden="true">

              $
            </span>
            <span>{command}</span>
          </p>
        ))}
      </div>

            <div className="mt-8 space-y-2 border-t border-border pt-5">

        {(media.output ?? defaultMedia.output ?? []).map((line) => (
                    <p key={line} className={cn("text-muted-foreground", classNames?.terminalOutput)}>

            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

function renderMedia(
  media: FeaturedProjectShowcaseProps["media"],
  classNames?: FeaturedProjectShowcaseClassNames,
) {
  if (media === false) {
    return null;
  }

  if (media !== undefined && !isMediaConfig(media)) {
    return media;
  }

  const resolvedMedia = isMediaConfig(media) ? media : defaultMedia;

  return (
    <>
      {renderMediaContent(resolvedMedia, classNames)}
      {resolvedMedia.caption ? (
                <p className={cn("px-5 py-4 text-sm text-muted-foreground", classNames?.mediaCaption)}>

          {resolvedMedia.caption}
        </p>
      ) : null}
    </>
  );
}

export function FeaturedProjectShowcase({
  id,
  className,
  eyebrow = "Featured project",
    title = "Featured project",
  description =
    "Highlight one project with a short summary, key features, supporting details, and an optional visual preview.",
  tags = defaultTags,
  features = defaultFeatures,
  breakdown = defaultBreakdown,
  meta = defaultMeta,
    primaryCta,
  secondaryCta,
  media,
  mediaId,
  detailsId,
  ariaLabel = "Featured project showcase section",
  titleId,
  enableMotion = true,
  classNames,
  section,
  container,
  content,
  mediaSlot,
}: FeaturedProjectShowcaseProps) {
  const motionClasses = enableMotion
    ? "transition-all duration-200 hover:-translate-y-0.5"
    : "transition-none hover:!translate-y-0";

    const resolvedMediaId = mediaId ?? (id ? `${id}-media` : "featured-project-media");
  const resolvedDetailsId = detailsId ?? (id ? `${id}-details` : "featured-project-details");

  const resolvedPrimaryCta: FeaturedProjectShowcaseCta = {
    label: "View project",
    href: `#${resolvedMediaId}`,
    variant: "default",
    size: "lg",
    unstyled: true,
    ...(primaryCta ?? {}),
    className: cn(
            "h-11 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-lg hover:bg-primary/90",

      motionClasses,
      classNames?.primaryCta,
      primaryCta?.className,
    ),
  };

    const resolvedSecondaryCta: FeaturedProjectShowcaseCta = {
    label: "Read notes",
    href: `#${resolvedDetailsId}`,
    variant: "outline",
    size: "lg",
    unstyled: true,
    ...(secondaryCta ?? {}),
    className: cn(
            "h-11 rounded-full border border-border bg-background/80 px-6 text-sm font-medium text-foreground hover:bg-muted",

      motionClasses,
      classNames?.secondaryCta,
      secondaryCta?.className,
    ),
  };

  const mediaContent = renderMedia(media, classNames);

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
                    "pointer-events-none absolute right-[-18rem] top-24 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.08),rgba(0,0,0,0.03)_36%,transparent_70%)] blur-3xl dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),rgba(255,255,255,0.04)_36%,transparent_70%)]",

          classNames?.backgroundGlow,
        )}
        aria-hidden="true"
      />

      <div
        className={cn(
          "relative z-10 mx-auto max-w-7xl",
          container?.className,
          classNames?.container,
        )}
      >
        <div
          className={cn(
            "grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(26rem,1.08fr)] lg:items-stretch",
            classNames?.contentGrid,
          )}
        >
          <div
            className={cn(
                            "flex flex-col rounded-[2rem] border border-border bg-card/80 p-6 shadow-[0_24px_90px_rgba(0,0,0,0.12)] backdrop-blur dark:shadow-[0_24px_90px_rgba(0,0,0,0.55)] sm:p-8 lg:p-10",

              content?.className,
              classNames?.content,
            )}
          >
            {eyebrow ? (
              <p
                className={cn(
                                    "text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground",

                  classNames?.eyebrow,
                )}
              >
                {eyebrow}
              </p>
            ) : null}

            <h2
              id={titleId}
              className={cn(
                                "mt-5 text-balance text-4xl font-semibold tracking-[-0.055em] text-foreground sm:text-5xl lg:text-6xl",

                classNames?.title,
              )}
            >
              {title}
            </h2>

            {description ? (
              <p
                className={cn(
                                    "mt-5 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg",

                  classNames?.description,
                )}
              >
                {description}
              </p>
            ) : null}

            {tags.length > 0 ? (
              <div className={cn("mt-7 flex flex-wrap gap-2", classNames?.tags)}>
                {tags.map((tag) => {
                  const normalizedTag = normalizeTag(tag);

                  return (
                    <span
                      key={normalizedTag.label}
                      className={cn(
                                                "rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground",

                        classNames?.tag,
                        normalizedTag.className,
                      )}
                    >
                      {normalizedTag.label}
                    </span>
                  );
                })}
              </div>
            ) : null}

            {features.length > 0 ? (
              <ul className={cn("mt-8 space-y-3", classNames?.features)}>
                {features.map((feature, index) => {
                  const normalizedFeature = normalizeFeature(feature);

                  return (
                    <li
                      key={`${normalizedFeature.title ?? "feature"}-${index}`}
                      className={cn(
                                                "flex gap-3 text-sm leading-6 text-muted-foreground",

                        classNames?.feature,
                        normalizedFeature.className,
                      )}
                    >
                      <span
                        className={cn(
                                                    "mt-2 size-1.5 shrink-0 rounded-full bg-foreground/50",

                          classNames?.featureMarker,
                        )}
                        aria-hidden="true"
                      />
                      <span>
                        {normalizedFeature.title ? (
                          <span
                            className={cn(
                                                            "mr-1 font-medium text-foreground",

                              classNames?.featureTitle,
                            )}
                          >
                            {normalizedFeature.title}:
                          </span>
                        ) : null}
                        <span className={classNames?.featureDescription}>
                          {normalizedFeature.description}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            ) : null}

            {breakdown.length > 0 ? (
                            <div
                id={resolvedDetailsId}
                className={cn(
                                    "mt-8 grid gap-3 border-t border-border pt-6 sm:grid-cols-3",

                  classNames?.breakdown,
                )}
              >
                {breakdown.map((item) => (
                  <div
                    key={item.label}
                    className={cn(
                                            "rounded-2xl border border-border bg-muted/40 p-4",

                      classNames?.breakdownItem,
                      item.className,
                    )}
                  >
                    <p
                      className={cn(
                                                "text-sm font-medium text-foreground",

                        classNames?.breakdownLabel,
                      )}
                    >
                      {item.label}
                    </p>
                    <p
                      className={cn(
                                                "mt-2 text-sm leading-6 text-muted-foreground",

                        classNames?.breakdownDescription,
                      )}
                    >
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}

            <div
              className={cn(
                "mt-8 flex flex-col gap-3 sm:flex-row",
                classNames?.buttons,
              )}
            >
              {renderCta(resolvedPrimaryCta)}
              {renderCta(resolvedSecondaryCta)}
            </div>

            {meta.length > 0 ? (
              <dl
                className={cn(
                                    "mt-auto grid gap-4 border-t border-border pt-6 sm:grid-cols-3 lg:mt-10",

                  classNames?.meta,
                )}
              >
                {meta.map((item) => (
                  <div
                    key={item.label}
                    className={cn("min-w-0", classNames?.metaItem, item.className)}
                  >
                    <dt
                      className={cn(
                                                "text-xs uppercase tracking-[0.2em] text-muted-foreground",

                        classNames?.metaLabel,
                      )}
                    >
                      {item.label}
                    </dt>
                    <dd
                      className={cn(
                                                "mt-2 truncate text-sm font-medium text-foreground/80",

                        classNames?.metaValue,
                      )}
                    >
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>

          {mediaContent ? (
                        <div
              id={resolvedMediaId}
              className={cn(
                                "relative overflow-hidden rounded-[2rem] border border-border bg-card/80 p-2 shadow-[0_24px_90px_rgba(0,0,0,0.12)] backdrop-blur dark:shadow-[0_24px_90px_rgba(0,0,0,0.62)]",

                enableMotion && "transition-transform duration-300 hover:-translate-y-1",
                !enableMotion && "transition-none hover:!translate-y-0",
                mediaSlot?.className,
                classNames?.mediaOuter,
              )}
            >
              <div
                className={cn(
                                    "flex h-10 items-center gap-2 border-b border-border px-4",

                  classNames?.mediaChrome,
                )}
                aria-hidden="true"
              >
                                <span className="size-2.5 rounded-full bg-foreground/24" />
                <span className="size-2.5 rounded-full bg-foreground/16" />
                <span className="size-2.5 rounded-full bg-foreground/10" />
                <span className="ml-3 h-2 w-28 rounded-full bg-foreground/8" />

              </div>
              <div
                className={cn(
                                    "overflow-hidden rounded-[1.45rem] bg-muted",

                  classNames?.mediaFrame,
                )}
              >
                <div className={classNames?.mediaContent}>{mediaContent}</div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
