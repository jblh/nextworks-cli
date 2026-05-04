# HeroProductDemo Context

## Goal

Add a new shared hero section and a new template for an AI workflow automation product in the `nextworks-cli` repo, following existing Nextworks architecture.

This work is explicitly inspired by the **interaction mechanics** of the Cursor homepage hero, not by copying Cursor branding or product category. The first goal is to recreate the same kind of hero functionality as a reusable Nextworks shared section: layered app windows, staged demo panels, scenario cycling, highlighted active regions, and a polished product-demo feel. After that, the content and visual identity are adapted into an **AI Workflow Automation Platform** story.

## Product concept

Template story:
- AI understands requests
- triggers multi-step workflows
- routes approvals
- updates tools
- shows live execution state

Recommended product framing:
- AI workflow automation platform for modern teams
- layered windows for builder, live execution, approvals, and context

Primary panels/windows:
1. Workflow Studio
2. Live Run / Activity Feed
3. Approval Inbox
4. Knowledge / Context Panel

## Key architecture decision

Do **not** extend `HeroSplit` to support this.

Reason:
- `HeroSplit` is a text + image/fallback section.
- This new hero is a richer product-demo system with multiple layered windows and internal scenario/state mechanics.
- It should be implemented as a **new shared section** plus **shared internal demo primitives**, with a **template-local preset wrapper**.

## Shared vs preset split

### Shared reusable layer
The shared layer should contain only reusable mechanics and rendering primitives:
- hero-with-demo layout
- stage layout engine
- generic window shell/chrome
- generic panel renderers
- typed scenario model
- motion/state-cycle mechanics
- reusable highlight/status UI patterns

### Template-local preset layer
The new AI workflow template should contain:
- product naming/copy
- headline/subheadline
- CTA labels
- scenario data
- panel titles/content
- connected tools names
- approvals/log text
- theme/preset styling
- any decorative extras unique to this template

## Confirmed repo patterns

### Shared sections
Shared reusable sections live in both:
- `packages/blocks-sections/src/components/**`
- `cli/kits/blocks/components/sections/**`

The package source uses exports via:
- `packages/blocks-sections/src/components/index.ts`
- `packages/blocks-sections/src/index.ts`

The copied kit side does **not** need a local barrel export for this work.

### Templates
Template source lives in:
- `packages/blocks-templates/src/templates/<slug>/**`

Copied installable template files live in:
- `cli/kits/blocks/app/templates/<slug>/**`

Important distinction:
- package source template entry uses `Page.tsx`
- copied kit route entry uses `page.tsx`

This is existing repo convention, not two duplicate files in one location.

### Template-local composition pattern
Existing templates use local wrappers such as:
- `components/Hero.tsx`
- `components/Navbar.tsx`
- `components/Pricing.tsx`

Those wrappers import shared sections and pass preset content/config into them.

The new template should follow the same pattern:
- local `components/Hero.tsx` imports shared `HeroProductDemo`
- local wrapper supplies AI workflow-specific props/data/styles

## Cursor homepage findings to preserve

The relevant inspiration is the **mechanics** of the Cursor homepage hero, not its visual branding.

Behavior/mechanics to preserve:
- multiple interactive-looking windows
- real DOM/React-like composition, not video/canvas requirement
- absolute positioning
- z-index layering
- drag/resize affordances
- hover-revealed controls
- staged/animated mount and transitions
- scripted scenario/state cycling
- highlighted active regions/elements
- terminal/log progression
- overlapping cards/panels
- responsive behavior
- motion based on state changes rather than animating everything constantly

The implementation should imitate Cursor’s **interaction grammar** first, then change:
- product category
- content model
- panel names/data
- styling tokens
- visual flavor

## Recommended naming

Shared section name:
- `HeroProductDemo.tsx`

Template-local hero wrapper:
- `components/Hero.tsx`

New template slug:
- `aiworkflow`

Rationale:
- shared mechanic is broader than just workflow automation
- template story stays AI-workflow specific
- `components/Hero.tsx` matches existing template conventions

## Planned shared file structure

### Package source
- `packages/blocks-sections/src/components/HeroProductDemo.tsx`
- `packages/blocks-sections/src/components/product-demo/types.ts`
- `packages/blocks-sections/src/components/product-demo/DemoStage.tsx`
- `packages/blocks-sections/src/components/product-demo/DemoWindow.tsx`
- `packages/blocks-sections/src/components/product-demo/WorkflowStudioPanel.tsx`
- `packages/blocks-sections/src/components/product-demo/RunConsolePanel.tsx`
- `packages/blocks-sections/src/components/product-demo/ApprovalInboxPanel.tsx`
- `packages/blocks-sections/src/components/product-demo/KnowledgePanel.tsx`

### Copied kit mirror
- `cli/kits/blocks/components/sections/HeroProductDemo.tsx`
- `cli/kits/blocks/components/sections/product-demo/types.ts`
- `cli/kits/blocks/components/sections/product-demo/DemoStage.tsx`
- `cli/kits/blocks/components/sections/product-demo/DemoWindow.tsx`
- `cli/kits/blocks/components/sections/product-demo/WorkflowStudioPanel.tsx`
- `cli/kits/blocks/components/sections/product-demo/RunConsolePanel.tsx`
- `cli/kits/blocks/components/sections/product-demo/ApprovalInboxPanel.tsx`
- `cli/kits/blocks/components/sections/product-demo/KnowledgePanel.tsx`

