import {
  removeFiles,
  removeEmptyFolders,
  removePackageDepsSmart,
  revertLayoutFile,
} from "../utils/file-operations";
import {
  removeInstalledKit,
  getSafeToRemoveDependencies,
} from "../utils/installation-tracker";

export async function removeAuthCore(): Promise<void> {
  console.log("Removing auth-core kit...");

  try {
    // Files to remove (same as what was installed)
    const files = [
      "lib/auth.ts",
      "app/api/auth/[...nextauth]/route.ts",
      "types/next-auth.d.ts",
      "components/session-provider.tsx",
      "lib/prisma.ts",
      "prisma/auth-models.prisma",
      // lib/validation/forms.ts is provided by the Forms kit; do not remove here
      "lib/utils.ts",
      "components/auth/login-form.tsx",
      "components/auth/signup-form.tsx",
      "components/auth/signup-form.tsx",
      "components/require-auth.tsx",
      "components/ui/button.tsx",
      "components/ui/input.tsx",
      "components/ui/label.tsx",
      "app/auth/login/page.tsx",
      "app/auth/signup/page.tsx",
      "app/api/signup/route.ts",
      "app/(protected)/layout.tsx",
      "app/(protected)/dashboard/page.tsx",
    ];

    // Get safe-to-remove dependencies (not shared with other kits)
    const safeToRemove = await getSafeToRemoveDependencies("auth-core");

    // Remove files
    await removeFiles(files);

    // Remove empty folders (only if they're empty)
    await removeEmptyFolders(files);

    // Remove only safe dependencies (not shared with other kits)
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

    // Revert layout.tsx changes
    await revertLayoutFile();

    // Remove from installation tracker
    await removeInstalledKit("auth-core");

    console.log("✓ auth-core kit removed successfully!");

    console.log("\n📋 Cleanup completed:");
    console.log("• Removed all auth-core files");
    console.log("• Removed empty folders (if any)");
    if (
      safeToRemove.dependencies.length > 0 ||
      safeToRemove.devDependencies.length > 0
    ) {
      console.log("• Removed unshared dependencies from package.json");
    } else {
      console.log("• Kept shared dependencies in package.json");
    }
    console.log("• Reverted app/layout.tsx changes");
    console.log(
      "\n💡 You may want to run 'npm install' to clean up node_modules",
    );
  } catch (error) {
    console.log("❌ Failed to remove auth-core kit");
    throw error;
  }
}
