# HeroProductDemo Panel Renderers Spec

## Overview

Implement the internal shared panel renderers that sit inside the layered demo windows.

These renderers are presentational shared primitives driven entirely by typed data supplied through the shared hero and stage system.

## Requirements

- Internal shared panel renderer components must be added for the main product-demo surfaces:
  - `WorkflowStudioPanel`
  - `RunConsolePanel`
  - `ApprovalInboxPanel`
  - `KnowledgePanel`
- These panel components must exist in package source and copied kit source.
- Panel components must remain shared and reusable.
- Panel components must render from typed props/data and must not hardcode the AI workflow template’s brand identity.
- `WorkflowStudioPanel` must support rendering a workflow-builder style surface, including the ability to visually emphasize active or selected workflow regions/nodes.
- `RunConsolePanel` must support rendering log/progress/status style content for execution state.
- `ApprovalInboxPanel` must support rendering approval items with stateful visual differences such as pending/completed/review-style states.
- `KnowledgePanel` must support rendering source/context snippets, references, and confidence-oriented metadata.
- Panel renderers must support the shared staged-demo goal of highlighting state changes and product activity.
- Panel renderers must be designed so template-local preset wrappers can supply their own content datasets without editing the shared renderer implementations.
- These panel renderer components must remain internal implementation details and must not be exported from the public shared sections package surface in this spec.

## Files in scope

### Package source
- `packages/blocks-sections/src/components/product-demo/WorkflowStudioPanel.tsx`
- `packages/blocks-sections/src/components/product-demo/RunConsolePanel.tsx`
- `packages/blocks-sections/src/components/product-demo/ApprovalInboxPanel.tsx`
- `packages/blocks-sections/src/components/product-demo/KnowledgePanel.tsx`

### Copied kit mirror
- `cli/kits/blocks/components/sections/product-demo/WorkflowStudioPanel.tsx`
- `cli/kits/blocks/components/sections/product-demo/RunConsolePanel.tsx`
- `cli/kits/blocks/components/sections/product-demo/ApprovalInboxPanel.tsx`
- `cli/kits/blocks/components/sections/product-demo/KnowledgePanel.tsx`

## Out of scope

- Shared outer hero API
- Stage auto-cycling mechanics
- AI workflow template-local copy/scenario authoring
- Page/template composition
