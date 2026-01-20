"use client";

import * as React from "react";
import { EnhancedThemeProvider } from "../enhanced-theme-provider";
import type { ThemeVariant } from "../../lib/themes";

type BlocksAppProvidersProps = {
  children: React.ReactNode;
  defaultThemeVariant?: ThemeVariant;
};

/**
 * Client-safe provider wrapper for Nextworks blocks (kit-local).
 *
 * This intentionally avoids importing providers/hooks from @nextworks/blocks-core
 * to prevent duplicate React context instances in Turbopack dev.
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
