# HeroProductDemo Package, Kit, and Manifest Sync Spec

## Overview

Sync the new shared hero and the new `aiworkflow` template across the repo layers that must stay aligned in `nextworks-cli`.

This spec exists because the repo uses parallel source packages plus copied installable kit files and a manifest-driven install system.

## Requirements

- The new shared `HeroProductDemo` component and internal product-demo files must be mirrored appropriately between:
  - `packages/blocks-sections/src/components/**`
  - `cli/kits/blocks/components/sections/**`
- The new `aiworkflow` template files must be mirrored appropriately between:
  - `packages/blocks-templates/src/templates/aiworkflow/**`
  - `cli/kits/blocks/app/templates/aiworkflow/**`
- The shared sections package export surface must be updated to publicly export `HeroProductDemo`.
- Internal product-demo primitive files must not be added to the public shared sections package export surface in this spec.
- The templates package export surface must be updated to export the new `aiworkflow` template entry.
- `cli_manifests/blocks_manifest.json` must be updated so the new shared files and the new template files are included in the appropriate install groups.
- Any copied-kit/template additions must preserve existing App Router and Pages Router install expectations used by the CLI.
- If user-facing installable template availability changes materially, the relevant docs should be reviewed and updated where needed to stay aligned with actual install behavior.

## Files in scope

- `packages/blocks-sections/src/components/index.ts`
- `packages/blocks-sections/src/index.ts` (if affected by the shared export path)
- `packages/blocks-templates/src/index.ts`
- `cli_manifests/blocks_manifest.json`
- any affected docs that must stay aligned with template availability or install behavior

## Out of scope

- Detailed hero implementation
- Detailed template section composition
- CLI router patching changes unrelated to adding these files
