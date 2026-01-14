# Changelog

All notable changes to this project will be documented in this file.

This project is currently **early-access alpha**; expect breaking changes.

## Unreleased

- Internal metadata updates (copyright notice). No functional change.

- Fix: `@nextworks/blocks-core/server` now correctly type-exports `AppProviders` as a **named export** (matching runtime), so `import { AppProviders } from "@nextworks/blocks-core/server";` typechecks in Next.js production builds (Vercel/Turbopack).

- Turbopack-safe refactor for Blocks theme/font bootstrapping:
  - `@nextworks/blocks-core/server` `AppProviders` no longer imports `next/font/*`.
  - Fonts are configured in the consuming app’s `app/layout.tsx` (the CLI patches this).
  - Server-side theme CSS variables are injected based on cookies.
- CLI layout patcher hardening:
  - Merges existing `next/font/google` imports instead of duplicating them.
  - Handles semicolon-less and multi-line import styles.
  - Ensures font instances exist for Geist + Outfit + Inter + Poppins.
- Acceptance testing:
  - Added a Turbopack canary check for `/templates/gallery`.
