"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps as NextThemesProviderProps } from "next-themes";
import {
  ThemeVariant,
  themes,
  darkThemes,
  type ThemeConfig,
} from "@/lib/themes";

type ColorTokens = ThemeConfig["colors"];
const CUSTOM_STORAGE_KEY = "nxw-theme-custom";

interface EnhancedThemeProviderProps {
  children: React.ReactNode;
  attribute?: NextThemesProviderProps["attribute"];
  defaultTheme?: NextThemesProviderProps["defaultTheme"];
  enableSystem?: NextThemesProviderProps["enableSystem"];
  disableTransitionOnChange?: NextThemesProviderProps["disableTransitionOnChange"];
  defaultThemeVariant?: ThemeVariant;
  // Optional DX: provide default custom tokens declaratively (e.g. brand colors)
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

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export function useThemeVariant() {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(
      "useThemeVariant must be used within an EnhancedThemeProvider",
    );
  }
  return context;
}

export function EnhancedThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "system",
  enableSystem = true,
  disableTransitionOnChange = false,
  defaultThemeVariant = "monochrome",
  defaultCustomTokens = null,
}: EnhancedThemeProviderProps) {
  const [themeVariant, setThemeVariant] =
    React.useState<ThemeVariant>(defaultThemeVariant);
  const [customTheme, setCustomThemeState] =
    React.useState<Partial<ColorTokens> | null>(defaultCustomTokens);

  const writeCustomCookies = React.useCallback(
    (tokens: Partial<ColorTokens> | null) => {
      if (tokens) {
        document.cookie = `theme-variant=custom; Path=/; Max-Age=31536000; SameSite=Lax`;
        document.cookie = `theme-custom=${encodeURIComponent(JSON.stringify(tokens))}; Path=/; Max-Age=31536000; SameSite=Lax`;
      } else {
        document.cookie = `theme-custom=; Path=/; Max-Age=0; SameSite=Lax`;
      }
    },
    [],
  );

  const setCustomTheme = React.useCallback(
    (tokens: Partial<ColorTokens> | null) => {
      setCustomThemeState(tokens);
      try {
        if (tokens) {
          localStorage.setItem(CUSTOM_STORAGE_KEY, JSON.stringify(tokens));
        } else {
          localStorage.removeItem(CUSTOM_STORAGE_KEY);
        }
      } catch {
        // ignore
      }
      writeCustomCookies(tokens ?? null);
    },
    [writeCustomCookies],
  );

  const setCustomBrandColors = React.useCallback(
    (tokens: Partial<ColorTokens>) => {
      setThemeVariant("custom");
      setCustomTheme(tokens);
    },
    [setCustomTheme],
  );

  const applyTheme = React.useCallback(
    (variant: ThemeVariant, isDark = false) => {
      const base = isDark ? darkThemes[variant].colors : themes[variant].colors;
      const merged =
        variant === "custom" && customTheme ? { ...base, ...customTheme } : base;

      // Apply CSS custom properties to the document root
      const root = document.documentElement;

      // Reflect the current variant for CSS selectors
      root.setAttribute("data-theme-variant", variant);

      Object.entries(merged).forEach(([key, value]) => {
        const cssVar = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
        root.style.setProperty(cssVar, value as string);
      });
    },
    [customTheme],
  );

  // Apply theme when variant or custom tokens change
  React.useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    applyTheme(themeVariant, isDark);
  }, [themeVariant, customTheme, applyTheme]);

  // Load custom tokens from localStorage on mount (overrides defaultCustomTokens if present)
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(CUSTOM_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<ColorTokens>;
        setCustomThemeState(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  // Listen for theme changes from next-themes
  React.useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          const isDark = document.documentElement.classList.contains("dark");
          applyTheme(themeVariant, isDark);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [themeVariant, applyTheme]);

  const contextValue = React.useMemo(
    () => ({
      themeVariant,
      setThemeVariant,
      customTheme,
      setCustomTheme,
      setCustomBrandColors,
      applyTheme,
    }),
    [themeVariant, customTheme, setCustomTheme, setCustomBrandColors, applyTheme],
  );

  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      disableTransitionOnChange={disableTransitionOnChange}
    >
      <ThemeContext.Provider value={contextValue}>
        {children}
      </ThemeContext.Provider>
    </NextThemesProvider>
  );
}
