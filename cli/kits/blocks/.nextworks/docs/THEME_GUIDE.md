# Theme System Guide

This file is shipped with the Nextworks Blocks kit and lives under `.nextworks/docs/THEME_GUIDE.md` in your project.

The content below is the canonical theme guide for projects using Nextworks Blocks.

---

## Overview

This project now includes a comprehensive theming system that allows you to easily switch between different color schemes and have all components automatically adapt.

## How to Use

### 1. Basic Setup

Your app is configured with the enhanced theme provider via `AppProviders` in your router entrypoint:

- App Router: `app/layout.tsx`
- Pages Router: `pages/_app.tsx`

**Turbopack / Next 16 note (fonts + AppProviders)**

As of the current alpha, shared packages intentionally avoid importing `next/font/*`.
Fonts are instead configured directly in your app’s router entrypoint (the CLI patches this for you):

- App Router: `app/layout.tsx`
- Pages Router: `pages/_app.tsx`
  This avoids Turbopack dev issues related to internal Next font modules.

If you ever see a font-related Turbopack error after upgrades or manual edits, re-run:

```bash
npx nextworks@latest add blocks --sections --templates
```

to re-apply the router entrypoint patch, and ensure your entrypoint contains a valid
`import { ... } from "next/font/google";` plus the corresponding `const geistSans = ...` etc.

The default theme variant is set to "monochrome".

### 2. Available Themes

- **Monochrome** - Clean black and white theme
- **Blue** - Professional blue color scheme
- **Green** - Fresh green color scheme
- **Purple** - Modern purple color scheme
- **Orange** - Vibrant orange color scheme
- **Default** - Standard shadCN theme

### 3. Using Theme-Aware Components

#### Navbar2 Component

```tsx
import { Navbar2 } from "@/components/sections/Navbar2";

<Navbar2
  brand="My App"
  brandNode={<YourLogoComponent />}
  menuItems={[
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
  ]}
  ctaButton={{ label: "Get Started", href: "/signup" }}
  showThemeSelector={true}
/>;
```

#### Theme Selector

The `ThemeSelector` component is automatically included in Navbar2 and allows users to:

- Switch between theme variants (monochrome, blue, green, etc.)
- Toggle between light/dark modes
- Use system preference

### 4. Converting Existing Components

To make your existing components theme-aware, replace hardcoded colors with semantic classes:

#### Before (Hardcoded Colors):

```tsx
className = "bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white";
```

#### After (Theme-Aware):

```tsx
className = "bg-background text-foreground";
```

#### Common Replacements:

- `text-gray-800 dark:text-white` → `text-foreground`
- `bg-gray-50 dark:bg-gray-800` → `bg-background`
- `border-gray-200 dark:border-gray-700` → `border-border`
- `hover:bg-gray-100 dark:hover:bg-gray-700` → `hover:bg-accent`
- `text-blue-600 dark:text-blue-500` → `text-primary`

### 5. Semantic Color Classes

Use these semantic classes for consistent theming:

- `text-primary` - Primary brand color
- `text-secondary` - Secondary text color
- `text-muted-foreground` - Muted text color
- `bg-background` - Main background color
- `bg-card` - Card background color
- `bg-accent` - Accent background color
- `border-border` - Border color
- `ring-ring` - Focus ring color

### 6. Creating Custom Themes

To create a custom theme, modify `lib/themes.ts`:

```ts
export const themes: Record<ThemeVariant, ThemeConfig> = {
  // ... existing themes
  myCustomTheme: {
    name: "My Custom Theme",
    colors: {
      primary: "oklch(0.5 0.2 120)", // Custom green
      primaryForeground: "oklch(0.98 0 0)",
      // ... other colors
    },
  },
};
```

### 7. Example Usage

See the templates and `lib/themes.ts` for concrete examples of how themes are wired up.

Template paths depend on your router:

- App Router: `app/templates/<template>/**`
- Pages Router:
  - route entry file: `pages/templates/<template>/index.tsx`
  - supporting template files: `components/templates/<template>/**`

## Benefits

1. **Consistent Design**: All components automatically use the same color scheme
2. **Easy Customization**: Change the entire app's look by switching themes
3. **Accessibility**: Proper contrast ratios maintained across all themes
4. **Developer Experience**: No need to manually style each component
5. **User Choice**: Users can choose their preferred theme and light/dark mode

