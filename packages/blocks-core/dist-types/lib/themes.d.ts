export type ThemeVariant = "default" | "monochrome" | "blue" | "green" | "purple" | "orange" | "custom";
export interface ThemeConfig {
    name: string;
    colors: {
        primary: string;
        primaryForeground: string;
        secondary: string;
        secondaryForeground: string;
        accent: string;
        accentForeground: string;
        background: string;
        foreground: string;
        card: string;
        cardForeground: string;
        popover: string;
        popoverForeground: string;
        muted: string;
        mutedForeground: string;
        border: string;
        input: string;
        ring: string;
        destructive: string;
        chart1: string;
        chart2: string;
        chart3: string;
        chart4: string;
        chart5: string;
    };
}
export declare const themes: Record<ThemeVariant, ThemeConfig>;
export declare const darkThemes: Record<ThemeVariant, ThemeConfig>;
//# sourceMappingURL=themes.d.ts.map