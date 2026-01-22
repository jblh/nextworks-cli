# @nextworks/blocks-sections

Reusable page sections for marketing / SaaS sites, built on top of `@nextworks/blocks-core`.

Examples include:

- Navbar, Hero, Features, Pricing, Testimonials
- FAQ, Contact, Newsletter
- Portfolio, Services, Team, Trust badges

## Recommended: install via the nextworks CLI

Most developers should install Blocks via the **nextworks** CLI (copy-in / shadcn-style) rather than consuming this package directly.

```bash
npx nextworks@latest add blocks --sections --templates
```

- npm (CLI): https://www.npmjs.com/package/nextworks

## Direct installation (advanced)

If you want to consume the compiled sections as a package:

```bash
npm install @nextworks/blocks-sections @nextworks/blocks-core
```

## Usage

```tsx
import { Navbar, Hero, Features, Pricing } from "@nextworks/blocks-sections";

export default function Page() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
    </>
  );
}
```

These components assume you have Tailwind + React + Next.js configured and that your app is wrapped with the appropriate provider(s).

- If you installed via the `nextworks` CLI, this is handled for you (the CLI patches your router entrypoint to wrap with the kit-local `AppProviders`).
- If you consume packages directly, you’ll need to wrap your app with the relevant providers from `@nextworks/blocks-core` in your router entrypoint (App Router `app/layout.tsx` or Pages Router `pages/_app.tsx`).
