# DigitalAgency Template Theming

This template is preset-first. It’s wrapped with `PresetThemeVars` to set a template-wide emerald palette. Shared components read variables with safe token fallbacks. Use local overrides sparingly (e.g., a specific CTA state).

## Where it’s wired

Template paths depend on your router:

- App Router:
  - Wrapper: `app/templates/digitalagency/PresetThemeVars.tsx`
  - Page: `app/templates/digitalagency/page.tsx`
- Pages Router:
  - Wrapper: `components/templates/digitalagency/PresetThemeVars.tsx`
  - Page: `pages/templates/digitalagency/index.tsx`

## Core variables

- Buttons: `--btn-bg`, `--btn-fg`, `--btn-hover-bg`, `--btn-hover-fg`, `--btn-border`, `--btn-ring`
- Inputs/Textareas: `--input-bg`, `--input-fg`, `--input-placeholder`, `--input-border`, `--input-focus-ring`, `--input-ring-offset`
- Cards: `--card-bg`, `--card-fg`, `--card-title-fg`, `--card-muted-fg`, `--card-border`, `--card-shadow`
- Badges/Chips: `--badge-bg`, `--badge-fg`, `--badge-border`, plus active variants
- Headings: `--heading-fg`, `--subheading-fg`, `--description-fg`
- Footer: `--footer-bg`, `--footer-fg`, `--footer-heading-fg`, `--footer-link-fg`, `--footer-link-hover-fg`, `--footer-link-hover-bg`, `--footer-muted-fg`, `--footer-border`
- Table: `--table-fg`, `--table-muted-fg`, `--table-head-fg`, `--table-border`, `--table-row-hover-bg`

## Per-section overrides

This template should be styled primarily by PresetThemeVars. Override on a specific section only when needed:

```tsx
<section className="[--btn-ring:theme(colors.emerald.600)]">
  <CTA />
</section>
```

## Outline buttons

Always set `--btn-bg:transparent` and keep a border width class present when overriding outline colors.

## Should preset components be refactored?

Not mandatory. As you touch presets, prefer removing hard-coded color classes and let the var contract style them. Keep structure (spacing, layout, motion) classes.
