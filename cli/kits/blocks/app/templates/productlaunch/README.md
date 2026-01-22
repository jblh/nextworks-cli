# ProductLaunch Template Theming

This template intentionally does NOT wrap the page with PresetThemeVars. It serves as the component-level styling example where individual preset components set CSS variables locally on their slots (buttons, cards, inputs, etc.).

Shared components read these variables with token fallbacks, so if a var is not set, design tokens still apply safely.

## Where to look

Template paths depend on your router:

- App Router:
  - Page: `app/templates/productlaunch/page.tsx` (PresetThemeVars is commented out)
  - Components: `app/templates/productlaunch/components/*` (slots use Tailwind arbitrary properties like `[--btn-bg:...]` to set vars locally)

- Pages Router:
  - Page: `pages/templates/productlaunch/index.tsx` (PresetThemeVars is commented out)
  - Components: `components/templates/productlaunch/components/*`

## Core variables

- Buttons: `--btn-bg`, `--btn-fg`, `--btn-hover-bg`, `--btn-hover-fg`, `--btn-border`, `--btn-ring`
- Inputs/Textareas: `--input-bg`, `--input-fg`, `--input-placeholder`, `--input-border`, `--input-focus-ring`, `--input-ring-offset`
- Cards: `--card-bg`, `--card-fg`, `--card-title-fg`, `--card-muted-fg`, `--card-border`, `--card-shadow`
- Badges/Chips: `--badge-bg`, `--badge-fg`, `--badge-border`, plus active: `--badge-active-bg`, `--badge-active-fg`, `--badge-active-border`
- Headings: `--heading-fg`, `--subheading-fg`, `--description-fg`
- Footer: `--footer-bg`, `--footer-fg`, `--footer-heading-fg`, `--footer-link-fg`, `--footer-link-hover-fg`, `--footer-link-hover-bg`, `--footer-muted-fg`, `--footer-border`
- Table: `--table-fg`, `--table-muted-fg`, `--table-head-fg`, `--table-border`, `--table-row-hover-bg`

## Per-section overrides (examples)

Because this template is component-first, most styling is set directly in the component props. You can still scope vars on a section wrapper when it’s convenient:

```tsx
<section className="[--btn-ring:theme(colors.purple.600)] dark:[--btn-ring:theme(colors.purple.500)]">
  <CTA />
</section>
```

Contact input borders example:

```tsx
<section className="[--input-border:theme(colors.purple.200)] dark:[--input-border:theme(colors.purple.700)]">
  <Contact />
</section>
```

## Outline buttons

When styling outline buttons, set `--btn-bg:transparent` and keep a border width class (e.g., `border` or `border-2`).

```tsx
<Button
  variant="outline"
  className="border [--btn-bg:transparent] [--btn-border:theme(colors.purple.600)] [--btn-fg:theme(colors.purple.600)] hover:[--btn-hover-bg:theme(colors.purple.50)] hover:[--btn-hover-fg:theme(colors.purple.600)]"
>
  Outline
</Button>
```

## Do I need to refactor preset components?

Not required. This template is intentionally left as an example of component-level styling. Over time, you can still deduplicate color classes by relying on the shared var contract while keeping structure/spacing classes.
