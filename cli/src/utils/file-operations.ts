import fs from "fs-extra";
import path from "path";

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

export async function copyFiles(
  sourceDir: string,
  targetDir: string,
  files: string[],
): Promise<void> {
  for (const file of files) {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);

    // Ensure target directory exists
    await fs.ensureDir(path.dirname(targetPath));

    // Copy file
    await fs.copy(sourcePath, targetPath);
    console.log(`✓ Created ${file}`);
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
  const layoutPath = "app/layout.tsx";

  if (!(await fileExists(layoutPath))) {
    console.log(
      "⚠️  app/layout.tsx not found. You may need to manually add AppProviders.",
    );
    return;
  }

  let content = await fs.readFile(layoutPath, "utf-8");

  // Collect existing import statements
  const importRegex = /import\s+.*?from\s+["'].*?["'];?\s*$/gm;
  const imports = content.match(importRegex) ?? [];
  const lastImport = imports[imports.length - 1] ?? "";
  const lastImportIndex = lastImport
    ? content.lastIndexOf(lastImport) + lastImport.length
    : 0;

  const ensureImport = (importLine: string) => {
    if (!content.includes(importLine)) {
      content =
        content.slice(0, lastImportIndex) +
        (lastImportIndex ? "\n" : "") +
        importLine +
        content.slice(lastImportIndex);
    }
  };

  // Ensure imports for AppProviders and AppToaster only (no auth/session here)
  ensureImport('import AppProviders from "@/components/app-providers";');
  ensureImport('import AppToaster from "@/components/ui/toaster";');

  // Add suppressHydrationWarning to <html> tag if not present
  content = content.replace(/<html([^>]*)>/, (match: string, attrs: string) => {
    if (attrs.includes("suppressHydrationWarning")) return match;
    return `<html${attrs} suppressHydrationWarning>`;
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
