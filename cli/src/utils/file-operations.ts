import fs from "fs-extra";
import path from "path";
import {
  buildDefaultPagesDocument,
  patchPagesDocumentFile,
} from "./next-pages-document";

/**
 * Resolve a runtime asset path. Prefer the compiled dist folder (which is
 * what we ship to consumers), and fall back to the package root for local dev.
 */
export function resolveAssetPath(...segments: string[]): string {
  // __dirname here is typically:
  //  - dist/utils at runtime for consumers
  //  - src/utils during local development
  const distRoot = path.resolve(__dirname, "..");
  const candidateDist = path.join(distRoot, ...segments);
  if (fs.existsSync(candidateDist)) return candidateDist;

  // Fallback to the package root (useful when running with ts-node locally)
  const pkgRoot = path.resolve(__dirname, "..", "..");
  return path.join(pkgRoot, ...segments);
}

function normalizeToPosix(p: string): string {
  return p.replace(/\\/g, "/");
}

export async function detectProjectRootMode(targetDir: string): Promise<
  "src" | "root"
> {
  // create-next-app --src-dir typically creates src/app and src/*
  const srcApp = path.join(targetDir, "src", "app");
  if (await fs.pathExists(srcApp)) return "src";

  // Fallback: if src/ exists at all, prefer it (common TS setups)
  const srcDir = path.join(targetDir, "src");
  if (await fs.pathExists(srcDir)) return "src";

  return "root";
}

export function mapKitPathToProject(
  relativeFile: string,
  mode: "src" | "root",
  routerTarget: "app" | "pages" = "app",
): string {
  const file = normalizeToPosix(relativeFile);

  // For src-dir apps, write most common top-level folders into src/.
  // But keep Next.js config and the public/ folder at the project root.
  const srcMappedPrefixes = ["components/", "lib/", "types/", "styles/"];
  const rootOnlyPrefixes = ["public/", ".nextworks/"];
  const rootOnlyFiles = new Set(["next.config.ts", "next.config.js"]);

  // Router-specific mapping:
  // - In App Router installs, templates live under app/templates/*.
  // - In Pages Router installs, templates should live under pages/templates/*.
  //   (This prevents hybrid installs when a project has an app/ folder but no layout.)
  const rewriteTemplatesForPagesRouter = (p: string) => {
    if (routerTarget !== "pages") return p;
    if (!p.startsWith("app/templates/")) return p;

    // app/templates/x/page.tsx -> pages/templates/x.tsx
    const rest = p.slice("app/templates/".length);
    const pageMatch = rest.match(/^([^/]+)\/page\.(tsx|ts|jsx|js)$/);
    if (pageMatch) {
      const slug = pageMatch[1];
      const ext = pageMatch[2];
      return `pages/templates/${slug}.${ext}`;
    }

    // app/templates/x/* -> pages/templates/x/* (README, components, PresetThemeVars, etc.)
    return `pages/templates/${rest}`;
  };

  const rewritten = rewriteTemplatesForPagesRouter(file);

  if (mode === "src") {
    if (rootOnlyFiles.has(rewritten)) return rewritten;
    if (rootOnlyPrefixes.some((p) => rewritten.startsWith(p))) return rewritten;

    if (srcMappedPrefixes.some((p) => rewritten.startsWith(p))) {
      return `src/${rewritten}`;
    }

    // app/ and pages/ are ambiguous: in src-dir apps they should be src/app and src/pages.
    if (rewritten.startsWith("app/") || rewritten.startsWith("pages/")) {
      return `src/${rewritten}`;
    }
  }

  return rewritten;
}

