# HeroProductDemo UI Adjustments Spec

## Goal

Adjust the already-implemented `HeroProductDemo` / `aiworkflow` hero so it follows the stronger interaction grammar from the Cursor homepage hero before the final package/kit/manifest re-sync step:

- small amount of hero text at the top
- full-width demo stage beneath the text
- no left/right text-vs-demo split
- three primary windows arranged in a clear left-to-right workflow
- the three primary windows must not overlap each other in any way
- only a fourth supporting window may float above the right-most primary window

This spec is specifically for refining the already implemented `HeroProductDemo` / `aiworkflow` experience so the visual logic reads as a connected product workflow rather than a cluster of cards.

## Current problem

The current hero renders, but the demo composition does not communicate a strong causal flow.

Observed issues:

- the split hero layout leaves too little room for the demo
- panes feel cramped or arbitrarily arranged
- overlapping windows read as decorative cards instead of connected workflow surfaces
- the visitor cannot immediately infer that actions in the left pane affect the next pane to the right
- the overall result does not preserve the strongest Cursor-like mechanic: adjacent, logically connected work surfaces

## Desired layout direction

The hero should be restructured into a vertically stacked composition:

1. compact top text block
2. full-width product demo stage directly underneath

### Top text block

Should include only concise hero framing:

- eyebrow or small label optional
- headline
- short subheadline
- CTA row optional

The text block should remain visually important, but should not consume horizontal space that the demo needs.

## Required demo layout

The demo stage should occupy the main hero width under the text.

### Primary windows

Render three primary windows that are visually connected and arranged left to right:

1. **Left pane:** workflow tasks / builder / triggers / steps
2. **Center pane:** AI execution / orchestration / agent activity / live reasoning-like workflow state
3. **Right pane:** resulting tool output / updated destination / browser-like or app-like result surface

Rules:

- these three windows must be clearly adjacent
- they must not overlap
- they must not stack on top of one another
- they should feel like one connected workflow system split into three working surfaces
- the visual arrangement should imply cause and effect from left to right

### Fourth window

A fourth supporting window is allowed to float above only the right-most primary window.

Recommended role for the fourth window:

- approvals
- review queue
- exception handling
- human-in-the-loop control
- side console if needed

Rules:

- only this fourth window may overlap another window
- it should overlap only the right-most primary pane
- it should read as a supporting overlay, not as a separate random card

## Semantic flow requirements

This is not only a spacing/layout adjustment. The content relationship between panes must communicate a workflow.

The left-to-right chain must be obvious:

- selecting or highlighting a task/node/step in the left pane
- changes what the AI is doing in the center pane
- which in turn updates or explains the resulting state in the right pane

The stage should make it easy for a visitor to understand, at a glance:

- where the request starts
- where the AI is executing work
- where the output lands
- where approvals or oversight happen

### Strong expectation

The windows should feel causally linked, not merely co-located.

Examples of signals to include:

- active selection in the left pane reflected in center-pane state
- highlighted center-pane execution step matching the selected workflow step
- right-pane content showing the effect of the active execution step
- approval overlay referencing the same run or same task shown in the other panes

## Cursor-inspired mechanics to preserve

Use Cursor homepage hero as interaction reference for layout grammar and staged product-demo feel, not for branding or copied content.

Preserve these ideas:

- real DOM/React window composition
- polished app-window shells
- staged scenario cycling
- highlighted active regions
- logical adjacency of main panes
- one supporting floating window
- motion based on state changes, not constant motion
- responsive behavior that preserves hierarchy

For this specific adjustment, prioritize:

- adjacency
- flow clarity
- semantic linkage
- full-width stage

## Requested structural changes

### `HeroProductDemo`

Adjust the shared hero section layout so it can support a stacked mode where:

- hero text is above
- demo is below
- demo can span the full content width

This can be implemented either by:

- adding a new layout mode/variant to `HeroProductDemo`, or
- adapting the section in a minimal way that still preserves shared reuse

Do not revert to extending `HeroSplit`.

### `DemoStage`

Adjust the large-screen stage layout so that:

- three primary windows sit in a non-overlapping row
- the right-most pane can host one overlapping/floating support window
- spacing, dimensions, and z-index support this hierarchy clearly

### `aiworkflow` template preset

The `aiworkflow` wrapper should use the full-width stacked hero composition and pass scenario/content data that reinforces the left-to-right causal flow.

## Suggested window roles for `aiworkflow`

### Left primary window

Recommended title direction:

- Workflow Studio
- Workflow Builder
- Task Graph

Recommended content direction:

- triggers
- step list
- task nodes
- active selected node
- simple dependencies

### Center primary window

Recommended title direction:

- Live Run
- Agent Execution
- Workflow Engine

Recommended content direction:

- current run state
- step-by-step execution progress
- tool actions
- agent reasoning-style checkpoints without pretending to expose chain-of-thought
- status transitions tied to the selected workflow step

### Right primary window

Recommended title direction:

- Destination App
- CRM / Ticket / Browser / Output View
- Updated Result

Recommended content direction:

- the place where AI-applied changes become visible
- updated record, generated response, routed request, changed status, populated form, etc.

### Floating fourth window

Recommended title direction:

- Approval Inbox
- Human Review
- Escalation Queue

Recommended content direction:

- pending approval tied to the currently executing or completed run
- should clearly reference the same task/run shown elsewhere on stage

## Responsive expectations

On large screens:

- three primary panes should read as a horizontal system
- fourth pane floats over the right-most pane only

On smaller screens:

- it is acceptable to collapse to stacked windows
- but preserve ordering and semantic hierarchy

## Constraints

- keep changes minimal and aligned with existing Nextworks patterns
- do not introduce unrelated refactors
- preserve shared vs template-local separation
- package source changes should be made first and treated as the source of truth for this pass
- copied kit mirror and manifest/export alignment can be finalized in the follow-up re-sync step
- preserve typed APIs and slot override style
- preserve reduced-motion-safe behavior

## Files likely affected

### Shared package source

- `packages/blocks-sections/src/components/HeroProductDemo.tsx`
- `packages/blocks-sections/src/components/product-demo/DemoStage.tsx`
- possibly internal panel renderers if content structure needs refinement

### Copied kit mirror

- `cli/kits/blocks/components/sections/HeroProductDemo.tsx`
- `cli/kits/blocks/components/sections/product-demo/DemoStage.tsx`
- matching internal panel files if updated

### Template-local source

- `packages/blocks-templates/src/templates/aiworkflow/components/Hero.tsx`
- mirrored copied kit template hero file

## Sequencing note

This spec should be completed before the package/kit/manifest re-sync pass.

In other words:

1. implement these UI adjustments
2. then run the follow-up sync/export/manifest spec so repo layers reflect the final UI state

## Acceptance criteria

The adjustment is successful when:

- the hero no longer uses a left/right split that constrains the demo
- the top hero text is compact and sits above the demo
- the demo stage spans the available hero width beneath the text
- three primary panes are clearly adjacent and do not overlap at all
- only one fourth pane floats above the right-most pane
- the panes visually communicate a left-to-right workflow story
- the active scenario state creates clear semantic linkage between panes
- the result feels closer to Cursor’s interaction grammar while still clearly representing an AI workflow automation product
