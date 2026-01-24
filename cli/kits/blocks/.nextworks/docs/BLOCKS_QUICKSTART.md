# Blocks Quickstart (in your project)

This is the fastest path to verify your Blocks install is working and find the right files to edit.

> Blocks is a “copy into your repo” kit (shadcn-style): you own the files and can modify them directly.

---

## 0) Prereqs

- Next.js project (App Router **or** Pages Router)
- TypeScript + Tailwind CSS

---

## 1) Install Blocks (recommended)

From your app root:

```bash
npx nextworks@latest add blocks --sections --templates
npm install
```

> **Alpha note**
> Other kits (Auth Core, Forms, Data) are currently tested and supported on top of a default Blocks install.
> Install Blocks first for the smoothest experience.

---

## 2) Run dev and verify routes

```bash
npm run dev
```

Then visit:

- `http://localhost:3000/templates/productlaunch`
- `http://localhost:3000/templates/saasdashboard`
- `http://localhost:3000/templates/digitalagency`
- `http://localhost:3000/templates/gallery`

If those load and look styled, you’re in good shape.

---

## 3) If styling is missing (quick checks)

Blocks relies on global CSS files:

- `app/globals.css`
- `app/tw-animate.css`

And the correct import location depends on your router:

- **App Router:** `app/layout.tsx` should import `./globals.css` (and `./tw-animate.css` if used).
- **Pages Router:** `pages/_app.tsx` should import:
  - `../app/globals.css`
  - `../app/tw-animate.css`

The CLI normally patches this automatically.

---

## 4) Where the files are

### Template routes

- **App Router:** `app/templates/<template>/page.tsx`
- **Pages Router:** `pages/templates/<template>/index.tsx`

Supporting template components live alongside the template:

- App Router: `app/templates/<template>/**`
- Pages Router: `components/templates/<template>/**` (kept outside `pages/` so helpers aren’t treated as pages)

### Sections and UI primitives

- Sections: `components/sections/**`
- UI primitives: `components/ui/**`

---

## 5) What to edit first (common tasks)

- Customize a template page:
  - edit its route file (see paths above)
  - tweak the imported sections/components

- Customize a reusable section (Navbar/Hero/etc.):
  - edit `components/sections/<Section>.tsx`

- Customize theme/palette:
  - see `.nextworks/docs/THEME_GUIDE.md`
  - start with `lib/themes.ts`
  - each template has a `PresetThemeVars` file you can modify

---

## 6) Need deeper detail?

- `.nextworks/docs/BLOCKS_README.md` (what got installed + where things live)
- `.nextworks/docs/THEME_GUIDE.md` (theme system + presets)
