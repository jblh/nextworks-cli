import path from "path";
import {
  copyFiles,
  updatePackageJson,
  readJsonFile,
  fileExists,
  resolveAssetPath,
} from "../utils/file-operations";
import { addInstalledKit } from "../utils/installation-tracker";

interface AddFormsOptions {
  auto?: boolean; // if true, don't prompt — used when another kit triggers forms install
}

export async function addForms(options?: AddFormsOptions): Promise<void> {
  console.log("Installing forms kit...");

  try {
    const kitDir = resolveAssetPath("kits", "forms");
    const manifestPath = resolveAssetPath(
      "cli_manifests",
      "forms_manifest.json",
    );
    let manifest: any = {};
    try {
      // prefer the dist manifest when run from packaged consumer
      manifest = await readJsonFile(manifestPath);
    } catch (err) {
      // fallback: try repo root manifest
      // noop — manifest may not be present in packaged dist
    }

    const files: string[] = manifest.files || [
      "components/ui/form/form.tsx",
      "components/ui/form/form-field.tsx",
      "components/ui/form/form-item.tsx",
      "components/ui/form/form-control.tsx",
      "components/ui/form/form-description.tsx",
      "components/ui/form/form-label.tsx",
      "components/ui/form/form-message.tsx",
      "components/ui/select.tsx",
      "components/ui/checkbox.tsx",
      "components/ui/switch.tsx",
      "components/hooks/useCheckUnique.ts",
      "lib/validation/forms.ts",
      "lib/validation/wizard.ts",
      "lib/forms/map-errors.ts",
    ];

    // Copy files from kit to project if they exist in the kit
    const filesToCopy: string[] = [];

    for (const file of files) {
      const source = path.join(kitDir, file);
      if (await fileExists(source)) filesToCopy.push(file);
    }

    if (filesToCopy.length === 0) {
      if (!options?.auto) {
        console.log("⚠️  No files available in the forms kit to copy.");
      } else {
        // If called as part of another kit's install (auto), do not warn loudly
        console.log(
          "⚠️  Forms kit appears empty in the packaged CLI artifact.",
        );
      }
    } else {
      await copyFiles(kitDir, process.cwd(), filesToCopy);
    }

    // Update package.json with dependencies from the kit
    const depsPath = path.join(kitDir, "package-deps.json");
    try {
      const deps = await readJsonFile(depsPath);
      await updatePackageJson(deps);

      // Track the installation
      await addInstalledKit(
        "forms",
        Object.keys(deps.dependencies || {}),
        Object.keys(deps.devDependencies || {}),
        filesToCopy,
      );
    } catch (err) {
      console.log(
        "⚠️  No package-deps.json found for forms or failed to read it",
      );
    }

    console.log("✓ forms kit installed successfully!");

    console.log("\n📋 Next steps:");
    console.log("1. Install dependencies: npm install");
    console.log(
      "2. Import/Use the form primitives in your pages/components as needed",
    );

    // Print optional examples (if declared in manifest)
    const optionalExamples =
      manifest?.optionalExamples || manifest?.optional || null;
    if (optionalExamples && Object.keys(optionalExamples).length > 0) {
      console.log("\n🔹 Optional examples available:");
      for (const [exampleName, info] of Object.entries<any>(optionalExamples)) {
        const files: string[] = info.files || [];
        const requires: string[] = info.requires || [];
        const notes: string = info.notes || "";

        console.log(`\n- ${exampleName}`);
        if (notes) console.log(`  ${notes}`);

        if (requires.length > 0) {
          const installCmds = requires
            .map((k) => `npx --no-install nextworks add ${k}`)
            .join(" && ");
          console.log(`  Requires: ${requires.join(", ")}`);
          console.log(`  To install required kits: ${installCmds}`);
        }

        if (files.length > 0) {
          console.log(`  Files included if opted in:`);
          for (const f of files) console.log(`    - ${f}`);
        }
      }

      console.log(
        "\nTip: You can copy these files manually, or install the required kits (above) before adding these optional examples. Future CLI versions may support a --with flag to auto-install optional examples.",
      );
    }
  } catch (error) {
    console.log("❌ Failed to install forms kit");
    throw error;
  }
}

export default addForms;
