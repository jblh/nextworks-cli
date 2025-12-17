Auth core kit (cli/kits/auth-core)

This folder contains the files that the `nextworks` CLI copies into a target Next.js project when you run:

```bash
npx nextworks add auth-core
```

> **Alpha note**
>
> In this early alpha, the Auth Core kit is tested and supported on top of a **Blocks** install that includes sections and templates. For the smoothest experience, run:
>
> ```bash
> npx nextworks add blocks --sections --templates
> npx nextworks add auth-core
> ```
>
> before wiring up Prisma and env variables. Using Auth Core without Blocks may work but can require manual tweaks.

What the kit includes

- NextAuth configuration and handler: lib/auth.ts
- Prisma client helper: lib/prisma.ts
- Validation schemas: lib/validation/forms.ts
- ApiResult helpers: lib/server/result.ts
- Email helpers for dev and SMTP: lib/email/\*
- Signup API: app/api/signup/route.ts
- NextAuth API: app/api/auth/[...nextauth]/route.ts
- Login/Signup UI components: components/auth/\*
- SessionProvider and RequireAuth utilities
- Prisma snippet: prisma/auth-models.prisma

Database requirements

- The auth kit is designed and tested with **PostgreSQL** (for example using a managed service like [Neon](https://neon.tech/), Supabase, Railway, or a self‑hosted Postgres instance).
- Any Prisma‑supported provider _may_ work, but **Postgres is the recommended and tested path**.

Quick start with Postgres (recommended):

1. Create a Postgres database (for example on Neon).
2. Copy the connection string into your `.env` as:

   ```bash
   DATABASE_URL="postgres://..."
   ```

3. Merge the Prisma models from `prisma/auth-models.prisma` into your project's `prisma/schema.prisma`.
4. Run:

   ```bash
   npx prisma generate
   npx prisma migrate dev -n init_auth
   ```

If you choose a different database provider, update the `provider` field in your Prisma schema and carefully review indexes/constraints before running migrations.

Environment variables

The kit relies on the following environment variables. Document these in post-install output or in your project's README:

Required (for core auth):

- DATABASE_URL
- NEXTAUTH_URL (e.g. http://localhost:3000)
- NEXTAUTH_SECRET

Optional / password reset & email:

- NEXTWORKS_ENABLE_PASSWORD_RESET=1 (enable password reset scaffold)
- NEXTWORKS_USE_DEV_EMAIL=1 (enable Ethereal dev email transport)
- SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, NOREPLY_EMAIL (when using real SMTP provider)
- GITHUB_ID, GITHUB_SECRET (optional) — the GitHub provider is enabled only when both are present
- NODE_ENV

Post-install steps (recommended)

1. Install dependencies copied by the kit (the CLI will merge `package-deps.json` into your `package.json`). Ensure `nodemailer` is installed if you will enable dev email:

   ```bash
   npm install
   ```

2. Copy or merge `prisma/auth-models.prisma` into your Prisma schema (`prisma/schema.prisma`) and run:

   ```bash
   npx prisma generate
   npx prisma migrate dev -n init
   ```

3. (Optional) Seed demo data for testing:

   ```bash
   SEED_ADMIN_EMAIL=admin@example.com SEED_ADMIN_PASSWORD=password123 node ./scripts/seed-demo.mjs
   ```

4. Start your dev server:

   ```bash
   npm run dev
   ```

5. Verify the basic flows:

- Signup: /auth/signup
- Login: /auth/login
- Protected dashboard: /dashboard (requires sign in)
- If enabled, forgot password POST to /api/auth/forgot-password and reset flows at /api/auth/reset-password

Notes & security

- Password reset is intentionally opt-in. Do not enable NEXTWORKS_ENABLE_PASSWORD_RESET in production unless you have configured a real mail provider and replaced the in-memory rate limiter.
- NEXTWORKS_USE_DEV_EMAIL=1 uses Ethereal (nodemailer) and prints a preview URL to server logs for development testing.
- Email verification on signup is **not yet implemented**. Stub endpoints and UI are in place at `/api/auth/send-verify-email` and `/auth/verify-email`. The Prisma `VerificationToken` model is already included so a future implementation can be added as a non-breaking enhancement.

CLI behavior (for maintainers)

- In the Nextworks repo, the CLI copies the files listed in `cli/cli_manifests/auth_manifest.json`. Keep that manifest and this kit folder in sync when editing the repo.
