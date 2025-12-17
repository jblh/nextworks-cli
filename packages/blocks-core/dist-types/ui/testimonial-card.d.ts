export interface TestimonialCardProps {
    /** Optional id for root card */
    id?: string;
    /** Optional root className merged with card.className */
    className?: string;
    /** Legacy props (kept for backward compatibility) */
    testimonialText?: string;
    testimonialAuthor?: string;
    testimonialAuthorInitials?: string;
    /** New props to align with upgraded sections */
    quote?: string;
    name?: string;
    role?: string;
    /** Styling configuration objects */
    card?: {
        className?: string;
    };
    content?: {
        className?: string;
    };
    text?: {
        className?: string;
    };
    author?: {
        className?: string;
    };
    avatar?: {
        className?: string;
    };
    avatarText?: {
        className?: string;
    };
}
export declare function TestimonialCard({ id, className, testimonialText, testimonialAuthor, testimonialAuthorInitials, quote, name, role, card, content, text, author, avatar, avatarText, }: TestimonialCardProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=testimonial-card.d.ts.map