# Changelog

All notable changes to this project will be documented in this file.

This project is currently **early-access alpha**; expect breaking changes.

## v0.2.0-alpha.19 - 2026-05-29

- Added the **AI Workflow** template at `/templates/aiworkflow`.
  - The current shipped story is an **AI coding agent**.
  - The template is intended to be reusable for other AI workflow stories as more variants are added.

- Doctor project sanity diagnostics add blocking errors when:
  - `package.json` is missing
  - `next` is missing from `dependencies`/`devDependencies`
  - no supported App Router or Pages Router entrypoint is found

- `nextworks doctor` outputs JSON, including `warnings` and `errors`.

- Blocks install defaults/flags:
  - `nextworks add blocks` installs **core + sections** by default.
  - `--templates` includes `sections` (so `--sections --templates` is redundant but still supported).

- Pages Router templates install fix:
  - Only the template route entry file is installed under `pages/` (`pages/templates/<template>/index.tsx`).
  - Supporting template files are installed under `components/templates/<template>/**`.

- Fix: `@nextworks/blocks-core/server` correctly type-exports `AppProviders` as a **named export**.
- Turbopack-safe refactor for Blocks theme/font bootstrapping:
  - `@nextworks/blocks-core/server` `AppProviders` no longer imports `next/font/*`.
  - Fonts are configured in the consuming app router entrypoint.
  - Server-side theme CSS variables are injected based on cookies.

- CLI layout patcher hardening:
  - Merges existing `next/font/google` imports instead of duplicating them.
  - Handles semicolon-less and multi-line import styles.
  - Ensures font instances exist for Geist + Outfit + Inter + Poppins.

- Acceptance testing:
  - Added a Turbopack canary check for `/templates/gallery`.
