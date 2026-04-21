#!/usr/bin/env node

// Copyright (c) 2025 Jakob Hansen
// SPDX-License-Identifier: MIT

import { Command } from "commander";
import fs from "fs";
import path from "path";
import { doctor } from "./commands/doctor";
import { addBlocks } from "./commands/blocks";
import { removeBlocks } from "./commands/remove-blocks";
import { getInstalledKits } from "./utils/installation-tracker";
import {
  detectPackageManager,
  isPackageManager,
  type PackageManager,
} from "./utils/package-manager";
import {
  ensureYarnNodeModulesLinker,
  isYarnPnPProject,
} from "./utils/yarn-pnp";

const program = new Command();

const cliVersion = (() => {
  try {
    // When running from dist/, __dirname is: <pkgRoot>/dist
    const pkgPath = path.resolve(__dirname, "..", "package.json");
    const raw = fs.readFileSync(pkgPath, "utf8");
    return JSON.parse(raw)?.version ?? "0.0.0";
  } catch {
    return "0.0.0";
  }
})();

program
  .name("nextworks")
  .description("Nextworks CLI - Feature kits installer for Next.js apps")
  .version(cliVersion);

program
  .command("doctor")
  .description("Diagnostics - is project is compatible with nextworks?")
  .option("--fix", "Fixes project")
  .option("--json", "Output structured machine-readable JSON")
  .option(
    "--kit <kit>",
    "Check for projects compatibility with installation of specific nextworks kit.",
  )
  .action(async (options: { fix?: boolean; json?: boolean; kit?: string }) => {
    try {
      const result = await doctor(options);
      const hasErrors = result.errors.length > 0;

      if (options.json) {
        const output = {
          status: hasErrors ? "error" : "ok",
          results: {
            projectSanity: result.projectSanity,
            environmentChecks: result.environmentChecks,
            projectRootWritability: result.projectRootWritability,
            routerPatchability: result.routerPatchability,
            appProvidersShim: result.appProvidersShim,
            collisions: result.collisions,
            recordedInstallState: result.recordedInstallState,
            blocksFilePresence: result.blocksFilePresence,
          },
          warnings: result.warnings,
          errors: result.errors,
        };

        console.log(JSON.stringify(output, null, 2));
        process.exit(hasErrors ? 1 : 0);
      }

      console.log("Doctor diagnostics");

      console.log("\nEnvironment");
      console.log(
        `  ${result.environmentChecks.nodeVersion.status === "ok" ? "✅" : "❌"} ${result.environmentChecks.nodeVersion.message}`,
      );
      console.log(
        `  ✅ Package manager detected: ${result.environmentChecks.packageManager.pm} (${result.environmentChecks.packageManager.installCommand})`,
      );
      console.log(
        `  ${result.environmentChecks.yarnPnPDection.isPnP ? "⚠️" : "✅"} Yarn Plug'n'Play ${result.environmentChecks.yarnPnPDection.isPnP ? "detected" : "not detected"}`,
      );
      if (result.environmentChecks.yarnPnPDection.isPnP) {
        console.log(`  ⚠️ ${result.environmentChecks.yarnPnPDection.message}`);
      }

      console.log("\nProject detection");
      console.log(
        `  ${result.projectSanity.hasPackageJson ? "✅" : "❌"} package.json ${result.projectSanity.hasPackageJson ? "found" : "not found"}`,
      );
      console.log(
        `  ${result.projectSanity.hasNext ? "✅" : "❌"} Next.js dependency ${result.projectSanity.hasNext ? "found" : "not found"}`,
      );
      console.log(
        `  ${result.projectSanity.projectRoot ? "✅" : "❌"} Project root mode: ${result.projectSanity.projectRoot ?? "not detected"}`,
      );
      console.log(
        `  ${result.projectSanity.routerType ? "✅" : "❌"} Router type: ${result.projectSanity.routerType ?? "not detected"}`,
      );
      if (result.projectSanity.projectRootMode) {
        console.log(`  ✅ ${result.projectSanity.projectRootMode}`);
      }

      console.log("\nRouter / patch targets");
      if (
        result.projectSanity.routerType === "app" ||
        result.projectSanity.routerType === "hybrid"
      ) {
        console.log(
          `  ${result.routerPatchability.appLayout.exists ? "✅" : "⚠️"} App layout: ${result.routerPatchability.appLayout.path}`,
        );
        console.log(
          `  ${result.routerPatchability.appLayout.writeableInfo.status === "not-writable" ? "❌" : "✅"} Writable: ${String(result.routerPatchability.appLayout.writable)}`,
        );
        console.log(
          `  ${result.routerPatchability.appLayout.hasSuppressHydrationWarning.status === "found" ? "✅" : result.routerPatchability.appLayout.hasSuppressHydrationWarning.status === "not-found" ? "⚠️" : "⚠️"} suppressHydrationWarning: ${result.routerPatchability.appLayout.hasSuppressHydrationWarning.status}`,
        );
      }
      if (
        result.projectSanity.routerType === "pages" ||
        result.projectSanity.routerType === "hybrid"
      ) {
        console.log(
          `  ${result.routerPatchability.pagesApp.exists ? "✅" : "⚠️"} Pages _app: ${result.routerPatchability.pagesApp.path}`,
        );
        console.log(
          `  ${result.routerPatchability.pagesApp.writeableInfo.status === "not-writable" ? "❌" : "✅"} Writable: ${String(result.routerPatchability.pagesApp.writable)}`,
        );
        console.log(
          `  ${result.routerPatchability.pagesDocument.exists ? "✅" : "⚠️"} Pages _document: ${result.routerPatchability.pagesDocument.path}`,
        );
        console.log(
          `  ${result.routerPatchability.pagesDocument.writeableInfo.status === "not-writable" || result.routerPatchability.pagesDocument.writeableInfo.status === "not-found-parent-not-writable" ? "❌" : "✅"} Writable: ${String(result.routerPatchability.pagesDocument.writable)}`,
        );
        console.log(
          `  ${result.routerPatchability.pagesDocument.hasSuppressHydrationWarning.status === "found" ? "✅" : result.routerPatchability.pagesDocument.hasSuppressHydrationWarning.status === "not-found" ? "⚠️" : "⚠️"} suppressHydrationWarning: ${result.routerPatchability.pagesDocument.hasSuppressHydrationWarning.status}`,
        );
      }
      if (result.appProvidersShim.exists) {
        console.log(
          `  ${result.appProvidersShim.targetMatchesRouter === false || result.appProvidersShim.targetExists === false ? "⚠️" : "✅"} App providers shim: ${result.appProvidersShim.path}`,
        );
      }

      console.log("\nKit prerequisites");
      console.log(
        `  ${result.environmentChecks.tailwind.detected ? "✅" : "⚠️"} Tailwind CSS ${result.environmentChecks.tailwind.detected ? "detected" : "not detected"}`,
      );
      console.log(
        `  ${result.environmentChecks.typescript.detected ? "✅" : "❌"} TypeScript ${result.environmentChecks.typescript.detected ? "detected" : "not detected"}`,
      );

      console.log("\nFilesystem / collisions");
      console.log(
        `  ${result.projectRootWritability.writable === false ? "❌" : result.projectRootWritability.exists ? "✅" : "❌"} Project root writable: ${String(result.projectRootWritability.writable)}`,
      );
      const existingCollisions = result.collisions.paths.filter(
        (entry) => entry.exists,
      );
      if (existingCollisions.length === 0) {
        console.log("  ✅ No install collisions detected");
      } else {
        for (const entry of existingCollisions) {
          console.log(`  ⚠️ Collision: ${entry.path}`);
        }
      }

      console.log("\nInstalled state");
      if (result.recordedInstallState.installedKits.length === 0) {
        console.log("  ⚠️ No recorded installed kits found");
      } else {
        for (const kit of result.recordedInstallState.installedKits) {
          console.log(`  ✅ Recorded kit: ${kit.name}`);
        }
      }
      const missingRecordedFiles = result.blocksFilePresence.filter(
        (entry) => !entry.exists,
      );
      if (missingRecordedFiles.length > 0) {
        for (const entry of missingRecordedFiles) {
          console.log(`  ⚠️ Missing recorded file: ${entry.path}`);
        }
      }

      if (result.warnings.length > 0) {
        console.log("\nWarnings");
        for (const warning of result.warnings) {
          console.log(`  ⚠️ ${warning}`);
        }
      }

      if (result.errors.length > 0) {
        console.log("\nErrors");
        for (const error of result.errors) {
          console.log(`  ❌ ${error}`);
        }
      }

      console.log("\nRecommendation");
      if (!hasErrors) {
        console.log("  ✅ Recommended next step: nextworks add blocks");
      } else {
        console.log(
          `  ❌ Fix blocking issues before install: ${result.errors[0]}`,
        );
      }

      process.exit(hasErrors ? 1 : 0);
    } catch (error) {
      throw error;
    }
  });

