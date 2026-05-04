# HeroProductDemo Shared Section API Spec

## Overview

Add a new shared section component named `HeroProductDemo` as a reusable sibling to the existing shared hero variants.

This component must provide the outer hero layout and public reusable API for a layered product-demo hero, while delegating staged multi-window behavior to internal demo primitives.

## Requirements

- A new shared section component named `HeroProductDemo` must be added in package source and copied kit source.
- `HeroProductDemo` must be implemented as a new component, not as an extension or mutation of `HeroSplit`.
- `HeroProductDemo` must follow the existing shared section API style used in this repo:
  - root `className`
  - slot-style override props
  - typed CTA config objects
  - semantic wrapper with `ariaLabel`
  - optional motion toggle
- `HeroProductDemo` must support a hero layout with:
  - text/copy area
  - CTA area
  - demo/stage area
- `HeroProductDemo` must accept heading and subheading in the same ergonomic style used by `HeroSplit`, i.e. string or object-with-text-and-className.
- `HeroProductDemo` must accept primary and secondary CTA config objects consistent with existing hero usage patterns.
- `HeroProductDemo` must expose slot-style override surfaces for at least:
  - `section`
  - `container`
  - `textContainer`
  - `demoContainer`
- `HeroProductDemo` must accept scenario/stage configuration props and pass normalized values into the internal `DemoStage`.
- `HeroProductDemo` must not hardcode AI workflow branding, copy, or scenario content.
- `HeroProductDemo` must keep template-specific content in the calling preset/template layer.
- `HeroProductDemo` must be exportable from the shared sections package public surface.
- Low-level demo primitives used by `HeroProductDemo` must not be added to the shared package public surface in this spec.

## Files in scope

### Package source
- `packages/blocks-sections/src/components/HeroProductDemo.tsx`
- `packages/blocks-sections/src/components/index.ts`

### Copied kit mirror
- `cli/kits/blocks/components/sections/HeroProductDemo.tsx`

## Out of scope

- Internal demo stage mechanics
- Detailed scenario typing
- Panel renderer implementation
- AI workflow template-local hero preset
- Manifest updates
