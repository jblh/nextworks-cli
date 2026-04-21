# Doctor Output Recommendation Spec

## Overview

Add a short recommendation at the end of human-readable doctor output.

## Implementation Note

- Working file: `cli/src/commands/doctor.ts`

## Requirements

- If there are no error diagnostics, the output must recommend `nextworks add blocks`.
- If there are error diagnostics, the output must recommend the highest-priority fixes instead of install.
- Highest-priority fix recommendations must prefer blocking issues before install suggestions, including:
  - missing `package.json`
  - missing `next` dependency
  - missing supported router entrypoint
  - missing TypeScript detection
  - unwritable project root
  - unwritable required router patch targets
- Warning-only recommendations may still suggest install after warning visibility is preserved.
