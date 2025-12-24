import {
  copyFiles,
  updatePackageJson,
  updateLayoutFile,
  readJsonFile,
  fileExists,
  resolveAssetPath,
} from "../utils/file-operations";
import {
  addInstalledKit,
  getInstalledKits,
} from "../utils/installation-tracker";
import path from "path";
import { addForms } from "./forms";

export async function addAuthCore(): Promise<void> {
  console.log("Installing auth-core kit...");

  try {
    // Ensure forms kit is installed first (for form primitives and validation)
    const installed = await getInstalledKits();
    if (!installed.includes("forms")) {
      console.log("Auth requires the Forms kit. Installing Forms kit first...");
      await addForms({ auto: true });
    } else {
      console.log("Forms kit already installed — skipping Forms installation.");
    }

    // Get the kit directory path
    const kitDir = resolveAssetPath("kits", "auth-core");

    // Use the auth manifest as the single source of truth for files to copy.
    // In the published package, cli_manifests lives at the package root (next to dist/).
    const manifestPath = resolveAssetPath(
      "cli_manifests",
      "auth_manifest.json",
    );
    const manifest = await readJsonFile(manifestPath);

    // Start from manifest.files and append kit-specific files that aren't listed there
    const manifestFiles: string[] = Array.isArray(manifest.files)
      ? manifest.files
      : [];

    const extraFiles = [
      // Types and protected layout that are part of the kit but not listed in the manifest
      "types/next-auth.d.ts",
      "lib/utils.ts",
      "lib/api/errors.ts",
      "app/(protected)/layout.tsx",
      "app/(protected)/dashboard/page.tsx",
      "components/auth/dashboard.tsx",
      "components/auth/logout-button.tsx",
    ];

    const files = Array.from(new Set([...manifestFiles, ...extraFiles]));

    // Copy files
    await copyFiles(kitDir, process.cwd(), files);

    // Update package.json with dependencies
    const depsPath = path.join(kitDir, "package-deps.json");
    const deps = await readJsonFile(depsPath);
    await updatePackageJson(deps);

    // Update layout.tsx
    await updateLayoutFile();

    // Track the installation
    await addInstalledKit(
      "auth-core",
      Object.keys(deps.dependencies || {}),
      Object.keys(deps.devDependencies || {}),
      files,
    );

    console.log("✓ auth-core kit installed successfully!");

    // Print next steps
    console.log("\n📋 Next steps:");
    console.log("1. Add these environment variables to your .env.local:");
    console.log("   NEXTAUTH_SECRET=your-secret-key");
    console.log("   NEXTAUTH_URL=http://localhost:3000");
    console.log("   GITHUB_ID=your-github-client-id (optional)");
    console.log("   GITHUB_SECRET=your-github-client-secret (optional)");
    console.log("   DATABASE_URL=your-database-url");

    console.log("\n2. Update your Prisma schema with the auth models:");
    console.log("   Check prisma/auth-models.prisma (copied to your project)");
    console.log("   Copy the models to your prisma/schema.prisma file");

    console.log("\n3. Run Prisma commands (required before build/dev):");
    console.log("   npx prisma generate");
    console.log("   npx prisma migrate dev -n init");

    console.log("\n4. Install dependencies:");
    console.log("   npm install");

    console.log("\n⚠️  Important: Your app may fail to build or run until Prisma is set up.");
    console.log("   Make sure DATABASE_URL is set and you have run the Prisma commands above before 'npm run build'.");

    console.log("\n✨ Auth core is ready! You now have:");
    console.log("   • Login page: /auth/login");
    console.log("   • Signup page: /auth/signup");
    console.log("   • Protected dashboard: /dashboard");
    console.log("   • RequireAuth component for protecting routes");
    console.log("   • Complete authentication system with NextAuth + Prisma");
  } catch (error) {
    console.log("❌ Failed to install auth-core kit");
    throw error;
  }
}
