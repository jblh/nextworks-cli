# Server Action Example — Quickstart

This document describes the small server-action example included in the project and where to find it.

Location

- URL: /examples/forms/server-action
- Repo path: app/examples/forms/server-action/

What it demonstrates

- A simple server action (`createPost`) defined in a server component.
- Server-side validation using zod inside the server action.
- Direct database access from the server action using prisma.
- Redirection after successful server action.

Notes

- The example upserts a demo user (id: `__demo_author__`) so the demo can create a Post without requiring a sign-in step. In a real app you should resolve the signed-in user via NextAuth and use their id.
- The example intentionally keeps error handling simple (throws in case of validation errors). For structured field-level error mapping between server and client prefer the API-route + ApiResult pattern — see docs/API_ERROR_PATTERN.md for a short guide and example. More advanced options (cookies, shared state, or client-side validation) are possible but out of scope for the MVP.

How to run locally

1. Ensure DATABASE_URL is set in .env (copy from .env.example if needed).
2. Run Prisma setup:
   npx prisma generate
   npx prisma migrate dev -n init
3. Start dev server:
   npm run dev
4. Visit:
   http://localhost:3000/examples/forms/server-action

If you want the server action to run as the authenticated user, update the server action to read the NextAuth session (getServerSession(authOptions)) and use session.user.id as authorId.

See also: docs/API_ERROR_PATTERN.md — a short guide on returning structured field errors from API routes and mapping them into react-hook-form on the client.
