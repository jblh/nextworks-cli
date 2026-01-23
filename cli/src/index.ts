#!/usr/bin/env node

// Copyright (c) 2025 Jakob Hansen
// SPDX-License-Identifier: MIT

import { Command } from "commander";
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

program
  .name("nextworks")
  .description("Nextworks CLI - Feature kits installer for Next.js apps")
  .version("0.1.0");

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
  .option("--gallery", "Include gallery/demo template and assets")
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
