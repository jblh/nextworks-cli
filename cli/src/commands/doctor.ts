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
  | { status: "init" }
  | { status: "found" }
  | { status: "not-found" }
  | { status: "unreadable"; error: unknown };
type CheckWritability =
  | { status: "init" }
  | { status: "writable" }
  | { status: "not-writable" }
  | { status: "not-found-parent-writable" }
  | { status: "not-found-parent-not-writable" };
type RouterType = "app" | "pages" | "hybrid";

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
  projectRoot: "src" | "root" | null;
  routerType: "app" | "pages" | "hybrid" | null;
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
  writable: boolean | null;
  writeableInfo: CheckWritability;
  hasSuppressHydrationWarning: CheckResult;
}

interface RouterPatchability {
  appLayout: PatchabilityCheck;
  pagesApp: PatchabilityCheck;
  pagesDocument: PatchabilityCheck;
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
      projectRoot: null,
      routerType: null,
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
    routerPatchability: {
      appLayout: {
        path: "",
        exists: false,
        writable: false,
        writeableInfo: { status: "init" },
        hasSuppressHydrationWarning: { status: "init" },
      },
      pagesApp: {
        path: "",
        exists: false,
        writable: false,
        writeableInfo: { status: "init" },
        hasSuppressHydrationWarning: { status: "init" },
      },
      pagesDocument: {
        path: "",
        exists: false,
        writable: false,
        writeableInfo: { status: "init" },
        hasSuppressHydrationWarning: { status: "init" },
      },
    },
    //   pagesApp: {
    //   path: string;
    //   exists: boolean;
    //   writable?: boolean;
    //   writeableInfo: CheckWritability;
    //   hasSuppressHydrationWarning: boolean;
    // },
    // pagesDocument: {
    // path: string;
    // exists: boolean;
    // writable?: boolean;
    // writeableInfo: CheckWritability;
    // hasSuppressHydrationWarning: boolean;
    // }

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

// - for A3.
function getProjectRootInfo(options: {
  mode: "src" | "root" | null;
  hasAppRouter: boolean;
  hasPagesRouter: boolean;
}): {
  routerType: RouterType | null;
  projectRootMode: string | null;
} {
  const { mode, hasAppRouter, hasPagesRouter } = options;

  if (mode !== "src" && mode !== "root") {
    return {
      routerType: null,
      projectRootMode: null,
    };
  }

  let routerType: RouterType | null = null;
  let routerTypeLabel: string | null = null;

  if (hasAppRouter && hasPagesRouter) {
    routerType = "hybrid";
    routerTypeLabel = "Hybrid router";
  } else if (hasAppRouter) {
    routerType = "app";
    routerTypeLabel = "App router";
  } else if (hasPagesRouter) {
    routerType = "pages";
    routerTypeLabel = "Pages router";
  } else {
    return {
      routerType: null,
      projectRootMode: null,
    };
  }

  const rootLabel = mode === "src" ? "with src folder" : "with no src folder";
  return {
    routerType: routerType,
    projectRootMode: `${routerTypeLabel} ${rootLabel}`,
  };
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

  // - ---------------------------------------------------------

  const manifest = (await readJsonFile(manifestPath)) as BlocksManifest;

  // - A3. Detect projectRootMode

  const mode = await detectProjectRootMode(cwd);
  result.projectSanity.projectRoot = mode;

  const detectedLayoutPath =
    mode === "src" ? "src/app/layout.tsx" : "app/layout.tsx";
  const detectedPagesAppPath =
    mode === "src" ? "src/pages/_app.tsx" : "pages/_app.tsx";

  const appRouterLayoutExists = await fileExists(detectedLayoutPath);
  const pagesRouterAppExists = await fileExists(detectedPagesAppPath);

  // - -------------------------------------------

  const { routerType, projectRootMode } = getProjectRootInfo({
    mode,
    hasAppRouter: appRouterLayoutExists,
    hasPagesRouter: pagesRouterAppExists,
  });

  if (routerType) {
    result.projectSanity.routerType = routerType;
  }

  if (projectRootMode) {
    result.projectSanity.projectRootMode = projectRootMode;
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
  // Evalutae both
  // What are the results of the sanity check?
  // Those results determine how we do this

  // Do the App router check if it's app router or hybrid
  if (
    result.projectSanity.routerType === "app" ||
    result.projectSanity.routerType === "hybrid"
  ) {
    if (result.projectSanity.projectRoot === "src") {
      // # inspect src/app/layout.tsx

      const filePath = path.join(process.cwd(), "src", "app", "layout.tsx");
      result.routerPatchability.appLayout.path = filePath;

      const layoutExists = await fileExists(filePath);
      result.routerPatchability.appLayout.exists = layoutExists;

      const isWriteableInfo = await fileIsWritable(filePath);
      result.routerPatchability.appLayout.writeableInfo = isWriteableInfo;

      const writeAble = isWriteableInfo.status;
      if (writeAble === "writable") {
        result.routerPatchability.appLayout.writable = true;
      } else if (writeAble === "not-writable") {
        result.routerPatchability.appLayout.writable = false;
      } else {
        result.routerPatchability.appLayout.writable = null;
      }

      const hasHydrationWarning =
        await fileHasSuppressHydrationWarning(filePath);
      result.routerPatchability.appLayout.hasSuppressHydrationWarning =
        hasHydrationWarning;
    } else {
      // inspect app/layout.tsx
    }
  }

  if (
    result.projectSanity.routerType === "pages" ||
    result.projectSanity.routerType === "hybrid"
  ) {
    if (result.projectSanity.projectRoot === "src") {
      // inspect src/pages/_app.tsx
      // inspect src/pages/_document.tsx
    } else {
      // inspect pages/_app.tsx
      // inspect pages/_document.tsx
    }
  }

  return result;
}