---

## Mixing tokens and local overrides

Sometimes you want the speed and consistency of the Color Theme (tokens), but still make template-specific tweaks. This project supports three patterns:

- Token-first: use semantic classes/variants everywhere (default behavior)
- Hybrid: keep tokens for most things and override specific slots/elements
- Full control: bypass tokens with unstyled primitives and fully custom classes

### 1) Prefer additive overrides first

- Keep variant/size from tokens and add className for small tweaks.
- Use component slot props for targeted overrides rather than global changes.

Example: override only mobile link hover background in the shared Navbar from a preset, leaving everything else token-based.

```tsx
// App Router install:
// app/templates/productlaunch/components/Navbar.tsx
//
// Pages Router install:
// components/templates/productlaunch/components/Navbar.tsx
mobileLinks: {
  className: "hover:bg-purple-50 dark:hover:bg-purple-900/20",
},
```

### 2) Override focus ring colors locally

Links in Navbar apply a token focus ring (`focus:ring-ring`). You can override it per preset by placing your ring utilities in `links.className` (these are merged last):

```tsx
// App Router install:
// app/templates/productlaunch/components/Navbar.tsx
//
// Pages Router install:
// components/templates/productlaunch/components/Navbar.tsx
links: {
  className:
    "text-sm font-medium font-inter text-gray-800 dark:text-white hover:text-purple-700 dark:hover:text-purple-500 " +
    "focus:ring-purple-500 dark:focus:ring-purple-400",
},
```

### 3) ThemeToggle with local styling

`ThemeToggle` accepts `buttonProps` that forward to the internal `Button`. For small tweaks, keep token variants and just add classes. For full control, use `unstyled: true` to bypass tokens:

```tsx
// App Router install:
// app/templates/productlaunch/components/Navbar.tsx
//
// Pages Router install:
// components/templates/productlaunch/components/Navbar.tsx
themeToggle: {
  buttonProps: {
    unstyled: true,
    className:
      "size-9 p-0 flex items-center justify-center rounded-md border border-gray-200 " +
      "bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-700 " +
      "dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-purple-900/20 " +
      "transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400",
  },
  moonClassName: "text-gray-700 dark:text-gray-100",
  sunClassName: "text-gray-700 dark:text-gray-100",
},
```

### 4) Unstyled escape hatch for primitives

Shared primitives like `Button` support an `unstyled` prop to bypass tokenized CVA classes and allow complete consumer control:

```tsx
// components/ui/button.tsx
<Button unstyled className="rounded-md bg-purple-600 px-3 py-2 text-white ...">
  Click me
</Button>
```

Use this when a section must not be influenced by the global Color Theme.

### 5) Navbar accent via CSS variables (recommended for presets)

Set a small set of CSS variables on the Navbar root in your preset, and internal elements (ThemeToggle, mobile links, focus rings) will read them automatically with fallbacks to tokens.

Suggested variables:

- `--navbar-accent`: icon/text accent color
- `--navbar-hover-bg`: hover background color for toggle and mobile links
- `--navbar-toggle-bg`: default background for the theme toggle button
- `--navbar-ring`: focus ring color
- `--navbar-border`: border color for theme toggle and similar controls

Example in a preset:

```tsx
// App Router install:
// app/templates/productlaunch/components/Navbar.tsx
//
// Pages Router install:
// components/templates/productlaunch/components/Navbar.tsx
nav: {
  className:
    "bg-white dark:bg-gray-900 text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-800 " +
    "[--navbar-accent:theme(colors.purple.600)] dark:[--navbar-accent:theme(colors.purple.400)] " +
    "[--navbar-hover-bg:theme(colors.purple.50)] dark:[--navbar-hover-bg:color-mix(in oklab,oklch(0.17 0.05 324) 20%, transparent)] " +
    "[--navbar-ring:theme(colors.purple.500)] dark:[--navbar-ring:theme(colors.purple.400)]",
},
```

After setting these, you generally don’t need to pass `themeToggle` overrides; the toggle and links will align to your preset accent automatically.

Notes:

- Consumer `className` is merged last, so your overrides win when conflicts exist.
- Always include `dark:` variants when you override hover/focus to maintain dark mode parity.
- Scope overrides narrowly (slots/elements) to avoid surprising global changes.
