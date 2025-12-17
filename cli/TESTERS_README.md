> [!NOTE]
> This document describes an earlier tarball‑based distribution used for internal testing.
> For public npm usage (`npm install nextworks` / `npx nextworks`), see `README.md`.

# nextworks — Early access (testers only)

Thanks for helping test nextworks! This is an early access / pre-release build. Please treat it as alpha software:

- Expect rough edges and breaking changes.
- Report issues to: (where you want them reported).

Important: pre-release notes

- This release is a built CLI only (no source).
- Use --ignore-scripts when installing to avoid postinstall/native-binding hangs.
- If you need a private, time-limited install link, ask the author — do not publish it publicly.

## One‑line installer (GitHub Releases)

Copy-paste the following (PowerShell or Bash). Replace <owner> and <release-repo> with the repository that hosts the Release, and v0.1.0 with the release tag if different.

PowerShell:

npm install -D "https://github.com/<owner>/<release-repo>/releases/download/v0.1.0/nextworks-0.1.0.tgz" --legacy-peer-deps --ignore-scripts

Bash:

npm install -D "https://github.com/<owner>/<release-repo>/releases/download/v0.1.0/nextworks-0.1.0.tgz" --legacy-peer-deps --ignore-scripts

## Local install (if you download the .tgz first)

After downloading nextworks-0.1.0.tgz to your project folder:

npm install -D ./nextworks-0.1.0.tgz --legacy-peer-deps --ignore-scripts

## Quick smoke tests

npx nextworks --version
npx nextworks add blocks

## Run the CLI without installing

You can also run the built CLI from the shipped files (useful if you don't install):

node cli/dist/index.js --version
node cli/dist/index.js add blocks

If you used the GitHub installer URL, npx should pick up the package automatically.

## Common troubleshooting

- Install hangs on native bindings or lifecycle scripts:
  - Re-run install with --ignore-scripts (as above) to skip postinstall actions.
- Missing runtime dependency errors after install:
  - npm install graceful-fs universalify --save
- If npm complains about peer conflicts:
  - Add --legacy-peer-deps to the npm command (examples above already include it).
- If something behaves oddly, run the CLI directly from the repo (see "Run the CLI without installing").

## Verifying the artifact (for advanced testers)

You can inspect the tarball before installing:

# show top-level entries

tar -tf nextworks-0.1.0.tgz | sed -n '1,60p'

# show the package.json that will be used when installed

tar -xOf nextworks-0.1.0.tgz package/package.json

## What this release contains

- This tarball is a CLI-only package and contains the built artifacts under dist/. It does NOT contain the full repository source.
- The CLI is configured to use dist/index.js as the entry point and includes runtime-friendly copies of the kits and assets.

## How to report bugs / feedback

- Please include:
  - OS, node version, npm/yarn/pnpm version
  - Exact command you ran
  - Error output or a short screencap
  - Steps to reproduce

Thank you!
