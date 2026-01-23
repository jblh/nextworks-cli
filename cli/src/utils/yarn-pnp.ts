import fs from "fs-extra";
import path from "path";

export async function isYarnPnPProject(projectDir: string): Promise<boolean> {
  // Yarn Plug'n'Play creates a .pnp.cjs file in the project root.
  return fs.pathExists(path.join(projectDir, ".pnp.cjs"));
}

export async function ensureYarnNodeModulesLinker(
  projectDir: string,
): Promise<{ changed: boolean; filepath: string }> {
  const filepath = path.join(projectDir, ".yarnrc.yml");
  const nodeLinkerLine = "nodeLinker: node-modules";

  let current = "";
  if (await fs.pathExists(filepath)) {
    current = await fs.readFile(filepath, "utf8");
  }

  // If already configured, no change.
  const hasNodeModules = /(^|\r?\n)\s*nodeLinker\s*:\s*node-modules\s*(\r?\n|$)/.test(
    current,
  );
  if (hasNodeModules) {
    return { changed: false, filepath };
  }

  // If nodeLinker is set to something else, replace it.
  if (/(^|\r?\n)\s*nodeLinker\s*:\s*\S+/.test(current)) {
    const updated = current.replace(
      /(^|\r?\n)\s*nodeLinker\s*:\s*\S+/,
      `$1${nodeLinkerLine}`,
    );
    await fs.writeFile(filepath, updated.endsWith("\n") ? updated : `${updated}\n`, "utf8");
    return { changed: true, filepath };
  }

  // Otherwise append.
  const trimmed = current.trimEnd();
  const prefix = trimmed.length > 0 ? `${trimmed}\n` : "";
  const updated = `${prefix}${nodeLinkerLine}\n`;
  await fs.writeFile(filepath, updated, "utf8");
  return { changed: true, filepath };
}
