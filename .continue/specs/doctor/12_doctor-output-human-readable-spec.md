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
- The grouped output must cover the current doctor diagnostics, including:
  - Environment
    - Node.js version
    - package manager detection
    - Yarn Plug'n'Play detection
  - Project detection
    - `package.json` presence
    - Next.js dependency presence
    - detected project root mode (`src` or `root`)
    - detected router type (`app`, `pages`, or `hybrid`)
  - Router / patch targets
    - `app/layout.tsx` patchability when App Router is in use
    - `pages/_app.tsx` patchability when Pages Router is in use
    - `pages/_document.tsx` patchability when Pages Router is in use
    - `suppressHydrationWarning` presence checks for supported router targets
    - `components/app-providers.tsx` shim target detection and target/router match validation when present
  - Kit prerequisites
    - Tailwind CSS detection
    - TypeScript detection
  - Filesystem / collisions
    - project root writability
    - install collision candidates
  - Installed state
    - recorded installed kits from `.nextworks/config.json`
    - missing expected files for recorded Blocks installs
- The output must use:
  - `✅` for ok
  - `⚠️` for warning
  - `❌` for error
- Yarn PnP remediation text must only be shown when Yarn PnP is detected.
