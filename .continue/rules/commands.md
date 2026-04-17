---
description: Apply whenever the user uses the dash-command shorthand in chat.
alwaysApply: true
---

When the user writes `- <name>`, treat it as a command invocation and directly read `.continue/context/<name>-command.md`. Do not use directory listing or globbing to discover the file first.

A lone `-` does not request any action.

Pass everything after the command name as the command's argument string.

If `.continue/context/<name>-command.md` cannot be read, stop and report that exact failure instead of continuing.

Examples:

- `- feature review` means run the `feature` command from `.continue/context/feature-command.md` with `review` as its argument string.
- `- feature load .continue/specs/{specific-file.md}` means run the `feature` command with `load .continue/specs/{specific-file.md}` as its argument string.
