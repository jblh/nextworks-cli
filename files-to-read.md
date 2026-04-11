# Files to Read for nextworks-cli Overview

This is the curated set of files I reviewed to understand the repository architecture, CLI behavior, package structure, and kit contents well enough to write the project overview.

## Root docs

- `README.md`
- `cli/README.md`
- `.continue/context/project-overview.md` (format reference only)

## CLI entrypoint and core behavior

- `cli/src/index.ts`
- `cli/src/commands/blocks.ts`
- `cli/src/utils/file-operations.ts`
- `cli/src/utils/package-manager.ts`

## Manifest and kit inventory

- `cli_manifests/blocks_manifest.json`

## Shared package overviews

- `packages/blocks-core/README.md`
- `packages/blocks-core/src/index.ts`
- `packages/blocks-core/src/providers/BlocksAppProviders.tsx`
- `packages/blocks-core/src/components/enhanced-theme-provider.tsx`
- `packages/blocks-core/src/components/theme-provider.tsx`
- `packages/blocks-core/src/ui/button.tsx`
- `packages/blocks-core/src/ui/card.tsx`
- `packages/blocks-core/src/ui/theme-toggle.tsx`
- `packages/blocks-core/src/ui/toaster.tsx`
- `packages/blocks-core/src/ui/cta-button.tsx`
- `packages/blocks-core/src/ui/feature-card.tsx`
- `packages/blocks-core/src/ui/pricing-card.tsx`
- `packages/blocks-core/src/ui/testimonial-card.tsx`
- `packages/blocks-sections/README.md`
- `packages/blocks-sections/src/index.ts`
- `packages/blocks-sections/src/components/index.ts`
- `packages/blocks-sections/src/components/Navbar.tsx`
- `packages/blocks-sections/src/components/HeroSplit.tsx`
- `packages/blocks-sections/src/components/Features.tsx`
- `packages/blocks-templates/README.md`
- `packages/blocks-templates/src/index.ts`
- `packages/blocks-templates/src/templates/productlaunch/Page.tsx`
- `packages/blocks-templates/src/templates/productlaunch/PresetThemeVars.tsx`
- `packages/blocks-templates/src/templates/saasdashboard/Page.tsx`
- `packages/blocks-templates/src/templates/digitalagency/Page.tsx`
- `packages/blocks-templates/src/templates/gallery/page.tsx`
- `packages/blocks-templates/src/templates/digitalagency/components/Hero.tsx`
- `packages/blocks-templates/src/templates/digitalagency/components/Navbar.tsx`
- `packages/blocks-templates/src/templates/digitalagency/components/NetworkPattern.tsx`
- `packages/blocks-templates/src/templates/saasdashboard/components/Hero.tsx`
- `packages/blocks-templates/src/templates/saasdashboard/components/Dashboard.tsx`

## Notes

- I did not rely on `dist/` outputs because they are derived from source.
- I did not inspect `node_modules/`.
- I focused on root docs, CLI orchestration, file mapping/patching logic, and package exports because those define the project’s behavior and structure.
- The second pass intentionally sampled representative shared components, sections, and template wrappers to understand the composition model, token system, and preset-based branding approach.
