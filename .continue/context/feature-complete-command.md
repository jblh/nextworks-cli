---
description: Complete the current feature
argument-hint: none
---

## Workflow Context

This command is one step in the feature workflow: `load`, `start`, `review`, `explain`, `complete`.

The workflow state lives in:
`.continue/context/current-feature.md`

This command must be able to run independently. Do not assume prior workflow commands were run in the same chat. Read `current-feature.md` and use it as the source of truth for the active feature and its completion state.

## Current Feature File Structure

`current-feature.md` uses this structure:

- `# Current Feature` - default empty state
- `# Current Feature: <feature name>` - active feature
- `## Status` - `Not Started` | `In Progress` | `Complete`
- `## Goals` - Bullet points of what success looks like
- `## Notes` - Additional context, constraints, or spec details
- `## History` - Completed features; append only

## Context

Read the current feature from:
`.continue/context/current-feature.md`

## Task

Complete the current feature.

### Requirements

1. Read `current-feature.md` to identify the active feature, goals, and notes
2. Run a final review to ensure everything is complete
3. If the feature is complete, update `## Status` in `current-feature.md` to `Complete` before closeout
4. Stage all intended changes
5. Commit with a descriptive conventional commit message based on the feature
6. Push the branch to origin
7. Merge into `main`
8. Switch back to `main`

9. Reset `current-feature.md`:

- Change H1 back to `# Current Feature`
- Clear Goals and Notes sections
- Set Status to `Not Started`

12. Add the completed feature summary to the end of `## History`
13. If there is no active feature in `current-feature.md`, state that clearly instead of assuming prior chat context