program
  .command("add <kit>")
  .description("Add a feature kit to your project")
  .option(
    "--sections",
    "Include standalone sections (Hero, CTA, Pricing, etc.)",
  )
  .option(
    "--templates",
    "Include full page templates (Product Launch, SaaS Dashboard, Digital Agency, Gallery)",
  )
  .option("--gallery", "Include gallery template and assets")
  .option(
    "--ui-only",
    "Install core UI primitives only (no sections/templates)",
  )
  .option(
    "-y, --yes",
    "Skip interactive prompts and accept defaults where possible",
  )
  .option(
    "--pm <pm>",
    "Force package manager (npm|pnpm|yarn). Overrides lockfile detection.",
  )
  .option(
    "--dry-run",
    "Preview changes without writing files or installing dependencies",
  )
  .action(
    async (
      kit: string,
      options: {
        sections?: boolean;
        templates?: boolean;
        gallery?: boolean;
        uiOnly?: boolean;
        yes?: boolean;
        pm?: string;
        dryRun?: boolean;
      },
    ) => {
      try {
        const forcedPm = options.pm;
        if (forcedPm && !isPackageManager(forcedPm)) {
          console.log(`❌ Invalid --pm value: ${forcedPm}`);
          console.log("Valid values: npm | pnpm | yarn");
          process.exit(1);
        }

        // Global environment check: Yarn PnP commonly breaks Next.js/Turbopack builds.
        // Offer to switch Yarn to the node-modules linker.
        const pmForPnPCheck =
          (forcedPm as PackageManager | undefined) ??
          (await detectPackageManager(process.cwd()));

        let yarnLinkerChanged = false;

        if (
          pmForPnPCheck === "yarn" &&
          (await isYarnPnPProject(process.cwd()))
        ) {
          // inquirer is ESM-only. Load dynamically so our CLI can remain CommonJS.
          let promptFn: any = null;
          if (!options.yes) {
            try {
              const inquirerModule = await new Function(
                'return import("inquirer")',
              )();
              promptFn =
                inquirerModule?.default?.prompt ?? inquirerModule?.prompt;
            } catch {
              promptFn = null;
            }
          }

          const shouldFixPnP = options.yes
            ? true
            : Boolean(
                promptFn
                  ? (
                      await promptFn([
                        {
                          type: "confirm",
                          name: "fixPnP",
                          message:
                            "Yarn Plug'n'Play detected (.pnp.cjs). Next.js/Turbopack builds often fail under PnP. Switch Yarn to the node-modules linker (recommended)?",
                          default: true,
                        },
                      ])
                    ).fixPnP
                  : false,
              );

          if (shouldFixPnP) {
            const result = await ensureYarnNodeModulesLinker(process.cwd());
            if (result.changed) {
              yarnLinkerChanged = true;
              console.log(
                `✓ Updated ${result.filepath}: nodeLinker: node-modules`,
              );
              console.log(
                "  Note: run `yarn install` to recreate node_modules before building.",
              );
            }
          } else {
            console.log(
              "⚠️  Yarn Plug'n'Play is enabled and may break Next.js/Turbopack builds. If you hit build errors, set `nodeLinker: node-modules` in .yarnrc.yml and run `yarn install`.",
            );
          }
        }

        switch (kit) {
          case "blocks":
            await addBlocks({
              sections: options.sections,
              templates: options.templates,
              gallery: options.gallery,
              uiOnly: options.uiOnly,
              yes: options.yes,
              pm: forcedPm as PackageManager | undefined,
              dryRun: options.dryRun,
            });

            if (yarnLinkerChanged) {
              // Make the required follow-up step hard to miss.
              console.log(
                "\n⚠️  Yarn configuration changed. Run `yarn install` now to generate node_modules before starting dev/build.",
              );
            }

            break;
          default:
            console.log(`❌ Unknown kit: ${kit}`);
            console.log("Available kits:");
            console.log(
              "  • blocks        - Frontend UI sections & templates (Blocks kit)",
            );
            process.exit(1);
        }
      } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
      }
    },
  );

