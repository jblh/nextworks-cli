---
description: Explain the current feature implementation
argument-hint: none
---

## Workflow Context

This command is one step in the feature workflow: `load`, `start`, `review`, `explain`, `complete`.

The workflow state lives in:
`.continue/context/current-feature.md`

This command must be able to run independently. Do not assume prior workflow commands were run in the same chat. Read `current-feature.md` and use it as the source of truth for what feature is being explained.

For frontend kit work, explain `cli/kits/blocks/**` changes as the source-of-truth implementation. Do not require or infer package sync work; mention `packages/blocks-*` only if the user explicitly asked for package sync/package-output changes.

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

Explain what was implemented for this feature.

### Requirements

1. Read `current-feature.md` to understand the active feature, goals, and notes
2. Run `git diff main --name-only` to get the list of files changed for the feature
3. For each file created or modified:
   - Show the file path
   - Give a 1-2 sentence explanation of what it does or what changed
   - Highlight any key functions, components, or patterns used
   - For frontend kit work, identify source-of-truth kit files and avoid package-output explanations unless package sync work was explicitly requested
4. End with a brief summary of how the pieces fit together
5. Preserve the current `## Status` in `current-feature.md`; this command explains work but does not change workflow state by itself
6. If there is no active feature in `current-feature.md`, state that clearly instead of assuming prior chat context

## Output format

## Files Changed

**path/to/file.ts** (new)
Brief explanation of what this file does and why it was added.

**path/to/other.ts** (modified)
What changed and why.

## How It All Connects

Brief summary of the data/control flow between these files.
