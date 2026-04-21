# Doctor Blocks Destination Collisions Templates Spec

## Overview

Extend collision detection to template destinations.

## App Router Paths

- `app/templates/<template>/page.tsx`
- Supporting files under `app/templates/<template>/**`
- Current template folders: `productlaunch`, `saasdashboard`, `digitalagency`, and `gallery`
- For Pages Router projects, template destinations rewrite into `pages/templates/<template>/index.tsx` and `components/templates/<template>/**` for those same four templates.

## Requirements

- The doctor command must include template destination paths in collision detection.
- For Pages Router projects, collision detection must respect template rewriting into:
  - `pages/templates/<template>/index.tsx`
  - `components/templates/<template>/**`
- If a template destination already exists, the doctor command must add a warning.
