# Current Feature

## Status

Not Started

## Goals

## Notes

## Release / Docs Checks

- None.

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
- 2026 04 21 - Doctor Output Human Readable Spec — Replaced normal doctor JSON output with grouped human-readable diagnostics, including environment, project, router, prerequisite, filesystem, collision, installed-state, and recommendation sections.
- 2026 04 21 - Doctor Output Recommendation Spec — Added a short final recommendation to doctor output, preferring `nextworks add blocks` when no blocking errors exist and surfacing blocking fixes first when errors do exist.
- 2026 04 21 - Doctor Output JSON Spec — Added structured JSON output for doctor with grouped diagnostics, warnings, errors, and overall status while keeping the human-readable path separate.
- 2026 04 21 - Doctor Exit Codes Spec — Made doctor exit `0` for warning-only or clean runs and `1` when any error diagnostics are present, with the same behavior in human-readable and `--json` modes.
- 2026 05 04 - HeroProductDemo Shared Section API — Added the new shared `HeroProductDemo` section in package source and copied kit source, exported it from the shared sections public surface, and completed the reusable hero API for layered product-demo content without exposing low-level demo primitives.
- 2026 05 04 - HeroProductDemo Data Model Spec — Added typed shared product-demo hero scenario models in package source and copied kit source, covering scenario keys, highlight state, window metadata, content records, and optional arrangement hints without using `any`.
- 2026 05 04 - HeroProductDemo Stage and Window Mechanics Spec — Added shared internal `DemoStage` and `DemoWindow` components in package source and copied kit source, with scenario-driven layered window rendering, active scenario selection, and optional auto-cycling for the product-demo hero.
- 2026 05 04 - HeroProductDemo Panel Renderers Spec — Added internal shared panel renderer components for workflow studio, run console, approval inbox, and knowledge panels in both package and copied-kit sources, keeping them typed, reusable, and non-public while supporting richer product-demo scenario rendering.
- 2026 05 04 - AI Workflow Template Hero Preset Spec — Added a new template-local `Hero.tsx` for the `aiworkflow` template in package source and copied kit source, configuring `HeroProductDemo` with AI workflow-specific messaging, CTAs, scenario data, panel content, and visual styling while keeping shared demo mechanics unchanged.
- 2026 05 04 - AI Workflow Template Page Composition Spec — Added the `aiworkflow` template page composition in package source and copied kit source, including local preset theme/docs files and shallow section wrappers around shared sections for a full landing-page flow.
- 2026 05 04 - HeroProductDemo Package, Kit, and Manifest Sync Spec — Synced the shared `HeroProductDemo` and `aiworkflow` template install surfaces across package exports, manifest entries, and kit docs so the new template is installable and documented without exposing internal product-demo primitives.
- 2026 05 04 - HeroProductDemo UI Adjustments Spec — Refined the shared hero into a stacked text-over-demo layout, updated the large-screen demo stage to show three adjacent primary panes with a single floating approval window, and tightened the `aiworkflow` hero copy/state flow to communicate left-to-right causality.
