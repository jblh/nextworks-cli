# Doctor Blocks Manifest Kit Source Spec

## Overview

Validate that the Blocks manifest matches the kit source files.

## Requirements

- The doctor command must read `cli_manifests/blocks_manifest.json`.
- The doctor command must compare manifest-declared files against `cli/kits/blocks`.
- If a manifest-declared kit file is missing from the kit source, the doctor command must add a warning.
- This check must use the same manifest that install flows use.
