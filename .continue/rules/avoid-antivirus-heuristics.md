---
description: Avoid shell command patterns that can trigger antivirus heuristics
alwaysApply: true
---

When suggesting or running shell commands, avoid command patterns that commonly trigger antivirus or endpoint protection heuristics unless the user explicitly asks for them.

Especially avoid using PowerShell with `-ExecutionPolicy Bypass`.

Prefer simpler command forms and non-PowerShell alternatives when possible.
