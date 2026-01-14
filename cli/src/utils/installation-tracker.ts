import fs from "fs-extra";
import path from "path";

interface InstalledKit {
  name: string;
  dependencies: string[];
  devDependencies: string[];
  files: string[];
  installedAt: string;
}

interface NextworksConfig {
  installedKits: InstalledKit[];
  version: string;
}

const CONFIG_FILE = ".nextworks/config.json";

export async function getLpkConfig(): Promise<NextworksConfig> {
  const configPath = path.join(process.cwd(), CONFIG_FILE);

  if (await fs.pathExists(configPath)) {
    return await fs.readJson(configPath);
  }

  return {
    installedKits: [],
    version: "0.1.0",
  };
}

export async function saveLpkConfig(config: NextworksConfig): Promise<void> {
  const configPath = path.join(process.cwd(), CONFIG_FILE);
  await fs.ensureDir(path.dirname(configPath));
  await fs.writeJson(configPath, config, { spaces: 2 });
}

export async function addInstalledKit(
  kitName: string,
  dependencies: string[],
  devDependencies: string[],
  files: string[],
): Promise<void> {
  const config = await getLpkConfig();

  // Remove existing kit if it exists (for reinstall)
  config.installedKits = config.installedKits.filter(
    (kit) => kit.name !== kitName,
  );

  // Add new kit
  config.installedKits.push({
    name: kitName,
    dependencies,
    devDependencies,
    files,
    installedAt: new Date().toISOString(),
  });

  await saveLpkConfig(config);
}

export async function removeInstalledKit(kitName: string): Promise<void> {
  const config = await getLpkConfig();
  config.installedKits = config.installedKits.filter(
    (kit) => kit.name !== kitName,
  );
  await saveLpkConfig(config);
}

export async function getInstalledKits(): Promise<string[]> {
  const config = await getLpkConfig();
  return config.installedKits.map((kit) => kit.name);
}

export async function getSharedDependencies(): Promise<{
  dependencies: string[];
  devDependencies: string[];
}> {
  const config = await getLpkConfig();

  const allDeps = new Set<string>();
  const allDevDeps = new Set<string>();

  // Collect all dependencies from all kits
  config.installedKits.forEach((kit) => {
    kit.dependencies.forEach((dep) => allDeps.add(dep));
    kit.devDependencies.forEach((dep) => allDevDeps.add(dep));
  });

  // Find dependencies that appear in multiple kits
  const sharedDeps = new Set<string>();
  const sharedDevDeps = new Set<string>();

  allDeps.forEach((dep) => {
    const kitCount = config.installedKits.filter((kit) =>
      kit.dependencies.includes(dep),
    ).length;
    if (kitCount > 1) {
      sharedDeps.add(dep);
    }
  });

  allDevDeps.forEach((dep) => {
    const kitCount = config.installedKits.filter((kit) =>
      kit.devDependencies.includes(dep),
    ).length;
    if (kitCount > 1) {
      sharedDevDeps.add(dep);
    }
  });

  return {
    dependencies: Array.from(sharedDeps),
    devDependencies: Array.from(sharedDevDeps),
  };
}

export async function getSafeToRemoveDependencies(kitName: string): Promise<{
  dependencies: string[];
  devDependencies: string[];
}> {
  const config = await getLpkConfig();
  const kit = config.installedKits.find((k) => k.name === kitName);

  if (!kit) {
    return { dependencies: [], devDependencies: [] };
  }

  const shared = await getSharedDependencies();

  // Only remove dependencies that are NOT shared with other kits
  const safeToRemoveDeps = kit.dependencies.filter(
    (dep) => !shared.dependencies.includes(dep),
  );

  const safeToRemoveDevDeps = kit.devDependencies.filter(
    (dep) => !shared.devDependencies.includes(dep),
  );

  return {
    dependencies: safeToRemoveDeps,
    devDependencies: safeToRemoveDevDeps,
  };
}
