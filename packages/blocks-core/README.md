# @nextworks/blocks-core

Core UI primitives and theme utilities used by the Nextworks Blocks kits.

This package provides:

- Base UI components (Button, Input, Card, Checkbox, Select, Switch, etc.)
- Theme helpers and providers
- Types and helpers shared by other `@nextworks/blocks-*` packages

## Recommended: install via the nextworks CLI

Most developers should install Blocks via the **nextworks** CLI (copy-in / shadcn-style) rather than consuming this package directly.

```bash
npx nextworks@latest add blocks --sections --templates
```

- npm (CLI): https://www.npmjs.com/package/nextworks

## Direct installation (advanced)

If you’re building on top of the compiled `@nextworks/blocks-*` packages, you can install this package directly:

```bash
npm install @nextworks/blocks-core
```

You will typically not use this package directly unless you are composing your own blocks or building on top of `@nextworks/blocks-sections` or `@nextworks/blocks-templates`.
