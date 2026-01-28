# nextworks

## 90-second install demo (silent)

Fresh `create-next-app` + `npx nextworks add blocks --sections --templates`, plus a quick browser tour of the gallery + templates:

[![Nextworks install demo](https://img.youtube.com/vi/7YKmGFmFY5c/hqdefault.jpg)](https://www.youtube.com/watch?v=7YKmGFmFY5c)

Nextworks is a CLI that installs **modular Next.js building blocks** into your app:

- **Blocks** – UI sections, templates, and core UI primitives.

> **Status:** early‑access alpha. Expect rough edges and breaking changes between alpha releases.
>
> **Support matrix:**
>
> **CI-tested:**
>
> - OS: Windows, macOS, Linux
> - Node: 20.x and 22.x
> - Next.js (sandbox pin): 16.0.7 and 16.1.4 (via create-next-app in CI)
> - Router: App Router and Pages Router
> - Package managers: npm, pnpm, yarn
>
> Note: CI uses pinned Next.js versions for stability and security (see CVE-2025-66478 / RSC protocol advisory).
>
> In this alpha, the most reliable setup is:
>
> 1. Create a new Next.js project (App Router **or** Pages Router):
>
>    ```bash
>    npx create-next-app@latest
>    ```
>
> 2. From your app root, install **Blocks**:
>
>    ```bash
>    npx nextworks@latest add blocks --sections --templates
>    ```
>
>    pnpm / yarn equivalents:
>
>    ```bash
>    pnpm dlx nextworks@latest add blocks --sections --templates
>    yarn dlx nextworks@latest add blocks --sections --templates
>    ```
>
>    Non-interactive / CI-friendly:
>
>    ```bash
>    npx nextworks@latest add blocks --sections --templates --yes
>    ```
>
>    Force a specific package manager (overrides lockfile detection):
>
>    ```bash
>    npx nextworks@latest add blocks --sections --templates --pm pnpm
>    npx nextworks@latest add blocks --sections --templates --pm yarn
>    npx nextworks@latest add blocks --sections --templates --pm npm
>    ```
>
> 3. Optionally, adjust flags to install only what you want (UI-only, sections, templates).

---

## Known issues (alpha)

- **Existing files may be overwritten** if they collide with kit paths. Commit first.
- **Router entrypoint patching can conflict** with heavily customized `app/layout.tsx` or `pages/_app.tsx`.
- **Fonts/providers wiring:** Blocks configures fonts in your router entrypoint (not inside shared packages) for Turbopack compatibility. If you manually edit fonts/providers and see errors, re-run the Blocks install to re-apply the patch.

---

## Safety (read this first)

`nextworks` installs kits by copying files into your Next.js project. If a destination path already exists, kit installs may **overwrite** your files.

Before running installs, strongly consider:

- **Commit first**, then install:
  - `git add -A && git commit -m "baseline"`
- Review changes after install:
  - `git diff --name-status`
- To undo everything quickly:
  - `git reset --hard`
  - (optional) remove untracked files created by installs: `git clean -fd`

Kits may also:

- **merge dependencies** into `package.json`
- **edit your router entrypoint** (Blocks):
  - App Router: `app/layout.tsx`
  - Pages Router: `pages/_app.tsx` (and may create/update `pages/_document.tsx`)
- create/update `.nextworks/config.json`

For a transparent breakdown of what each kit writes/edits, see:

- https://github.com/jblh/nextworks-cli/blob/main/docs/FILE_CHANGES.md

---

## Feedback

Nextworks is early‑access alpha and I’m actively looking for feedback from early testers.

### Where to post feedback

- **Start here (installation + where to post feedback):** https://github.com/jblh/nextworks-cli/discussions/1
- **Alpha feedback thread (what broke / what’s missing):** https://github.com/jblh/nextworks-cli/discussions/2

If you’re reporting an install/runtime issue, please include OS, Node version, Next.js version, package manager, the exact command you ran, and the error output.

### Bug reports

For reproducible bugs / errors (especially install/runtime issues), please open a GitHub Issue using the templates in `.github/ISSUE_TEMPLATE/`.

### Private contact (optional)

If you need to share something privately (e.g. security-related), email: nextjsworks@gmail.com

---

## Install and run the CLI

From your Next.js app root, run the CLI with your preferred package manager:

```bash
npx nextworks@latest --help
pnpm dlx nextworks@latest --help
yarn dlx nextworks@latest --help
```

Example commands:

```bash
npx nextworks@latest add blocks --sections --templates
pnpm dlx nextworks@latest add blocks --sections --templates
yarn dlx nextworks@latest add blocks --sections --templates

npx nextworks@latest add blocks --sections --templates --yes  # non-interactive / CI

# Force a specific package manager (overrides lockfile detection)
npx nextworks@latest add blocks --sections --templates --pm pnpm
```

---

## Getting started in an existing Next.js app

Prerequisites:

- A Next.js project (App Router **or** Pages Router).
- TypeScript required.
- Tailwind CSS required (the Blocks kit and templates rely on Tailwind classes).

From your app root:

### 1) Install Blocks (UI kit)

Non-interactive / CI-friendly (auto-accept defaults where possible):

```bash
npx nextworks@latest add blocks --sections --templates --yes
```

> **Turbopack / Next 16 note (fonts + AppProviders)**
>
> Shared packages intentionally avoid importing `next/font/*`.
> Fonts are configured directly in your app’s router entrypoint (the CLI patches this for you):
>
> - App Router: `app/layout.tsx`
> - Pages Router: `pages/_app.tsx`
>   This avoids Turbopack dev issues related to internal Next font modules.
>
> If you ever see a font-related Turbopack error after upgrades or manual edits, re-run:
>
> ```bash
> npx nextworks@latest add blocks --sections --templates
> ```
>
> to re-apply the patch, and ensure your router entrypoint contains a valid
> `import { ... } from "next/font/google";` plus the corresponding `const geistSans = ...` etc.
>
> - App Router: `app/layout.tsx`
> - Pages Router: `pages/_app.tsx`

```bash
npx nextworks@latest add blocks --sections --templates
```

This copies:

- `components/ui/*` (core UI primitives)
- `components/sections/*` (reusable sections)
- Templates (router-native):
  - App Router projects: `app/templates/<template>/**`
  - Pages Router projects:
    - route entry file: `pages/templates/<template>/index.tsx`
    - supporting template files: `components/templates/<template>/**`
- Theme helpers and `app/globals.css` (if not already present)

After this step you should be able to start your dev server and visit:

- `/` (if wired as the home page), or
- `/templates/productlaunch`, `/templates/saasdashboard`, `/templates/digitalagency`

---

## Advanced Blocks installs

For a full UI kit including core primitives, sections, and templates, use:

```bash
npx nextworks@latest add blocks --sections --templates
```

Non-interactive / CI-friendly:

```bash
npx nextworks@latest add blocks --sections --templates --yes
```

If you want finer control:

- `npx nextworks@latest add blocks --ui-only` – install core UI primitives only (no sections/templates).
- `npx nextworks@latest add blocks --sections` – install core + sections only.
- `npx nextworks@latest add blocks --templates` – install core + templates only.
- `npx nextworks@latest add blocks --sections --templates` – install core + sections + templates.

---

## Copy‑paste quickstart for your app README

You can add a short “Nextworks setup” section to your app README:

```md
### Nextworks setup (Blocks)

1. Install and run the CLI from your Next.js app root:

   npx nextworks@latest add blocks --sections --templates

   # CI / non-interactive:

   npx nextworks@latest add blocks --sections --templates --yes

2. Start dev server:

   npm run dev

3. Try these routes:
   - `/templates/productlaunch`
   - `/templates/saasdashboard`
   - `/templates/digitalagency`
   - `/templates/gallery`

   Template files live at:
   - App Router: `app/templates/<template>/**`
   - Pages Router:
     - route entry file: `pages/templates/<template>/index.tsx`
     - supporting template files: `components/templates/<template>/**`
```

---

## License

The code in this CLI and the generated files is licensed under the MIT License (see `LICENSE`).

The placeholder images in the templates are sourced from Pexels and are
subject to the [Pexels License](https://www.pexels.com/license/).
They are included for demonstration purposes only and are **not** covered by
the MIT License.

---

## Troubleshooting

- **Type errors from imported components**

  Confirm your project is using TypeScript and that your TypeScript config picks up the new `components/` and `lib/` paths.
