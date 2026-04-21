# Doctor Blocks Manifest Kit Source Spec

## Overview

Validate that the Blocks manifest matches the installed kit source files in the consuming project.

## Requirements

- The doctor command must read `node_modules/nextworks/dist/cli_manifests/blocks_manifest.json` in the consuming project.
- The doctor command must compare manifest-declared files against the installed Blocks packages in the consuming project: `node_modules/@nextworks/blocks-core`, `node_modules/@nextworks/blocks-sections`, and `node_modules/@nextworks/blocks-templates`.
- If a manifest-declared kit file is missing from the kit source, the doctor command must add a warning.
- This check must use the same manifest that install flows use.
