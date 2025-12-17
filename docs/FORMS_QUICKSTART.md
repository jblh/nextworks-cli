# Forms Quickstart — Example page

This short doc points to the minimal example that demonstrates how to use the Forms primitives with Select, Checkbox and Switch components. It also documents the ApiResult pattern for mapping server field errors into react-hook-form and points to the per-field async validation helper used in the signup form.

> To add these examples and primitives to your own app via the CLI, run:
>
> ```bash
> npx nextworks add forms
> ```
>
> The CLI will copy the Forms primitives and example pages into your `components/ui/form/*`, `components/hooks/`, `lib/validation/*`, and `app/examples/forms/*` directories.

Where to find the example

- Example page: /examples/forms/basic
  - Full path in repo: app/examples/forms/basic/page.tsx

What the example shows

- react-hook-form + zodResolver integration using the project's Form primitives
- Usage of Select, Checkbox and Switch UI components with FormField (which uses RHF Controller under the hood)
- A minimal submit handler (client-side) you can copy/replace with your API call

How to try it locally

1. Start the dev server:
   npm run dev
2. Open your browser and visit:
   http://localhost:3000/examples/forms/basic

Tip: If you change the Prisma schema, run:
npx prisma generate
npx prisma migrate dev

Copy/paste tips for your app

- Import Form primitives and controls from:
  - components/ui/form/\* (Form, FormField, FormItem, FormLabel, FormControl, FormMessage)
  - components/ui/select.tsx, components/ui/checkbox.tsx, components/ui/switch.tsx
- The example shows how to forward checkbox/switch changes to RHF by using f.onChange(e.target.checked) and setting checked={!!f.value}.

If you want the example to submit to your API, replace the onSubmit handler's console/alert with a fetch() call or server action.

---

Kit manifest & files (for packaging)

If you plan to package a Forms kit (CLI or manual copy), here are the primary files used by the examples and primitives. This manifest is for documentation and packaging reference.

Files

- components/ui/form/form.tsx
- components/ui/form/form-field.tsx
- components/ui/form/form-item.tsx
- components/ui/form/form-control.tsx
- components/ui/form/form-description.tsx
- components/ui/form/form-label.tsx
- components/ui/form/form-message.tsx
- components/ui/select.tsx
- components/ui/checkbox.tsx
- components/ui/switch.tsx
- components/hooks/useCheckUnique.ts
- lib/validation/forms.ts
- lib/validation/wizard.ts
- lib/forms/map-errors.ts
- app/examples/forms/basic/page.tsx
- app/examples/forms/server-action/page.tsx
- app/examples/forms/server-action/form-client.tsx
- app/examples/forms/wizard/wizard-client.tsx
- app/examples/forms/wizard/page.tsx

API routes (used by examples)

- app/api/wizard/route.ts

Notes

- The Forms primitives are UI-only and do not require Prisma or NextAuth to function. The server-action example and the mapping helper demonstrate how to validate server-side and map errors back to react-hook-form.
- If you are packaging the kit, consider copying only components/ui/form/\* and the select/checkbox/switch files, plus the example pages if you want to keep the demo pages.

If you want, I can create docs/FORMS_MANIFEST.json in the repo with the above manifest for the CLI packaging step.
