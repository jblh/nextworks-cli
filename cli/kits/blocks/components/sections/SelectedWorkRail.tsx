import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type SelectedWorkRailLayout = "grid" | "rail";

export interface SelectedWorkRailImage {
  src: string;
  alt?: string;
  className?: string;
}

export interface SelectedWorkRailVideo {
  src: string;
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

export interface SelectedWorkRailTag {
  label: string;
  className?: string;
}

export interface SelectedWorkRailItem {
  id?: string;
  title: React.ReactNode;
  label?: React.ReactNode;
  description?: React.ReactNode;
  href?: string;
  ariaLabel?: string;
  image?: string | SelectedWorkRailImage;
  video?: string | SelectedWorkRailVideo;
  poster?: string;
  tags?: Array<string | SelectedWorkRailTag>;
  visual?: React.ReactNode;
  className?: string;
}

export interface SelectedWorkRailClassNames {
  section?: string;
  backgroundGlow?: string;
  container?: string;
  header?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  rail?: string;
  item?: string;
  featuredItem?: string;
  itemInner?: string;
  itemLink?: string;
  media?: string;
  image?: string;
  video?: string;
  placeholder?: string;
  content?: string;
  label?: string;
  itemTitle?: string;
  itemDescription?: string;
  tags?: string;
  tag?: string;
}

export interface SelectedWorkRailProps {
  id?: string;
  className?: string;
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  items?: SelectedWorkRailItem[];
  layout?: SelectedWorkRailLayout;
  featuredIndex?: number;
  ariaLabel?: string;
  titleId?: string;
  enableMotion?: boolean;
  classNames?: SelectedWorkRailClassNames;
  section?: { className?: string };
  container?: { className?: string };
  header?: { className?: string };
  railSlot?: { className?: string };
}

const defaultItems: SelectedWorkRailItem[] = [
  {
    title: "Product Launch",
    label: "Template",
    description: "Classic launch-page structure with a cleaner conversion flow.",
    tags: ["Hero", "Pricing", "FAQ"],
  },
  {
    title: "SaaS Dashboard",
    label: "Template",
    description: "A product-focused landing page with a stronger dashboard preview.",
    tags: ["Dashboard", "Product demo"],
  },
  {
    title: "Digital Agency",
    label: "Template",
    description: "A bolder services site with portfolio and process sections.",
    tags: ["Services", "Portfolio"],
  },
  {
    title: "AI Workflow",
    label: "Template",
    description: "An AI coding agent story built as a reusable workflow template.",
    tags: ["AI", "Workflow"],
  },
  {
    title: "Gallery",
    label: "Showcase",
    description: "A live section gallery for previewing themes and layout variants.",
    tags: ["Sections", "Themes"],
  },
  {
    title: "Nextworks CLI",
    label: "Project",
    description: "The install workflow behind the Blocks kit and its template routes.",
    tags: ["CLI", "TypeScript"],
  },
];

function normalizeMediaImage(
  image: SelectedWorkRailItem["image"],
): SelectedWorkRailImage | undefined {
  if (!image) {
    return undefined;
  }

  return typeof image === "string" ? { src: image } : image;
}

function normalizeMediaVideo(
  video: SelectedWorkRailItem["video"],
  poster?: string,
): SelectedWorkRailVideo | undefined {
  if (!video) {
    return undefined;
  }

  return typeof video === "string" ? { src: video, poster } : { ...video, poster: video.poster ?? poster };
}

function normalizeTag(tag: string | SelectedWorkRailTag): SelectedWorkRailTag {
  return typeof tag === "string" ? { label: tag } : tag;
}

function renderVisual(
  item: SelectedWorkRailItem,
  classNames?: SelectedWorkRailClassNames,
) {
  if (item.visual) {
    return item.visual;
  }

  const video = normalizeMediaVideo(item.video, item.poster);

  if (video?.src) {
    return (
      <video
        src={video.src}
        poster={video.poster}
        title={video.title ?? video.ariaLabel ?? "Selected work preview video"}
        aria-label={video.ariaLabel ?? video.title ?? "Selected work preview video"}
        className={cn("size-full object-cover", classNames?.video, video.className)}
        autoPlay={video.autoPlay ?? true}
        muted={video.muted ?? true}
        loop={video.loop ?? true}
        playsInline={video.playsInline ?? true}
        controls={video.controls ?? false}
        preload={video.preload ?? "metadata"}
      />
    );
  }

  const image = normalizeMediaImage(item.image);

  if (image?.src) {
    return (
      <Image
        src={image.src}
        alt={image.alt ?? (typeof item.title === "string" ? item.title : "Selected work preview")}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className={cn("object-cover", classNames?.image, image.className)}
        unoptimized
      />
    );
  }

  return (
    <div
      className={cn(
        "flex size-full flex-col justify-between bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),rgba(255,255,255,0.04)_32%,rgba(0,0,0,0.96)_72%)] p-5 sm:p-6",
        classNames?.placeholder,
      )}
      aria-hidden="true"
    >
      <div className="h-10 w-28 rounded-full border border-white/10 bg-white/[0.04]" />
      <div className="space-y-2">
        <div className="h-3 w-24 rounded-full bg-white/10" />
        <div className="h-3 w-40 rounded-full bg-white/7" />
        <div className="h-20 rounded-[1.25rem] border border-white/10 bg-white/[0.04]" />
      </div>
    </div>
  );
}

function renderItemBody(
  item: SelectedWorkRailItem,
  isFeatured: boolean,
  classNames?: SelectedWorkRailClassNames,
) {
  return (
    <>
      <div
        className={cn(
          "relative aspect-[16/11] overflow-hidden rounded-[1.4rem] border border-white/10 bg-black",
          isFeatured && "aspect-[16/9]",
          classNames?.media,
        )}
      >
        {renderVisual(item, classNames)}
      </div>

      <div className={cn("mt-5 flex flex-col gap-3", classNames?.content)}>
        {item.label ? (
          <p
            className={cn(
              "text-[0.7rem] font-medium uppercase tracking-[0.24em] text-white/42",
              classNames?.label,
            )}
          >
            {item.label}
          </p>
        ) : null}

        <div>
          <h3
            className={cn(
              "text-xl font-medium tracking-[-0.035em] text-white sm:text-2xl",
              classNames?.itemTitle,
            )}
          >
            {item.title}
          </h3>

          {item.description ? (
            <p
              className={cn(
                "mt-2 max-w-2xl text-sm leading-6 text-white/52 sm:text-[0.95rem]",
                classNames?.itemDescription,
              )}
            >
              {item.description}
            </p>
          ) : null}
        </div>

        {item.tags?.length ? (
          <div className={cn("flex flex-wrap gap-2", classNames?.tags)}>
            {item.tags.map((tag) => {
              const normalizedTag = normalizeTag(tag);

              return (
                <span
                  key={normalizedTag.label}
                  className={cn(
                    "rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/58",
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
      </div>
    </>
  );
}

export function SelectedWorkRail({
  id,
  className,
  eyebrow = "Selected work",
  title = "A visual rail for templates, launches, and product work.",
  description =
    "Use this section to show a few polished examples with minimal copy and stronger visuals.",
  items = defaultItems,
  layout = "grid",
  featuredIndex = 0,
  ariaLabel = "Selected work showcase section",
  titleId,
  enableMotion = true,
  classNames,
  section,
  container,
  header,
  railSlot,
}: SelectedWorkRailProps) {
  const motionClasses = enableMotion
    ? "transition-all duration-300 hover:-translate-y-1"
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
          "pointer-events-none absolute left-1/2 top-28 h-[36rem] w-[52rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.11),rgba(255,255,255,0.04)_38%,transparent_74%)] blur-3xl",
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

        {layout === "rail" ? (
          <div
            className={cn(
              "mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2",
              railSlot?.className,
              classNames?.rail,
            )}
          >
            {items.map((item, index) => {
              const isFeatured = index === featuredIndex;
              const itemBody = renderItemBody(item, isFeatured, classNames);

              return item.href ? (
                <Link
                  key={item.id ?? `${String(item.title)}-${index}`}
                  href={item.href}
                  aria-label={item.ariaLabel ?? (typeof item.title === "string" ? item.title : "Selected work item")}
                  className={cn(
                    "group min-w-[18rem] max-w-[26rem] flex-1 snap-start rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 shadow-[0_20px_80px_rgba(0,0,0,0.46)] backdrop-blur sm:min-w-[22rem] sm:p-5",
                    isFeatured && "min-w-[22rem] max-w-[32rem]",
                    motionClasses,
                    classNames?.item,
                    classNames?.itemLink,
                    isFeatured && classNames?.featuredItem,
                    item.className,
                  )}
                >
                  <div className={cn("flex h-full flex-col", classNames?.itemInner)}>{itemBody}</div>
                </Link>
              ) : (
                <div
                  key={item.id ?? `${String(item.title)}-${index}`}
                  className={cn(
                    "min-w-[18rem] max-w-[26rem] flex-1 snap-start rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 shadow-[0_20px_80px_rgba(0,0,0,0.46)] backdrop-blur sm:min-w-[22rem] sm:p-5",
                    isFeatured && "min-w-[22rem] max-w-[32rem]",
                    motionClasses,
                    classNames?.item,
                    isFeatured && classNames?.featuredItem,
                    item.className,
                  )}
                >
                  <div className={cn("flex h-full flex-col", classNames?.itemInner)}>{itemBody}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div
            className={cn(
              "mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3",
              railSlot?.className,
              classNames?.rail,
            )}
          >
            {items.map((item, index) => {
              const isFeatured = index === featuredIndex;
              const itemBody = renderItemBody(item, isFeatured, classNames);
              const sharedClassName = cn(
                "rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 shadow-[0_20px_80px_rgba(0,0,0,0.46)] backdrop-blur sm:p-5",
                isFeatured && "md:col-span-2 xl:col-span-2",
                motionClasses,
                classNames?.item,
                isFeatured && classNames?.featuredItem,
                item.className,
              );

              return item.href ? (
                <Link
                  key={item.id ?? `${String(item.title)}-${index}`}
                  href={item.href}
                  aria-label={item.ariaLabel ?? (typeof item.title === "string" ? item.title : "Selected work item")}
                  className={cn(sharedClassName, classNames?.itemLink)}
                >
                  <div className={cn("flex h-full flex-col", classNames?.itemInner)}>{itemBody}</div>
                </Link>
              ) : (
                <div key={item.id ?? `${String(item.title)}-${index}`} className={sharedClassName}>
                  <div className={cn("flex h-full flex-col", classNames?.itemInner)}>{itemBody}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
