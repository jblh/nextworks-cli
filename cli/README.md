# nextworks

Nextworks is a CLI that installs **modular Next.js building blocks** into your app:

- **Blocks** – UI sections, templates, and core UI primitives.
- **Auth Core** – Email/password auth (NextAuth + Prisma), basic dashboard, and helpers.
- **Forms** – Opinionated form primitives built on React Hook Form + Zod.
- **Data** – Example CRUD for Users + Posts with admin UI, wired to Auth + Prisma.

> **Status:** early‑access alpha. Expect rough edges and breaking changes between alpha releases.
>
> **Package manager:** npm only (for now).
>
> In this alpha, the most reliable setup is:
>
> 1. Create a new Next.js App Router project:
>
>    ```bash
>    npx create-next-app@latest
>    ```
>
> 2. From your app root, install **Blocks** first:
>
>    ```bash
>    npx nextworks@latest add blocks --sections --templates
>    ```
>
>    Non-interactive / CI-friendly:
>
>    ```bash
>    npx nextworks@latest add blocks --sections --templates --yes
>    ```
>
> 3. Then add **Auth Core**, **Forms**, and **Data** on top.
>
> Partial setups (e.g. Auth/Data without Blocks) may require manual tweaks and are not yet fully supported.

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
- **edit `app/layout.tsx`** (Blocks and Auth Core)
- create/update `.nextworks/config.json`

For a transparent breakdown of what each kit writes/edits, see:
- https://github.com/jblh/nextworks-cli/blob/main/docs/FILE_CHANGES.md

---

## Feedback

Nextworks is early‑access alpha and I’m actively looking for feedback from early testers.

### Where to post feedback

- **Start here (installation + where to post feedback):** https://github.com/jblh/nextworks-cli/discussions/1
- **Alpha feedback thread (what broke / what’s missing):** https://github.com/jblh/nextworks-cli/discussions/2

### Bug reports

For reproducible bugs / errors (especially install/runtime issues), please open a GitHub Issue using the templates in `.github/ISSUE_TEMPLATE/`.

### Private contact (optional)

If you need to share something privately (e.g. security-related), email: nextjsworks@gmail.com

---

## Install and run the CLI

From your Next.js app root, use `npx`:

```bash
npx nextworks@latest --help
```

Example commands:

```bash
npx nextworks@latest add blocks --sections --templates
npx nextworks@latest add blocks --sections --templates --yes  # non-interactive / CI
npx nextworks@latest add auth-core
npx nextworks@latest add forms
npx nextworks@latest add data
```

---

## Getting started in an existing Next.js app

Prerequisites:

