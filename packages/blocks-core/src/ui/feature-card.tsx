"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { cn } from "../lib/utils";

export interface FeatureCardProps {
  /** Optional id and root className */
  id?: string;
  className?: string;

  /** Image source URL for the feature card image */
  cardImageSrc: string;
  /** Alt text for the feature card image */
  cardImageAlt: string;
  /** Heading text displayed on the feature card */
  cardHeadingText: string;
  /** Subheading or description text on the feature card */
  cardSubheadingText: string;

  /** Styling configuration objects */
  card?: { className?: string };
  image?: { className?: string };
  heading?: { className?: string };
  subheading?: { className?: string };
  /** Next/Image quality (1-100) */
  imageQuality?: number;
  /** Next/Image sizes attribute */
  imageSizes?: string;
}

export function FeatureCard({
  id,
  className,
  cardImageSrc,
  cardImageAlt,
  cardHeadingText,
  cardSubheadingText,
  card = {
    className:
      "h-full transition-all duration-200 hover:shadow-lg bg-card text-card-foreground border rounded-md border-border",
  },
  image = { className: "object-cover" },
  heading = {
    className:
      "mb-2 text-lg font-semibold text-foreground text-[var(--card-title-fg)]",
  },
  subheading = {
    className:
      "text-sm leading-relaxed text-muted-foreground text-[var(--card-muted-fg)]",
  },
  imageQuality = 85,
  imageSizes = "(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw",
}: FeatureCardProps) {
  return (
    <Card id={id} className={cn("group", card.className, className)}>
      <CardContent className="relative flex h-full flex-col p-6">
        {/* Spotlight overlay */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-white/5 blur-2xl dark:bg-white/10" />
        </div>

        <div className="relative mb-4 h-48 w-full overflow-hidden rounded-md">
          {cardImageSrc ? (
            <Image
              src={cardImageSrc}
              alt={cardImageAlt || "Feature image"}
              fill
              className={cn(
                "transition-transform duration-500 group-hover:scale-105",
                image.className,
              )}
              quality={imageQuality}
              sizes={imageSizes}
            />
          ) : (
            <div className="bg-muted text-muted-foreground flex h-full w-full items-center justify-center">
              <span className="text-xs">No image</span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col">
          <h3 className={heading.className}>{cardHeadingText}</h3>
          <p className={subheading.className}>{cardSubheadingText}</p>
        </div>
      </CardContent>
    </Card>
  );
}
