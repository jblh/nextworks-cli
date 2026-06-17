---
description: Review the current feature
argument-hint: none
---

## Workflow Context

This command is one step in the feature workflow: `load`, `start`, `review`, `explain`, `complete`.

The workflow state lives in:
`.continue/context/current-feature.md`

This command must be able to run independently. Do not assume prior workflow commands were run in the same chat. Read `current-feature.md` and use it as the source of truth for feature goals and scope.

For frontend kit work, review `cli/kits/blocks/**` as the source-of-truth implementation. Do not require package sync or package-output checks; package syncing is handled manually by the user unless they explicitly ask otherwise.

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

Review all code changes made for this feature.

### Requirements

1. Read `current-feature.md` to understand the active feature, goals, and notes
2. Review all code changes made for this feature
3. Check for:
   - ✅ Goals met
   - ❌ Goals missing or incomplete
   - ⚠️ Code quality issues or bugs
   - 🚫 Scope creep (code beyond goals)
   - 📦 Manifest/docs alignment when kit install output changed
   - 🚫 No direct package-output edits/checks unless the user explicitly requested package sync work
4. Give a final verdict: `Ready to complete` or `Needs changes`
5. Update `## Status` in `current-feature.md` to match the result:
   - use `In Progress` if work still needs changes
   - use `Complete` only if the feature is fully implemented and ready to complete
6. If there is no active feature or no goals are recorded, state that clearly instead of assuming prior chat context
