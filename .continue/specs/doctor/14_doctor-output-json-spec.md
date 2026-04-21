# Doctor Output JSON Spec

## Overview

Make `--json` output structured machine-readable doctor data.

## Implementation Note

- Working file: `cli/src/commands/doctor.ts`

## Requirements

- When `--json` is passed, `cli/src/index.ts` must output structured JSON.
- JSON output must include:
  - grouped results
  - warnings
  - errors
  - overall status
- JSON output must be separate from the normal human-readable presentation path.
