# HeroProductDemo Data Model Spec

## Overview

Define the typed shared data model that drives the layered product-demo hero.

The data model must support scenario-driven rendering for multiple coordinated windows/panels without embedding AI workflow-specific copy directly into shared components.

## Requirements

- A typed data model must be added for the shared product-demo system.
- The data model must live in internal shared demo files, not inside the template preset layer.
- The data model must support one top-level scenario object per scene/state.
- Each scenario must be able to describe the state of these conceptual surfaces:
  - workflow studio
  - run console/activity feed
  - approval inbox
  - knowledge/context panel
- The data model must support active/highlighted state so the demo can visually emphasize selected nodes, panels, or regions.
- The data model must support per-window metadata needed by the stage/window system, such as titles, status labels, or layout hints.
- The data model must support auto-cycling through multiple scenarios by stable scenario keys.
- The data model must keep content and state shape typed enough that template-local preset wrappers can supply rich scenario datasets without `any`.
- The data model must not hardcode the AI workflow template brand or exact template copy.
- The data model should allow template-local scenario datasets to define things like:
  - workflow nodes and branches
  - log entries and status progression
  - approval items and state
  - knowledge sources/snippets/confidence
  - panel/window labels
- The data model may include optional window arrangement hints if needed by the stage implementation, but arrangement must remain controlled by the shared stage rather than scattered across template files.

## Files in scope

### Package source
- `packages/blocks-sections/src/components/product-demo/types.ts`

### Copied kit mirror
- `cli/kits/blocks/components/sections/product-demo/types.ts`

## Out of scope

- Hero outer layout API
- Stage auto-cycle implementation
- Window shell rendering
- AI workflow scenario content authoring
