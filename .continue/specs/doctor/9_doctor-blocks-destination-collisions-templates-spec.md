# Doctor Blocks Destination Collisions Templates Spec

## Overview

Extend collision detection to template destinations.

## Requirements

- The doctor command must include template destination paths in collision detection.
- For Pages Router projects, collision detection must respect template rewriting into:
  - `pages/templates/<template>/index.tsx`
  - `components/templates/<template>/**`
- If a template destination already exists, the doctor command must add a warning.
