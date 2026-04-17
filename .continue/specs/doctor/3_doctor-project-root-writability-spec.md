# Doctor Project Root Writability Spec

## Overview

Add a fatal filesystem check for project root writability.

## Requirements

- The doctor command must check whether the current project root is writable.
- If the project root is not writable, the doctor command must add an error.
- This check must be separate from router patch target writability checks.
- The result must remain read-only and diagnostic.
