// inquirer is ESM-only. Use dynamic import() at runtime to avoid require() errors when CLI is compiled to CommonJS.
import {
  copyFiles,
  updatePackageJson,
  readJsonFile,
  fileExists,
  resolveAssetPath,
  updateLayoutWithAppProviders,
  updatePagesAppWithAppProviders,
  detectProjectRootMode,
} from "../utils/file-operations";
import { addInstalledKit } from "../utils/installation-tracker";
import path from "path";

interface BlocksManifestGroup {
  description?: string;
  files: string[];
}

interface BlocksManifest {
  name: string;
  description?: string;
  files?: string[];
  groups?: Record<string, BlocksManifestGroup>;
  cliKitPath: string;
}

export interface AddBlocksOptions {
  sections?: boolean;
  templates?: boolean;
  gallery?: boolean;
  uiOnly?: boolean;
  /** Skip interactive prompts and accept defaults. */
  yes?: boolean;
}

export async function addBlocks(options: AddBlocksOptions = {}): Promise<void> {
  console.log("Installing blocks kit...");

  try {
    const kitDir = resolveAssetPath("kits", "blocks");
    const manifestPath = resolveAssetPath(
      "cli_manifests",
      "blocks_manifest.json",
    );

    const manifest = (await readJsonFile(manifestPath)) as BlocksManifest;

    // Decide which groups to install.
    // Core is always included to satisfy the contract that sections/templates rely on core.
    // Behavior:
    // - No flags: install core + sections + templates by default.
    // - --sections: install core + sections only.
    // - --templates: install core + templates only.
    // - --sections --templates: core + sections + templates (same as default).
    // - --ui-only: install core only (bare UI primitives, no sections/templates).
    const explicitGroups: string[] = [];

    const anyGroupFlag =
      typeof options.sections === "boolean" ||
      typeof options.templates === "boolean" ||
      typeof options.gallery === "boolean" ||
      typeof options.uiOnly === "boolean";

    if (options.uiOnly) {
      // uiOnly overrides other flags if set
      const groupsToInstall: string[] = manifest.groups
        ? ["core"].filter((g) => g in manifest.groups!)
        : [];

      const files: string[] =
        groupsToInstall.length > 0 && manifest.groups
          ? groupsToInstall.flatMap((groupName) => {
              const group = manifest.groups?.[groupName];
              return group?.files ?? [];
            })
          : manifest.files || [];

      const filesToCopy: string[] = [];
      const missingFiles: string[] = [];

      for (const file of files) {
        const kitSource = path.join(kitDir, file);
        if (await fileExists(kitSource)) {
          filesToCopy.push(file);
        } else {
          const projectSource = path.join(process.cwd(), file);
          if (await fileExists(projectSource)) {
            console.log(`ℹ️  Skipping ${file} (already exists in project)`);
          } else {
            missingFiles.push(file);
          }
        }
      }

      if (filesToCopy.length > 0) {
        await copyFiles(kitDir, process.cwd(), filesToCopy);
      } else {
        console.log(
          "⚠️  No files to copy from the blocks kit (all files missing or already present)",
        );
      }

      // Update package.json and track install as usual
      const depsPath = path.join(kitDir, "package-deps.json");
      let deps: any = {};
      try {
        deps = await readJsonFile(depsPath);
        await updatePackageJson(deps);
      } catch (err) {
        console.log(
          "⚠️  No package-deps.json found for blocks or failed to read it",
        );
      }

      await addInstalledKit(
        "blocks",
        Object.keys(deps.dependencies || {}),
        Object.keys(deps.devDependencies || {}),
        filesToCopy,
      );

      console.log(
        "✓ blocks core UI primitives installed successfully (ui-only mode)!",
      );

      if (missingFiles.length > 0) {
        console.log(
          "\n⚠️ The following files referenced by the blocks manifest were not found in the kit and were not copied:",
        );
        missingFiles.forEach((f) => console.log(`  • ${f}`));
        console.log(
          "You may need to copy these files manually (for example placeholder assets under public/placeholders) or reconcile the kit files.",
        );
      }

      return;
    }

    if (anyGroupFlag) {
      if (options.sections) explicitGroups.push("sections");
      if (options.templates) explicitGroups.push("templates");
      if (options.gallery) explicitGroups.push("gallery");
    } else {
      // No flags passed: include sections and templates by default so templates
      // always have their section dependencies available.
      explicitGroups.push("sections", "templates");
    }

    const groupsToInstall: string[] = manifest.groups
      ? ["core", ...explicitGroups].filter((g) => g in manifest.groups!)
      : [];

    const files: string[] =
      groupsToInstall.length > 0 && manifest.groups
        ? groupsToInstall.flatMap((groupName) => {
            const group = manifest.groups?.[groupName];
            return group?.files ?? [];
          })
        : manifest.files || [];

    const filesToCopy: string[] = [];
    const missingFiles: string[] = [];

    // Determine which files are present in the kit and which are missing
    for (const file of files) {
      const kitSource = path.join(kitDir, file);
      // If the file exists in the kit, schedule it for copy
      if (await fileExists(kitSource)) {
        filesToCopy.push(file);
      } else {
        // If the file is already present in the user's project root, skip copying
        const projectSource = path.join(process.cwd(), file);
        if (await fileExists(projectSource)) {
          console.log(`ℹ️  Skipping ${file} (already exists in project)`);
        } else {
          missingFiles.push(file);
        }
      }
    }

    // Copy available files
    if (filesToCopy.length > 0) {
      await copyFiles(kitDir, process.cwd(), filesToCopy);
    } else {
      console.log(
        "⚠️  No files to copy from the blocks kit (all files missing or already present)",
      );
    }

    // Update package.json with dependencies from the kit
    const depsPath = path.join(kitDir, "package-deps.json");
    let deps: any = {};
    try {
      deps = await readJsonFile(depsPath);
      await updatePackageJson(deps);
    } catch (err) {
      console.log(
        "⚠️  No package-deps.json found for blocks or failed to read it",
      );
    }

    // Track the installation
    await addInstalledKit(
      "blocks",
      Object.keys(deps.dependencies || {}),
      Object.keys(deps.devDependencies || {}),
      filesToCopy,
    );

    console.log("✓ blocks kit installed successfully!");

    let layoutUpgraded = false;
    let pagesAppUpgraded = false;

    // Offer to auto-upgrade the root layout to use AppProviders (App Router)
    // (supports both root app/layout.tsx and src/app/layout.tsx)
    const mode = await detectProjectRootMode(process.cwd());
    const detectedLayoutPath =
      mode === "src" ? "src/app/layout.tsx" : "app/layout.tsx";

    const detectedPagesAppPath =
      mode === "src" ? "src/pages/_app.tsx" : "pages/_app.tsx";

    // Dynamically load inquirer to avoid ESM/CJS interop issues when
    // the CLI is compiled to CommonJS but inquirer is ESM-only.
    let promptFn: any;
    try {
      // Use a runtime dynamic import via the Function constructor to ensure
      // we call the native import() at runtime and avoid TypeScript
      // transpilation turning this into a require() call.
      const inquirerModule = await new Function('return import("inquirer")')();
      // inquirer exports a default object with prompt; support both shapes
      promptFn = inquirerModule?.default?.prompt ?? inquirerModule?.prompt;
    } catch (err) {
      console.log(
        "⚠️  Could not load optional interactive prompt (inquirer). Skipping optional layout/_app upgrades.",
      );
      promptFn = null;
    }

    if (await fileExists(detectedLayoutPath)) {
      if (options.yes) {
        try {
          await updateLayoutWithAppProviders();
          layoutUpgraded = true;
        } catch (err) {
          console.log("⚠️  Failed to update app/layout.tsx automatically:", err);
        }
      } else if (promptFn) {
        const { upgradeLayout } = await promptFn([
          {
            type: "confirm",
            name: "upgradeLayout",
            message: `Would you like the CLI to automatically wrap your ${detectedLayoutPath} with AppProviders and add suppressHydrationWarning to the <html> tag?`,
            default: true,
          },
        ]);

        if (upgradeLayout) {
          try {
            await updateLayoutWithAppProviders();
            layoutUpgraded = true;
          } catch (err) {
            console.log("⚠️  Failed to update app/layout.tsx automatically:", err);
          }
        }
      }
    } else if (await fileExists(detectedPagesAppPath)) {
      // Pages Router support: patch pages/_app.tsx
      if (options.yes) {
        try {
          await updatePagesAppWithAppProviders();
          pagesAppUpgraded = true;
        } catch (err) {
          console.log("⚠️  Failed to update pages/_app.tsx automatically:", err);
        }
      } else if (promptFn) {
        const { upgradePagesApp } = await promptFn([
          {
            type: "confirm",
            name: "upgradePagesApp",
            message: `Would you like the CLI to automatically wrap your ${detectedPagesAppPath} with AppProviders?`,
            default: true,
          },
        ]);

        if (upgradePagesApp) {
          try {
            await updatePagesAppWithAppProviders();
            pagesAppUpgraded = true;
          } catch (err) {
            console.log("⚠️  Failed to update pages/_app.tsx automatically:", err);
          }
        }
      }
    }

    console.log("\n📋 Next steps:");

    console.log("- Templates added. Try these routes in your browser:");
    console.log("    /templates/productlaunch");
    console.log("    /templates/saasdashboard");
    console.log("    /templates/digitalagency");
    console.log("    /templates/gallery  (blocks gallery)");

    if (layoutUpgraded) {
      console.log(
        `1. ${detectedLayoutPath} was updated to wrap the app with AppProviders and add suppressHydrationWarning.`,
      );
      console.log(
        "2. Ensure Tailwind is configured and app/globals.css is present (copied if available).",
      );
      console.log("3. Install new dependencies: npm install");
    } else if (pagesAppUpgraded) {
      console.log(
        `1. ${detectedPagesAppPath} was updated to wrap the app with AppProviders.`,
      );
      console.log(
        "2. Ensure Tailwind is configured and global styles are present.",
      );
      console.log("3. Install new dependencies: npm install");
    } else {
      console.log(
        `1. Wrap your app with the AppProviders wrapper in ${detectedLayoutPath} (App Router) or ${detectedPagesAppPath} (Pages Router):`,
      );
      console.log('   import AppProviders from "@/components/app-providers";');
      console.log(
        "   Wrap your application with <AppProviders> to enable fonts, presets, CSS variable injection, session provider, and the app toaster.",
      );
      console.log(
        "2. Ensure Tailwind is configured and app/globals.css is present (copied if available).",
      );
      console.log("3. Install new dependencies: npm install");
    }

    if (missingFiles.length > 0) {
      console.log(
        "\n⚠️ The following files referenced by the blocks manifest were not found in the kit and were not copied:",
      );
      missingFiles.forEach((f) => console.log(`  • ${f}`));
      console.log(
        "You may need to copy these files manually (for example placeholder assets under public/placeholders) or reconcile the kit files.",
      );
    }
  } catch (error) {
    console.log("❌ Failed to install blocks kit");
    throw error;
  }
}
