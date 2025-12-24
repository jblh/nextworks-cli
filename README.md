# nextworks

**nextworks** is a CLI that installs Nextworks kits into your Next.js project — including the Blocks kit (core, sections, templates) and optional Auth Core, Forms, and Data (CRUD) kits.

This repository contains the source for the **nextworks** CLI and its MIT-licensed core building blocks.

## Links

- **Blocks kit live demo (nextworks-demo):** https://nextworks-demo.vercel.app/
- **Demo source (nextworks-demo repo):** https://github.com/jblh/nextworks-demo
- **npm (CLI):** https://www.npmjs.com/package/nextworks

> Status: **alpha**  
> See the [GitHub Releases](https://github.com/jblh/nextworks-cli/releases) page for notes on each release.
>
> Install from npm (recommended):
>
> ```bash
> npm install nextworks@latest
> ```
>
> If you want/need to install the underlying packages directly, prefer `@latest` to avoid stale pins:
>
> ```bash
> npm install \
>   nextworks@latest \
>   @nextworks/blocks-core@latest \
>   @nextworks/blocks-sections@latest \
>   @nextworks/blocks-templates@latest
> ```

- `cli/` – the CLI that powers `npx nextworks ...` and the install commands for Blocks, Auth Core, Forms, and Data.
- `cli/kits/` – the code that nextworks installs into your Next.js app (blocks, auth, forms, data examples, docs).
- `cli_manifests/` – manifests that describe what each CLI command installs.
- `packages/blocks-*` – reusable UI/component packages used by the kits.
- `docs/` – quickstarts and guides.

## Status: Early-access alpha

`nextworks` is currently in **early-access alpha**. Expect rough edges and occasional breaking changes.

**Best for:** experimenting in new or non-critical projects and giving feedback.

**Not recommended yet for:** production apps with strict stability requirements.

## Compatibility (alpha)

As of the current alpha, `nextworks` has been developed and tested primarily with:

- **Next.js**: 16.0.3, 16.1.0
- **Dev mode**: Turbopack (default in Next 16) and Webpack

Other 16.x versions will likely work; older versions are **best effort**. If you hit an issue, please include your Next.js version, Node version, package manager, OS, and relevant logs when reporting it.

## Getting started

Install from npm (recommended):

```bash
npm install nextworks@latest
```

To use the CLI in a Next.js app (from npm):

```bash
npx nextworks add blocks --sections --templates
# then, optionally
npx nextworks add auth-core
npx nextworks add forms
npx nextworks add data
```

> **Prisma requirement for Auth Core, Data, and Prisma-based examples**
>
> If you install **Auth Core**, **Data**, or copy any **Forms** examples that use Prisma (e.g. server-action or wizard demos), you **must**:
>
> - Configure a PostgreSQL `DATABASE_URL` in your app `.env` / `.env.local`.
> - Merge the kit Prisma models into your `prisma/schema.prisma` as directed.
> - Run:
>   - `npx prisma generate`
>   - `npx prisma migrate dev -n init` (and any subsequent migrations)
>
> Do this **before** running `npm run build` or `npm run dev`. Skipping these steps will usually result in build/runtime errors because the generated Prisma client, tables, or types are missing.

See `docs/QUICKSTART.md` and the module-specific quickstarts in `docs/` for more detail.


## Feedback & issues

During alpha, the most useful feedback is:

1. Install failures or environment incompatibilities (Next.js/Node/package manager).
2. Broken generated code or runtime errors after running `nextworks` commands.
3. Confusing or missing documentation / CLI output.

### Where to post feedback

- **Start here (how to give feedback):** https://github.com/jblh/nextworks-cli/discussions/1
- **Alpha feedback thread (what broke / what’s missing):** https://github.com/jblh/nextworks-cli/discussions/2

### Bug reports

For reproducible bugs / errors (especially install/runtime issues), please open a GitHub Issue using the templates in `.github/ISSUE_TEMPLATE/`.

### Common Prisma build errors

If you see build errors in `lib/prisma.ts` or Prisma types during `npm run build`, you almost certainly still need to:

- Set a valid `DATABASE_URL` in your app `.env` / `.env.local`, and
- Run:
  - `npx prisma generate`
  - `npx prisma migrate dev` (or `npx prisma migrate dev -n init` in a fresh app).



## Branding

"nextworks" is the name of this project.

You're very welcome to say that your project "uses nextworks" or "is built with nextworks". Please just avoid:

- presenting your project as if it were the official nextworks project, or
- using the name or any future logos in a way that suggests official endorsement or affiliation.
