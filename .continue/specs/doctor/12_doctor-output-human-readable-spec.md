# Doctor Output Human Readable Spec

## Overview

Replace the current normal doctor output with grouped human-readable diagnostics.

## Implementation Note

- Working file: `cli/src/commands/doctor.ts`

## Requirements

- In normal mode, `cli/src/index.ts` must not print the raw doctor result as JSON.
- Normal mode must print grouped human-readable output.
- The output must support these sections when data is available:
  - Environment
  - Project detection
  - Router / patch targets
  - Kit prerequisites
  - Filesystem / collisions
  - Installed state
- The output must use:
  - `✅` for ok
  - `⚠️` for warning
  - `❌` for error
- Yarn PnP remediation text must only be shown when Yarn PnP is detected.
