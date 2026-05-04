# HeroProductDemo Stage and Window Mechanics Spec

## Overview

Implement the internal shared stage/window mechanics for the product-demo hero.

This spec covers the reusable engine that gives the hero its Cursor-inspired interaction grammar: layered windows, staged scenario changes, overlap, and polished demo behavior.

## Requirements

- A shared internal `DemoStage` component must be added in package source and copied kit source.
- A shared internal `DemoWindow` component must be added in package source and copied kit source.
- `DemoStage` must render multiple overlapping window shells using normal React/DOM composition.
- `DemoStage` must support scenario-driven rendering using the shared typed data model.
- `DemoStage` must support an active scenario key.
- `DemoStage` must support optional scripted scenario auto-cycling.
- `DemoStage` must support configurable auto-cycle interval timing.
- `DemoStage` must handle responsive layout behavior so the multi-window demo remains usable on smaller screens.
- `DemoStage` must preserve the intended layered-window feel on larger screens.
- `DemoStage` must support reduced-motion-safe behavior so the demo is not dependent on continuous motion.
- `DemoStage` must focus on animating meaningful state changes rather than animating every surface constantly.
- `DemoWindow` must provide reusable window chrome including, at minimum:
  - titlebar
  - optional window controls
  - content area
- `DemoWindow` may include fake drag/resize affordances for realism, but these must remain presentational unless a later spec explicitly adds interaction.
- `DemoStage` and `DemoWindow` must not hardcode AI workflow template branding.
- `DemoStage` must remain the central owner of layered layout and scenario switching rather than pushing that responsibility into template-local hero wrappers.

## Files in scope

### Package source
- `packages/blocks-sections/src/components/product-demo/DemoStage.tsx`
- `packages/blocks-sections/src/components/product-demo/DemoWindow.tsx`

### Copied kit mirror
- `cli/kits/blocks/components/sections/product-demo/DemoStage.tsx`
- `cli/kits/blocks/components/sections/product-demo/DemoWindow.tsx`

## Out of scope

- Hero outer text/CTA layout
- Detailed panel UI rendering
- AI workflow template content
- Full page composition
