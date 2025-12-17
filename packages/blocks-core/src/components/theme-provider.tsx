"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps as NextThemesProviderProps } from "next-themes";

interface ThemeProviderProps {
  children: React.ReactNode;
  attribute?: NextThemesProviderProps["attribute"];
  defaultTheme?: NextThemesProviderProps["defaultTheme"];
  enableSystem?: NextThemesProviderProps["enableSystem"];
  disableTransitionOnChange?: NextThemesProviderProps["disableTransitionOnChange"];
}

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "system",
  enableSystem = true,
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      disableTransitionOnChange={disableTransitionOnChange}
    >
      {children}
    </NextThemesProvider>
  );
}
