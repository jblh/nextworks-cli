# Doctor Router Patchability Spec

## Overview

Convert the existing router patch inspection data into real warning and error diagnostics.

## Requirements

- The doctor command must use the existing `routerPatchability` inspection results to produce diagnostics.
- For App Router projects and hybrid projects:
  - if the layout file exists and is not writable, add an error
  - if the layout file exists and does not contain `suppressHydrationWarning`, add a warning
- For Pages Router projects and hybrid projects:
  - if `_app.tsx` exists and is not writable, add an error
  - if `_document.tsx` exists and is not writable, add an error
  - if `_document.tsx` exists and does not contain `suppressHydrationWarning`, add a warning
  - if `_document.tsx` is missing and its parent directory is writable, add a warning that the installer will need to create it
  - if `_document.tsx` is missing and its parent directory is not writable, add an error
- Hybrid projects must evaluate both App Router and Pages Router targets in the same run.
- The doctor command must not change the existing patch target paths in this phase.
