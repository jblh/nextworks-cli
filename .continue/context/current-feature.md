# Current Feature

## Status

Not Started

## Goals

## Notes

## Release / Docs Checks

- `npm run build`

## History

<!-- Keep this updated. Add date. Earliest to latest -->
<!-- ADD THIS TO THE BOTTOM OF THE HISTORY LIST -->

- 2026 04 16 - Doctor Project Sanity Spec — Added blocking doctor diagnostics for missing `package.json`, missing `next`, and missing supported router entrypoints; doctor now always outputs JSON including `warnings` and `errors`.

- 2026 04 17 - Doctor Router Patchability Spec — Added doctor warnings/errors for router patchability checks across App Router, Pages Router, and hybrid projects, including non-writable targets and missing `suppressHydrationWarning` / `_document.tsx` creation diagnostics.
- 2026 04 17 - Doctor Project Root Writability Spec — Added a fatal project-root writability diagnostic, separate from router patch target checks, using a dedicated existing-directory writability check for the current project root.
- 2026 04 20 - Doctor Blocks Tailwind Spec — Added Tailwind prerequisite detection to doctor using `tailwindcss` dependencies and CSS-based Tailwind v4 signals, with a warning when Tailwind is not detected.
- 2026 04 20 - Doctor Blocks TypeScript Spec — Added doctor TypeScript prerequisite detection using `tsconfig.json` and `typescript` dependencies, with an error when TypeScript readiness is not detected.
- 2026 04 21 - Doctor Blocks App Providers Shim Spec — Added read-only doctor diagnostics for the local app-providers shim, including router-mode matching and missing target file warnings.
- 2026 04 21 - Doctor Blocks Manifest Kit Source Spec — Added doctor diagnostics that read the Blocks manifest source and validate manifest-declared kit files against the installed Blocks kit packages in the consuming project.
- 2026 04 21 - Doctor Blocks Destination Collisions Core Spec — Added doctor collision diagnostics for high-risk install destinations using root-mode and router-aware path mapping, with warnings for existing app-providers, UI/sections, globals, utility, and router entrypoint targets.
- 2026 04 21 - Doctor Blocks Destination Collisions Templates Spec — Added template destination collision diagnostics for App Router and Pages Router template paths, including rewritten Pages Router template destinations.
- 2026 04 21 - Doctor Installed State Recorded Kits Spec — Added doctor support for reading recorded installed kits from `.nextworks/config.json` and including them in the doctor result.
- 2026 04 21 - Doctor Installed State Blocks Files Spec — Added read-only doctor diagnostics that verify representative Blocks files exist when Blocks is recorded as installed, warning on recorded-state/file mismatches.
- 2026 04 21 - Doctor Output Human Readable Spec — Replaced normal doctor JSON output with grouped human-readable diagnostics, including environment, project, router, prerequisite, filesystem, collision, and installed-state sections.
