import {
  removeFiles,
  removeEmptyFolders,
  removePackageDepsSmart,
  resolveAssetPath,
  readJsonFile,
} from "../utils/file-operations";
import {
  removeInstalledKit,
  getSafeToRemoveDependencies,
} from "../utils/installation-tracker";
import {
  detectPackageManager,
  getInstallCommand,
} from "../utils/package-manager";
import path from "path";

export async function removeBlocks(options?: {
  /** Force package manager (overrides lockfile detection). */
  pm?: import("../utils/package-manager").PackageManager;
}): Promise<void> {
  console.log("Removing blocks kit...");

  try {
    const manifestPath = resolveAssetPath(
      "cli_manifests",
      "blocks_manifest.json",
    );
    const manifest = await readJsonFile(manifestPath);
    const files: string[] = manifest.files || [];

    // Get safe-to-remove dependencies (not shared with other kits)
    const safeToRemove = await getSafeToRemoveDependencies("blocks");

    // Remove files
    await removeFiles(files);

    // Remove empty folders
    await removeEmptyFolders(files);

    // Remove only safe dependencies
    if (
      safeToRemove.dependencies.length > 0 ||
      safeToRemove.devDependencies.length > 0
    ) {
      await removePackageDepsSmart(
        safeToRemove.dependencies,
        safeToRemove.devDependencies,
      );
    } else {
      console.log("ℹ️  No dependencies to remove (shared with other kits)");
    }

    // Remove from installation tracker
    await removeInstalledKit("blocks");

    console.log("✓ blocks kit removed successfully!");
    const pm = options?.pm ?? (await detectPackageManager(process.cwd()));
    const installCmd = getInstallCommand(pm);

    console.log(
      `\n💡 You may want to run '${installCmd}' to clean up node_modules`,
    );
  } catch (error) {
    console.log("❌ Failed to remove blocks kit");
    throw error;
  }
}
