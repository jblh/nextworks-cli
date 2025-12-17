# SaaSDashboard Template Theming

This template is preset-first. It’s wrapped with `PresetThemeVars` to apply a sky/blue palette across shared components. Use local overrides sparingly (e.g., a CTA hover state unique to a section).

## Where it’s wired

- Wrapper: `components/templates/saasdashboard/PresetThemeVars.tsx`
- Page: `app/templates/saasdashboard/page.tsx`

## Core variables

- Buttons: `--btn-bg`, `--btn-fg`, `--btn-hover-bg`, `--btn-hover-fg`, `--btn-border`, `--btn-ring`
- Inputs/Textareas: `--input-bg`, `--input-fg`, `--input-placeholder`, `--input-border`, `--input-focus-ring`, `--input-ring-offset`
- Cards: `--card-bg`, `--card-fg`, `--card-title-fg`, `--card-muted-fg`, `--card-border`, `--card-shadow`
- Badges/Chips: `--badge-bg`, `--badge-fg`, `--badge-border`, active: `--badge-active-*`
- Headings: `--heading-fg`, `--subheading-fg`, `--description-fg`
- Footer: `--footer-bg`, `--footer-fg`, `--footer-heading-fg`, `--footer-link-fg`, `--footer-link-hover-fg`, `--footer-link-hover-bg`, `--footer-muted-fg`, `--footer-border`
- Table: `--table-fg`, `--table-muted-fg`, `--table-head-fg`, `--table-border`, `--table-row-hover-bg`

## Per-section overrides

This template should be styled primarily by PresetThemeVars. When a section needs to deviate, set overrides locally and keep them minimal.

Example to emphasize button rings inside Pricing only:

```tsx
<section className="[--btn-ring:theme(colors.sky.600)]">
  <Pricing />
</section>
```

## Outline buttons

For outline variants: set `--btn-bg:transparent` and keep a border width class.

## Should preset components be refactored?

Not required. Over time, simplify presets by removing redundant color classes in favor of the variables. Structure/motion classes should remain.
