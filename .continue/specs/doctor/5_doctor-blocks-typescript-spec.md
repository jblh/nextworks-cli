# Doctor Blocks TypeScript Spec

## Overview

Add a TypeScript prerequisite check for the Blocks workflow.

## Requirements

- The doctor command must check whether TypeScript readiness is present.
- TypeScript readiness must use these signals:
  - `tsconfig.json` exists
  - or `typescript` exists in `dependencies` or `devDependencies`
- If TypeScript is not detected, the doctor command must add an error.
