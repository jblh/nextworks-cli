# nextworks — Data kit quickstart

This document explains how to use the Data (crud) kit in the nextworks starter project.

Prerequisites

- A running PostgreSQL database and `DATABASE_URL` set in `.env`.
- Auth kit installed and configured (NextAuth + Prisma). The Data kit relies on NextAuth session for access control.
  - In the monorepo, this is already wired up.
  - In your own app via the CLI, run:

    ```bash
    npx nextworks add auth-core
    npx nextworks add data
    ```

    then follow the Prisma and `.env` steps below.

- Forms kit (optional but recommended) for form primitives.

Setup

1. Install dependencies and generate Prisma client:

   npm install
   npx prisma generate

2. Run migrations (creates User/Post tables):

   npx prisma migrate dev

3. Seed a demo admin user and posts locally (optional):

   # Set env vars or use defaults

   SEED_ADMIN_EMAIL=admin@example.com SEED_ADMIN_PASSWORD=password123 node ./scripts/seed-demo.mjs

4. Run the dev server:

   npm run dev

Usage & testing

- Sign in at /auth/login using the seeded admin credentials (admin@example.com / password123).
- Visit /admin/posts to create/edit/delete posts. The UI supports pagination, search (title contains), and sort by createdAt.
- Visit /admin/users to view users (admin-only).

Notes

- Server-side RBAC: all modifying APIs (POST/PUT/DELETE) require a valid session, and user-level checks ensure only authors or admins can modify posts. The users list API requires admin access.
- Published flag: posts have a `published` boolean in Prisma. The admin UI exposes the published checkbox when creating or editing posts.

Troubleshooting

- If users list returns 403, ensure your signed-in user has role = 'admin'. You can promote a user with Prisma Studio or by running:

  npx prisma db executeRaw "UPDATE \"User\" SET role = 'admin' WHERE email = 'admin@example.com';"

- If migrations fail, try:

  npx prisma migrate reset

Files & kit manifest

If you plan to package a Data kit, here are the primary files, API routes and components used by the Data example flows. This manifest is intended to help packaging and documentation — adjust paths if you extract the kit into another project.

Files

- app/api/posts/route.ts
- app/api/posts/[id]/route.ts
- app/api/users/route.ts
- app/api/users/[id]/route.ts
- app/api/users/check-unique/route.ts
- app/api/users/check-email/route.ts
- app/api/seed-demo/route.ts
- app/api/signup/route.ts
- components/admin/admin-header.tsx
- components/admin/posts-manager.tsx
- components/admin/users-manager.tsx
- app/(protected)/admin/users/page.tsx
- app/(protected)/admin/posts/page.tsx
- app/examples/demo/create-post-form.tsx
- app/examples/demo/page.tsx
- lib/prisma.ts
- lib/server/result.ts
- lib/utils.ts
- lib/validation/forms.ts
- scripts/seed-demo.mjs

API routes (list)

- /api/posts (GET/POST) -> app/api/posts/route.ts
- /api/posts/:id (GET/PUT/DELETE) -> app/api/posts/[id]/route.ts
- /api/users (GET/POST) -> app/api/users/route.ts
- /api/users/:id (GET/PUT/DELETE) -> app/api/users/[id]/route.ts
- /api/users/check-unique -> app/api/users/check-unique/route.ts
- /api/users/check-email -> app/api/users/check-email/route.ts
- /api/seed-demo -> app/api/seed-demo/route.ts
- /api/signup -> app/api/signup/route.ts

Notes

- The Data kit relies on NextAuth sessions for access control — see lib/auth-helpers.ts and lib/auth.ts for server-side helpers and RBAC checks.
- The API routes return ApiResult envelope objects (see lib/server/result.ts) and the client uses lib/forms/map-errors.ts to map server validation errors into react-hook-form where appropriate.

Feedback

- File issues in the repo; note that CLI packaging for the Data kit is not yet implemented — this quickstart is for the repository as-is.
