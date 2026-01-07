# What nextworks changes in your project

This document is a **safety + transparency reference**: it describes what the `nextworks` CLI typically **writes, overwrites, or edits** in your Next.js project when installing kits.

If you’re installing into anything other than a fresh project, you should assume there may be conflicts.

## Safety / revertability

- **Commit before running** (recommended):
  - `git init` (if needed)
  - `git add -A && git commit -m "baseline"`
- After installing a kit, review changes:
  - `git diff --name-status`
- To undo everything quickly in a git repo:
  - `git reset --hard`

## Global behavior (all kits)

Regardless of kit:

- **Copies files into your repo**. If a file path already exists in your project, it may be **overwritten**.
- **Updates `package.json`** by **merging** `dependencies` / `devDependencies` (it does not replace your whole file).
- Creates/updates **`.nextworks/config.json`** to track installed kits.

> Notes on overwrites:
> - Overwrite behavior is kit-dependent, but you should treat kit installs as **potential overwrites**.
> - If you have important customizations under the same paths, commit first.

---

## Kit: Blocks (`nextworks add blocks`)

### Copies into (may overwrite)

- `components/ui/**` (UI primitives)
- `components/sections/**` (marketing sections)
- `components/**` (theme providers like `app-providers.tsx`)
- `lib/**` (e.g. `lib/utils.ts`, `lib/themes.ts`)
- `app/globals.css` and `app/tw-animate.css`
- `app/templates/**` (template pages)
- `public/placeholders/**` (template placeholder images)
- `next.config.ts`
- `.nextworks/docs/**` (kit docs)

### Edits in-place

- **`app/layout.tsx`** (optional, but enabled by default and auto-applied when using `--yes`)
  - wraps the app with `AppProviders`
  - injects `AppToaster`
  - ensures `next/font/google` import and font instances exist
  - adds `suppressHydrationWarning` to `<html>`
  - updates `<body className>` to include font variables + `antialiased`

### Updates

- `package.json` (merges deps/devDeps)

### High-conflict files to watch

- `app/layout.tsx`
- `app/globals.css`
- `next.config.ts`
- `lib/utils.ts`
- `components/ui/*`

---

## Kit: Forms (`nextworks add forms`)

### Copies into (may overwrite)

- `components/ui/form/**` (React Hook Form primitives)
- `components/ui/**` (select/checkbox/switch/input/textarea/label/button)
- `components/hooks/**`
- `components/examples/**`
- `app/examples/forms/**`
- `app/api/wizard/**` (example route)
- `lib/validation/**`
- `lib/forms/**`
- `lib/utils.ts`
- `lib/prisma.ts` (helper)
- `.nextworks/docs/**`

### Edits in-place

- None

### Updates

- `package.json` (merges deps/devDeps)

### High-conflict files to watch

- `components/ui/*`
- `lib/utils.ts`
- `lib/validation/*`

---

## Kit: Auth Core (`nextworks add auth-core`)

### Also installs automatically

- **Forms** (if it is not already installed)

### Copies into (may overwrite)

- `app/auth/**` (auth pages)
- `app/api/auth/**` (NextAuth route + auth endpoints)
- `app/api/signup/**`
- `app/api/users/**`
- `app/(protected)/**` (protected layout + dashboard/admin/settings pages)
- `components/auth/**`
- `components/admin/**`
- `components/ui/**` (basic input/label/button)
- `lib/**` (auth helpers, prisma, email providers, server result helpers, validation)
- `prisma/**` (schema + auth models)
- `scripts/**` (dev/seed/admin scripts)
- `types/**` (NextAuth type augmentation)
- `.nextworks/docs/**`

### Edits in-place

- **`app/layout.tsx`** (always)
  - adds `AppSessionProvider` import
  - wraps `<body>` content with `<AppSessionProvider>`

### Updates

- `package.json` (merges deps/devDeps)

### High-conflict files to watch

- `app/layout.tsx`
- `prisma/schema.prisma`
- `lib/auth.ts`, `lib/prisma.ts`, `lib/server/result.ts`
- `app/api/auth/*`

---

## Kit: Data (`nextworks add data`)

### Also installs automatically

- **Forms** (if missing)
- **Auth Core** (if missing)

### Copies into (may overwrite)

- `app/api/posts/**`
- `app/api/users/**` (CRUD + helper endpoints)
- `app/api/seed-demo/**`
- `app/(protected)/admin/**`
- `components/admin/**`
- `app/examples/demo/**`
- `lib/prisma.ts`
- `lib/server/result.ts`
- `lib/utils.ts`
- `scripts/seed-demo.mjs`
- `.nextworks/docs/**`

### Edits in-place

- None

### Updates

- `package.json` (merges deps/devDeps)

### High-conflict files to watch

- `app/api/users/*`
- `lib/server/result.ts`
- `lib/prisma.ts`

