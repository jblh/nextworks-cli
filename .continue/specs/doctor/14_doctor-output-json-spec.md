# Doctor Output JSON Spec

## Overview

Make `--json` output structured machine-readable doctor data.

## Implementation Note

- Working file: `cli/src/commands/doctor.ts`

## Requirements

- When `--json` is passed, `cli/src/index.ts` must output structured JSON.
- JSON output must be separate from the normal human-readable presentation path.
- JSON output must include:
  - grouped results
  - warnings
  - errors
  - overall status
- Grouped JSON results must cover the current doctor diagnostics, including:
  - `projectSanity`
  - `environmentChecks`
  - `projectRootWritability`
  - `routerPatchability`
  - `appProvidersShim`
  - `collisions`
  - `recordedInstallState`
  - `blocksFilePresence`
- Overall status must distinguish at least:
  - success with no errors
  - failure with one or more errors
