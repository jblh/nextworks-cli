import * as React from "react";
import type { ThemeProviderProps as NextThemesProviderProps } from "next-themes";
import { ThemeVariant, type ThemeConfig } from "../lib/themes";
type ColorTokens = ThemeConfig["colors"];
interface EnhancedThemeProviderProps {
    children: React.ReactNode;
    attribute?: NextThemesProviderProps["attribute"];
    defaultTheme?: NextThemesProviderProps["defaultTheme"];
    enableSystem?: NextThemesProviderProps["enableSystem"];
    disableTransitionOnChange?: NextThemesProviderProps["disableTransitionOnChange"];
    defaultThemeVariant?: ThemeVariant;
    defaultCustomTokens?: Partial<ColorTokens> | null;
}
interface ThemeContextType {
    themeVariant: ThemeVariant;
    setThemeVariant: (variant: ThemeVariant) => void;
    customTheme: Partial<ColorTokens> | null;
    setCustomTheme: (tokens: Partial<ColorTokens> | null) => void;
    setCustomBrandColors: (tokens: Partial<ColorTokens>) => void;
    applyTheme: (variant: ThemeVariant, isDark?: boolean) => void;
}
export declare function useThemeVariant(): ThemeContextType;
export declare function EnhancedThemeProvider({ children, attribute, defaultTheme, enableSystem, disableTransitionOnChange, defaultThemeVariant, defaultCustomTokens, }: EnhancedThemeProviderProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=enhanced-theme-provider.d.ts.map