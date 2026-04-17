# Doctor Installed State Blocks Files Spec

## Overview

Verify representative on-disk files when Blocks is recorded as installed.

## Requirements

- If Blocks is recorded as installed, the doctor command must verify that representative installed files exist on disk.
- If recorded Blocks state and representative on-disk files disagree, the doctor command must add a warning.
- This check must remain read-only and diagnostic.
