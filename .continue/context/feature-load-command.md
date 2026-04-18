---
description: Load a feature spec into current-feature.md
argument-hint: <spec filename or inline feature description>
---

## Workflow Context

This command is one step in the feature workflow: `load`, `start`, `review`, `explain`, `complete`.

The workflow state lives in:
`.continue/context/current-feature.md`

This file is the source of truth for the active feature. Do not assume another workflow command was run in the same chat. Read and use `current-feature.md` directly.

## Current Feature File Structure

`current-feature.md` uses this structure:

- `# Current Feature` - H1 heading with feature name when active
- `## Status` - `Not Started` | `In Progress` | `Complete`
- `## Goals` - Bullet points of what success looks like
- `## Notes` - Additional context, constraints, or spec details
- `## History` - Completed features; append only

## Context

Read the current feature from:
`.continue/context/current-feature.md`

## Task

Load the requested feature into `current-feature.md`.

### Input handling

1. Check `$ARGUMENTS`:
   - If it looks like a filename (single word, no spaces), read `.continue/specs/$ARGUMENTS.md`
   - If it has multiple words, treat it as an inline feature description and generate a feature name, goals, and notes from it
   - If empty, error: `load requires a spec filename or feature description`

### Update current-feature.md

1. Set the H1 to `# Current Feature: <feature name>`
2. Set `## Status` to `Not Started`
3. Write goals as bullet points under `## Goals`
4. Write any extra context under `## Notes`
5. Keep `## History` append-only

### Output

Confirm the spec was loaded and show the feature summary.
