# Coding Standards

## Scope

This repository is a **TypeScript monorepo for the nextworks CLI and Blocks kit**, not a single Next.js application.

The main code surfaces are:

- `cli/src/**` - CLI commands and install/remove/doctor logic
- `cli/kits/blocks/**` - installable copy-in kit files
- `packages/blocks-core/**` - shared UI primitives, providers, theme helpers
- `packages/blocks-sections/**` - reusable marketing sections
- `packages/blocks-templates/**` - template compositions built from shared sections
- `cli_manifests/**` - manifest-driven install definitions
- `docs/**` - product, install, and safety documentation

Standards should reflect those surfaces. Do not assume normal app-only conventions.

## TypeScript

- Strict mode enabled
- Prefer proper typing over `any`; use `unknown` when needed and narrow it deliberately
- Define interfaces/types for props, manifest shapes, install-tracking data, and other structured objects
- Use type inference where obvious, explicit types where helpful
- Prefer small, composable utility functions over loosely typed ad hoc logic
- For CLI JSON/file manipulation, keep parsing and shape validation clear and defensive

## React

- Functional components only
- Use hooks for state and effects in client components
- Keep components focused; shared components should expose small, reusable APIs
- Prefer composition over deep specialization
- Preserve the existing override pattern used throughout the kit:
  - `className` at the root
  - slot-style override objects like `section`, `container`, `heading`, `image`, `card`, etc.
- Template components should generally compose shared sections/core primitives rather than reimplementing them from scratch

## Next.js and Router Compatibility

This repo targets **consumer Next.js projects** and must support both **App Router** and **Pages Router**.

- Use server-safe and client-safe boundaries intentionally
- Only use `'use client'` where required by hooks, browser APIs, interactivity, or client-only providers
- Keep App Router and Pages Router support in mind when changing kit/provider behavior
- Do not assume the consuming project uses only `/app`; hybrid `/app` + `/pages` setups are supported
- When working on installed template paths, preserve router-native output:
  - App Router: `app/templates/<template>/**`
  - Pages Router route entry: `pages/templates/<template>/index.tsx`
  - Pages Router helpers: `components/templates/<template>/**`
- Do not move Pages Router helper files under `pages/`, because Next may treat them as routable pages
- Provider wiring must remain stable for copied projects; preserve the local shim pattern like `components/app-providers.tsx`

## CLI and Install Architecture

- Prefer manifest-driven install behavior over hardcoded file lists when possible
- Keep CLI file operations idempotent and safe to re-run
- Preserve overwrite-awareness and git-first safety messaging in docs and CLI output
- When patching consumer files (`app/layout.tsx`, `pages/_app.tsx`, `pages/_document.tsx`), use conservative string transforms and avoid destructive rewrites
- Keep package-manager-specific behavior explicit and correct for npm, pnpm, and yarn
- Keep install tracking in `.nextworks/config.json` accurate when adding/removing kit behavior
- If a change affects copied files, verify the kit files, package source, manifest entries, and docs stay aligned
- In CLI code, preserve the existing ESM/CJS interop approach for ESM-only dependencies. Do not replace runtime dynamic imports (such as the `inquirer` loading pattern) with static imports unless the build/runtime target is updated intentionally.

## Tailwind CSS v4

**CRITICAL**: The Blocks kit targets Tailwind CSS v4, which uses CSS-based configuration.

- Do not introduce `tailwind.config.ts` or `tailwind.config.js` requirements into the kit guidance
- Theme configuration should live in CSS with `@theme` and CSS custom properties
- Prefer CSS variable contracts for theming and preset customization
- Keep `app/globals.css` and vendored `app/tw-animate.css` behavior aligned with install expectations
- Avoid JavaScript-based Tailwind config assumptions in docs or generated files

Example v4 configuration:

```css
@import "tailwindcss";

@theme {
  --color-primary: oklch(50% 0.2 250);
}
```

## File Organization

Use repo-specific conventions:

- CLI commands: `cli/src/commands/*.ts`
- CLI utilities: `cli/src/utils/*.ts`
- Kit assets copied into user projects: `cli/kits/blocks/**`
- Shared package source:
  - `packages/blocks-core/src/**`
  - `packages/blocks-sections/src/**`
  - `packages/blocks-templates/src/**`
- Install manifests: `cli_manifests/*.json`
- Documentation: `docs/**` and `cli/kits/blocks/.nextworks/docs/**`

When adding features, place code according to whether it belongs to:

- CLI orchestration
- reusable source packages
- copied kit output
- manifests/docs

## Naming

- Components: PascalCase (`HeroSplit.tsx`, `PresetThemeVars.tsx`)
- React component files: usually match the component name
- Utility files: kebab-case or descriptive lowercase names matching existing patterns
- Functions: camelCase
- Constants: SCREAMING_SNAKE_CASE when they are true constants
- Types/interfaces: PascalCase without `I` prefixes
- Template slugs and install paths should remain stable and descriptive

## Styling and Theming

- Tailwind CSS is the default styling mechanism
- Use the existing shadcn-style/local-component approach rather than introducing a separate UI system
- Prefer CSS custom properties and existing token hooks like `--btn-*`, `--card-*`, `--input-*`, `--badge-*`, `--footer-*`, and `--table-*`
- Shared components should keep `className` override surfaces intact
- Preset/template styling should primarily happen through CSS variable wrappers such as `PresetThemeVars`
- Avoid inline styles unless there is a strong reason and the component API already supports them intentionally
- Keep dark mode support intact when changing component or preset styling

## Providers and Theme System

- Respect the separation between client-safe and server-only provider surfaces
- Do not import server-only theme helpers into Pages Router-safe client entrypoints
- Keep font ownership in the consuming app entrypoints, not inside shared packages, for Turbopack compatibility
- Preserve cookie/localStorage/theme-variable behavior when updating theme providers
- Changes to providers should be tested mentally against App Router, Pages Router, and hybrid installs

## Documentation and Manifest Sync

- If install behavior changes, update the relevant README/docs/manifests in the same change
- Keep `README.md`, `cli/README.md`, `docs/**`, and copied kit docs consistent with actual CLI behavior
- If a file is added/removed from the kit, ensure `cli_manifests/blocks_manifest.json` reflects it
- Update `CHANGELOG.md` only for user-facing CLI behavior, install behavior, copied kit output, compatibility, or meaningful docs/troubleshooting changes; skip purely internal refactors, tests, CI, comments, and context-doc updates
- Prefer explicit safety/troubleshooting notes over vague promises in docs

## Error Handling

- Use clear try/catch boundaries in CLI and file-operation flows
- Error messages should help users recover: include what failed and what they may need to check manually
- Prefer best-effort behavior only when the command/documentation makes that clear
- Avoid swallowing meaningful errors silently unless failure is intentionally non-fatal

## Code Quality

- No commented-out code unless there is a strong short-term reason
- No unused imports or variables
- Keep functions reasonably focused, but prefer clarity over arbitrary line-count rules
- Preserve idempotency where commands may be run multiple times
- Avoid breaking copied-project stability for the sake of local refactors
- When changing one layer of the system, check the adjacent layers too:
  - package source
  - copied kit files
  - manifests
  - docs
  - smoke-test assumptions
