# AIWorkflow Template Theming

This template is preset-first. It wraps the page with `PresetThemeVars` and composes the route from template-local wrappers around shared Nextworks sections.

## Where it’s wired

Template paths depend on your router:

- App Router:
  - Wrapper: `app/templates/aiworkflow/PresetThemeVars.tsx`
  - Page: `app/templates/aiworkflow/page.tsx`
- Pages Router:
  - Wrapper: `components/templates/aiworkflow/PresetThemeVars.tsx`
  - Page: `pages/templates/aiworkflow/index.tsx`

## Composition pattern

The page is composed from local wrappers such as:

- `components/Navbar.tsx`
- `components/Hero.tsx`
- `components/Features.tsx`
- `components/ProcessTimeline.tsx`
- `components/Testimonials.tsx`
- `components/Pricing.tsx`
- `components/FAQ.tsx`
- `components/CTA.tsx`
- `components/Contact.tsx`
- `components/Footer.tsx`
- `components/TrustBadges.tsx`

The local `Hero.tsx` wraps the shared `HeroProductDemo` section with AI workflow-specific copy, scenarios, CTAs, and styling.

## Core variables

- Buttons: `--btn-bg`, `--btn-fg`, `--btn-hover-bg`, `--btn-hover-fg`, `--btn-border`, `--btn-ring`
- Inputs/Textareas: `--input-bg`, `--input-fg`, `--input-placeholder`, `--input-border`, `--input-focus-ring`, `--input-ring-offset`
- Cards: `--card-bg`, `--card-fg`, `--card-title-fg`, `--card-muted-fg`, `--card-border`, `--card-shadow`
- Badges/Chips: `--badge-bg`, `--badge-fg`, `--badge-border`, active: `--badge-active-*`
- Headings: `--heading-fg`, `--subheading-fg`, `--description-fg`
- Footer: `--footer-bg`, `--footer-fg`, `--footer-heading-fg`, `--footer-link-fg`, `--footer-link-hover-fg`, `--footer-link-hover-bg`, `--footer-muted-fg`, `--footer-border`
- Table: `--table-fg`, `--table-muted-fg`, `--table-head-fg`, `--table-border`, `--table-row-hover-bg`

## Per-section overrides

Prefer the shared preset variables first. Only add local overrides when a section needs a distinct accent or contrast treatment.
