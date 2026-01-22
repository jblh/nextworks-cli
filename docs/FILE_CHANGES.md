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
  - (optional) remove untracked files created by installs: `git clean -fd`

## Global behavior (blocks)

Regardless of blocks options:

- **Copies files into your repo**. If a file path already exists in your project, it may be **overwritten**.
- **Updates `package.json`** by **merging** `dependencies` / `devDependencies` (it does not replace your whole file).
- Creates/updates **`.nextworks/config.json`** to track installed kits.

> Notes on overwrites:
>
> - Kits are not isolated: a later kit may update files installed by an earlier kit (commonly under `components/**`, `lib/**`, and `app/**`).
> - During alpha, uninstall/remove is best-effort. The safest way to undo an install is reverting via git.
> - If you have important customizations under the same paths, commit first.

---

## Blocks (`nextworks add blocks`)

### Copies into (may overwrite)

- `components/ui/**` (UI primitives)
- `components/sections/**` (marketing sections)
- `components/**` (theme providers like `app-providers.tsx`)
- `lib/**` (e.g. `lib/utils.ts`, `lib/themes.ts`)
- `app/globals.css` and `app/tw-animate.css`
- Template pages (router-native):
  - App Router projects: `app/templates/**`
  - Pages Router projects: `pages/templates/**` (each template is a folder route with `index.tsx`)
- `public/placeholders/**` (template placeholder images)
- `next.config.ts`
- `.nextworks/docs/**` (kit docs)

### Edits in-place

Depending on whether you use the **App Router** or **Pages Router**, the CLI will patch a different file.

- **App Router:** **`app/layout.tsx`** (optional, but enabled by default and auto-applied when using `--yes`)
  - modifies your existing layout by inserting provider/toaster/font changes (it does not intentionally replace the entire file)
  - wraps the app with `AppProviders`
  - injects `AppToaster`
  - ensures `next/font/google` import and font instances exist
  - adds `suppressHydrationWarning` to `<html>`
  - updates `<body className>` to include font variables + `antialiased`

- **Pages Router:** **`pages/_app.tsx`** (optional, enabled by default and auto-applied when using `--yes`)
  - wraps `<Component {...pageProps} />` with `AppProviders`
  - injects `AppToaster`
  - ensures `next/font/google` import and font instances exist
  - ensures kit CSS is imported (adds `../app/globals.css` and `../app/tw-animate.css`)

- **Pages Router:** **`pages/_document.tsx`** (optional, enabled by default and auto-applied when using `--yes`)
  - adds `suppressHydrationWarning` to `<Html>`
  - if `pages/_document.tsx` does not exist, the CLI may create a minimal one

### Updates

- `package.json` (merges deps/devDeps)

### High-conflict files to watch

- `app/layout.tsx` (App Router)
- `pages/_app.tsx` (Pages Router)
- `pages/_document.tsx` (Pages Router)
- `app/globals.css`
- `next.config.ts`
- `lib/utils.ts`
- `components/ui/*`
