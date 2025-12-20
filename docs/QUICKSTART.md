# Quickstart — One‑command / Minimal setup (Nextworks)

This snippet is an easy, copy‑paste quickstart you can add to your README or run locally. It helps you get up and running quickly in a fresh Next.js App Router project using the `nextworks` CLI.

For more details on the CLI and available kits, see `cli/README.md`.

> **Next 16 / Turbopack note**
>
> In current alphas, Nextworks configures Google fonts in your app’s `app/layout.tsx` (patched by the CLI).
> This is intentional: it keeps `@nextworks/blocks-core/server` Turbopack-safe by avoiding `next/font/*` imports.
>
> **Troubleshooting:** If `app/layout.tsx` gets into a bad state (e.g. a broken `next/font/google` import), rerun:
>
> ```bash
> npx nextworks add blocks --sections --templates
> ```
>
> Or manually ensure:
> - you have a valid `import { ... } from "next/font/google";`
> - font instances exist for every `${font.variable}` referenced in your `<body className=...>`

Note: The script below is interactive and safe — it will prompt before doing the Auth + Prisma steps.

Create a file named setup-nextworks.sh, paste the content, make it executable, then run it.

```bash
# docs/setup-nextworks.sh
#!/usr/bin/env bash
set -euo pipefail

echo "⟶ Installing Blocks kit (UI sections + templates)"
npx nextworks add blocks --sections --templates

read -p "⟶ Do you want to add Auth kit now? (recommended for Data testing) [y/N] " ADD_AUTH
if [[ "${ADD_AUTH,,}" =~ ^y ]]; then
  echo "⟶ Installing Auth Core kit..."
  npx nextworks add auth-core

  echo "⟶ Copying .env.example to .env (edit DB and NEXTAUTH secrets as needed)"
  cp .env.example .env || true

  echo "⟶ Run the following Prisma steps next:"
  echo "   npm install @prisma/client prisma"
  echo "   npx prisma generate"
  echo "   npx prisma migrate dev -n init"
fi

echo "⟶ Optional: Install Forms kit? (provides form primitives and wizard example)"
read -p "Install Forms kit? [y/N] " ADD_FORMS
if [[ "${ADD_FORMS,,}" =~ ^y ]]; then
  npx nextworks add forms
fi

echo "Done. Next steps:"
echo "- If you added Auth: run 'npx prisma generate' and 'npx prisma migrate dev -n init', then start your dev server."
echo "- Try routes: / (productlaunch template), /auth/signup, /auth/login, /examples/forms/basic (if forms added), /admin/posts (if data added).
- Forms quickstart & docs: docs/FORMS_QUICKSTART.md — visit /examples/forms/basic for a working Controller example."
echo ""
echo "Open a browser and try signup/login and create a post (if applicable)."
```

Paste a short README section (example):

```md
## Nextworks setup (Blocks + Auth + optional Forms/Data)

1. Run the setup script from your app root:
   bash docs/setup-nextworks.sh
2. If you installed Auth Core, initialize Prisma:
   npm install @prisma/client prisma
   npx prisma generate
   npx prisma migrate dev -n init
3. (Optional) Add Forms and Data kits:
   npx nextworks add forms
   npx nextworks add data
   npx prisma generate
   npx prisma migrate dev -n init_data
4. Start dev server:
   pnpm dev # or `npm run dev` / `yarn dev`
5. Try:
   - Blocks templates: `/` or `/templates/productlaunch`
   - Auth: `/auth/signup`, `/auth/login`, `/dashboard`
   - Examples: `/examples/forms/basic` (if Forms kit installed)
   - Admin: `/admin/posts`, `/admin/users` (if Data kit installed)
```
