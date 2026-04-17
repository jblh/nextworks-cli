---
description: Start the current feature
argument-hint: none
---

## Context

Read the current feature from:
.continue/context/current-feature.md

## Task

Start the current feature.

### Requirements

- Read `current-feature.md`
- Verify `## Goals` is populated
- If empty, error: `Run /feature load first`
- Set `## Status` to `In Progress`
- Create and checkout the feature branch derived from the H1 heading
- List the goals and proceed with implementation
