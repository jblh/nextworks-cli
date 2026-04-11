import fs from "fs-extra";
import { constants } from "fs";
import path from "path";
import {
  readJsonFile,
  fileExists,
  detectProjectRootMode,
  resolveAssetPath,
} from "../utils/file-operations";
import {
  detectPackageManager,
  getInstallCommand,
} from "../utils/package-manager";
import { isYarnPnPProject } from "../utils/yarn-pnp";
import { getInstalledKits } from "../utils/installation-tracker";

type CheckStatus = "ok" | "error" | "warning";
type CheckResult =
  | { status: "found" }
  | { status: "not-found" }
  | { status: "unreadable"; error: unknown };
type CheckWritability =
  | { status: "writable" }
  | { status: "not-writable" }
  | { status: "not-found-parent-writable" }
  | { status: "not-found-parent-not-writable" };

interface BlocksManifestGroup {
  description?: string;
  files: string[];
}

interface BlocksManifest {
  name: string;
  description?: string;
  files?: string[];
  groups?: Record<string, BlocksManifestGroup>;
  cliKitPath: string;
}

interface DoctorOptions {
  json?: boolean;
  fix?: boolean;
  kit?: string;
}

interface ProjectSanity {
  hasPackageJson: boolean;
  hasNext: boolean;
  projectRootMode: string | null;
}

interface EnvironmentChecks {
  nodeVersion: { status: CheckStatus; message: string };
  packageManager: {
    pm: import("../utils/package-manager").PackageManager;
    installCommand: string;
  };
  yarnPnPDection: { isPnP: boolean; message: string };
}

interface PatchabilityCheck {
  path: string;
  exists: boolean;
  writable?: boolean;
  hasSuppressHydrationWarning?: boolean;
}

interface RouterPatchability {
  appLayout?: PatchabilityCheck;
  pagesApp?: PatchabilityCheck;
  pagesDocument?: PatchabilityCheck;
}

interface DoctorResult {
  projectSanity: ProjectSanity;
  environmentChecks: EnvironmentChecks;
  routerPatchability: RouterPatchability;
  warnings: string[];
  errors: string[];
}

const MIN_MAJOR_NODE_VERSION = 20;
const YARN_PNP_MESSAGE = "Set nodeLinker: node-modules in .yarnrc.yml";

function createInitialDoctorResult(): DoctorResult {
  return {
    projectSanity: {
      hasPackageJson: false,
      hasNext: false,
      projectRootMode: null,
    },
    environmentChecks: {
      nodeVersion: { status: "ok", message: "" },
      packageManager: { pm: "pnpm", installCommand: "" },
      yarnPnPDection: {
        isPnP: false,
        message: YARN_PNP_MESSAGE,
      },
    },
    routerPatchability: {},
    warnings: [],
    errors: [],
  };
}

function getPackageJsonPath(cwd: string): string {
  return path.join(cwd, "package.json");
}

async function readPackageJson(cwd: string) {
  return fs.readJson(getPackageJsonPath(cwd));
}

function getNodeVersionCheck(): EnvironmentChecks["nodeVersion"] {
  const rawVersion = process.version;
  const nodeVersion = process.versions.node;
  const major = Number(nodeVersion.split(".")[0]);

  if (!Number.isFinite(major)) {
    return {
      status: "error",
      message: `Unable to determine Node.js version (reported: ${rawVersion})`,
    };
  }

  if (major < MIN_MAJOR_NODE_VERSION) {
    return {
      status: "error",
      message: `Node.js ${rawVersion} detected — nextworks requires Node.js >= ${MIN_MAJOR_NODE_VERSION}`,
    };
  }

  return {
    status: "ok",
    message: `Node.js ${rawVersion} detected`,
  };
}

// - for A3. Detect projectRootMode
function getProjectRootModeLabel(options: {
  mode: "src" | "root" | null;
  hasAppRouter: boolean;
  hasPagesRouter: boolean;
}): string | null {
  const { mode, hasAppRouter, hasPagesRouter } = options;

  if (mode !== "src" && mode !== "root") {
    return null;
  }

  let routerType: string | null = null;

  if (hasAppRouter && hasPagesRouter) {
    routerType = "Hybrid router";
  } else if (hasAppRouter) {
    routerType = "App router";
  } else if (hasPagesRouter) {
    routerType = "Pages router";
  } else {
    return null;
  }

  const rootLabel = mode === "src" ? "with src folder" : "with no src folder";
  return `${routerType} ${rootLabel}`;
}

