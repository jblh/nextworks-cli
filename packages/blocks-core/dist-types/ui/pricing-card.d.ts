import React from "react";
export interface PricingCardProps {
    /** Optional id and root className */
    id?: string;
    className?: string;
    /** Header text/title of the pricing plan */
    pricingCardTitle?: string;
    /** Price text for the pricing plan */
    pricingCardPrice?: string;
    /** Array of features included in the pricing plan */
    pricingCardFeatures?: string[];
    /** Label text for the pricing call-to-action button */
    pricingCardCTALabel?: string;
    /** URL/href for the pricing call-to-action button */
    pricingCardCTAHref?: string;
    /** Whether this is the featured/popular plan */
    isPopular?: boolean;
    /** Styling configuration objects */
    card?: {
        className?: string;
    };
    header?: {
        className?: string;
    };
    title?: {
        className?: string;
    };
    price?: {
        className?: string;
    };
    features?: {
        className?: string;
    };
    featureItem?: {
        className?: string;
    };
    cta?: {
        variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
        size?: "default" | "sm" | "lg" | "icon";
        className?: string;
        /** Forward-through escape hatch matching Button */
        unstyled?: boolean;
        style?: React.CSSProperties;
    };
    popularBadge?: {
        className?: string;
    };
}
export declare function PricingCard({ id, className, pricingCardTitle, pricingCardPrice, pricingCardFeatures, pricingCardCTALabel, pricingCardCTAHref, isPopular, card, header, title, price, features, featureItem, cta, popularBadge, }: PricingCardProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=pricing-card.d.ts.map