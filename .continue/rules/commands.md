---
description: Apply whenever the user uses the dash-command shorthand in chat.
---

When the user writes `- <name>`, treat it as a command invocation.

Do not read the shared context files during normal chat or ordinary repo tasks.
Only load the shared context files when the user explicitly starts with `- feature ...`, or explicitly asks you to read them.

Read the appropriate file for the command invocation, so, for example "- feature load" means read .continue/context/feature-load-command.md

Here are the command invocations and corresponding files to read:

For `- feature ...` commands, also read and keep in working context:

- `.continue/context/project-overview-nextworks-cli.md`
- `.continue/context/coding-standards.md`
- `.continue/context/ai-interaction.md`
- `.continue/context/current-feature.md`

Do not read those shared context files for non-`feature` commands unless the user explicitly asks for them.

- `- feature load ...` must read `.continue/context/feature-load-command.md`
- `- feature start` must read `.continue/context/feature-start-command.md`
- `- feature review` must read `.continue/context/feature-review-command.md`
- `- feature explain` must read `.continue/context/feature-explain-command.md`
- `- feature complete` must read `.continue/context/feature-complete-command.md`

A lone `-` does not request any action.

Pass everything after the command name as the command's argument string.

- if no action is provided, explain the available options: `load`, `start`, `review`, `explain`, `complete`

For commands other than `feature`, directly read `.continue/context/<name>-command.md`. Do not use directory listing or globbing to discover the file first.

If the required command file cannot be read, stop and report that exact failure instead of continuing.

After reading the resolved command file, execute the instructions in that file exactly.

Examples:

- `- feature review` means:
  1. read `.continue/context/feature-review-command.md`
  2. execute the review instructions from that file
- `- feature load .continue/specs/{specific-file.md}` means:
  1. read `.continue/context/feature-load-command.md`
  2. execute the load instructions with `.continue/specs/{specific-file.md}` as the command argument string
