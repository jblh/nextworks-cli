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
> npx nextworks@latest add blocks --sections --templates
> ```
>
> Or manually ensure:
> - you have a valid `import { ... } from "next/font/google";`
> - font instances exist for every `${font.variable}` referenced in your `<body className=...>`

## Quickstart (Blocks-only)

In a fresh Next.js App Router project:

```bash
npx create-next-app@latest
cd <your-app>

# Nextworks assumes TypeScript + Tailwind CSS (required for Blocks/templates)
npx nextworks@latest add blocks --sections --templates

npm install
npm run dev
```

Try these routes:

- `/templates/productlaunch`
- `/templates/saasdashboard`
- `/templates/digitalagency`
- `/templates/gallery`

For more details on what gets installed/edited, see:
- `docs/BLOCKS_QUICKSTART.md`
- `docs/FILE_CHANGES.md`
