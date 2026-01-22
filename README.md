# nextworks

**nextworks** is a CLI that installs the Nextworks **Blocks kit** (core UI, sections, and page templates) into your Next.js project.

This repository contains the source for the **nextworks** CLI and its MIT-licensed core building blocks.

## Links

- **Blocks kit live demo (nextworks-demo):** https://nextworks-demo.vercel.app/
- **Demo source (nextworks-demo repo):** https://github.com/jblh/nextworks-demo
- **npm (CLI):** https://www.npmjs.com/package/nextworks

> Status: **alpha**  
> See the [GitHub Releases](https://github.com/jblh/nextworks-cli/releases) page for notes on each release.
>
> Install / try it (alpha quickstart):
>
> ```bash
> npx create-next-app@latest
> cd <your-app>
> npx nextworks@latest add blocks --sections --templates
> ```
>
> For the canonical CLI README (install steps, kits, and troubleshooting), see:
> https://github.com/jblh/nextworks-cli/tree/main/cli
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

- `cli/` – the CLI that powers `npx nextworks@latest ...` and the install commands for Blocks.
- `cli/kits/` – the code that nextworks installs into your Next.js app (Blocks kit).
- `cli_manifests/` – manifests that describe what the CLI installs.

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

## Safety (read this first)

`nextworks` installs kits by copying files into your Next.js project. If a destination path already exists, kit installs may **overwrite** your files.

Before running installs, strongly consider:

- **Commit first**, then install:
  - `git add -A && git commit -m "baseline"`
- Review changes after install:
  - `git diff --name-status`
- To undo everything quickly:
  - `git reset --hard`
  - (optional) remove untracked files created by installs: `git clean -fd`

If you’ve customized any of these paths, expect manual merge work:

- `app/layout.tsx` (App Router)
- `pages/_app.tsx` and `pages/_document.tsx` (Pages Router)
- `lib/utils.ts`
- `components/ui/**`

Kits may also:

- **merge dependencies** into `package.json`
- **edit your router entrypoint** (Blocks)
  - App Router: `app/layout.tsx`
  - Pages Router: `pages/_app.tsx` (and may create/update `pages/_document.tsx`)
- create/update `.nextworks/config.json`

For a transparent breakdown of what each kit writes/edits, see:

- `docs/FILE_CHANGES.md`

## Getting started

Install / try it (alpha quickstart):

```bash
npx create-next-app@latest
cd <your-app>
# Nextworks assumes TypeScript + Tailwind CSS (required for Blocks/templates)
npx nextworks@latest add blocks --sections --templates
```

Templates are installed in a router-native location:

- App Router:
  - `app/templates/<template>/page.tsx`
  - supporting template files live alongside it: `app/templates/<template>/**`
- Pages Router:
  - route entry file: `pages/templates/<template>/index.tsx`
  - supporting template files: `components/templates/<template>/**` (installed outside `pages/` so Next doesn’t treat helpers as routable pages)

See `docs/QUICKSTART.md` and the Blocks quickstarts/guides in `docs/` for more detail.

## Feedback & issues

During alpha, the most useful feedback is:

1. Install failures or environment incompatibilities (Next.js/Node/package manager).
2. Broken generated code or runtime errors after running `nextworks` commands.
3. Confusing or missing documentation / CLI output.

### Where to post feedback

- **Alpha testers — Start here (installation + where to post feedback):** https://github.com/jblh/nextworks-cli/discussions/1
- **Alpha feedback thread (what broke / what’s missing):** https://github.com/jblh/nextworks-cli/discussions/2

### Bug reports

For reproducible bugs / errors (especially install/runtime issues), please open a GitHub Issue using the templates in `.github/ISSUE_TEMPLATE/`.

## Branding

"nextworks" is the name of this project.

You're very welcome to say that your project "uses nextworks" or "is built with nextworks". Please just avoid:

- presenting your project as if it were the official nextworks project, or
- using the name or any future logos in a way that suggests official endorsement or affiliation.
