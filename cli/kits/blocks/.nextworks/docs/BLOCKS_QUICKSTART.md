# Blocks Quickstart

This document explains the Blocks kit: prebuilt UI sections, templates and core UI primitives included in this repository. The Blocks kit is intended to be a non-invasive copyable kit (shadCN-style) you can install into any Next.js project (App Router **or** Pages Router) with TypeScript + Tailwind.

> **Alpha note**
> Other kits (Auth Core, Forms, Data) are currently tested and supported on top of a default Blocks install.
> For the smoothest experience, install **Blocks first** in your app before adding other kits.

> If you are using the `nextworks` CLI in your own app, you can install this Blocks kit by running:
>
> ```bash
> npx nextworks@latest add blocks --sections --templates
> ```
>
> This installs **core UI primitives, sections, and page templates**, so the example templates work out of the box.

The CLI will copy files into your project under `components/`, `lib/`, and `public/`. Template pages are installed in a router-native location:

- **App Router projects:** `app/templates/<template>/**`
- **Pages Router projects:**
  - route entry file: `pages/templates/<template>/index.tsx`
  - supporting template files: `components/templates/<template>/**` (installed outside `pages/` so Next doesn’t treat helpers as routable pages)

What’s included

- Page templates (composed from sections):
  - `/templates/productlaunch`
  - `/templates/saasdashboard`
  - `/templates/digitalagency`
  - `/templates/gallery`
- Reusable UI sections: components/sections/\* (Navbar, Hero, Features, Pricing, Testimonials, FAQ, Contact, Footer, etc.)
- Core UI primitives: components/ui/\* (Button, Input, Card, Select, Checkbox, Switch, Theme toggle/selector, Form primitives)
- Theme helpers and presets: components/PresetThemeVars in each template and lib/themes.ts
- Global styles: app/globals.css and optional theme variables in each template's PresetThemeVars file
- Sample placeholder assets: public/placeholders/\*

Where to look

- Templates:
  - App Router:
    - page: `app/templates/<template>/page.tsx`
    - supporting files: `app/templates/<template>/**`
  - Pages Router:
    - page: `pages/templates/<template>/index.tsx`
    - supporting files: `components/templates/<template>/**`
- Sections:
  - components/sections/\*.tsx
- UI primitives and form building blocks:
  - components/ui/button.tsx
  - components/ui/input.tsx
  - components/ui/label.tsx
  - components/ui/card.tsx
  - components/ui/textarea.tsx
  - components/ui/select.tsx
  - components/ui/checkbox.tsx
  - components/ui/switch.tsx
  - components/ui/form/\* (Form, FormField, FormItem, FormControl, FormLabel, FormMessage, FormDescription)
- Theme and providers:
  - components/theme-provider.tsx
  - components/enhanced-theme-provider.tsx
  - lib/themes.ts

Minimal steps to render a template locally

1. Install dependencies and run the dev server:

   npm install
   npm run dev

2. Open the productlaunch template in your browser:

   http://localhost:3000/templates/productlaunch

3. The templates use global styles (`app/globals.css`). No environment variables are required for Blocks-only usage.
   - App Router: `app/layout.tsx` imports `./globals.css`.
   - Pages Router: the CLI patches `pages/_app.tsx` to import `../app/globals.css` and `../app/tw-animate.css` so styling matches the templates.

How to adopt / override template pieces

- Slots & component overrides
  - Each template composes small sections from components/sections/\*.tsx. To override a section, copy the desired section file into your project (or replace the import) and update props or classNames.
  - Example: to override the Navbar, copy components/sections/Navbar.tsx into your app and update the markup or styles. The template imports Navbar from the components directory.

- Styling and utility classes
  - Tailwind is used across components. Prefer adding or modifying Tailwind utility classes on the exported component or pass className props (many components accept className).

- Theme variables and PresetThemeVars
  - Each template has a PresetThemeVars component/file that injects CSS variables for theme presets:
    - App Router install: `app/templates/<template>/PresetThemeVars.tsx`
    - Pages Router install: `components/templates/<template>/PresetThemeVars.tsx`
  - To change default palette or add presets, edit the template PresetThemeVars and lib/themes.ts.
  - Theme providers are implemented in components/theme-provider.tsx and components/enhanced-theme-provider.tsx — wrap your app with these if you extract blocks into another project.

Import examples

- Import a primitive in your code:

  import Button from "@/components/ui/button";
  import { Form, FormField } from "@/components/ui/form/form"; // path depends on your project alias

- Use a section in a page:

  import Navbar from "@/components/sections/Navbar";

  export default function Page() {
  return (
  <>
  <Navbar />
  <main>{/_ ... _/}</main>
  </>
  );
  }

Public assets and placeholders

- The templates reference placeholder images in public/placeholders/. If you copy templates to another project, copy the referenced assets (public/placeholders/gallery/\*) or replace with your own images.

Simple Blocks kit manifest (for internal CLI packaging)
