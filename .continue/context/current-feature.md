# Current Feature

## Status

Not Started

## Goals

## Notes

## Release / Docs Checks

## History

<!-- Keep this updated. Add date. Earliest to latest -->

- 2026 04 16 - Doctor Project Sanity Spec — Added blocking doctor diagnostics for missing `package.json`, missing `next`, and missing supported router entrypoints; doctor now always outputs JSON including `warnings` and `errors`.
- 2026 04 17 - Doctor Router Patchability Spec — Added doctor warnings/errors for router patchability checks across App Router, Pages Router, and hybrid projects, including non-writable targets and missing `suppressHydrationWarning` / `_document.tsx` creation diagnostics.
- 2026 04 17 - Doctor Project Root Writability Spec — Added a fatal project-root writability diagnostic, separate from router patch target checks, using a dedicated existing-directory writability check for the current project root.
- 2026 04 20 - Doctor Blocks Tailwind Spec — Added Tailwind prerequisite detection to doctor using `tailwindcss` dependencies and CSS-based Tailwind v4 signals, with a warning when Tailwind is not detected.
- 2026 04 20 - Doctor Blocks TypeScript Spec — Added doctor TypeScript prerequisite detection using `tsconfig.json` and `typescript` dependencies, with an error when TypeScript readiness is not detected.
- 2026 04 21 - Doctor Blocks App Providers Shim Spec — Added read-only doctor diagnostics for the local app-providers shim, including router-mode matching and missing target file warnings.