export async function copyFiles(
  sourceDir: string,
  targetDir: string,
  files: string[],
): Promise<void> {
  const mode = await detectProjectRootMode(targetDir);

  // Router detection (for correct template placement)
  const appRouterLayout = mode === "src" ? "src/app/layout.tsx" : "app/layout.tsx";
  const pagesRouterApp = mode === "src" ? "src/pages/_app.tsx" : "pages/_app.tsx";

  const hasAppRouter = await fs.pathExists(path.join(targetDir, appRouterLayout));
  const hasPagesRouter = await fs.pathExists(path.join(targetDir, pagesRouterApp));

  // If layout exists, treat as App Router. Otherwise if pages/_app exists, treat as Pages Router.
  // (In hybrid repos with both, we keep templates under app/ since App Router exists.)
  const routerTarget: "app" | "pages" = hasAppRouter ? "app" : hasPagesRouter ? "pages" : "app";

  for (const file of files) {
    // Special case: router-specific app-providers implementation.
    // We always install components/app-providers.tsx (the shim), but only install
    // one of the router variants:
    // - App Router: components/app-providers.app.tsx
    // - Pages Router: components/app-providers.pages.tsx
    const normalized = normalizeToPosix(file);
    if (
      normalized === "components/app-providers.app.tsx" ||
      normalized === "components/app-providers.pages.tsx"
    ) {
      // If the project clearly uses Pages Router (no app/layout.tsx but has pages/_app.tsx),
      // skip copying the App Router variant.
      if (hasPagesRouter && !hasAppRouter && normalized.endsWith(".app.tsx")) {
        continue;
      }

      // If the project clearly uses App Router (has app/layout.tsx),
      // skip copying the Pages Router variant.
      if (hasAppRouter && normalized.endsWith(".pages.tsx")) {
        continue;
      }

      // If both routers exist (hybrid repo), copy both.
    }

    const sourcePath = path.join(sourceDir, file);
    const mapped = mapKitPathToProject(file, mode, routerTarget);
    const targetPath = path.join(targetDir, mapped);

    // Ensure target directory exists
    await fs.ensureDir(path.dirname(targetPath));

    // Copy file
    await fs.copy(sourcePath, targetPath);
    console.log(`✓ Created ${mapped}`);
  }
}

export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function readJsonFile(filePath: string): Promise<any> {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    throw new Error(`Failed to read JSON file ${filePath}: ${error}`);
  }
}

export async function writeJsonFile(
  filePath: string,
  data: any,
): Promise<void> {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2) + "\n");
  } catch (error) {
    throw new Error(`Failed to write JSON file ${filePath}: ${error}`);
  }
}

export async function updatePackageJson(deps: any): Promise<void> {
  const packageJsonPath = "package.json";

  if (!(await fileExists(packageJsonPath))) {
    throw new Error(
      "package.json not found. Make sure you are in a Next.js project root.",
    );
  }

  const packageJson = await readJsonFile(packageJsonPath);

  // Merge dependencies
  if (deps.dependencies) {
    packageJson.dependencies = {
      ...packageJson.dependencies,
      ...deps.dependencies,
    };
  }

  if (deps.devDependencies) {
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      ...deps.devDependencies,
    };
  }

  // Merge npm overrides (for pinning transitive deps safely)
  if (deps.overrides) {
    packageJson.overrides = {
      ...packageJson.overrides,
      ...deps.overrides,
    };
  }

  await writeJsonFile(packageJsonPath, packageJson);
  console.log("✓ Updated package.json");
}

