# @nextworks/blocks-templates

Pre-assembled page templates built from Nextworks Blocks sections and core components.

Included templates (subject to change):

- Product launch
- SaaS dashboard
- Digital agency
- Gallery

## Installation

```bash
npm install @nextworks/blocks-templates @nextworks/blocks-sections @nextworks/blocks-core
# or
pnpm add @nextworks/blocks-templates @nextworks/blocks-sections @nextworks/blocks-core
# or
yarn add @nextworks/blocks-templates @nextworks/blocks-sections @nextworks/blocks-core
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

If you prefer working with source files copied into your app (instead of consuming compiled templates), use the `nextworks` CLI:

```bash
npx nextworks add blocks
```
