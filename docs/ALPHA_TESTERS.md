# nextworks — Alpha testers / feedback

This repo includes a CLI (`nextworks`) that installs modular Next.js building blocks into your app.

- npm package: https://www.npmjs.com/package/nextworks
- Repo: https://github.com/jblh/nextworks-cli
- CLI docs: `cli/README.md`
- Live demo (Blocks kit): https://nextworks-demo.vercel.app/

## Install (recommended)

From your Next.js app root:

```bash
npx nextworks@latest --help
```

Most reliable alpha install path:

```bash
npx nextworks@latest add blocks --sections --templates
# then (optional)
npx nextworks@latest add auth-core
npx nextworks@latest add forms
npx nextworks@latest add data
```

For full setup steps (env vars, Prisma, routes to try), see: `cli/README.md`.

---

## Where to post feedback

Please use GitHub Discussions:

1. Start here + how to give feedback:
   https://github.com/jblh/nextworks-cli/discussions/1
2. Alpha feedback thread (what broke / what’s missing):
   https://github.com/jblh/nextworks-cli/discussions/2

If you’re not sure where your message belongs, post in #2.

---

## What to include when something breaks

Copy/paste this template into your post:

```text
OS:
Node version:
Next.js version:
Package manager (npm/pnpm/bun):
Command(s) you ran:
Which kit(s):
What happened (paste error output + screenshots if possible):
```

### Extra helpful details (optional)

- New project or existing project?
- App Router or Pages Router?
- TypeScript? Tailwind?
- If relevant: Prisma version + database provider (Neon/Postgres/local Postgres/etc)
- Repro steps (what you did, and what you expected instead)

---

## Quick sanity checks before posting

- Re-run the command with `--help` to confirm flags:

  ```bash
npx nextworks@latest --help
```

- If Prisma is involved (Auth Core / Data), try:

  ```bash
  npx prisma generate
  npx prisma migrate dev
  ```

- Restart your dev server after running `nextworks add ...`.

Thanks for testing — your feedback directly shapes what gets built next.
