import * as React from "react";
import { Button } from "../ui/button";
type ButtonProps = React.ComponentProps<typeof Button>;
export type ThemeToggleProps = {
    /** Forwarded to internal Button. You can set unstyled, className, variant, size, etc. */
    buttonProps?: Partial<ButtonProps>;
    /** Optional aria-label override */
    ariaLabel?: string;
    /** Optional class overrides for icons */
    moonClassName?: string;
    sunClassName?: string;
};
export declare function ThemeToggle({ buttonProps, ariaLabel, moonClassName, sunClassName, }: ThemeToggleProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=theme-toggle.d.ts.map