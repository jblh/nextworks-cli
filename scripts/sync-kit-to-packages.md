# Kit → Packages sync

This repo treats `cli/kits/blocks/**` as the practical source of truth for frontend kit work.

`packages/*` are currently derived artifacts for package build/publish use.

## Script

Use:

```bash
node scripts/sync-kit-to-packages.mjs
```

## What it does

One-way sync from kit source into package source:

- `cli/kits/blocks/components/ui/**`
  → `packages/blocks-core/src/ui/**`
- selected core internals:
  - `cli/kits/blocks/components/enhanced-theme-provider.tsx`
  - `cli/kits/blocks/components/providers/BlocksAppProviders.tsx`
  - `cli/kits/blocks/lib/utils.ts`
  - `cli/kits/blocks/lib/themes.ts`
- `cli/kits/blocks/components/sections/**`
  → `packages/blocks-sections/src/components/**`
- `cli/kits/blocks/app/templates/**`
  → `packages/blocks-templates/src/templates/**`

It also:

- adds generated headers to synced code files
- renames template `page.tsx` files to `Page.tsx` in package output
- rewrites kit alias imports to package-valid imports
- rewrites template `style jsx` blocks to plain `<style>` for package compilation
- regenerates `packages/blocks-templates/src/index.ts`

## Common commands

Sync everything:

```bash
node scripts/sync-kit-to-packages.mjs
```

Check for drift without writing files:

```bash
node scripts/sync-kit-to-packages.mjs --check
```

Sync one area only:

```bash
node scripts/sync-kit-to-packages.mjs --scope core
node scripts/sync-kit-to-packages.mjs --scope sections
node scripts/sync-kit-to-packages.mjs --scope templates
```

## Validation

Useful package checks after syncing:

```bash
pnpm --dir packages/blocks-core exec npx tsc -p tsconfig.json --noEmit
pnpm --dir packages/blocks-sections exec npx tsc -p tsconfig.json --noEmit
pnpm --dir packages/blocks-templates exec npx tsc -p tsconfig.json --noEmit
```

## Important notes

- Sync direction is intentional: `cli/kits/blocks` → `packages/*`
- Do not treat package edits as source-of-truth frontend edits
- If package files are hand-edited, the next sync may overwrite them
- This is v1 sync tooling, not a full codegen pipeline
- Some transformations are still special-cased rather than fully generalized
- `packages/blocks-core/src/lib/themes.ts` is still a special case during sync
- Package barrel/export maintenance is only automated for `packages/blocks-templates/src/index.ts`
- Other package barrel files are still manual and may need maintenance if package surface area changes

## Practical workflow

For frontend/template/section work:

1. edit kit files in `cli/kits/blocks/**`
2. run the sync script
3. run package typechecks if package validity matters for the task

This keeps day-to-day work centered on the kit and reduces dual-source maintenance.
