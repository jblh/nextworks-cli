Forms kit (cli/kits/forms)

This folder contains the files that the `nextworks` CLI copies into a target Next.js project when you run:

```bash
npx nextworks add forms
```

What the kit includes

- Form primitives built on React Hook Form + Zod: components/ui/form/\*
- Select / Checkbox / Switch primitives wired for form usage
- Shared validation schemas: lib/validation/forms.ts and lib/validation/wizard.ts
- Form error mapping helper: lib/forms/map-errors.ts
- Example pages:
  - Basic form: app/examples/forms/basic/page.tsx
  - Server action form: app/examples/forms/server-action/page.tsx and form-client.tsx
  - Wizard example: app/examples/forms/wizard/page.tsx and wizard-client.tsx
- Wizard API route: app/api/wizard/route.ts

Notes

- The forms primitives are UI-only and do not require Prisma or NextAuth.
- The Forms kit does **not** ship a Prisma schema; if you use the server-action or wizard examples against a real database, you must add a `prisma/schema.prisma` in your app and run `npx prisma generate` and `npx prisma migrate dev`.
- The wizard example assumes a basic app/api/wizard/route.ts endpoint; adjust it as needed for your project.
- Keep this kit folder in sync with cli_manifests/forms_manifest.json.

> **Alpha note**
>
> In this early alpha, Forms is tested on top of a **Blocks** install that includes sections and templates. For the smoothest experience, install Blocks first:
>
> ```bash
> npx nextworks add blocks --sections --templates
> npx nextworks add forms
> ```
>
> Using Forms without Blocks may work but can require manual tweaks (for example around shared UI primitives).

Post-install steps (recommended)

1. Install dependencies (the CLI will merge `package-deps.json` into your `package.json`):

   ```bash
   npm install
   ```

2. Ensure you have React Hook Form and Zod installed (if not already present). The CLI will attempt to add these via `package-deps.json`.

3. Start your dev server and explore the examples:

   ```bash
   npm run dev
   ```

   - /examples/forms/basic
   - /examples/forms/server-action
   - /examples/forms/wizard

CLI behavior (for maintainers)

- In the Nextworks repo, the CLI copies the files listed in `cli/cli_manifests/forms_manifest.json`. Keep that manifest and this kit folder in sync when editing the repo.
