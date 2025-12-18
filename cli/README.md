# nextworks

Nextworks is a CLI that installs **modular Next.js building blocks** into your app:

- **Blocks** – UI sections, templates, and core UI primitives.
- **Auth Core** – Email/password auth (NextAuth + Prisma), basic dashboard, and helpers.
- **Forms** – Opinionated form primitives built on React Hook Form + Zod.
- **Data** – Example CRUD for Users + Posts with admin UI, wired to Auth + Prisma.

> **Status:** early‑access alpha. Expect rough edges and breaking changes between alpha releases.
>
> In this alpha, the most reliable setup is to install **Blocks** first using:
>
> ```bash
> npx nextworks add blocks --sections --templates
> ```
>
> and then add **Auth Core**, **Forms**, and **Data** on top. Partial setups (e.g. Auth/Data without Blocks) may require manual tweaks and are not yet fully supported.

---

## Feedback / Contact

Nextworks is early‑access alpha and I’m actively looking for feedback from early testers. If you run into issues, have questions, or want to suggest improvements or pro‑level features, I’m happy to help and would really appreciate hearing from you:

- Email: nextjsworks@gmail.com

---

## Install and run the CLI

From your Next.js app root, use `npx`:

```bash
npx nextworks --help
```

Example commands:

```bash
npx nextworks add blocks --sections --templates
npx nextworks add auth-core
npx nextworks add forms
npx nextworks add data
```

---

## Getting started in an existing Next.js app

Prerequisites:

- A Next.js App Router project (e.g. from `create-next-app`).
- TypeScript + Tailwind recommended.
- A **PostgreSQL database** if you plan to use **Auth Core** and **Data**.
  - The kits are designed and tested with Postgres using a database hosted on [Neon](https://neon.tech/).

From your app root:

### 1) Install Blocks (UI kit)

```bash
npx nextworks add blocks --sections --templates
```

This copies:

- `components/ui/*` (core UI primitives)
- `components/sections/*` (reusable sections)
- Page templates under `app/templates/*`
- Theme helpers and `app/globals.css` (if not already present)

After this step you should be able to start your dev server and visit:

- `/` (if wired as the home page), or
- `/templates/productlaunch`, `/templates/saasdashboard`, `/templates/digitalagency`

### 2) Add Auth Core

```bash
npx nextworks add auth-core
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

2. Install Prisma (if you haven’t already):

   ```bash
   npm install @prisma/client prisma
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

Visit:

- `/auth/signup`
- `/auth/login`
- `/dashboard` (protected)

### 3) Add Forms (optional)

```bash
npx nextworks add forms
```

This adds form primitives and example pages:

- `/examples/forms/basic`
- `/examples/forms/server-action`
- `/examples/forms/wizard`

### 4) Add Data (optional, requires Auth Core)

```bash
npx nextworks add data
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
npx nextworks add blocks --sections --templates
```

If you want finer control:

- `npx nextworks add blocks --ui-only` – install core UI primitives only (no sections/templates).
- `npx nextworks add blocks --sections` – install core + sections only.
- `npx nextworks add blocks --templates` – install core + templates only.
- `npx nextworks add blocks --sections --templates` – install core + sections + templates.

---

## Copy‑paste quickstart for your app README

You can add a short “Nextworks setup” section to your app README:

```md
### Nextworks setup (Blocks + Auth + optional Forms/Data)

1. Install and run the CLI from your Next.js app root:

   npx nextworks add blocks --sections --templates
   npx nextworks add auth-core

2. Copy environment variables:

   cp .env.example .env

   Set DATABASE_URL, NEXTAUTH_URL, NEXTAUTH_SECRET (and any OAuth or email provider vars you need).

3. Install Prisma (if not present) and run migrations:

   npm install @prisma/client prisma
   npx prisma generate
   npx prisma migrate dev -n init

4. (Optional) Add Forms and Data kits:

   npx nextworks add forms
   npx nextworks add data
   npx prisma generate
   npx prisma migrate dev -n init_data

5. Start dev server:

   npm run dev

6. Try these routes:
   - `/` or `/templates/productlaunch` (Blocks template)
   - `/auth/signup`, `/auth/login`, `/dashboard` (Auth)
   - `/examples/forms/basic` (if you ran `npx nextworks add forms`)
   - `/admin/posts`, `/admin/users` (if you ran `npx nextworks add data`)
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

- **Auth routes 404**

  Make sure you ran:

  ```bash
  npx nextworks add auth-core
  ```

  from your app root, and restart your dev server.

- **Type errors from imported components**

  Confirm your project is using TypeScript and that your TypeScript config picks up the new `components/` and `lib/` paths.