// - For C. Next.js router & entrypoint patchability checks
async function fileHasSuppressHydrationWarning(
  filePath: string,
): Promise<CheckResult> {
  try {
    const fileContent = await fs.readFile(filePath, "utf8");

    return fileContent.includes("suppressHydrationWarning")
      ? { status: "found" }
      : { status: "not-found" };
  } catch (error) {
    return { status: "unreadable", error };
  }
}

async function fileIsWritable(filePath: string): Promise<CheckWritability> {
  try {
    await fs.access(filePath, fs.constants.W_OK);
    return { status: "writable" };
  } catch (err: any) {
    if (err.code === "EACCES" || err.code === "EPERM") {
      return { status: "not-writable" };
    } else {
      const parentDir = path.dirname(filePath);

      try {
        await fs.access(parentDir, fs.constants.W_OK);
        return { status: "not-found-parent-writable" };
      } catch {
        return { status: "not-found-parent-not-writable" };
      }
    }
  }
}

export async function doctor(
  options: DoctorOptions = {},
): Promise<DoctorResult> {
  const cwd = process.cwd();

  // # Initialize results
  // ! in yarnPnPDection, the message is hardcoded to tell users what to do in case of YarnPnP:
  // ! in the part of index.ts, that takes care of formatting & printing results from doctor,
  // ! there should be logic, that only print this message if it is indeed a YarnPNP situation.
  const result = createInitialDoctorResult();

  // - Read manifest
  const kitDir = resolveAssetPath("kits", "blocks");

  const manifestPath = resolveAssetPath(
    "cli_manifests",
    "blocks_manifest.json",
  );
  const manifest = (await readJsonFile(manifestPath)) as BlocksManifest;

  // - A - PROJECT SANITY
  //
  // - A 1. Check that current working directory has a package.json.
  const packageJsonPath = getPackageJsonPath(cwd);
  const hasPackageJson = await fileExists(packageJsonPath);
  result.projectSanity.hasPackageJson = hasPackageJson;

  // - A 2. Detect Next.js presence
  if (hasPackageJson) {
    const pkg = await readPackageJson(cwd);
    result.projectSanity.hasNext = !!(
      pkg.dependencies?.next || pkg.devDependencies?.next
    );
  }

  // - A3. Detect projectRootMode
  const mode = await detectProjectRootMode(cwd);

  const detectedLayoutPath =
    mode === "src" ? "src/app/layout.tsx" : "app/layout.tsx";
  const detectedPagesAppPath =
    mode === "src" ? "src/pages/_app.tsx" : "pages/_app.tsx";

  const appRouterLayoutExists = await fileExists(detectedLayoutPath);
  const pagesRouterAppExists = await fileExists(detectedPagesAppPath);

  const projectRootModeLabel = getProjectRootModeLabel({
    mode,
    hasAppRouter: appRouterLayoutExists,
    hasPagesRouter: pagesRouterAppExists,
  });

  if (projectRootModeLabel) {
    result.projectSanity.projectRootMode = projectRootModeLabel;
  } else {
    result.errors.push(
      "Could not detect Next.js router type or project root mode.",
    );
    console.log("Could not detect Next.js router type or project root mode.");
  }

  // - B - RUNTIME/TOOLING ENVIRONMENT CHECKS

  // - B 1. Node version.
  result.environmentChecks.nodeVersion = getNodeVersionCheck();

  // - B 2. Package Manager Detection
  const detectedPM = await detectPackageManager(cwd);
  const installCmd = getInstallCommand(detectedPM);
  result.environmentChecks.packageManager.pm = detectedPM;
  result.environmentChecks.packageManager.installCommand = installCmd;

  // - B3. Yarn Plug'n'Play (PnP) detection
  const isYarnPnP = await isYarnPnPProject(cwd);
  result.environmentChecks.yarnPnPDection.isPnP = isYarnPnP;

  // - -------------------------------------------------------------------
  // # C- Next.js router & entrypoint patchability checks
  // - C 1.

  // - Call helper functions and do property assignment in results.
  // fileHasSuppressHydrationWarning(filePath: string);
  // fileIsWritable(filePath: string)

  // - -------------------------------------------------------------------

  return result;
}
