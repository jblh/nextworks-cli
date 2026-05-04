# AI Workflow Template Page Composition Spec

## Overview

Add the new `aiworkflow` template page and compose it from the shared sections plus template-local preset wrappers, following existing Nextworks template architecture.

## Requirements

- A new template with slug `aiworkflow` must be added in package source and copied kit source.
- The package source template must use the repo’s existing template entry convention:
  - `packages/blocks-templates/src/templates/aiworkflow/Page.tsx`
- The copied kit route entry must use the repo’s existing app-route convention:
  - `cli/kits/blocks/app/templates/aiworkflow/page.tsx`
- A template-local `PresetThemeVars.tsx` file must be added in package source and copied kit source.
- A template-local `README.md` file must be added in package source and copied kit source.
- The new template page must compose a standard Nextworks landing-page flow around the new hero.
- The exact section list may be refined during implementation, but the page should be composed from existing shared sections and local preset wrappers rather than introducing an unrelated page architecture.
- The hero used by this page must be the template-local `components/Hero.tsx`, which itself wraps the shared `HeroProductDemo`.
- The page should likely include most or all of the following, depending on final template design:
  - `Navbar`
  - `Hero`
  - optional `TrustBadges`
  - `Features`
  - `Process` or `ProcessTimeline`
  - `Testimonials`
  - `Pricing`
  - `FAQ`
  - `CTA`
  - `Contact`
  - `Footer`
- The new template must follow existing Nextworks conventions for local wrapper components such as `components/Navbar.tsx`, `components/Pricing.tsx`, etc., where template-specific preset values are applied to shared sections.

## Files in scope

### Package source
- `packages/blocks-templates/src/templates/aiworkflow/Page.tsx`
- `packages/blocks-templates/src/templates/aiworkflow/PresetThemeVars.tsx`
- `packages/blocks-templates/src/templates/aiworkflow/README.md`
- `packages/blocks-templates/src/templates/aiworkflow/components/**`

### Copied kit mirror
- `cli/kits/blocks/app/templates/aiworkflow/page.tsx`
- `cli/kits/blocks/app/templates/aiworkflow/PresetThemeVars.tsx`
- `cli/kits/blocks/app/templates/aiworkflow/README.md`
- `cli/kits/blocks/app/templates/aiworkflow/components/**`

## Out of scope

- Shared hero internals
- Shared scenario typing
- Manifest updates
- Public package export updates
