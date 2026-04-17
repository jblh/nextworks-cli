# Doctor Exit Codes Spec

## Overview

Set doctor process exit codes from diagnostics.

## Requirements

- The doctor command must exit `0` when there are no error diagnostics.
- The doctor command must exit `1` when one or more error diagnostics are present.
- Warning-only runs must still exit `0`.
