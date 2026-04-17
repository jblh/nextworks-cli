---
description: Load a feature spec into current-feature.md
argument-hint: <spec filename or inline feature description>
---

## Context

Read the current feature from:
.continue/context/current-feature.md

## Task

Load the requested feature into current-feature.md.

### Input handling

- If $ARGUMENTS looks like a filename (single word, no spaces), read `.continue/specs/$ARGUMENTS.md`
- If $ARGUMENTS has multiple words, treat it as an inline feature description and generate goals
- If empty, error: `load requires a spec filename or feature description`

### Update current-feature.md

- Set the H1 to `# Current Feature: <feature name>`
- Set `## Status` to `Not Started`
- Write goals as bullet points under `## Goals`
- Write any extra context under `## Notes`
- Keep `## History` append-only

### Output

Confirm the spec was loaded and show the feature summary.
