#!/usr/bin/env node

// Copyright (c) 2025 Jakob Hansen
// SPDX-License-Identifier: MIT

import { Command } from "commander";
import { addAuthCore } from "./commands/auth-core";
import { addBlocks } from "./commands/blocks";
import addForms from "./commands/forms";

import addData from "./commands/data";
import { removeAuthCore } from "./commands/remove-auth-core";
import { removeBlocks } from "./commands/remove-blocks";
import { getInstalledKits } from "./utils/installation-tracker";

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
  .action(
    async (
      kit: string,
      options: {
        sections?: boolean;
        templates?: boolean;
        gallery?: boolean;
        uiOnly?: boolean;
        yes?: boolean;
      },
    ) => {
      try {
        switch (kit) {
          case "auth-core":
            await addAuthCore();
            break;
          case "forms":
            await addForms();
            break;
          case "data":
            await addData();
            break;
          case "blocks":
            await addBlocks({
              sections: options.sections,
              templates: options.templates,
              gallery: options.gallery,
              uiOnly: options.uiOnly,
              yes: options.yes,
            });
            break;
          default:
            console.log(`❌ Unknown kit: ${kit}`);
            console.log("Available kits:");
            console.log(
              "  • auth-core     - NextAuth + Prisma + session wrapper",
            );
            console.log(
              "  • forms         - Form primitives, validation, and examples",
            );
            console.log(
              "  • data          - Posts + Users CRUD, API routes, admin panels (depends on auth + forms)",
            );
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
  .action(async (kit: string) => {
    try {
      switch (kit) {
        case "auth-core":
          await removeAuthCore();
          break;
        case "blocks":
          await removeBlocks();
          break;
        default:
          console.log(`❌ Unknown kit: ${kit}`);
          console.log("Available kits to remove:");
          console.log(
            "  • auth-core     - NextAuth + Prisma + session wrapper",
          );
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
