# Auth Quickstart

Follow these steps to get email/password auth (and optional GitHub OAuth) running in under 5 minutes.

If you are using the `nextworks` CLI in your own app, the recommended alpha setup is to install Blocks with sections and templates first, then Auth Core:

```bash
npx nextworks add blocks --sections --templates
npx nextworks add auth-core
```

Then follow the steps below inside your app.

## 1) Copy environment variables

Create a `.env` file based on `.env.example`:

```
cp .env.example .env
```

Fill in values for the following environment variables used by the Auth kit:

- DATABASE_URL — PostgreSQL connection string
- NEXTAUTH_URL — URL of your app (e.g. http://localhost:3000 in dev)
- NEXTAUTH_SECRET — a strong random string (used to sign NextAuth tokens)

Optional / password reset / email provider vars:

- GITHUB_ID — (optional) GitHub OAuth client id
- GITHUB_SECRET — (optional) GitHub OAuth client secret
- NEXTWORKS_ENABLE_PASSWORD_RESET — set to `1` to enable the dev password reset scaffold (default: disabled)
- NEXTWORKS_USE_DEV_EMAIL — set to `1` to enable Ethereal dev email transport (for local testing only)
- SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, NOREPLY_EMAIL — when using a real SMTP provider (required in production if enable password reset)
- NODE_ENV — (production/dev) used to guard password-reset behavior

Notes:

- The Auth kit will only enable the GitHub provider when both GITHUB_ID and GITHUB_SECRET are present.
- Password reset remains disabled by default; enable cautiously and only after configuring a real mail provider in production.

## 2) Install and generate Prisma

If you are using the monorepo directly:

```bash
npm install
npx prisma generate
npx prisma migrate dev -n init
```

If you installed Auth via the CLI (`npx nextworks add auth-core`), the schema and scripts are already in place in your app — you still need to run:

```bash
npm install @prisma/client prisma
npx prisma generate
npx prisma migrate dev -n init
```

This applies the Prisma schema and generates the Prisma client.

## 3) Start the dev server

```
npm run dev
```

Visit:

- http://localhost:3000/auth/signup to create a user
- http://localhost:3000/auth/login to sign in
- http://localhost:3000/dashboard after login

## 4) Optional: GitHub OAuth

If you provided GITHUB_ID and GITHUB_SECRET in `.env`, the GitHub provider will be enabled and the GitHub button will appear on the forms. If not provided, the button will be hidden and only email/password is available.

## 5) Roles (optional)

The `User` model has a `role` field (default: `user`). Role is propagated to the JWT and session so you can gate pages/components. You can later add admin tooling or seed scripts as needed.

## 6) Seed and promote admin scripts

- `scripts/seed-demo.mjs` (already in the repo) creates a demo admin user and sample posts for quick demos.
- `scripts/promote-admin.mjs` (new) is idempotent and promotes an existing user to `admin`:

```
node ./scripts/promote-admin.mjs admin@example.com
```

## 7) Forgot password (development scaffold)

This is a development scaffold that is disabled by default. To enable the password reset feature, set:

```
NEXTWORKS_ENABLE_PASSWORD_RESET=1
```

- POST `/api/auth/forgot-password` accepts `{ email }`. When enabled the endpoint generates a one-time token stored in the database and (in development) prints a reset link to the server console. The endpoint always returns a generic success message to avoid user enumeration.
- GET `/api/auth/reset-password?token=...` validates a token (only when enabled).
- POST `/api/auth/reset-password` accepts `{ token, password, confirmPassword }` and updates the user password while invalidating the token (only when enabled).

Security notes:

- The scaffold is intentionally disabled by default; enable it only for local testing or after hardening.
- The forgot-password scaffold uses an in-memory rate limiter for demo purposes — replace it with a centralized rate limiter (Redis, API gateway) in production.
- Always use a real email provider (SMTP, SendGrid, etc.) in production and never log reset tokens in server logs.

Migration & upgrade notes

- A recent schema migration changed PasswordReset to store tokenHash (SHA-256) instead of the raw token. Steps we executed:
  1. Added `tokenHash` (nullable) to the PasswordReset model and made `token` nullable in Prisma.
  2. Generated a migration that adds the tokenHash column and a unique index on it.
  3. Ran a one-off script `scripts/populate-tokenhash.mjs` to compute SHA-256 hashes for previous tokens and fill `tokenHash`.
  4. Applied the migration and regenerated the Prisma client (`npx prisma generate`).

- To enable password reset behavior in your environment, set:

```
NEXTWORKS_ENABLE_PASSWORD_RESET=1
```

- Dev email helper (optional): there is an optional dev email helper (nodemailer + Ethereal) that can be enabled with `NEXTWORKS_USE_DEV_EMAIL=1`. When enabled (and NEXTWORKS_ENABLE_PASSWORD_RESET=1), forgot-password will send an Ethereal email and the server will log only the Ethereal preview URL (no plaintext token in logs). This helper is strictly opt-in for development only. Use a real email provider in production.

- Production hardening: Password reset should only be enabled in production when a mail provider is configured. To harden the scaffold in production, ensure the following environment variables are set for SMTP (or equivalent for other providers):

```
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user@example.com
SMTP_PASS=supersecret
NOREPLY_EMAIL=no-reply@example.com
NEXTWORKS_ENABLE_PASSWORD_RESET=1
```

When NEXTWORKS_ENABLE_PASSWORD_RESET=1 and NODE_ENV=production the server will refuse to enable password reset unless a mail provider is configured. The server will not log reset tokens or URLs in production logs.

Security checklist before enabling reset in production:

- Set a strong NEXTAUTH_SECRET
- Use HTTPS/TLS
- Replace in-memory rate limiting with a centralized store (Redis/API Gateway)
- Configure and test a real mail provider (SMTP, SendGrid, etc.)
- Ensure password reset tokens are expired/cleaned up periodically
- Review logging to avoid token leakage

- Promotion script: to promote an existing user to admin, run:

```
node ./scripts/promote-admin.mjs user@example.com
```

- Important: Before turning password reset on in production, ensure you:
  - Replace the in-memory rate limiter with a centralized solution (Redis or API Gateway).
  - Configure a real email provider and remove console logging of tokens.
  - Ensure tokens are cleaned up periodically (see scripts/prune-password-resets.mjs stub).
  - Set a secure NEXTAUTH_SECRET and use HTTPS in production.

## Files & kit manifest (what to look at)

If you want to inspect or package the Auth kit, the primary files and routes are listed below. This is a minimal manifest intended for documentation and CLI packaging reference — adjust paths if you extract the kit into another project.

Key files

- NextAuth handler & callbacks: lib/auth.ts
- Prisma client: lib/prisma.ts
- Auth helper utilities: lib/auth-helpers.ts, lib/hash.ts
- Email providers: lib/email/index.ts, lib/email/dev-transport.ts, lib/email/provider-smtp.ts
- Validation helpers: lib/validation/forms.ts
- Form error mapping: lib/forms/map-errors.ts
- UI components used by Auth: components/auth/_ and components/ui/_ (login-form.tsx, signup-form.tsx, button/input/label etc.)
- Pages & API routes:
  - app/auth/login/page.tsx
  - app/auth/signup/page.tsx
  - app/auth/forgot-password/page.tsx
  - app/auth/reset-password/page.tsx
  - app/auth/verify-email/page.tsx
  - app/api/auth/[...nextauth]/route.ts
  - app/api/auth/forgot-password/route.ts
  - app/api/auth/reset-password/route.ts
  - app/api/auth/send-verify-email/route.ts
  - app/api/auth/providers/route.ts
  - app/api/signup/route.ts
- Prisma schema & auth models: prisma/schema.prisma and prisma/auth-models.prisma
- Seed & maintenance scripts: scripts/seed-demo.mjs, scripts/promote-admin.mjs, scripts/populate-tokenhash.mjs

Minimal manifest (JSON)

{
"name": "auth-core",
"files": [
"lib/auth.ts",
"lib/prisma.ts",
"lib/auth-helpers.ts",
"lib/hash.ts",
"lib/forms/map-errors.ts",
"lib/validation/forms.ts",
"lib/email/index.ts",
"components/auth/login-form.tsx",
"components/auth/signup-form.tsx",
"components/auth/logout-button.tsx",
"components/session-provider.tsx",
"app/auth/login/page.tsx",
"app/auth/signup/page.tsx",
"app/api/auth/[...nextauth]/route.ts",
"app/api/signup/route.ts",
"prisma/schema.prisma",
"scripts/seed-demo.mjs",
"scripts/promote-admin.mjs"
]
}

## Where to customize NextAuth behavior

- The NextAuth configuration and handlers live in lib/auth.ts. Common customizations include:
  - Adjusting providers (add/remove OAuth providers).
  - Modifying session and jwt callbacks to include or remove fields on the token/session.
  - Customizing pages (e.g., pages.signIn) or redirect logic.

- Notes: lib/auth.ts already persists user.id and role into the JWT and exposes them on session.user for server components. If you change what is exposed on the session, ensure server-side checks (RBAC) are updated accordingly.

## CLI kit source (if packaging later)

- A kit skeleton for packaging already exists in the repo at: `cli/kits/auth-core/` — it contains a compact copy of the core auth files (components, lib, prisma snippets) used by the CLI during development. Use that folder as a starting point when you implement the CLI packaging step.

## Post-install checklist (Auth)

1. Copy `.env.example` → `.env` and set DATABASE_URL, NEXTAUTH_URL, NEXTAUTH_SECRET (and GITHUB_ID/GITHUB_SECRET if using GitHub OAuth).
2. Generate Prisma client and run migrations:

   npx prisma generate
   npx prisma migrate dev -n init

3. (Optional) Seed demo data for quick testing:

   SEED_ADMIN_EMAIL=admin@example.com SEED_ADMIN_PASSWORD=password123 node ./scripts/seed-demo.mjs

4. Start dev server:

   npm run dev

5. Visit: `/auth/signup`, `/auth/login` and `/dashboard` for protected pages.

If you want, I can also create a short docs/AUTH_MANIFEST.json file containing the JSON manifest above in the repo (useful for CLI packaging). I will not create CLI code or copy files unless you ask.
