# AI Workflow Template Hero Preset Spec

## Overview

Add the AI workflow template-local hero wrapper that configures the shared `HeroProductDemo` for the new AI workflow automation template.

This spec is where the new product story becomes concrete: headline, CTA copy, panel titles, scenario data, and visual flavor.

## Requirements

- A new template-local hero wrapper file must be added for the `aiworkflow` template in package source and copied kit source.
- The local template hero file must be named `Hero.tsx` to match existing template conventions.
- The template-local `Hero.tsx` must import and configure the shared `HeroProductDemo`.
- The template-local `Hero.tsx` must provide AI workflow-specific:
  - headline
  - subheadline
  - CTA labels/links
  - scenario dataset
  - panel titles/content
  - class overrides
  - visual flavor
- The hero content must express an AI workflow automation platform story rather than a coding assistant story.
- The hero scenario content should use the planned four-surface framing:
  - workflow studio
  - live run/activity feed
  - approval inbox
  - knowledge/context
- The template-local hero must preserve the shared-vs-preset split by keeping template branding/content local rather than modifying shared components for template-specific content.
- The template-local hero may add lightweight local decorative structure or wrapper styling, but the multi-window mechanics must remain in the shared hero/stage system.

## Files in scope

### Package source
- `packages/blocks-templates/src/templates/aiworkflow/components/Hero.tsx`

### Copied kit mirror
- `cli/kits/blocks/app/templates/aiworkflow/components/Hero.tsx`

## Out of scope

- Shared hero API design
- Shared stage/window implementation
- Full template page composition
- Manifest/package export updates
