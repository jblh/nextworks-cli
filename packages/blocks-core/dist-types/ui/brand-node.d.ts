import type { ComponentType } from "react";
export interface BrandNodeProps {
    /** Optional wrapper className to override size/colors (merged with defaults) */
    className?: string;
}
export interface BrandNodeIconBadgeProps extends BrandNodeProps {
    /** Icon component to render inside the badge */
    icon?: ComponentType<{
        className?: string;
    }>;
    /** Tailwind classes to control icon size; default `h-4 w-4` */
    iconClassName?: string;
}
export declare function BrandNodeIconBadge({ className, icon: Icon, iconClassName, }: BrandNodeIconBadgeProps): import("react/jsx-runtime").JSX.Element;
export interface BrandNodeGradientRingProps extends BrandNodeProps {
    /** CSS conic-gradient string; provide two or more colors */
    gradient?: string;
    /** Inner fill background (center disc) */
    innerBgClassName?: string;
}
export declare function BrandNodeGradientRing({ className, gradient, innerBgClassName, }: BrandNodeGradientRingProps): import("react/jsx-runtime").JSX.Element;
export declare function BrandNodeGeometricMark({ className }: BrandNodeProps): import("react/jsx-runtime").JSX.Element;
export interface BrandNodeEmojiBadgeProps extends BrandNodeProps {
    emoji?: string;
}
export declare function BrandNodeEmojiBadge({ className, emoji, }: BrandNodeEmojiBadgeProps): import("react/jsx-runtime").JSX.Element;
export interface BrandNodeDiagonalAppIconProps extends BrandNodeProps {
    /** Base and overlay colors */
    baseColorClass?: string;
    overlayColorClass?: string;
}
export declare function BrandNodeDiagonalAppIcon({ className, baseColorClass, overlayColorClass, }: BrandNodeDiagonalAppIconProps): import("react/jsx-runtime").JSX.Element;
export declare function BrandNodeCubeOutline({ className }: BrandNodeProps): import("react/jsx-runtime").JSX.Element;
/** Registry for quick swapping by name */
export declare const BrandNodes: {
    IconBadge: typeof BrandNodeIconBadge;
    GradientRing: typeof BrandNodeGradientRing;
    GeometricMark: typeof BrandNodeGeometricMark;
    EmojiBadge: typeof BrandNodeEmojiBadge;
    DiagonalAppIcon: typeof BrandNodeDiagonalAppIcon;
    CubeOutline: typeof BrandNodeCubeOutline;
};
//# sourceMappingURL=brand-node.d.ts.map