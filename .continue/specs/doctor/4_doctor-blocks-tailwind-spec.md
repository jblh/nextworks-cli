# Doctor Blocks Tailwind Spec

## Overview

Add a Tailwind prerequisite check for the Blocks workflow.

## Requirements

- The doctor command must check whether Tailwind CSS appears to be present.
- Tailwind detection must be compatible with Tailwind CSS v4.
- The check must rely on current signals such as:
  - `tailwindcss` in `dependencies` or `devDependencies`
  - CSS-based Tailwind usage if implemented
- The check must not require `tailwind.config.*`.
- If Tailwind is not detected, the doctor command must add a warning.
