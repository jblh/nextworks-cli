Blocks kit (cli/kits/blocks)

This folder contains the files that the CLI copies into a target Next.js project when installing the "blocks" kit.

What the kit includes

- UI primitive components (Button, Input, Card, Form primitives, Checkbox, Switch, Toaster)
- Sections and templates (About, CTA, Contact, Hero variants, Navbar, Pricing, Features, etc.)
- Theme and provider utilities (theme-provider, enhanced-theme-provider, lib/themes)
- app/globals.css and placeholder assets used by templates

Install behavior

> **Alpha note**
> Other kits (Auth Core, Forms, Data) are currently tested and supported on top of a Blocks install that includes sections and templates. For the smoothest experience, run `npx nextworks@latest add blocks --sections --templates` before adding additional kits.

- For a full UI kit, run `npx nextworks@latest add blocks --sections --templates` to install **core UI primitives, sections, and templates** so the example templates work out of the box.
- You can pass flags to control what gets installed:
  - `npx nextworks@latest add blocks --ui-only` → core UI primitives only (no sections/templates).
  - `npx nextworks@latest add blocks --sections` → core + sections only.
  - `npx nextworks@latest add blocks --templates` → core + templates only.
  - `npx nextworks@latest add blocks --sections --templates` → same as the default (core + sections + templates).

Files included are defined in `cli/cli_manifests/blocks_manifest.json` in the Nextworks repository. When updating this kit inside the repo, keep that manifest and this kit folder in sync.

Post-install notes

1. Install dependencies copied by the kit (the CLI will merge package-deps.json into your package.json):

   npm install

2. Wrap your app with the AppProviders wrapper in app/layout.tsx to enable fonts, presets, CSS variable injection, session provider, and the app toaster. Example:

   // at the top of app/layout.tsx
   import "./globals.css"; // optional if you already import it elsewhere in your project
   import AppProviders from "@/components/app-providers";

   export default function RootLayout({ children }) {
   return (
   <html lang="en">
   <body>
   <AppProviders>
   {children}
   </AppProviders>
   </body>
   </html>
   );
   }

   Notes:
   - AppProviders imports globals.css for you, so you don't strictly need to import it separately, but ensure you have the file copied into your project (app/globals.css).
   - If you prefer to only use the EnhancedThemeProvider, you can still import it directly from "@/components/enhanced-theme-provider".

3. Ensure `app/globals.css` exists in your project and that Tailwind is configured.

4. Placeholder assets are located under `public/placeholders`. These should already have been copied by the CLI; if you move files around, keep the paths aligned or update the template image references.

Publishing notes (for maintainers)

- This kit is UI-only and has no server/api or prisma files.
- The manifest file `cli/cli_manifests/blocks_manifest.json` is used by the CLI to determine which files to copy when you build and publish the `nextworks` CLI.

CLI behavior (for maintainers)

- The CLI copies the files listed in `cli/cli_manifests/blocks_manifest.json`. Keep that manifest and this kit folder in sync when editing the Nextworks repo.
