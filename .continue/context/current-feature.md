# Current Feature: Doctor Project Root Writability

## Status

<!-- Not Started|In Progress|Complete -->

Not Started

## Goals

- Check whether the current project root is writable.
- Add an error when the project root is not writable.
- Keep this check separate from router patch target writability diagnostics.

## Notes

- Read-only diagnostic only.

## Release / Docs Checks

## History

<!-- Keep this updated. Earliest to latest -->

- 2026 04 16 - Doctor Project Sanity Spec — Added blocking doctor diagnostics for missing `package.json`, missing `next`, and missing supported router entrypoints; doctor now always outputs JSON including `warnings` and `errors`.
- 2026 04 17 - Doctor Router Patchability Spec — Added doctor warnings/errors for router patchability checks across App Router, Pages Router, and hybrid projects, including non-writable targets and missing `suppressHydrationWarning` / `_document.tsx` creation diagnostics.
- 2026 04 17 - Doctor Project Root Writability Spec — Added a fatal project-root writability diagnostic, separate from router patch target checks.