program
  .command("remove <kit>")
  .description("Remove a feature kit from your project")
  .option(
    "--pm <pm>",
    "Force package manager (npm|pnpm|yarn). Overrides lockfile detection.",
  )
  .action(async (kit: string, options: { pm?: string }) => {
    try {
      const forcedPm = options.pm;
      if (forcedPm && !isPackageManager(forcedPm)) {
        console.log(`❌ Invalid --pm value: ${forcedPm}`);
        console.log("Valid values: npm | pnpm | yarn");
        process.exit(1);
      }

      switch (kit) {
        case "blocks":
          await removeBlocks({ pm: forcedPm as PackageManager | undefined });
          break;
        default:
          console.log(`❌ Unknown kit: ${kit}`);
          console.log("Available kits to remove:");
          console.log("  • blocks");
          process.exit(1);
      }
    } catch (error) {
      console.error("❌ Error:", error);
      process.exit(1);
    }
  });

program
  .command("list")
  .description("List installed kits")
  .action(async () => {
    try {
      const installedKits = await getInstalledKits();

      if (installedKits.length === 0) {
        console.log("No kits installed.");
        return;
      }

      console.log("Installed kits:");
      installedKits.forEach((kit) => {
        console.log(`  • ${kit}`);
      });
    } catch (error) {
      console.error("❌ Error:", error);
      process.exit(1);
    }
  });

program.parse();
