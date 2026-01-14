# Theme Guide (Blocks kit)

This guide explains the theming system used by the Blocks kit.

Overview

- Theme definitions live in lib/themes.ts and export a list of theme presets and a default theme.
- The ThemeProvider and EnhancedThemeProvider components consume these presets to provide runtime theme switching and CSS variable injection.

Creating new themes

1. Edit lib/themes.ts and add a new theme object with name and color tokens.
2. Update any PresetThemeVars components in app/templates/* if you need template-specific variables.

Usage

- Wrap your app with the EnhancedThemeProvider in app/layout.tsx to enable theme switching.
- Use CSS variables or the theme tokens directly in components when styling.

Example

import { themes } from "@/lib/themes";

const custom = {
  name: "brand",
  colors: { primary: "#ff6600", background: "#fff8f0", surface: "#fff", text: "#1f2937", muted: "#9ca3af" }
};

themes.push(custom);
