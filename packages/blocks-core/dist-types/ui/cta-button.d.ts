import React from "react";
export interface CTAButtonProps {
    /** Optional id on the root anchor/button */
    id?: string;
    /** Additional className merged with the button slot */
    className?: string;
    /** onClick handler for the CTA button (anchor element) */
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
    /** Label text for the CTA button */
    ctaButtonLabel?: string;
    /** URL or anchor target for the CTA button */
    ctaButtonHref?: string;
    /** Deprecated style shorthands (kept for backward-compat). Prefer button.className */
    ctaButtonTextColor?: string;
    ctaButtonBgColor?: string;
    ctaButtonBorderColor?: string;
    ctaButtonDarkMode?: {
        color?: string;
        bg?: string;
        borderColor?: string;
    };
    ctaButtonHoverStyle?: {
        color?: string;
        bg?: string;
        borderColor?: string;
        transform?: string;
        boxShadow?: string;
    };
    /** Slot for shadcn Button styling */
    button?: {
        variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
        size?: "default" | "sm" | "lg" | "icon";
        className?: string;
        /** Forward-through escape hatch matching Button */
        unstyled?: boolean;
        style?: React.CSSProperties;
    };
}
export declare function CTAButton({ id, className, onClick, ctaButtonLabel, ctaButtonHref, ctaButtonTextColor, ctaButtonBgColor, ctaButtonBorderColor, ctaButtonDarkMode, ctaButtonHoverStyle, button, }: CTAButtonProps): import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=cta-button.d.ts.map