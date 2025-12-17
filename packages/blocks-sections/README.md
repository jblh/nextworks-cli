# @nextworks/blocks-sections

Reusable page sections for marketing / SaaS sites, built on top of `@nextworks/blocks-core`.

Examples include:

- Navbar, Hero, Features, Pricing, Testimonials
- FAQ, Contact, Newsletter
- Portfolio, Services, Team, Trust badges

## Installation

```bash
npm install @nextworks/blocks-sections @nextworks/blocks-core
# or
pnpm add @nextworks/blocks-sections @nextworks/blocks-core
# or
yarn add @nextworks/blocks-sections @nextworks/blocks-core
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

These components assume you have a Tailwind + React + Next.js setup and that you wrap your app with the appropriate theme provider from `@nextworks/blocks-core`.

For a copy-based workflow (files under `components/` and `app/` in your own app), use the CLI:

```bash
npx nextworks add blocks
```
