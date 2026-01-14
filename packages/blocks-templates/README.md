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

- Next.js App Router
- Tailwind CSS
- The theme provider and global styles from `@nextworks/blocks-core` are set up.