export async function updateLayoutFile(): Promise<void> {
  const layoutPath = "app/layout.tsx";

  if (!(await fileExists(layoutPath))) {
    console.log(
      "⚠️  app/layout.tsx not found. You may need to manually add SessionProvider.",
    );
    return;
  }

  let content = await fs.readFile(layoutPath, "utf-8");

  // Check if SessionProvider is already imported
  if (content.includes("AppSessionProvider")) {
    console.log("⚠️  SessionProvider already exists in layout.tsx");
    return;
  }

  // Add import after the last import statement
  const importRegex = /import\s+.*?from\s+["'].*?["'];?\s*$/gm;
  const imports = content.match(importRegex);

  if (imports && imports.length > 0) {
    const lastImport = imports[imports.length - 1];
    const lastImportIndex = content.lastIndexOf(lastImport);
    const insertIndex = lastImportIndex + lastImport.length;

    content =
      content.slice(0, insertIndex) +
      '\nimport AppSessionProvider from "@/components/session-provider";' +
      content.slice(insertIndex);
  } else {
    // Fallback: add import at the top
    content =
      'import AppSessionProvider from "@/components/session-provider";\n' +
      content;
  }

  // Wrap the entire body content with SessionProvider
  content = content.replace(
    /<body[^>]*>([\s\S]*?)<\/body>/,
    (match: string, bodyContent: string) => {
      if (bodyContent.includes("<AppSessionProvider>")) {
        return match; // Already wrapped
      }

      // Wrap the entire body content
      const wrappedBodyContent = `<AppSessionProvider>${bodyContent}</AppSessionProvider>`;
      return match.replace(bodyContent, wrappedBodyContent);
    },
  );

  await fs.writeFile(layoutPath, content);
  console.log("✓ Updated app/layout.tsx with SessionProvider");
}

export async function updateLayoutWithAppProviders(): Promise<void> {
  const mode = await detectProjectRootMode(process.cwd());
  const layoutPath = mode === "src" ? "src/app/layout.tsx" : "app/layout.tsx";

  if (!(await fileExists(layoutPath))) {
    console.log(
      "⚠️  app/layout.tsx not found. You may need to manually add AppProviders.",
    );
    return;
  }

  let content = await fs.readFile(layoutPath, "utf-8");

  // Collect existing import statements.
  // This must handle multi-line imports and semicolon-less style (common in Next starter templates).
  // We'll match from `import` until either a semicolon OR a newline that looks like the start of
  // another statement.
  const importStatementsRegex =
    /^import[\s\S]*?(?:;\s*|\r?\n(?=(?:import\s|export\s|const\s|let\s|var\s|function\s|class\s|\/\/|\/\*|$)))/gm;
  const imports = content.match(importStatementsRegex) ?? [];
  const lastImport = imports[imports.length - 1] ?? "";
  const lastImportIndex = lastImport
    ? content.lastIndexOf(lastImport) + lastImport.length
    : 0;

  const ensureImport = (importLine: string) => {
    // Normalize whitespace for a safer containment check.
    const normalizedContent = content.replace(/\s+/g, " ");
    const normalizedImportLine = importLine.replace(/\s+/g, " ");

    if (normalizedContent.includes(normalizedImportLine)) return;

    // Insert after the last import and guarantee a trailing newline so we don't
    // create `...;const ...` when the next token is a statement.
    const prefix = content.slice(0, lastImportIndex);
    const suffix = content.slice(lastImportIndex);

    const needsLeadingNewline = lastImportIndex > 0 && !prefix.endsWith("\n");
    const needsTrailingNewline = suffix.length > 0 && !suffix.startsWith("\n");

    content =
      prefix +
      (needsLeadingNewline ? "\n" : "") +
      importLine +
      "\n" +
      (needsTrailingNewline ? "\n" : "") +
      suffix;
  };

  // Ensure imports for AppProviders and AppToaster only (no auth/session here)
  ensureImport('import AppProviders from "@/components/app-providers";');
  ensureImport('import AppToaster from "@/components/ui/toaster";');

  // Turbopack-safe: fonts should be owned by the consuming app/layout.tsx,
  // not by @nextworks/blocks-core/server.
  //
  // Avoid duplicate imports if the user's layout already imports next/font/google.
  // Must handle multi-line imports (common with formatters), semicolon-less style, and avoid producing
  // partial/broken imports.
  const googleFontImportRegex =
    /import\s*\{([\s\S]*?)\}\s*from\s*["']next\/font\/google["']\s*;?/m;

  // If a previous buggy patch run left a broken `import { ... }` with no `from`,
  // remove it so we can re-add a correct one.
  const brokenGoogleFontImportRegex =
    /import\s*\{[\s\S]*?\}\s*(?:\r?\n)+\s*(?=const\s)/m;

  const desiredFontNames = [
    "Geist",
    "Geist_Mono",
    "Outfit",
    "Inter",
    "Poppins",
  ];

  // Clean up any broken import (best-effort)
  if (brokenGoogleFontImportRegex.test(content)) {
    content = content.replace(brokenGoogleFontImportRegex, "");
  }

  const existingGoogleFontImport = content.match(googleFontImportRegex);

  // We'll insert font instances immediately after the google font import if it exists.
  // This avoids splitting the import block even when imports are semicolon-less or multi-line.
  let afterGoogleImportIndex: number | null = null;

  if (existingGoogleFontImport) {
    const existingList = existingGoogleFontImport[1]
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const merged = Array.from(
      new Set([...existingList, ...desiredFontNames]),
    ).sort();

    const mergedImportLine = `import { ${merged.join(", ")} } from "next/font/google";`;

    // Replace exactly the matched import (which may be multi-line).
    const matchText = existingGoogleFontImport[0];
    const matchStart = existingGoogleFontImport.index ?? content.indexOf(matchText);
    const matchEnd = matchStart + matchText.length;

    content =
      content.slice(0, matchStart) +
      mergedImportLine +
      content.slice(matchEnd);

    afterGoogleImportIndex = matchStart + mergedImportLine.length;
  } else {
    const fontImportLine =
      'import { Geist, Geist_Mono, Outfit, Inter, Poppins } from "next/font/google";';
    ensureImport(fontImportLine);

    // If we just inserted it, prefer inserting font instances immediately after it.
    const insertedIdx = content.indexOf(fontImportLine);
    if (insertedIdx !== -1) {
      afterGoogleImportIndex = insertedIdx + fontImportLine.length;
    }
  }

  // Ensure font instances exist (idempotent).
  // These must exist if we reference geistSans/geistMono/outfit/inter/poppins in <body className>.
  // We add missing blocks individually so we don't depend on a specific starter layout template.
  const ensureFontInstance = (marker: string, block: string) => {
    if (content.includes(marker)) return;

    // Prefer inserting right after the `next/font/google` import (most stable),
    // otherwise fall back to after the last import.
    const insertAt = afterGoogleImportIndex ?? lastImportIndex;
    content =
      content.slice(0, insertAt) +
      "\n" +
      block.trim() +
      "\n\n" +
      content.slice(insertAt);

    // Keep the insertion point stable for subsequent font blocks in this run.
    if (afterGoogleImportIndex != null) {
      afterGoogleImportIndex =
        insertAt + 1 + block.trim().length + 2; // \n + block + \n\n
    }
  };

  // Geist starter template uses subsets, no weight.
  ensureFontInstance(
    "const geistSans = Geist(",
    `
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
`,
  );

  ensureFontInstance(
    "const geistMono = Geist_Mono(",
    `
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
`,
  );

  // Extra fonts used by Nextworks kits/templates
  ensureFontInstance(
    "const outfit = Outfit(",
    `
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});
`,
  );

  ensureFontInstance(
    "const inter = Inter(",
    `
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
`,
  );

  ensureFontInstance(
    "const poppins = Poppins(",
    `
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
`,
  );

  // Add suppressHydrationWarning to <html> tag if not present
  content = content.replace(/<html([^>]*)>/, (match: string, attrs: string) => {
    if (attrs.includes("suppressHydrationWarning")) return match;
    return `<html${attrs} suppressHydrationWarning>`;
  });

  // Ensure <body> has the font variable classes + antialiased.
  // We prefer setting these on <body> so they affect the whole app.
  content = content.replace(/<body([^>]*)>/, (match: string, attrs: string) => {
    const fontExpr =
      "${geistSans.variable} ${geistMono.variable} ${outfit.variable} ${inter.variable} ${poppins.variable} antialiased";

    // If body already has a className, append our font classes.
    if (attrs.includes("className=")) {
      // Try template literal style: className={`...`}
      if (attrs.includes("className={`")) {
        return match.replace(
          /className=\{`([\s\S]*?)`\}/,
          (_m, existing) => `className={\`${existing} ${fontExpr}\`}`,
        );
      }

      // Try string literal style: className="..."
      if (attrs.includes('className="')) {
        return match.replace(
          /className="([^"]*)"/,
          (_m, existing) => `className="${existing} ${fontExpr}"`,
        );
      }

      // Unknown className shape; leave it unchanged.
      return match;
    }

    // No className: add a template literal className.
    return `<body${attrs} className={\`${fontExpr}\`}>`;
  });

  // Wrap the entire body content with AppProviders and ensure AppToaster is rendered
  content = content.replace(
    /<body[^>]*>([\s\S]*?)<\/body>/,
    (match: string, bodyContent: string) => {
      let inner = bodyContent.trim();

      // Ensure children are inside AppProviders
      if (!inner.includes("<AppProviders")) {
        inner = `<AppProviders>\n${inner}\n</AppProviders>`;
      }

      // Ensure <AppToaster /> is present inside providers
      if (!inner.includes("<AppToaster")) {
        inner = inner.replace(/(<\/AppProviders>)/, `  <AppToaster />\n$1`);
      }

      return match.replace(bodyContent, `\n${inner}\n`);
    },
  );

  await fs.writeFile(layoutPath, content);
  console.log(
    "✓ Updated app/layout.tsx with AppProviders, AppToaster, and suppressHydrationWarning on <html>",
  );
}

