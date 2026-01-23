import fs from "fs-extra";
import path from "path";

export type PackageManager = "npm" | "pnpm" | "yarn";

export function isPackageManager(value: unknown): value is PackageManager {
  return value === "npm" || value === "pnpm" || value === "yarn";
}

export async function detectPackageManager(
  targetDir: string = process.cwd(),
): Promise<PackageManager> {
  // 1) Lockfile detection (most reliable)
  const hasPnpmLock = await fs.pathExists(
    path.join(targetDir, "pnpm-lock.yaml"),
  );
  if (hasPnpmLock) return "pnpm";

  const hasYarnLock = await fs.pathExists(path.join(targetDir, "yarn.lock"));
  if (hasYarnLock) return "yarn";

  const hasNpmLock = await fs.pathExists(
    path.join(targetDir, "package-lock.json"),
  );
  if (hasNpmLock) return "npm";

  // 2) User agent fallback (when invoked via a package manager)
  const ua = process.env.npm_config_user_agent ?? "";
  if (ua.includes("pnpm")) return "pnpm";
  if (ua.includes("yarn")) return "yarn";

  return "npm";
}

export function getInstallCommand(pm: PackageManager): string {
  switch (pm) {
    case "pnpm":
      return "pnpm install";
    case "yarn":
      // Yarn classic & berry both accept `yarn install`, but most users type `yarn`.
      return "yarn install";
    case "npm":
    default:
      return "npm install";
  }
}

export function getRunCommand(pm: PackageManager, script: string): string {
  // Not currently used by the CLI, but handy if you later print `dev`/`build` instructions.
  switch (pm) {
    case "pnpm":
      return `pnpm ${script}`;
    case "yarn":
      return `yarn ${script}`;
    case "npm":
    default:
      return `npm run ${script}`;
  }
}
