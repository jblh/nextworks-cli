# Current Feature: Doctor Blocks Manifest Kit Source

## Status

Complete

## Goals

- Validate that the Blocks manifest matches the installed kit source files in the consuming project.
- Read `node_modules/nextworks/dist/cli_manifests/blocks_manifest.json` during doctor checks.
- Compare manifest-declared files against the installed Blocks packages in the consuming project: `node_modules/@nextworks/blocks-core`, `node_modules/@nextworks/blocks-sections`, and `node_modules/@nextworks/blocks-templates`.

- Warn when a manifest-declared kit file is missing from the kit source.
- Use the same manifest source as install flows.

## Notes

<!-- Also add the relative path to the spec file here for reference -->

- Spec: `.continue/specs/doctor/7_doctor-blocks-manifest-kit-source-spec.md`

## Release / Docs Checks

- Verified with `npm run build`.

## History

<!-- Keep this updated. Add date. Earliest to latest -->

- 2026 04 21 - Doctor Blocks Manifest Kit Source Spec — Added doctor diagnostics that read the Blocks manifest source and validate manifest-declared kit files against the installed Blocks kit packages in the consuming project.

- 2026 04 16 - Doctor Project Sanity Spec — Added blocking doctor diagnostics for missing `package.json`, missing `next`, and missing supported router entrypoints; doctor now always outputs JSON including `warnings` and `errors`.
- 2026 04 17 - Doctor Router Patchability Spec — Added doctor warnings/errors for router patchability checks across App Router, Pages Router, and hybrid projects, including non-writable targets and missing `suppressHydrationWarning` / `_document.tsx` creation diagnostics.
- 2026 04 17 - Doctor Project Root Writability Spec — Added a fatal project-root writability diagnostic, separate from router patch target checks, using a dedicated existing-directory writability check for the current project root.
- 2026 04 20 - Doctor Blocks Tailwind Spec — Added Tailwind prerequisite detection to doctor using `tailwindcss` dependencies and CSS-based Tailwind v4 signals, with a warning when Tailwind is not detected.
- 2026 04 20 - Doctor Blocks TypeScript Spec — Added doctor TypeScript prerequisite detection using `tsconfig.json` and `typescript` dependencies, with an error when TypeScript readiness is not detected.
- 2026 04 21 - Doctor Blocks App Providers Shim Spec — Added read-only doctor diagnostics for the local app-providers shim, including router-mode matching and missing target file warnings.
