---
description: Apply whenever the user uses the dash-command shorthand in chat.
alwaysApply: true
---

When the user writes `- <name>`, read `.continue/commands/<name>.md` and follow its instructions. A lone `-` does not request any action.

If there is more text after `- <name>`, this is simply a continuation of the prompt with further instructions on what to do after you have followed the instructions of the command itself.
