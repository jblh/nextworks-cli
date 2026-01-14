import React from "react";
import { cookies } from "next/headers";
import {
  themes,
  darkThemes,
  type ThemeVariant,
  type ThemeConfig,
} from "../lib/themes";

function toCssVars(colors: Record<string, string>) {
  return Object.entries(colors)
    .map(
      ([key, value]) =>
        `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${value};`,
    )
    .join("");
}

function safeParseCustomTokens(
  value?: string,
): Partial<ThemeConfig["colors"]> | null {
  if (!value) return null;
  try {
    return JSON.parse(decodeURIComponent(value));
  } catch {
    return null;
  }
}

/**
 * Server-only: reads cookies and returns initial theme variant + a <style> tag
 * that sets CSS variables for :root and .dark.
 *
 * No next/font usage here (Turbopack-safe).
 */
export async function getInitialThemeFromCookies(): Promise<{
  variant: ThemeVariant;
  styleTag: React.ReactElement;
}> {
  const cookieStore = await cookies();
  const cookieVariant = cookieStore.get("theme-variant")?.value as
    | ThemeVariant
    | undefined;

  const variant: ThemeVariant =
    cookieVariant && cookieVariant in themes ? cookieVariant : "default";

  const cookieCustom =
    variant === "custom"
      ? safeParseCustomTokens(cookieStore.get("theme-custom")?.value)
      : null;

  const baseLight = themes[variant].colors;
  const baseDark = darkThemes[variant].colors;

  const lightMerged = cookieCustom ? { ...baseLight, ...cookieCustom } : baseLight;
  const darkMerged = cookieCustom ? { ...baseDark, ...cookieCustom } : baseDark;

  const lightVars = toCssVars(lightMerged);
  const darkVars = toCssVars(darkMerged);
  const inlineThemeCss = `:root{${lightVars}}.dark{${darkVars}}`;

  return {
    variant,
    styleTag: (
      <style
        id="theme-variant-vars"
        dangerouslySetInnerHTML={{ __html: inlineThemeCss }}
      />
    ),
  };
}
