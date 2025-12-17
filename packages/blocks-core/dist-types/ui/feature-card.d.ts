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
    card?: {
        className?: string;
    };
    image?: {
        className?: string;
    };
    heading?: {
        className?: string;
    };
    subheading?: {
        className?: string;
    };
    /** Next/Image quality (1-100) */
    imageQuality?: number;
    /** Next/Image sizes attribute */
    imageSizes?: string;
}
export declare function FeatureCard({ id, className, cardImageSrc, cardImageAlt, cardHeadingText, cardSubheadingText, card, image, heading, subheading, imageQuality, imageSizes, }: FeatureCardProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=feature-card.d.ts.map