## Planned template file structure

### Package source
- `packages/blocks-templates/src/templates/aiworkflow/Page.tsx`
- `packages/blocks-templates/src/templates/aiworkflow/PresetThemeVars.tsx`
- `packages/blocks-templates/src/templates/aiworkflow/README.md`
- `packages/blocks-templates/src/templates/aiworkflow/components/Navbar.tsx`
- `packages/blocks-templates/src/templates/aiworkflow/components/Hero.tsx`
- additional local section wrappers as needed:
  - `Features.tsx`
  - `Process.tsx` or `ProcessTimeline.tsx`
  - `Testimonials.tsx`
  - `Pricing.tsx`
  - `FAQ.tsx`
  - `CTA.tsx`
  - `Contact.tsx`
  - `Footer.tsx`
  - optional `TrustBadges.tsx`

### Copied kit mirror
- `cli/kits/blocks/app/templates/aiworkflow/page.tsx`
- `cli/kits/blocks/app/templates/aiworkflow/PresetThemeVars.tsx`
- `cli/kits/blocks/app/templates/aiworkflow/README.md`
- `cli/kits/blocks/app/templates/aiworkflow/components/Navbar.tsx`
- `cli/kits/blocks/app/templates/aiworkflow/components/Hero.tsx`
- matching local section wrappers/components

## Export and sync implications

### Shared sections package export
Need to export only the new public shared section:
- add `HeroProductDemo` to `packages/blocks-sections/src/components/index.ts`

Do **not** export the internal product-demo primitives publicly unless later needed.

### Templates package export
Need to update:
- `packages/blocks-templates/src/index.ts`

Expected addition:
- `export * as AIWorkflow from "./templates/aiworkflow/Page";`

### Manifest sync
The copied kit template and any new shared kit files will need to be added to:
- `cli_manifests/blocks_manifest.json`

### Docs sync
If the new template becomes installable via the standard templates flow, relevant docs may also need updates later:
- root `README.md`
- `cli/README.md`
- `docs/**`
- copied kit docs under `cli/kits/blocks/.nextworks/docs/**`

## Existing design patterns to preserve

### Shared section API style
The new shared hero should follow existing section conventions such as those seen in `HeroSplit` and `Navbar`:
- root `className`
- slot-style override objects
- typed props
- CTA config objects
- semantic wrapper / aria label
- optional motion toggle

### Template wrapper pattern
Template wrappers should remain shallow adapters that:
- import a shared section
- set preset content/config/styling
- preserve the ability to override further if needed later

## Recommended prop flow

### Template `components/Hero.tsx`
Passes into shared `HeroProductDemo`:
- heading
- subheading
- CTA config
- scenario data
- visual class overrides
- stage options

### Shared `HeroProductDemo.tsx`
Accepts:
- hero text props
- CTA props
- section/container/text/demo slot overrides
- scenario configuration
- motion flags
- aria label

Then it normalizes and passes panel/stage props into `DemoStage`.

### `DemoStage.tsx`
Receives normalized scenario/window data and renders:
- overlapping windows
- active scenario state
- auto-cycling behavior
- reduced-motion-safe transitions
- window shells with panel content

## Strong data-model recommendation

Use one typed top-level scenario object per scene/state. Each scenario should include, directly or by nested objects:
- workflow studio state
- run console state
- approval inbox state
- knowledge/context panel state
- active highlights
- active/selected nodes
- status chips/counters
- optional window arrangement overrides if needed

This keeps the system reusable and makes step-by-step implementation and spec-writing easier.

## Suggested page composition

The final page composition should be a normal Nextworks template page, likely using:
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

The exact section list may be adjusted during implementation, but the hero remains the main new surface.

## Scope sequencing

Recommended spec/implementation order:
1. Shared `HeroProductDemo` API
2. Shared demo data model
3. Shared `DemoStage` and `DemoWindow` mechanics
4. Shared panel renderers
5. AI workflow template hero preset
6. AI workflow full page composition
7. package export / kit mirror / manifest sync

## Constraints and repo rules

- Keep changes minimal and aligned with existing patterns.
- Do not do unrelated refactors.
- Preserve App Router and Pages Router install conventions.
- Respect the copy-in kit architecture: package source, copied kit files, manifest, and docs may all need alignment.
- Tailwind CSS v4 assumptions must remain intact.
- Shared component APIs should use typed props and slot overrides rather than hardcoded template specifics.
- Internal demo primitives should remain internal unless there is a strong reason to export them.
- The copied kit side should mirror the shared/template source structure needed for installs.

## Notes for future implementation chats

If working one spec at a time, this context file should be treated as the source of truth for:
- why `HeroProductDemo` exists
- why this is not an extension of `HeroSplit`
- what belongs in shared vs preset
- what files are expected
- what repo layers must stay in sync
- what Cursor-inspired mechanics should be preserved
- what product story the new template should express
