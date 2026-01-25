# Blocks kit

This folder is the **Blocks kit** installed by the Nextworks CLI. It’s copied into your Next.js project so you can edit everything locally (shadcn-style): components, sections, templates, and theme utilities.

If you’re reading this inside your app repo, you’ll also find companion docs at:

- `.nextworks/docs/BLOCKS_QUICKSTART.md` (start here)
- `.nextworks/docs/THEME_GUIDE.md`

---

## What this adds to your project

Depending on install flags, Blocks adds:

- **UI primitives** under `components/ui/**` (Button, Input, Card, Select, Checkbox, Switch, Toaster, etc.)
- **Reusable marketing sections** under `components/sections/**` (Navbar, Hero variants, Features, Pricing, Testimonials, FAQ, Contact, Footer, …)
- **Full page templates** under a router-native path (see below)
- **Theme + provider utilities** under `components/**` and `lib/**`
- **Global styles**: `app/globals.css` and `app/tw-animate.css`
- **Placeholder images** under `public/placeholders/**`

---

## Install commands / options

> ```bash
> npx nextworks@latest add blocks --sections --templates
> ```

Blocks supports these install shapes:

- `npx nextworks@latest add blocks --ui-only` → core UI primitives only
- `npx nextworks@latest add blocks --sections` → core + sections
- `npx nextworks@latest add blocks --templates` → core + templates
- `npx nextworks@latest add blocks --sections --templates` → core + sections + templates (recommended)

---

## After install: what to run

1. Install merged dependencies:

   ```bash
   npm install
   ```

2. Start dev:

   ```bash
   npm run dev
   ```

3. Visit template routes (when templates are installed):
   - `/templates/productlaunch`
   - `/templates/saasdashboard`
   - `/templates/digitalagency`
   - `/templates/gallery`

---

## Where templates live (App Router vs Pages Router)

Templates are installed in a router-native location:

- **App Router:**
  - `app/templates/<template>/page.tsx`
  - `app/templates/<template>/**`

- **Pages Router:**
  - route entry file: `pages/templates/<template>/index.tsx`
  - supporting template files: `components/templates/<template>/**` (kept outside `pages/` so helpers are not treated as routable pages)

---

## Required wiring (providers + CSS)

Blocks expects your app to be wrapped in the kit’s local `AppProviders`.

- **App Router:** patched in `app/layout.tsx`
- **Pages Router:** patched in `pages/_app.tsx` (and may create/update `pages/_document.tsx`)

The CLI normally patches this automatically.

Notes:

- Pages Router installs also ensure CSS imports exist in `pages/_app.tsx`:
  - `../app/globals.css`
  - `../app/tw-animate.css`
- The kit’s `components/app-providers.*` wrappers are **local kit providers** (they wrap the kit-local `BlocksAppProviders`) so providers/hooks resolve to the same React context instance under Turbopack/HMR.

---

## What to edit first

- Want to change the look/branding quickly? Start with:
  - `.nextworks/docs/THEME_GUIDE.md`
  - `lib/themes.ts`
  - each template’s `PresetThemeVars` file

- Want to customize a section (Navbar/Hero/etc.)?
  - edit files directly under `components/sections/**`

- Want to customize a template page?
  - edit the template route file (see paths above) and its local components.
