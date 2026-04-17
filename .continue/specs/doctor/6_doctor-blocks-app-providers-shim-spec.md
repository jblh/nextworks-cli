# Doctor Blocks App Providers Shim Spec

## Overview

Add a read-only sanity check for the installed `app-providers` shim.

## Requirements

- The doctor command must detect router mode before evaluating the shim.
- The doctor command must inspect `components/app-providers.tsx` or `src/components/app-providers.tsx` when present.
- The doctor command must detect whether the shim points to:
  - `./app-providers.app`
  - `./app-providers.pages`
- If the shim target appears inconsistent with the detected router mode, the doctor command must add a warning.
- If a referenced variant file does not exist, the doctor command must add a warning.
- This check must stay heuristic and read-only.
