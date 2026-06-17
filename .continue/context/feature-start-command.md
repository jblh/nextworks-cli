---
description: Start the current feature
argument-hint: none
---

## Workflow Context

This command is one step in the feature workflow: `load`, `start`, `review`, `explain`, `complete`.

The workflow state lives in:
`.continue/context/current-feature.md`

This command must be able to run independently. Do not assume `load` was run in the same chat. Instead, read `current-feature.md` and use that as the source of truth for workflow state.

For frontend kit work, use `cli/kits/blocks/**` as the source of truth. Do not run package sync or edit/check `packages/blocks-*` unless the user explicitly asks; package syncing is handled manually by the user.

If `current-feature.md` already contains a loaded feature with goals, proceed. Only instruct the user to run `feature load` when there is no active feature or the goals are empty.

## Current Feature File Structure

`current-feature.md` uses this structure:

- `# Current Feature` - default empty state
- `# Current Feature: <feature name>` - active feature
- `## Status` - `Not Started` | `In Progress` | `Complete`
- `## Goals` - Bullet points of what success looks like
- `## Notes` - Additional context, constraints, or spec details
- `## Release / Docs Checks` - Release/docs checklist for the active feature
- `## Source of Truth Reminder` - Persistent repo workflow reminder; keep this section intact
- `## History` - Completed features; append only

## Context

Read the current feature from:
`.continue/context/current-feature.md`

## Task

Start the current feature.

### Requirements

1. Read `current-feature.md`
2. Verify there is an active feature and `## Goals` is populated
3. If there is no active feature or goals are empty, error: `Run - feature load first`
4. Immediately update `current-feature.md` and set `## Status` to `In Progress` before implementation begins
5. Create and checkout the feature branch derived from the H1 heading when branch workflow is being used
6. List the goals
7. Proceed with implementation goal by goal, authoring frontend kit changes in `cli/kits/blocks/**` first when applicable
8. Do not run package sync or edit/check `packages/blocks-*` unless the user explicitly asks
9. Do not leave the status as `Not Started` after beginning work
