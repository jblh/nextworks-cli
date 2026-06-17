# Files to Read for nextworks-cli Overview

Curated set of files to read to understand the repository architecture, CLI behavior, kit source of truth, and installable Blocks contents.

Important: for frontend kit, section, and template work, the practical source of truth is `cli/kits/blocks/**`. The `packages/blocks-*` trees are derived package/publish outputs, and package syncing is handled manually by the user unless explicitly requested. They are intentionally not listed as primary overview reads.

## Root docs

- `README.md`
- `cli/README.md`
- `.continue/context/project-overview-nextworks-cli.md`
- `scripts/sync-kit-to-packages.md`

## CLI entrypoint and core behavior

- `cli/src/index.ts`
- `cli/src/commands/blocks.ts`
- `cli/src/utils/file-operations.ts`
- `cli/src/utils/package-manager.ts`

## Manifest and kit inventory

- `cli_manifests/blocks_manifest.json`
- `cli/kits/blocks/package-deps.json`

## Blocks kit core source

- `cli/kits/blocks/components/app-providers.tsx`
- `cli/kits/blocks/components/app-providers.app.tsx`
- `cli/kits/blocks/components/app-providers.pages.tsx`
- `cli/kits/blocks/components/providers/BlocksAppProviders.tsx`
- `cli/kits/blocks/components/enhanced-theme-provider.tsx`
- `cli/kits/blocks/components/theme-provider.tsx`
- `cli/kits/blocks/lib/utils.ts`
- `cli/kits/blocks/lib/themes.ts`
- `cli/kits/blocks/components/ui/button.tsx`
- `cli/kits/blocks/components/ui/card.tsx`
- `cli/kits/blocks/components/ui/theme-selector.tsx`
- `cli/kits/blocks/components/ui/theme-toggle.tsx`
- `cli/kits/blocks/components/ui/toaster.tsx`
- `cli/kits/blocks/components/ui/cta-button.tsx`
- `cli/kits/blocks/components/ui/feature-card.tsx`
- `cli/kits/blocks/components/ui/pricing-card.tsx`
- `cli/kits/blocks/components/ui/testimonial-card.tsx`

## Blocks kit shared sections source

- `cli/kits/blocks/components/sections/Navbar.tsx`
- `cli/kits/blocks/components/sections/HeroSplit.tsx`
- `cli/kits/blocks/components/sections/HeroMotion.tsx`
- `cli/kits/blocks/components/sections/HeroOverlay.tsx`
- `cli/kits/blocks/components/sections/HeroProductDemo.tsx`
- `cli/kits/blocks/components/sections/Features.tsx`
- `cli/kits/blocks/components/sections/Pricing.tsx`
- `cli/kits/blocks/components/sections/Testimonials.tsx`
- `cli/kits/blocks/components/sections/FAQ.tsx`
- `cli/kits/blocks/components/sections/Contact.tsx`
- `cli/kits/blocks/components/sections/CTA.tsx`
- `cli/kits/blocks/components/sections/Footer.tsx`
- `cli/kits/blocks/components/sections/Newsletter.tsx`
- `cli/kits/blocks/components/sections/PortfolioSimple.tsx`
- `cli/kits/blocks/components/sections/ServicesGrid.tsx`
- `cli/kits/blocks/components/sections/Team.tsx`
- `cli/kits/blocks/components/sections/TrustBadges.tsx`
- `cli/kits/blocks/components/sections/ProcessTimeline.tsx`
- `cli/kits/blocks/components/sections/About.tsx`
- `cli/kits/blocks/components/sections/product-demo/types.ts`
- `cli/kits/blocks/components/sections/product-demo/DemoStage.tsx`
- `cli/kits/blocks/components/sections/product-demo/DemoWindow.tsx`
- `cli/kits/blocks/components/sections/product-demo/WorkflowStudioPanel.tsx`
- `cli/kits/blocks/components/sections/product-demo/RunConsolePanel.tsx`
- `cli/kits/blocks/components/sections/product-demo/ApprovalInboxPanel.tsx`
- `cli/kits/blocks/components/sections/product-demo/KnowledgePanel.tsx`
- `cli/kits/blocks/components/sections/product-demo/TaskListPanel.tsx`

## Blocks kit template source

- `cli/kits/blocks/app/templates/productlaunch/page.tsx`
- `cli/kits/blocks/app/templates/productlaunch/PresetThemeVars.tsx`
- `cli/kits/blocks/app/templates/saasdashboard/page.tsx`
- `cli/kits/blocks/app/templates/digitalagency/page.tsx`
- `cli/kits/blocks/app/templates/aiworkflow/page.tsx`
- `cli/kits/blocks/app/templates/aiworkflow/PresetThemeVars.tsx`
- `cli/kits/blocks/app/templates/aiworkflow/components/Hero.tsx`
- `cli/kits/blocks/app/templates/aiworkflow/components/FeatureMockups.tsx`
- `cli/kits/blocks/app/templates/gallery/page.tsx`
- `cli/kits/blocks/app/templates/gallery/PresetThemeVars.tsx`
- `cli/kits/blocks/app/templates/digitalagency/components/Hero.tsx`
- `cli/kits/blocks/app/templates/digitalagency/components/Navbar.tsx`
- `cli/kits/blocks/app/templates/digitalagency/components/NetworkPattern.tsx`
- `cli/kits/blocks/app/templates/saasdashboard/components/Hero.tsx`
- `cli/kits/blocks/app/templates/saasdashboard/components/Dashboard.tsx`
