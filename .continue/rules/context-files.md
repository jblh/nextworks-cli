---
description: Apply only when the user starts with a `- feature ...` command and shared feature context should be loaded.
---

Do not read the shared context files during normal chat or ordinary repo tasks.

Only read the shared context files when the user explicitly starts the interaction with a `- feature ...` command, or explicitly asks you to read them.

The shared context files are:
`.continue/context/project-overview-nextworks-cli.md`,
`.continue/context/coding-standards.md`,
`.continue/context/ai-interaction.md`,
`.continue/context/current-feature.md`,
`.continue/specs/heroproductdemo/heroproductdemo_context.md`.

When triggered by `- feature ...`, read these files once, keep them in working context, and use them as source of truth for the feature workflow.

Do not re-read these files on every turn by default.

Only re-read them when there is a real reason, such as:

- the file was changed during this chat
- the user explicitly asks you to re-read it
- the task depends on the latest contents of one of those files
- relevant context has been lost or is no longer reliable
