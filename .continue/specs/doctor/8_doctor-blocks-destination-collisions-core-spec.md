# Doctor Blocks Destination Collisions Core Spec

## Overview

Detect existing destination files in the user project before install.

## Requirements

- The doctor command must compute destination paths in the user project using the same root-mode and router-aware mapping rules used during install.
- If a destination file already exists in the user project, the doctor command must add a warning.
- Collision detection must include these high-risk destinations:
  - `components/app-providers.tsx`
  - `components/ui/**`
  - `components/sections/**`
  - `app/globals.css`
  - `app/tw-animate.css`
  - `lib/utils.ts`
  - patched router entrypoints
