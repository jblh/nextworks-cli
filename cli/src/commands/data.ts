import path from "path";
import {
  copyFiles,
  updatePackageJson,
  readJsonFile,
  fileExists,
  resolveAssetPath,
} from "../utils/file-operations";
import {
  addInstalledKit,
  getInstalledKits,
} from "../utils/installation-tracker";
import { addForms } from "./forms";
import { addAuthCore } from "./auth-core";

export async function addData(): Promise<void> {
  console.log("Installing data kit...");

  try {
    // Ensure auth-core and forms are installed first
    const installed = await getInstalledKits();
    if (!installed.includes("forms")) {
      console.log("Data requires the Forms kit. Installing Forms kit first...");
      await addForms({ auto: true });
    }
    if (!installed.includes("auth-core")) {
      console.log(
        "Data requires the Auth Core kit. Installing Auth Core kit first...",
      );
      await addAuthCore();
    }

    const kitDir = resolveAssetPath("kits", "data");
    const manifestPath = resolveAssetPath(
      "cli_manifests",
      "data_manifest.json",
    );

    let manifest: any = {};
    try {
      manifest = await readJsonFile(manifestPath);
    } catch (err) {
      // fallback — proceed with default manifest in code
    }

    const files: string[] = manifest.files || [
      "app/api/posts/route.ts",
      "app/api/posts/[id]/route.ts",
      "app/api/users/route.ts",
      "app/api/users/[id]/route.ts",
      "app/api/users/check-unique/route.ts",
      "app/api/users/check-email/route.ts",
      "app/api/seed-demo/route.ts",
      "components/admin/admin-header.tsx",
      "components/admin/posts-manager.tsx",
      "components/admin/users-manager.tsx",
      "app/(protected)/admin/users/page.tsx",
      "app/(protected)/admin/posts/page.tsx",
      "app/examples/demo/create-post-form.tsx",
      "app/examples/demo/page.tsx",
      "lib/prisma.ts",
      "lib/server/result.ts",
      "lib/utils.ts",
      "scripts/seed-demo.mjs",
    ];

    const filesToCopy: string[] = [];
    for (const file of files) {
      const source = path.join(kitDir, file);
      if (await fileExists(source)) filesToCopy.push(file);
    }

    if (filesToCopy.length === 0) {
      console.log("⚠️  No files available in the data kit to copy.");
    } else {
      await copyFiles(kitDir, process.cwd(), filesToCopy);
    }

    // Update package.json with dependencies
    const depsPath = path.join(kitDir, "package-deps.json");
    try {
      const deps = await readJsonFile(depsPath);
      await updatePackageJson(deps);

      // Track the installation
      await addInstalledKit(
        "data",
        Object.keys(deps.dependencies || {}),
        Object.keys(deps.devDependencies || {}),
        filesToCopy,
      );
    } catch (err) {
      console.log(
        "⚠️  No package-deps.json found for data or failed to read it",
      );
    }

    console.log("✓ data kit installed successfully!");

    console.log("\n📋 Next steps:");
    console.log(
      "1. Merge prisma models into your prisma/schema.prisma and run npx prisma generate && npx prisma migrate dev",
    );
    console.log("2. Install dependencies: npm install");
  } catch (error) {
    console.log("❌ Failed to install data kit");
    throw error;
  }
}

export default addData;
