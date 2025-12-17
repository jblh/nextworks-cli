import * as React from "react";
import type { ThemeProviderProps as NextThemesProviderProps } from "next-themes";
interface ThemeProviderProps {
    children: React.ReactNode;
    attribute?: NextThemesProviderProps["attribute"];
    defaultTheme?: NextThemesProviderProps["defaultTheme"];
    enableSystem?: NextThemesProviderProps["enableSystem"];
    disableTransitionOnChange?: NextThemesProviderProps["disableTransitionOnChange"];
}
export declare function ThemeProvider({ children, attribute, defaultTheme, enableSystem, disableTransitionOnChange, }: ThemeProviderProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=theme-provider.d.ts.map