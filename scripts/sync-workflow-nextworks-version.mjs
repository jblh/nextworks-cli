import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const repoRoot = process.cwd();
const cliPackageJsonPath = path.join(repoRoot, "cli", "package.json");
const workflowPaths = [
  path.join(repoRoot, ".github", "workflows", "smoke-blocks.yml"),
  path.join(repoRoot, ".github", "workflows", "smoke-blocks-full.yml"),
];
const versionPattern = /(NEXTWORKS_VERSION:\s*)([^\s]+)/u;

function parseArgs(argv) {
  return {
    check: argv.includes("--check"),
    verbose: argv.includes("--verbose"),
  };
}

async function readCliVersion() {
  const raw = await fs.readFile(cliPackageJsonPath, "utf8");
  const pkg = JSON.parse(raw);

  if (!pkg.version || typeof pkg.version !== "string") {
    throw new Error(`Missing or invalid version in ${path.relative(repoRoot, cliPackageJsonPath)}`);
  }

  return pkg.version;
}

async function syncWorkflowVersion(workflowPath, version, checkOnly, verbose) {
  const relativePath = path.relative(repoRoot, workflowPath).replace(/\\/g, "/");
  const original = await fs.readFile(workflowPath, "utf8");

  if (!versionPattern.test(original)) {
    throw new Error(`NEXTWORKS_VERSION entry not found in ${relativePath}`);
  }

  const updated = original.replace(versionPattern, `$1${version}`);

  if (original === updated) {
    if (verbose) console.log(`unchanged: ${relativePath}`);
    return { status: "unchanged", relativePath };
  }

  if (checkOnly) {
    console.log(`would update: ${relativePath}`);
    return { status: "changed", relativePath };
  }

  await fs.writeFile(workflowPath, updated, "utf8");
  console.log(`updated: ${relativePath}`);
  return { status: "updated", relativePath };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const version = await readCliVersion();
  let hasChanges = false;

  if (args.verbose) {
    console.log(`cli version: ${version}`);
  }

  for (const workflowPath of workflowPaths) {
    const result = await syncWorkflowVersion(
      workflowPath,
      version,
      args.check,
      args.verbose,
    );
    if (result.status !== "unchanged") {
      hasChanges = true;
    }
  }

  if (args.check && hasChanges) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
