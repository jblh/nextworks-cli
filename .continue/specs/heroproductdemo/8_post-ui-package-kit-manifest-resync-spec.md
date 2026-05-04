# Post-UI Package, Kit, and Manifest Re-Sync Spec

## Overview

After the `HeroProductDemo` / `aiworkflow` UI adjustments are complete, re-sync the shared hero and the `aiworkflow` template across the repo layers that must stay aligned in `nextworks-cli`.

This spec intentionally happens after the UI-adjustment pass. Its purpose is to make sure the finalized shared/package source, copied kit files, package exports, and manifest entries all reflect the post-adjustment implementation rather than an earlier intermediate state.

## Requirements

- Re-sync the finalized shared `HeroProductDemo` component and internal product-demo files between:
  - `packages/blocks-sections/src/components/**`
  - `cli/kits/blocks/components/sections/**`
- Re-sync the finalized `aiworkflow` template files between:
  - `packages/blocks-templates/src/templates/aiworkflow/**`
  - `cli/kits/blocks/app/templates/aiworkflow/**`
- Confirm the shared sections package export surface publicly exports `HeroProductDemo`.
- Internal product-demo primitive files must still not be added to the public shared sections package export surface in this spec.
- Confirm the templates package export surface includes the `aiworkflow` template entry.
- Update `cli_manifests/blocks_manifest.json` so the new shared files and the new template files reflect the final post-UI-adjustment file set and install groups.
- Any copied-kit/template additions or edits must preserve existing App Router and Pages Router install expectations used by the CLI.
- If user-facing installable template availability or generated output changed materially during the UI-adjustment pass, the relevant docs should be reviewed and updated where needed to stay aligned with actual install behavior.

## Intent

This is a cleanup and alignment pass, not the place to redesign the hero.

By the time this spec runs:

- the hero UI adjustments should already be implemented
- the package source should represent the intended final version for this feature slice
- this step should make the mirrored kit, manifest, exports, and any affected docs match that final state

## Files in scope

- `packages/blocks-sections/src/components/index.ts`
- `packages/blocks-sections/src/index.ts` (if affected by the shared export path)
- `packages/blocks-templates/src/index.ts`
- `cli_manifests/blocks_manifest.json`
- any affected copied kit mirror files that need to be brought in line with the finalized source files
- any affected docs that must stay aligned with template availability or install behavior

## Out of scope

- Detailed hero implementation
- Detailed template section composition
- Re-deciding the UI-adjustment layout direction
- CLI router patching changes unrelated to adding these files
