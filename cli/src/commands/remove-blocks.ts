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
  getLpkConfig,
} from "../utils/installation-tracker";
import {
  detectPackageManager,
  getInstallCommand,
} from "../utils/package-manager";

export async function removeBlocks(options?: {
  /** Force package manager (overrides lockfile detection). */
  pm?: import("../utils/package-manager").PackageManager;
}): Promise<void> {
  console.log("Removing blocks kit...");

  try {
    const config = await getLpkConfig();
    const installed = config.installedKits.find((k) => k.name === "blocks");

    // Prefer removing exactly what was installed (tracked in .nextworks/config.json)
    // so we don't accidentally delete user-owned files or miss router-mapped paths.
    let files: string[] = installed?.files ?? [];

    // Fallback: if the kit isn't tracked (older installs), remove the union of
    // manifest groups plus manifest.files.
    if (files.length === 0) {
      const manifestPath = resolveAssetPath(
        "cli_manifests",
        "blocks_manifest.json",
      );
      const manifest = await readJsonFile(manifestPath);

      const groupFiles: string[] = manifest.groups
        ? Object.values(manifest.groups).flatMap((g: any) => g?.files ?? [])
        : [];

      files = Array.from(
        new Set([...(manifest.files ?? []), ...groupFiles].filter(Boolean)),
      );
    }

    if (files.length === 0) {
      console.log(
        "ℹ️  No tracked blocks files found to remove (is the blocks kit installed?)",
      );
    }

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

    console.log("✓ Blocks kit removed successfully!");
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
