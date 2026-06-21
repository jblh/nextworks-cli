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

export type ProjectDeepDiveSectionKey =
  | "problem"
  | "solution"
  | "highlights"
  | "result"
  | "architecture";

export interface ProjectDeepDiveCta {
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

export interface ProjectDeepDiveItem {
  title?: React.ReactNode;
  description: React.ReactNode;
  className?: string;
}

export interface ProjectDeepDiveSectionConfig {
  label?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  items?: Array<string | ProjectDeepDiveItem>;
  ariaLabel?: string;
  className?: string;
}

export interface ProjectDeepDiveMediaConfig {
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
  content?: React.ReactNode;
  className?: string;
}

export interface ProjectDeepDiveClassNames {
  section?: string;
  backgroundGlow?: string;
  container?: string;
  header?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  cardsGrid?: string;
  card?: string;
  cardLabel?: string;
  cardTitle?: string;
  cardDescription?: string;
  itemList?: string;
  item?: string;
  itemMarker?: string;
  itemTitle?: string;
  itemDescription?: string;
  supportGrid?: string;
  architectureCard?: string;
  architectureLabel?: string;
  architectureTitle?: string;
  architectureDescription?: string;
  architectureList?: string;
  architectureItem?: string;
  architectureItemMarker?: string;
  architectureItemTitle?: string;
  architectureItemDescription?: string;
  mediaOuter?: string;
  mediaFrame?: string;
  mediaChrome?: string;
  mediaContent?: string;
  mediaCaption?: string;
  terminal?: string;
  terminalLine?: string;
  terminalOutput?: string;
  buttons?: string;
  cta?: string;
  image?: string;
  video?: string;
}

export interface ProjectDeepDiveProps {
  id?: string;
  className?: string;
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  sections?: Partial<Record<ProjectDeepDiveSectionKey, ProjectDeepDiveSectionConfig>>;
  problem?: ProjectDeepDiveSectionConfig;
  solution?: ProjectDeepDiveSectionConfig;
  highlights?: ProjectDeepDiveSectionConfig;
  technicalHighlights?: ProjectDeepDiveSectionConfig;
  result?: ProjectDeepDiveSectionConfig;
  architecture?: ProjectDeepDiveSectionConfig;
  architectureNotes?: ProjectDeepDiveSectionConfig;
  media?: React.ReactNode | ProjectDeepDiveMediaConfig | false;
  cta?: ProjectDeepDiveCta;
  ariaLabel?: string;
  titleId?: string;
  enableMotion?: boolean;
  classNames?: ProjectDeepDiveClassNames;
  section?: { className?: string };
  container?: { className?: string };
  header?: { className?: string };
  cards?: { className?: string };
  mediaSlot?: { className?: string };
  supportSlot?: { className?: string };
}

const defaultSections: Record<
  Exclude<ProjectDeepDiveSectionKey, "architecture">,
  ProjectDeepDiveSectionConfig
> = {
  problem: {
    label: "Problem",
    title: "Repeated setup work slows down new builds.",
    description:
      "Teams often rebuild the same landing sections, provider setup, theme wiring, and route structure from scratch.",
    items: [
      "Marketing UI gets copied between projects in inconsistent ways.",
      "Theme, provider, and router setup is easy to miss or rework by hand.",
    ],
    ariaLabel: "Problem overview",
  },
  solution: {
    label: "Solution",
    title: "Use a CLI to install a reusable starting point.",
    description:
      "Nextworks copies UI primitives, shared landing-page sections, and full templates into an existing Next.js app.",
    items: [
      "Files live in the project after install, so teams can edit them directly.",
      "The setup stays practical instead of locking the app into a remote design system.",
    ],
    ariaLabel: "Solution overview",
  },
  highlights: {
    label: "Technical highlights",
    title: "A few implementation choices matter most.",
    description:
      "The kit focuses on install reliability and predictable project output across different Next.js setups.",
    items: [
      "Router-aware file mapping for App Router and Pages Router projects.",
      "Manifest-driven copying to keep install scope explicit.",
      "Package manager detection and dependency merging.",
      "Provider, font, and theme setup patched into the consuming app.",
      "Install tracking for added files and dependencies.",
    ],
    ariaLabel: "Technical highlights overview",
  },
  result: {
    label: "Result",
    title: "A blank app becomes a working landing-page foundation faster.",
    description:
      "The outcome is a reusable Blocks kit that gives teams a solid starting point for product sites without rebuilding the same base layer every time.",
    items: [
      "The installed output is local, editable, and easier to adapt to project needs.",
      "The same kit can support simple sections or full templates depending on the install mode.",
    ],
    ariaLabel: "Result overview",
  },
};

const defaultArchitecture: ProjectDeepDiveSectionConfig = {
  label: "Architecture notes",
  title: "What sits underneath the install flow.",
  description:
    "The CLI reads a manifest, maps kit files into the right project structure, patches router entry points, and records installed state for later checks or removal.",
  items: [
    "CLI → manifest → kit files → consuming Next.js project",
    "Dependency merge, provider wiring, and install tracking happen as part of the same workflow",
  ],
  ariaLabel: "Architecture notes",
};

const defaultMedia: ProjectDeepDiveMediaConfig = {
  type: "terminal",
  title: "Install preview",
  ariaLabel: "Terminal preview showing a Nextworks install flow",
  commands: [
    "npx create-next-app@latest my-app",
    "cd my-app",
    "npx nextworks@latest add blocks --templates",
  ],
  output: [
    "✔ detected Next.js app",
    "✔ copied reusable UI and sections",
    "✔ installed template routes",
    "✔ patched provider and theme wiring",
  ],
  caption: "Use the media area for a screenshot, diagram, or terminal walkthrough.",
};

function normalizeItem(item: string | ProjectDeepDiveItem): ProjectDeepDiveItem {
  return typeof item === "string" ? { description: item } : item;
}

function normalizeSection(
  value: ProjectDeepDiveSectionConfig | undefined,
  defaults: ProjectDeepDiveSectionConfig,
): Required<ProjectDeepDiveSectionConfig> {
  return {
    label: value?.label ?? defaults.label ?? null,
    title: value?.title ?? defaults.title ?? null,
    description: value?.description ?? defaults.description ?? null,
    items: value?.items ?? defaults.items ?? [],
    ariaLabel: value?.ariaLabel ?? defaults.ariaLabel ?? "Project deep dive section card",
    className: value?.className ?? "",
  };
}

function isMediaConfig(
  media: ProjectDeepDiveProps["media"],
): media is ProjectDeepDiveMediaConfig {
  return Boolean(
    media &&
      typeof media === "object" &&
      !React.isValidElement(media) &&
      ("type" in media || "src" in media || "content" in media),
  );
}

function renderCta(cta: ProjectDeepDiveCta | undefined) {
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

function renderSectionCard(
  section: Required<ProjectDeepDiveSectionConfig>,
  classNames?: ProjectDeepDiveClassNames,
  motionClassName?: string,
) {
  const normalizedItems = section.items.map(normalizeItem);

  return (
    <article
      className={cn(
        "rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.34)] backdrop-blur sm:p-6",
        motionClassName,
        classNames?.card,
        section.className,
      )}
      aria-label={section.ariaLabel}
    >
      {section.label ? (
        <p
          className={cn(
            "text-[0.7rem] font-medium uppercase tracking-[0.24em] text-white/42",
            classNames?.cardLabel,
          )}
        >
          {section.label}
        </p>
      ) : null}

      {section.title ? (
        <h3
          className={cn(
            "mt-4 text-balance text-xl font-medium tracking-[-0.04em] text-white sm:text-2xl",
            classNames?.cardTitle,
          )}
        >
          {section.title}
        </h3>
      ) : null}

      {section.description ? (
        <p
          className={cn(
            "mt-3 text-sm leading-6 text-white/56 sm:text-[0.95rem]",
            classNames?.cardDescription,
          )}
        >
          {section.description}
        </p>
      ) : null}

      {normalizedItems.length > 0 ? (
        <ul className={cn("mt-5 space-y-3", classNames?.itemList)}>
          {normalizedItems.map((item, index) => (
            <li
              key={`${String(item.title ?? item.description)}-${index}`}
              className={cn("flex gap-3", classNames?.item, item.className)}
            >
              <span
                className={cn(
                  "mt-2 size-1.5 shrink-0 rounded-full bg-white/42",
                  classNames?.itemMarker,
                )}
                aria-hidden="true"
              />
              <span>
                {item.title ? (
                  <span
                    className={cn(
                      "block text-sm font-medium text-white/82",
                      classNames?.itemTitle,
                    )}
                  >
                    {item.title}
                  </span>
                ) : null}
                <span
                  className={cn(
                    "block text-sm leading-6 text-white/52",
                    classNames?.itemDescription,
                  )}
                >
                  {item.description}
                </span>
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

function renderMediaContent(
  media: ProjectDeepDiveMediaConfig,
  classNames?: ProjectDeepDiveClassNames,
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
          alt={media.alt ?? media.title ?? "Project deep dive preview"}
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
        title={media.title ?? media.ariaLabel ?? "Project deep dive video"}
        aria-label={media.ariaLabel ?? media.title ?? "Project deep dive video"}
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
        "flex min-h-[24rem] flex-col justify-between bg-[#050505] p-5 font-mono text-xs text-white/62 sm:p-6",
        media.className,
        classNames?.terminal,
      )}
      role="img"
      aria-label={media.ariaLabel ?? media.title ?? "Technical preview"}
    >
      <div className="space-y-3">
        {(media.commands ?? defaultMedia.commands ?? []).map((command) => (
          <p key={command} className={cn("break-all", classNames?.terminalLine)}>
            <span className="mr-2 text-white/28" aria-hidden="true">
              $
            </span>
            <span>{command}</span>
          </p>
        ))}
      </div>

      <div className="mt-8 space-y-2 border-t border-white/10 pt-5">
        {(media.output ?? defaultMedia.output ?? []).map((line) => (
          <p key={line} className={cn("text-white/42", classNames?.terminalOutput)}>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

function renderMedia(
  media: ProjectDeepDiveProps["media"],
  classNames?: ProjectDeepDiveClassNames,
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
        <p className={cn("px-5 py-4 text-sm text-white/42", classNames?.mediaCaption)}>
          {resolvedMedia.caption}
        </p>
      ) : null}
    </>
  );
}

export function ProjectDeepDive({
  id,
  className,
  eyebrow = "Project deep dive",
  title = "Explain the problem, the approach, and the outcome in one place.",
  description =
    "Use this section to show how a project was thought through, what was built, and which technical decisions mattered.",
  sections,
  problem,
  solution,
  highlights,
  technicalHighlights,
  result,
  architecture,
  architectureNotes,
  media,
  cta,
  ariaLabel = "Project deep dive section",
  titleId,
  enableMotion = true,
  classNames,
  section,
  container,
  header,
  cards,
  mediaSlot,
  supportSlot,
}: ProjectDeepDiveProps) {
  const resolvedProblem = normalizeSection(
    problem ?? sections?.problem,
    defaultSections.problem,
  );
  const resolvedSolution = normalizeSection(
    solution ?? sections?.solution,
    defaultSections.solution,
  );
  const resolvedHighlights = normalizeSection(
    technicalHighlights ?? highlights ?? sections?.highlights,
    defaultSections.highlights,
  );
  const resolvedResult = normalizeSection(
    result ?? sections?.result,
    defaultSections.result,
  );

  const architectureInput =
    architectureNotes ?? architecture ?? sections?.architecture;
  const resolvedArchitecture = architectureInput
    ? normalizeSection(architectureInput, defaultArchitecture)
    : null;

  const mediaContent = renderMedia(media, classNames);
  const hasSupportContent = Boolean(mediaContent || resolvedArchitecture || cta?.label);

  const motionClasses = enableMotion
    ? "transition-all duration-300 hover:-translate-y-1"
    : "transition-none hover:!translate-y-0";
  const cardMotionClasses = enableMotion
    ? "transition-transform duration-300 hover:-translate-y-1"
    : "transition-none hover:!translate-y-0";

  const resolvedCta: ProjectDeepDiveCta | undefined = cta?.label
    ? {
        href: "#",
        variant: "outline",
        size: "lg",
        unstyled: true,
        ...cta,
        className: cn(
          "h-11 rounded-full border border-white/14 bg-white/[0.03] px-6 text-sm font-medium text-white/86 hover:border-white/28 hover:bg-white/[0.07]",
          enableMotion && "transition-all duration-200 hover:-translate-y-0.5",
          !enableMotion && "transition-none hover:!translate-y-0",
          classNames?.cta,
          cta.className,
        ),
      }
    : undefined;

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
          "pointer-events-none absolute right-[-16rem] top-28 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),rgba(255,255,255,0.04)_38%,transparent_72%)] blur-3xl",
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
            "mx-auto max-w-3xl text-center",
            header?.className,
            classNames?.header,
          )}
        >
          {eyebrow ? (
            <p
              className={cn(
                "text-xs font-medium uppercase tracking-[0.28em] text-white/48",
                classNames?.eyebrow,
              )}
            >
              {eyebrow}
            </p>
          ) : null}

          <h2
            id={titleId}
            className={cn(
              "mt-5 text-balance text-4xl font-semibold tracking-[-0.055em] text-white sm:text-5xl lg:text-6xl",
              classNames?.title,
            )}
          >
            {title}
          </h2>

          {description ? (
            <p
              className={cn(
                "mx-auto mt-5 max-w-2xl text-pretty text-base leading-7 text-white/60 sm:text-lg",
                classNames?.description,
              )}
            >
              {description}
            </p>
          ) : null}
        </div>

        <div
          className={cn(
            "mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4",
            cards?.className,
            classNames?.cardsGrid,
          )}
        >
          {renderSectionCard(resolvedProblem, classNames, cardMotionClasses)}
          {renderSectionCard(resolvedSolution, classNames, cardMotionClasses)}
          {renderSectionCard(resolvedHighlights, classNames, cardMotionClasses)}
          {renderSectionCard(resolvedResult, classNames, cardMotionClasses)}
        </div>

        {hasSupportContent ? (
          <div
            className={cn(
              "mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]",
              supportSlot?.className,
              classNames?.supportGrid,
            )}
          >
            {mediaContent ? (
              <div
                className={cn(
                  "relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-2 shadow-[0_24px_90px_rgba(0,0,0,0.58)] backdrop-blur",
                  motionClasses,
                  mediaSlot?.className,
                  classNames?.mediaOuter,
                )}
              >
                <div
                  className={cn(
                    "flex h-10 items-center gap-2 border-b border-white/10 px-4",
                    classNames?.mediaChrome,
                  )}
                  aria-hidden="true"
                >
                  <span className="size-2.5 rounded-full bg-white/24" />
                  <span className="size-2.5 rounded-full bg-white/16" />
                  <span className="size-2.5 rounded-full bg-white/10" />
                  <span className="ml-3 h-2 w-28 rounded-full bg-white/8" />
                </div>
                <div
                  className={cn(
                    "overflow-hidden rounded-[1.45rem] bg-black",
                    classNames?.mediaFrame,
                  )}
                >
                  <div className={classNames?.mediaContent}>{mediaContent}</div>
                </div>
              </div>
            ) : null}

            {resolvedArchitecture || resolvedCta ? (
              <div className="flex flex-col gap-6">
                {resolvedArchitecture ? (
                  <article
                    className={cn(
                      "rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.42)] backdrop-blur sm:p-8",
                      cardMotionClasses,
                      classNames?.architectureCard,
                    )}
                    aria-label={resolvedArchitecture.ariaLabel}
                  >
                    {resolvedArchitecture.label ? (
                      <p
                        className={cn(
                          "text-[0.7rem] font-medium uppercase tracking-[0.24em] text-white/42",
                          classNames?.architectureLabel,
                        )}
                      >
                        {resolvedArchitecture.label}
                      </p>
                    ) : null}

                    {resolvedArchitecture.title ? (
                      <h3
                        className={cn(
                          "mt-4 text-balance text-2xl font-medium tracking-[-0.04em] text-white sm:text-[1.75rem]",
                          classNames?.architectureTitle,
                        )}
                      >
                        {resolvedArchitecture.title}
                      </h3>
                    ) : null}

                    {resolvedArchitecture.description ? (
                      <p
                        className={cn(
                          "mt-3 text-sm leading-6 text-white/56 sm:text-[0.95rem]",
                          classNames?.architectureDescription,
                        )}
                      >
                        {resolvedArchitecture.description}
                      </p>
                    ) : null}

                    {resolvedArchitecture.items.length > 0 ? (
                      <ul className={cn("mt-5 space-y-3", classNames?.architectureList)}>
                        {resolvedArchitecture.items.map((item, index) => {
                          const normalizedItem = normalizeItem(item);

                          return (
                            <li
                              key={`${String(normalizedItem.title ?? normalizedItem.description)}-${index}`}
                              className={cn(
                                "flex gap-3",
                                classNames?.architectureItem,
                                normalizedItem.className,
                              )}
                            >
                              <span
                                className={cn(
                                  "mt-2 size-1.5 shrink-0 rounded-full bg-white/42",
                                  classNames?.architectureItemMarker,
                                )}
                                aria-hidden="true"
                              />
                              <span>
                                {normalizedItem.title ? (
                                  <span
                                    className={cn(
                                      "block text-sm font-medium text-white/82",
                                      classNames?.architectureItemTitle,
                                    )}
                                  >
                                    {normalizedItem.title}
                                  </span>
                                ) : null}
                                <span
                                  className={cn(
                                    "block text-sm leading-6 text-white/52",
                                    classNames?.architectureItemDescription,
                                  )}
                                >
                                  {normalizedItem.description}
                                </span>
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}
                  </article>
                ) : null}

                {resolvedCta ? (
                  <div className={cn("flex", classNames?.buttons)}>{renderCta(resolvedCta)}</div>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
