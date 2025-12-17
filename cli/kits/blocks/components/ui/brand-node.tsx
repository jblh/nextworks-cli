"use client";

import React from "react";
import type { ComponentType } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BrandNodeProps {
  /** Optional wrapper className to override size/colors (merged with defaults) */
  className?: string;
}

export interface BrandNodeIconBadgeProps extends BrandNodeProps {
  /** Icon component to render inside the badge */
  icon?: ComponentType<{ className?: string }>;
  /** Tailwind classes to control icon size; default `h-4 w-4` */
  iconClassName?: string;
}

export function BrandNodeIconBadge({
  className,
  icon: Icon = Sparkles,
  iconClassName = "h-4 w-4",
}: BrandNodeIconBadgeProps) {
  const base = "grid h-8 w-8 place-items-center rounded-md bg-primary/10 ring-1 ring-primary/30 text-primary";
  return (
    <div className={cn(base, className)} aria-label="Brand icon badge">
      <Icon className={iconClassName} />
    </div>
  );
}

export interface BrandNodeGradientRingProps extends BrandNodeProps {
  /** CSS conic-gradient string; provide two or more colors */
  gradient?: string;
  /** Inner fill background (center disc) */
  innerBgClassName?: string;
}

export function BrandNodeGradientRing({
  className,
  gradient = "conic-gradient(hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))",
  innerBgClassName = "h-full w-full rounded-full bg-background",
}: BrandNodeGradientRingProps) {
  const base = "relative h-8 w-8";
  return (
    <div className={cn(base, className)} aria-label="Brand gradient ring">
      <div className="absolute inset-0 rounded-full p-[2px]" style={{ background: gradient }}>
        <div className={innerBgClassName} />
      </div>
    </div>
  );
}

export function BrandNodeGeometricMark({ className }: BrandNodeProps) {
  const base = "grid h-8 w-8 place-items-center rounded-md bg-gradient-to-br from-primary/10 to-accent/10 ring-1 ring-border";
  return (
    <div className={cn(base, className)} aria-label="Brand geometric mark">
      <svg viewBox="0 0 24 24" className="fill-primary h-4 w-4">
        <path d="M12 4l8 14H4l8-14z" />
      </svg>
    </div>
  );
}

export interface BrandNodeEmojiBadgeProps extends BrandNodeProps {
  emoji?: string;
}

export function BrandNodeEmojiBadge({ className, emoji = "⚡" }: BrandNodeEmojiBadgeProps) {
  const base = "grid h-8 w-8 place-items-center rounded-md bg-card/60 backdrop-blur ring-1 ring-border";
  return (
    <div className={cn(base, className)} aria-label="Brand emoji badge">
      <span className="text-base" aria-hidden>
        {emoji}
      </span>
    </div>
  );
}

export interface BrandNodeDiagonalAppIconProps extends BrandNodeProps {
  /** Base and overlay colors */
  baseColorClass?: string;
  overlayColorClass?: string;
}

export function BrandNodeDiagonalAppIcon({
  className,
  baseColorClass = "bg-primary",
  overlayColorClass = "bg-accent",
}: BrandNodeDiagonalAppIconProps) {
  const base = "relative h-8 w-8 overflow-hidden rounded-md ring-1 ring-black/5 dark:ring-white/10";
  return (
    <div className={cn(base, className)} aria-label="Brand diagonal app icon">
      <div className={cn("absolute inset-0", baseColorClass)} />
      <div className={cn("absolute inset-0 translate-y-1/3 -skew-y-12", overlayColorClass)} />
    </div>
  );
}

export function BrandNodeCubeOutline({ className }: BrandNodeProps) {
  const base = "grid h-8 w-8 place-items-center rounded-md bg-foreground text-background ring-1 ring-border";
  return (
    <div className={cn(base, className)} aria-label="Brand cube outline">
      <svg viewBox="0 0 24 24" className="h-4 w-4">
        <path d="M12 2l8 4.5v9L12 20 4 15.5v-9L12 2z" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 20v-9M4 6l8 5 8-5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </div>
  );
}

/** Registry for quick swapping by name */
export const BrandNodes = {
  IconBadge: BrandNodeIconBadge,
  GradientRing: BrandNodeGradientRing,
  GeometricMark: BrandNodeGeometricMark,
  EmojiBadge: BrandNodeEmojiBadge,
  DiagonalAppIcon: BrandNodeDiagonalAppIcon,
  CubeOutline: BrandNodeCubeOutline,
};