- A Next.js App Router project (e.g. from `create-next-app`).
- TypeScript required.
- Tailwind CSS required (the Blocks kit and templates rely on Tailwind classes).
- A **PostgreSQL database** if you plan to use **Auth Core** and **Data**.
  - The kits are designed and tested with Postgres using a database hosted on [Neon](https://neon.tech/).

From your app root:

### 1) Install Blocks (UI kit)

Non-interactive / CI-friendly (auto-accept defaults where possible):

```bash
npx nextworks@latest add blocks --sections --templates --yes
```

> **Turbopack / Next 16 note (fonts + AppProviders)**
>
> As of the current alpha, `@nextworks/blocks-core/server` intentionally **does not** import `next/font/*`.
> Fonts are instead configured directly in your app’s `app/layout.tsx` (the CLI patches this for you).
> This avoids Turbopack dev issues related to internal Next font modules.
>
> If you ever see a font-related Turbopack error after upgrades or manual edits, re-run:
>
> ```bash
> npx nextworks@latest add blocks --sections --templates
> ```
>
> to re-apply the layout patch, and ensure `app/layout.tsx` contains a valid
> `import { ... } from "next/font/google";` plus the corresponding `const geistSans = ...` etc.

```bash
npx nextworks@latest add blocks --sections --templates
```

This copies:

- `components/ui/*` (core UI primitives)
- `components/sections/*` (reusable sections)
- Page templates under `app/templates/*`
- Theme helpers and `app/globals.css` (if not already present)

After this step you should be able to start your dev server and visit:

- `/` (if wired as the home page), or
- `/templates/productlaunch`, `/templates/saasdashboard`, `/templates/digitalagency`

> **Prisma requirement for Auth Core, Data, and Prisma-based examples**
>
> If you install **Auth Core**, **Data**, or copy any **Forms** examples that use Prisma (e.g. server-action or wizard demos), you **must**:
>
> - Configure a PostgreSQL `DATABASE_URL` in your app `.env` / `.env.local`.
> - Merge the kit Prisma models into your `prisma/schema.prisma` as directed.
> - Run:
>   - `npx prisma generate`
>   - `npx prisma migrate dev -n init` (and any subsequent migrations)
>
> Do this **before** running `npm run build` or `npm run dev`. Skipping these steps will usually result in build/runtime errors because the generated Prisma client, tables, or types are missing.

### 2) Add Auth Core

```bash
npx nextworks@latest add auth-core
```

Then:

1. Copy and edit your environment variables:

   ```bash
   cp .env.example .env
   ```

   Set at minimum:

   ```bash
   DATABASE_URL=postgres://...
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-strong-secret
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run Prisma:

   ```bash
   npx prisma generate
   npx prisma migrate dev -n init
   ```

Start your dev server:

```bash
npm run dev
```

> **Windows + Prisma + Next 16 (Turbopack) note**
>
> If you are on **Windows** and have installed the **Auth Core** or **Data** kits (which use Prisma under the hood) on **Next 16+**, the Next dev server may need permission to create symlinks for the Prisma client. On Windows, this can cause errors like:
>
> `create symlink to ../../../../node_modules/@prisma/client`
>
> `Caused by: A required privilege is not held by the client. (os error 1314)`
>
> If you see this (often surfaced as a 500 on `/api/auth/session` or a NextAuth `CLIENT_FETCH_ERROR`), do one of the following:
> - **Recommended**: Enable **Developer Mode** in Windows (Settings → For developers → Developer mode). This allows symlinks in normal terminals.
> - Or: Run your dev server from an **elevated PowerShell/terminal** ("Run as administrator").
>
> After doing one of these, restart `npm run dev` and reload your app.

Visit:

- `/auth/signup`
- `/auth/login`
- `/dashboard` (protected)

### 3) Add Forms (optional)

```bash
npx nextworks@latest add forms
```

This adds form primitives and example pages:

- `/examples/forms/basic`
- `/examples/forms/server-action`
- `/examples/forms/wizard`

### 4) Add Data (optional, requires Auth Core)

```bash
npx nextworks@latest add data
```

Make sure your Prisma migrations are up to date:

```bash
npx prisma generate
npx prisma migrate dev
```

Then visit:

- `/admin/posts`
- `/admin/users`

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
### Nextworks setup (Blocks + Auth + optional Forms/Data)

1. Install and run the CLI from your Next.js app root:

   npx nextworks@latest add blocks --sections --templates
   # CI / non-interactive:
   npx nextworks@latest add blocks --sections --templates --yes
   npx nextworks@latest add auth-core

2. Copy environment variables:

   cp .env.example .env

   Set DATABASE_URL, NEXTAUTH_URL, NEXTAUTH_SECRET (and any OAuth or email provider vars you need).

3. Install dependencies and run migrations:

   npm install
   npx prisma generate
   npx prisma migrate dev -n init

4. (Optional) Add Forms and Data kits:

   npx nextworks@latest add forms
   npx nextworks@latest add data
   npx prisma generate
   npx prisma migrate dev -n init_data

5. Start dev server:

   npm run dev

6. Try these routes:
   - `/` or `/templates/productlaunch` (Blocks template)
   - `/auth/signup`, `/auth/login`, `/dashboard` (Auth)
   - `/examples/forms/basic` (if you ran `npx nextworks@latest add forms`)
   - `/admin/posts`, `/admin/users` (if you ran `npx nextworks@latest add data`)
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

- **Prisma errors or missing migrations**

  Ensure you’ve run:

  ```bash
  npx prisma generate
  npx prisma migrate dev
  ```

  and that `DATABASE_URL` in `.env` points to a reachable PostgreSQL instance.

  If you see build errors in `lib/prisma.ts` or Prisma types during `npm run build`, you almost certainly still need to run `npx prisma generate` and `npx prisma migrate dev`.

- **Auth routes 404**

  Make sure you ran:

  ```bash
  npx nextworks@latest add auth-core
  ```

  from your app root, and restart your dev server.

- **Type errors from imported components**

  Confirm your project is using TypeScript and that your TypeScript config picks up the new `components/` and `lib/` paths.
