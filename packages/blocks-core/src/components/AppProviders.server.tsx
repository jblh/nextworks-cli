import { Geist, Geist_Mono, Outfit, Inter, Poppins } from "next/font/google";
import { EnhancedThemeProvider } from "./enhanced-theme-provider";
import { cookies } from "next/headers";
import {
  themes,
  darkThemes,
  type ThemeVariant,
  type ThemeConfig,
} from "../lib/themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

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

export default async function AppProviders({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Read cookies for SSR: chosen variant and optional custom tokens
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

  const lightMerged = cookieCustom
    ? { ...baseLight, ...cookieCustom }
    : baseLight;
  const darkMerged = cookieCustom ? { ...baseDark, ...cookieCustom } : baseDark;

  const lightVars = toCssVars(lightMerged);
  const darkVars = toCssVars(darkMerged);
  const inlineThemeCss = `:root{${lightVars}}.dark{${darkVars}}`;

  return (
    <>
      <style
        id="theme-variant-vars"
        dangerouslySetInnerHTML={{ __html: inlineThemeCss }}
      />
      <div
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} ${inter.variable} ${poppins.variable} antialiased`}
      >
        <EnhancedThemeProvider defaultThemeVariant={variant}>
          {children}
        </EnhancedThemeProvider>
      </div>
    </>
  );
}
