"use client";

import React from "react";
import { EnhancedThemeProvider } from "../components/enhanced-theme-provider";
import type { ThemeVariant } from "../lib/themes";

export type BlocksAppProvidersProps = {
  children: React.ReactNode;
  defaultThemeVariant?: ThemeVariant;
};

/**
 * Client-safe provider wrapper for Nextworks blocks.
 *
 * This file intentionally contains no next/* imports.
 */
export function BlocksAppProviders({
  children,
  defaultThemeVariant = "monochrome",
}: BlocksAppProvidersProps) {
  return (
    <EnhancedThemeProvider defaultThemeVariant={defaultThemeVariant}>
      {children}
    </EnhancedThemeProvider>
  );
}
