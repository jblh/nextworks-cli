# Doctor Project Sanity Spec

## Overview

Turn existing project sanity detection into real blocking diagnostics.

## Requirements

- The doctor command must report an error when `package.json` is missing.
- The doctor command must report an error when `next` is missing from `dependencies` or `devDependencies`.
- The doctor command must report an error when no supported Next.js router entrypoint layout is detected.
- The doctor command must keep using the current supported entrypoint conventions already used by doctor today:
  - App Router: `app/layout.tsx` or `src/app/layout.tsx`
  - Pages Router: `pages/_app.tsx` or `src/pages/_app.tsx`
- The doctor command must add these findings to `result.errors` instead of only storing passive detection state.
- The doctor command must not print diagnostics directly from `doctor.ts`; presentation remains in `cli/src/index.ts`.
