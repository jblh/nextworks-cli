# @nextworks/blocks-templates

Pre-assembled page templates built from Nextworks Blocks sections and core components.

Included templates (subject to change):

- Product launch
- SaaS dashboard
- Digital agency
- Gallery

## Recommended: install via the nextworks CLI

Most developers should install Blocks via the **nextworks** CLI (copy-in / shadcn-style) rather than consuming this package directly.

```bash
npx nextworks@latest add blocks --sections --templates
```

- npm (CLI): https://www.npmjs.com/package/nextworks

## Direct installation (advanced)

If you want to consume the compiled templates as a package:

```bash
npm install @nextworks/blocks-templates @nextworks/blocks-sections @nextworks/blocks-core
```

## Usage

```tsx
import { ProductLaunchPage } from "@nextworks/blocks-templates";

export default function Page() {
  return <ProductLaunchPage />;
}
```

These templates assume:

- Tailwind CSS
- Providers + global styles are set up

If you installed via the `nextworks` CLI:

- Templates are copied into your app (router-native):
  - App Router: `app/templates/<template>/**`
  - Pages Router:
    - route entry file: `pages/templates/<template>/index.tsx`
    - supporting template files: `components/templates/<template>/**`
- The CLI patches your router entrypoint to wire up providers, fonts, and CSS.

If you consume packages directly (advanced):

- These components are primarily authored for the Next.js App Router, and you must wrap your app with the appropriate provider(s) from `@nextworks/blocks-core` and ensure global CSS is loaded.
