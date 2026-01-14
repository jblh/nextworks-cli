# Acceptance Checklist — Nextworks Early Access

This is a minimal checklist for reviewers/early-testers to quickly validate the key flows.

Environment

- Ensure you have a PostgreSQL database and DATABASE_URL set in .env copied from .env.example
- Run:
  - npx prisma generate
  - npx prisma migrate dev -n init
- Start dev server: npm run dev

Quick sanity checks

0. Turbopack canary (Blocks theme + fonts):
   - Start dev server with Turbopack (default in Next 16): `npm run dev`
   - Visit: http://localhost:3000/templates/gallery
   - Expect:
     - No Turbopack font/module parse errors
     - ThemeSelector renders and switching variants updates the UI
     - Theme tokens (e.g. `--primary`) are present in computed styles

1. Home renders:
   - Visit: http://localhost:3000/
2. Auth:
   - Visit: http://localhost:3000/auth/signup
   - Create a new user via the signup form. Expect: success message and redirect to login page.
   - Visit: http://localhost:3000/auth/login and sign in.
   - After login, verify you can access protected routes like /dashboard. Note: /admin/\* pages require an admin user (session.user.role === 'admin'). To make an admin user for testing, update the user via Prisma or seeds, e.g.:

npx prisma studio

# OR run a quick script/seeder that sets role = 'admin'

Quick SQL example (run with prisma db executeRaw):

npx prisma db executeRaw "UPDATE \"User\" SET role = 'admin' WHERE email = 'you@example.com';"

Alternatively open Prisma Studio (npx prisma studio) and set role = 'admin' on the user record. Or run npx prisma migrate dev (if needed) and update the user role in the database.

Forms & Examples

3. Forms primitives example:
   - Visit: http://localhost:3000/examples/forms/basic
   - Confirm Input, Select, Checkbox, Switch render and behave as expected.

4. Server-action example:
   - Visit: http://localhost:3000/examples/forms/server-action
   - Submit the server-action form (title required). Expect: redirect and "Post created successfully" message. The example creates/upserts a demo user to satisfy FK constraints.

Acceptance demo (end-to-end)

5. Acceptance demo:
   - Visit: http://localhost:3000/examples/demo
   - If not signed in:
     - Use the Sign up link to create a user at /auth/signup.
     - Log in at /auth/login.
   - Return to /examples/demo and use the Create Post form to create a post.
   - Confirm the API returns success and the toast "Post created" appears.
   - Optionally verify the post exists in the DB (select from "Post").

APIs

6. API consistency:
   - All app/api routes used by the examples should return a structured ApiResult shape with success/data/message/errors/code fields. Examples to spot-check:
     - /api/signup
     - /api/users
     - /api/users/check-email
     - /api/posts

Notes for reviewers

- If you hit issues due to missing environment variables, ensure .env is populated from .env.example and Prisma was migrated.
- CLI-related files are not used for the runtime experience; ignore cli/ folder for now.

If anything fails for you, file a minimal bug report with steps to reproduce and I will prioritize fixes. Thanks!
