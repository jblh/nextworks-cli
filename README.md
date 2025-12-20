# nextworks

This repository contains the source for the **nextworks** CLI and its MIT-licensed core building blocks.

> Current alpha: `0.1.0-alpha.11`  
> See the [GitHub Releases](https://github.com/jblh/nextworks-cli/releases) page for notes on each alpha.  
> Install from npm with:
>
> ```bash
> npm install \
>   nextworks@0.1.0-alpha.11 \
>   @nextworks/blocks-core@0.1.0-alpha.11 \
>   @nextworks/blocks-sections@0.1.0-alpha.11 \
>   @nextworks/blocks-templates@0.1.0-alpha.11
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

To use the CLI in a Next.js app (from npm):

```bash
npx nextworks add blocks --sections --templates
# then, optionally
npx nextworks add auth-core
npx nextworks add forms
npx nextworks add data
```

See `docs/QUICKSTART.md` and the module-specific quickstarts in `docs/` for more detail.

## Feedback & issues

During alpha, the most useful feedback is:

1. Install failures or environment incompatibilities (Next.js/Node/package manager).
2. Broken generated code or runtime errors after running `nextworks` commands.
3. Confusing or missing documentation / CLI output.

Please open issues using the templates in `.github/ISSUE_TEMPLATE/`.

## Branding

"nextworks" is the name of this project.

You're very welcome to say that your project "uses nextworks" or "is built with nextworks". Please just avoid:

- presenting your project as if it were the official nextworks project, or
- using the name or any future logos in a way that suggests official endorsement or affiliation.
