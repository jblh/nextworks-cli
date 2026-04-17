# Current Feature

Doctor Router Patchability Spec

## Status

<!-- Not Started|In Progress|Completed -->

In Progress

## Goals

- Convert existing `routerPatchability` inspection results into real doctor warnings and errors.
- For App Router and hybrid projects:
  - add an error when the layout file exists but is not writable
  - add a warning when the layout file exists but does not contain `suppressHydrationWarning`
- For Pages Router and hybrid projects:
  - add an error when `_app.tsx` exists but is not writable
  - add an error when `_document.tsx` exists but is not writable
  - add a warning when `_document.tsx` exists but does not contain `suppressHydrationWarning`
  - add a warning when `_document.tsx` is missing and its parent directory is writable, because install will need to create it
  - add an error when `_document.tsx` is missing and its parent directory is not writable
- Ensure hybrid projects evaluate both App Router and Pages Router targets in one doctor run.
- Do not change existing patch target paths in this phase.

## Notes

- Loaded from `.continue/specs/doctor/2_doctor-router-patchability-spec.md`.
- Scope is limited to documenting and then implementing doctor diagnostics from existing patchability inspection data.

## Release / Docs Checks

- Check whether this work should update `CHANGELOG.md`.
- If the change affects user-facing CLI behavior, install behavior, compatibility, docs, templates, sections, or kit output, prefer adding a changelog entry.

## History

<!-- Keep this updated. Earliest to latest -->

- Doctor Project Sanity Spec — Added blocking doctor diagnostics for missing `package.json`, missing `next`, and missing supported router entrypoints; doctor now always outputs JSON including `warnings` and `errors`.
