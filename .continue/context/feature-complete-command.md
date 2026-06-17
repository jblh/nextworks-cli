---
description: Complete the current feature
argument-hint: none
---

## Workflow Context

This command is one step in the feature workflow: `load`, `start`, `review`, `explain`, `complete`.

The workflow state lives in:
`.continue/context/current-feature.md`

This command must be able to run independently. Do not assume prior workflow commands were run in the same chat. Read `current-feature.md` and use it as the source of truth for the active feature and its completion state.

For frontend kit work, final review must treat `cli/kits/blocks/**` as the source-of-truth implementation. Do not require package sync or package-output checks; package syncing is handled manually by the user unless they explicitly ask otherwise.

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

Complete the current feature.

Invoking `- feature complete` is explicit approval to perform the full closeout workflow, including git write actions required by this command.

### Requirements

1. Read `current-feature.md` to identify the active feature, goals, and notes (if it already looks completed, proceed directly to step 4)
2. Run a final review to ensure everything is complete, including source-of-truth kit files, manifest, and docs alignment when applicable
3. If the feature is complete, continue the closeout flow without asking for additional confirmation
4. Reset `current-feature.md`:

- Update `## Status` in `current-feature.md` to `Not Started` before closeout
- Change H1 back to `# Current Feature`
- Clear Goals and Notes sections
- Preserve `## Source of Truth Reminder`
- Add the completed feature summary to the end of `## History`, using source-of-truth wording such as `copied kit source` for frontend kit changes and avoiding package-output claims unless the user explicitly requested package sync work

5. Stage all intended changes
6. Commit with a descriptive conventional commit message based on the feature
7. Push the branch to origin
8. Merge into `main`
9. Switch back to `main`

Do not stop to ask for approval before staging, committing, pushing, merging, or switching branches when the user explicitly invoked `- feature complete`.