export async function updatePagesAppWithAppProviders(): Promise<void> {
  const mode = await detectProjectRootMode(process.cwd());
  const appPath = mode === "src" ? "src/pages/_app.tsx" : "pages/_app.tsx";

  if (!(await fileExists(appPath))) {
    console.log(
      "⚠️  pages/_app.tsx not found. You may need to manually wrap your app with AppProviders.",
    );
    return;
  }

  let content = await fs.readFile(appPath, "utf-8");

  // Idempotency: if it's already wrapped, bail.
  if (content.includes("<AppProviders") || content.includes("</AppProviders>")) {
    console.log("⚠️  AppProviders wrapper already exists in pages/_app.tsx");
    return;
  }

  // Collect existing import statements (multi-line + semicolon-less safe).
  const importStatementsRegex =
    /^import[\s\S]*?(?:;\s*|\r?\n(?=(?:import\s|export\s|const\s|let\s|var\s|function\s|class\s|\/\/|\/\*|$)))/gm;
  const imports = content.match(importStatementsRegex) ?? [];
  const lastImport = imports[imports.length - 1] ?? "";
  const lastImportIndex = lastImport
    ? content.lastIndexOf(lastImport) + lastImport.length
    : 0;

  const ensureImport = (importLine: string) => {
    const normalizedContent = content.replace(/\s+/g, " ");
    const normalizedImportLine = importLine.replace(/\s+/g, " ");
    if (normalizedContent.includes(normalizedImportLine)) return;

    const prefix = content.slice(0, lastImportIndex);
    const suffix = content.slice(lastImportIndex);

    const needsLeadingNewline = lastImportIndex > 0 && !prefix.endsWith("\n");
    const needsTrailingNewline = suffix.length > 0 && !suffix.startsWith("\n");

    content =
      prefix +
      (needsLeadingNewline ? "\n" : "") +
      importLine +
      "\n" +
      (needsTrailingNewline ? "\n" : "") +
      suffix;
  };

  // Ensure imports.
  ensureImport('import AppProviders from "@/components/app-providers";');
  ensureImport('import AppToaster from "@/components/ui/toaster";');

  // Pages Router: inject fonts via next/font/google so the kit's CSS vars (e.g. --font-geist-sans)
  // are actually defined. This mirrors the App Router layout patch, but targets _app.tsx.
  const googleFontImportRegex =
    /import\s*\{([\s\S]*?)\}\s*from\s*["']next\/font\/google["']\s*;?/m;

  const brokenGoogleFontImportRegex =
    /import\s*\{[\s\S]*?\}\s*(?:\r?\n)+\s*(?=const\s)/m;

  const desiredFontNames = [
    "Geist",
    "Geist_Mono",
    "Outfit",
    "Inter",
    "Poppins",
  ];

  if (brokenGoogleFontImportRegex.test(content)) {
    content = content.replace(brokenGoogleFontImportRegex, "");
  }

  const existingGoogleFontImport = content.match(googleFontImportRegex);
  let afterGoogleImportIndex: number | null = null;

  if (existingGoogleFontImport) {
    const existingList = existingGoogleFontImport[1]
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const merged = Array.from(
      new Set([...existingList, ...desiredFontNames]),
    ).sort();

    const mergedImportLine = `import { ${merged.join(", ")} } from "next/font/google";`;

    const matchText = existingGoogleFontImport[0];
    const matchStart = existingGoogleFontImport.index ?? content.indexOf(matchText);
    const matchEnd = matchStart + matchText.length;

    content =
      content.slice(0, matchStart) +
      mergedImportLine +
      content.slice(matchEnd);

    afterGoogleImportIndex = matchStart + mergedImportLine.length;
  } else {
    const fontImportLine =
      'import { Geist, Geist_Mono, Outfit, Inter, Poppins } from "next/font/google";';
    ensureImport(fontImportLine);

    const insertedIdx = content.indexOf(fontImportLine);
    if (insertedIdx !== -1) {
      afterGoogleImportIndex = insertedIdx + fontImportLine.length;
    }
  }

  const ensureFontInstance = (marker: string, block: string) => {
    if (content.includes(marker)) return;

    const insertAt = afterGoogleImportIndex ?? lastImportIndex;
    content =
      content.slice(0, insertAt) +
      "\n" +
      block.trim() +
      "\n\n" +
      content.slice(insertAt);

    if (afterGoogleImportIndex != null) {
      afterGoogleImportIndex = insertAt + 1 + block.trim().length + 2;
    }
  };

  ensureFontInstance(
    "const geistSans = Geist(",
    `
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
`,
  );

  ensureFontInstance(
    "const geistMono = Geist_Mono(",
    `
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
`,
  );

  ensureFontInstance(
    "const outfit = Outfit(",
    `
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});
`,
  );

  ensureFontInstance(
    "const inter = Inter(",
    `
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
`,
  );

  ensureFontInstance(
    "const poppins = Poppins(",
    `
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
`,
  );

  // Wrap <Component {...pageProps} />.
  // Handle the common patterns (Next.js default TS template).
  const patterns: Array<{ from: RegExp; to: string }> = [
    {
      from: /return\s*\(\s*<Component\s*\{\.\.\.pageProps\}\s*\/?>\s*\)\s*;?/m,
      to: `return (\n    <AppProviders>\n      <Component {...pageProps} />\n      <AppToaster />\n    </AppProviders>\n  );`,
    },
    {
      from: /return\s*<Component\s*\{\.\.\.pageProps\}\s*\/?>\s*;?/m,
      to: `return (\n    <AppProviders>\n      <Component {...pageProps} />\n      <AppToaster />\n    </AppProviders>\n  );`,
    },
  ];

  let replaced = false;
  for (const p of patterns) {
    if (p.from.test(content)) {
      content = content.replace(p.from, p.to);
      replaced = true;
      break;
    }
  }

  if (!replaced) {
    console.log(
      "⚠️  Could not automatically wrap pages/_app.tsx. Please wrap <Component {...pageProps} /> with <AppProviders> manually.",
    );
    return;
  }

  await fs.writeFile(appPath, content);
  console.log("✓ Updated pages/_app.tsx with AppProviders, AppToaster, and fonts");
}

export async function ensurePagesDocumentSuppressHydrationWarning(): Promise<void> {
  const mode = await detectProjectRootMode(process.cwd());
  const documentPath = mode === "src" ? "src/pages/_document.tsx" : "pages/_document.tsx";

  // If there's no _document.tsx, creating one is safe in Pages Router and keeps behavior consistent.
  if (!(await fileExists(documentPath))) {
    await fs.ensureDir(path.dirname(documentPath));
    await fs.writeFile(documentPath, buildDefaultPagesDocument());
    console.log("✓ Created pages/_document.tsx with suppressHydrationWarning");
    return;
  }

  const result = await patchPagesDocumentFile(documentPath);
  if (result === "patched") {
    console.log("✓ Updated pages/_document.tsx to add suppressHydrationWarning");
  } else if (result === "already") {
    console.log("ℹ️  pages/_document.tsx already has suppressHydrationWarning");
  } else {
    console.log(
      "⚠️  Could not safely update pages/_document.tsx to add suppressHydrationWarning. Please add it to <Html> manually.",
    );
  }
}

export async function removeFiles(files: string[]): Promise<void> {
  for (const file of files) {
    const filePath = path.join(process.cwd(), file);

    if (await fileExists(filePath)) {
      await fs.remove(filePath);
      console.log(`✓ Removed ${file}`);
    } else {
      console.log(`⚠️  File not found: ${file}`);
    }
  }
}

export async function removeEmptyFolders(files: string[]): Promise<void> {
  // Folders that should never be removed (standard Next.js structure)
  const protectedFolders = new Set([
    "app",
    "app/api",
    "public",
    "src",
    "pages",
    "components",
    "lib",
    "types",
    "styles",
    "stylesheets",
    "assets",
    "static",
  ]);

  // Get unique parent directories from the files
  const parentDirs = new Set<string>();

  files.forEach((file) => {
    const dir = path.dirname(file);
    if (dir !== ".") {
      parentDirs.add(dir);
    }
  });

  // Also add all parent directories up the tree
  const allParentDirs = new Set<string>();
  parentDirs.forEach((dir) => {
    allParentDirs.add(dir);

    // Add all parent directories up the tree
    let currentDir = dir;
    while (currentDir !== "." && currentDir !== "") {
      const parent = path.dirname(currentDir);
      if (parent !== "." && parent !== currentDir) {
        allParentDirs.add(parent);
        currentDir = parent;
      } else {
        break;
      }
    }
  });

  // Filter out protected folders
  const foldersToCheck = Array.from(allParentDirs).filter(
    (dir) => !protectedFolders.has(dir),
  );

  // Sort by depth (deepest first) to remove nested folders first
  const sortedDirs = foldersToCheck.sort(
    (a, b) => b.split("/").length - a.split("/").length,
  );

  for (const dir of sortedDirs) {
    const dirPath = path.join(process.cwd(), dir);

    try {
      // Check if directory exists and is empty
      if (await fs.pathExists(dirPath)) {
        const contents = await fs.readdir(dirPath);

        if (contents.length === 0) {
          await fs.remove(dirPath);
          console.log(`✓ Removed empty folder: ${dir}`);
        } else {
          console.log(`ℹ️  Kept non-empty folder: ${dir}`);
        }
      }
    } catch (error) {
      console.log(`⚠️  Could not check/remove folder: ${dir}`);
    }
  }
}

export async function removePackageDeps(deps: any): Promise<void> {
  const packageJsonPath = "package.json";

  if (!(await fileExists(packageJsonPath))) {
    console.log("⚠️  package.json not found");
    return;
  }

  const packageJson = await readJsonFile(packageJsonPath);

  // Remove dependencies
  if (deps.dependencies) {
    for (const dep of Object.keys(deps.dependencies)) {
      if (packageJson.dependencies && packageJson.dependencies[dep]) {
        delete packageJson.dependencies[dep];
        console.log(`✓ Removed dependency: ${dep}`);
      }
    }
  }

  if (deps.devDependencies) {
    for (const dep of Object.keys(deps.devDependencies)) {
      if (packageJson.devDependencies && packageJson.devDependencies[dep]) {
        delete packageJson.devDependencies[dep];
        console.log(`✓ Removed devDependency: ${dep}`);
      }
    }
  }

  await writeJsonFile(packageJsonPath, packageJson);
  console.log("✓ Updated package.json");
}

export async function removePackageDepsSmart(
  depsToRemove: string[],
  devDepsToRemove: string[],
): Promise<void> {
  const packageJsonPath = "package.json";

  if (!(await fileExists(packageJsonPath))) {
    console.log("⚠️  package.json not found");
    return;
  }

  const packageJson = await readJsonFile(packageJsonPath);

  // Remove only the specified dependencies
  depsToRemove.forEach((dep) => {
    if (packageJson.dependencies && packageJson.dependencies[dep]) {
      delete packageJson.dependencies[dep];
      console.log(`✓ Removed dependency: ${dep}`);
    }
  });

  devDepsToRemove.forEach((dep) => {
    if (packageJson.devDependencies && packageJson.devDependencies[dep]) {
      delete packageJson.devDependencies[dep];
      console.log(`✓ Removed devDependency: ${dep}`);
    }
  });

  await writeJsonFile(packageJsonPath, packageJson);
  console.log("✓ Updated package.json");
}

export async function revertLayoutFile(): Promise<void> {
  const layoutPath = "app/layout.tsx";

  if (!(await fileExists(layoutPath))) {
    console.log("⚠️  app/layout.tsx not found");
    return;
  }

  let content = await fs.readFile(layoutPath, "utf-8");

  // Remove SessionProvider import
  content = content.replace(
    /\nimport AppSessionProvider from "@\/components\/session-provider";/g,
    "",
  );

  // Remove SessionProvider wrapper
  content = content.replace(
    /<AppSessionProvider>([\s\S]*?)<\/AppSessionProvider>/g,
    "$1",
  );

  await fs.writeFile(layoutPath, content);
  console.log("✓ Reverted app/layout.tsx (removed SessionProvider)");
}
