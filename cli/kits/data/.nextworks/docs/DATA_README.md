Data kit (cli/kits/data)

This kit provides a standalone example Data layer with Posts + Users CRUD: API routes, admin UI, Prisma helpers and a seed script. The kit is designed to be installed via the `nextworks` CLI:

```bash
npx nextworks add data
```

and is packaged with its own kit dependencies metadata.

> **Alpha note**
>
> In this early alpha, the Data kit is tested and supported on top of **Blocks** (with sections + templates), **Auth Core**, and **Forms**. For the smoothest experience, run:
>
> ```bash
> npx nextworks add blocks --sections --templates
> npx nextworks add auth-core
> npx nextworks add forms
> npx nextworks add data
> ```
>
> Using Data without Blocks/Auth/Forms may work but is not yet a supported path and can require manual Prisma/schema and UI tweaks.

What the kit includes

- API routes:
  - app/api/posts/route.ts
  - app/api/posts/[id]/route.ts
  - app/api/users/route.ts
  - app/api/users/[id]/route.ts
  - app/api/users/check-unique/route.ts
  - app/api/users/check-email/route.ts
  - app/api/seed-demo/route.ts
- Admin UI components (now standalone in the kit):
  - components/admin/posts-manager.tsx
  - components/admin/users-manager.tsx
- Protected admin pages:
  - app/(protected)/admin/posts/page.tsx
  - app/(protected)/admin/users/page.tsx
- Example/demo pages and helpers:
  - app/examples/demo/create-post-form.tsx
  - app/examples/demo/page.tsx
  - app/examples/demo/README.md
- Prisma helpers and utilities:
  - lib/prisma.ts
  - lib/server/result.ts (ApiResult helpers)
  - lib/utils.ts
- Seed script: scripts/seed-demo.mjs
- Kit metadata: package-deps.json (declares @prisma/client and zod; prisma is a devDependency)

Database requirements

- The data kit is designed and tested with **PostgreSQL**, using a Postgres database hosted on [Neon](https://neon.tech/) during development.
- Any Prisma‑supported provider _may_ work, but **Postgres is the recommended and currently tested path**.

Quick start with Postgres (recommended):

1. Create a Postgres database (for example on Neon).
2. Copy the connection string into your `.env` as:

   ```bash
   DATABASE_URL="postgres://..."
   ```

3. Merge the Data/Auth Prisma models into your project's `prisma/schema.prisma` (see `prisma/auth-models.prisma` referenced by the manifest).
4. Run:

   ```bash
   npx prisma generate
   npx prisma migrate dev -n init_data
   ```

If you choose a different database provider, update the `provider` field in your Prisma schema and carefully review indexes/constraints before running migrations.

Notes and important behavior

- Kit dependencies:
  - Data requires Prisma (this kit is Prisma-coupled by design) and depends on Auth (for RBAC/session) and Forms (for form primitives/validation).
  - The CLI currently auto-installs `auth-core` and `forms` when you run `nextworks add data` to ensure the required pieces are present. If you prefer an interactive prompt instead of auto-install, the CLI can be adjusted to prompt (ask the maintainers).
  - The kit's package-deps.json lists runtime and dev dependencies that the CLI will merge into the project's package.json; after installation you must run npm install in the project.

- Standalone admin components:
  - The admin UI components have been copied into the kit so the Data kit is self-contained. They may still import shared UI primitives (for example from a Blocks or shared ui package) — ensure the consumer project has those UI packages or the CLI installs the required kits.

- Auth overlap:
  - The Data kit references the signup API route (app/api/signup/route.ts) in its manifest but does not duplicate the signup implementation — signup is provided by the Auth kit.

- Prisma schema & migrations:
  - The kit manifest references prisma/schema.prisma, prisma/migrations/\* and prisma/auth-models.prisma snippets, but the kit does not ship a full migrations directory. You must merge the provided model snippets into your project's prisma/schema.prisma, then run:
    1. npx prisma generate
    2. npx prisma migrate dev

Post-install checklist

1. Run `npm install` in your project to install dependencies merged by the kit.
2. Merge the Data/Auth Prisma models into your project's `prisma/schema.prisma` (see `prisma/auth-models.prisma` referenced by the manifest) and run:
   - `npx prisma generate`
   - `npx prisma migrate dev`
3. Populate demo data if desired:
   - Either run the kit seed script locally: `node scripts/seed-demo.mjs`
   - Or call the included API seed endpoint (POST to `/api/seed-demo`) if you prefer an HTTP-driven seed.

CLI behavior and packaging (for maintainers)

- Command: the CLI exposes the command `nextworks add data` which copies the files listed in `cli/cli_manifests/data_manifest.json` into your project and merges `package-deps.json` entries.
- Auto-install: when running the command the CLI ensures Forms and Auth are installed first (auto-installs them if missing).
- Manifest: keep cli_manifests/data_manifest.json and the files in this kit folder in sync — the CLI uses the manifest to know which files to copy.
- Packaging: the kit includes package-deps.json and is included in the CLI distribution tarball (dist/kits/data). When the CLI package is built/packed it will include the standalone Data kit files.

Caveats & tips

- The kit is intended as example/demo code — consumers should review and adapt for production use (security, RBAC rules, validation, etc.).
- If you want the CLI to prompt before installing Auth/Forms instead of auto-installing, open an issue or request the interactive behavior; it can be added.
- If you want a timestamped or additional tarball build, the CLI packing step can be re-run to produce another artifact.

CLI manifest

- In the Nextworks repo, the CLI copies files listed in `cli/cli_manifests/data_manifest.json`. Keep that manifest and this kit folder in sync when editing the repo.
