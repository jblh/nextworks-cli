// DO NOT DELETE UNUSED IMPORTS OR ANY UNUSED VARIABLES!
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

interface ManifestSourceCheck {
  manifestPath: string;
  installedKitPaths: string[];
  missingFiles: string[];
}

interface DoctorOptions {
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

interface TailwindCheck {
  hasTailwindDependency: boolean;
  hasCssBasedTailwindUsage: boolean;
  detected: boolean;
}

interface TypeScriptCheck {
  hasTsconfig: boolean;
  hasTypeScriptDependency: boolean;
  detected: boolean;
}

interface EnvironmentChecks {
  nodeVersion: { status: CheckStatus; message: string };
  packageManager: {
    pm: import("../utils/package-manager").PackageManager;
    installCommand: string;
  };
  yarnPnPDection: { isPnP: boolean; message: string };
  tailwind: TailwindCheck;
  typescript: TypeScriptCheck;
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

interface ProjectRootWritability {
  path: string;
  exists: boolean;
  writable: boolean | null;
}

interface AppProvidersShimCheck {
  path: string;
  exists: boolean;
  target: string | null;
  targetExists: boolean | null;
  targetMatchesRouter: boolean | null;
}

interface DoctorResult {
  projectSanity: ProjectSanity;
  environmentChecks: EnvironmentChecks;
  projectRootWritability: ProjectRootWritability;
  routerPatchability: RouterPatchability;
  appProvidersShim: AppProvidersShimCheck;
  manifestSource: ManifestSourceCheck;
  warnings: string[];
  errors: string[];
}

interface PackageJsonLike {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

function hasTailwindDependency(pkg: PackageJsonLike): boolean {
  return Boolean(
    pkg.dependencies?.tailwindcss || pkg.devDependencies?.tailwindcss,
  );
}

function hasTypeScriptDependency(pkg: PackageJsonLike): boolean {
  return Boolean(
    pkg.dependencies?.typescript || pkg.devDependencies?.typescript,
  );
}

async function hasTsconfig(cwd: string): Promise<boolean> {
  return fileExists(path.join(cwd, "tsconfig.json"));
}

async function hasCssBasedTailwindUsage(cwd: string): Promise<boolean> {
  const cssCandidates = [
    path.join(cwd, "app", "globals.css"),
    path.join(cwd, "src", "app", "globals.css"),
    path.join(cwd, "styles", "globals.css"),
    path.join(cwd, "src", "styles", "globals.css"),
    path.join(cwd, "pages", "_app.tsx"),
    path.join(cwd, "src", "pages", "_app.tsx"),
  ];

  for (const candidate of cssCandidates) {
    if (!(await fileExists(candidate))) {
      continue;
    }

    try {
      const content = await fs.readFile(candidate, "utf8");

      if (
        content.includes('@import "tailwindcss"') ||
        content.includes("@import 'tailwindcss'") ||
        content.includes("@theme")
      ) {
        return true;
      }
    } catch {
      continue;
    }
  }

  return false;
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
      tailwind: {
        hasTailwindDependency: false,
        hasCssBasedTailwindUsage: false,
        detected: false,
      },
      typescript: {
        hasTsconfig: false,
        hasTypeScriptDependency: false,
        detected: false,
      },
    },

    projectRootWritability: {
      path: "",
      exists: false,
      writable: null,
    },

    appProvidersShim: {
      path: "",
      exists: false,
      target: null,
      targetExists: null,
      targetMatchesRouter: null,
    },
    manifestSource: {
      manifestPath: "",
      installedKitPaths: [],
      missingFiles: [],
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
  } catch (err: unknown) {
    const errorCode =
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      typeof err.code === "string"
        ? err.code
        : null;

    if (errorCode === "EACCES" || errorCode === "EPERM") {
      return { status: "not-writable" };
    }

    const parentDir = path.dirname(filePath);

    try {
      await fs.access(parentDir, fs.constants.W_OK);
      return { status: "not-found-parent-writable" };
    } catch {
      return { status: "not-found-parent-not-writable" };
    }
  }
}

async function directoryIsWritable(
  directoryPath: string,
): Promise<boolean | null> {
  try {
    const stats = await fs.stat(directoryPath);

    if (!stats.isDirectory()) {
      return null;
    }

    await fs.access(directoryPath, fs.constants.W_OK);
    return true;
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error.code === "EACCES" || error.code === "EPERM")
    ) {
      return false;
    }

    return null;
  }
}

async function getProjectRootWritability(
  cwd: string,
): Promise<ProjectRootWritability> {
  const exists = await fileExists(cwd);

  if (!exists) {
    return {
      path: cwd,
      exists: false,
      writable: null,
    };
  }

  return {
    path: cwd,
    exists: true,
    writable: await directoryIsWritable(cwd),
  };
}

async function getAppProvidersShimDiagnostics(
  cwd: string,
  routerType: DoctorResult["projectSanity"]["routerType"],
): Promise<{ shim: AppProvidersShimCheck; warnings: string[] }> {
  const warnings: string[] = [];
  const shimCandidates = [
    path.join(cwd, "components", "app-providers.tsx"),
    path.join(cwd, "src", "components", "app-providers.tsx"),
  ];
  let shimPath = shimCandidates[0];

  for (const candidate of shimCandidates) {
    if (await fileExists(candidate)) {
      shimPath = candidate;
      break;
    }
  }

  const exists = await fileExists(shimPath);

  const shim: AppProvidersShimCheck = {
    path: shimPath,
    exists,
    target: null,
    targetExists: null,
    targetMatchesRouter: null,
  };

  if (!exists) {
    return { shim, warnings };
  }

  const content = await fs.readFile(shimPath, "utf8");
  const match = content.match(
    /from\s+["']\.\/(app-providers\.(?:app|pages))["']/,
  );
  const target = match?.[1] ?? null;
  shim.target = target;

  if (!target) {
    return { shim, warnings };
  }

  const targetPath = path.join(path.dirname(shimPath), `${target}.tsx`);
  shim.targetExists = await fileExists(targetPath);

  if (shim.targetExists === false) {
    warnings.push(`app-providers shim target file is missing: ${targetPath}`);
  }

  const expectedTarget =
    routerType === "app"
      ? "app-providers.app"
      : routerType === "pages"
        ? "app-providers.pages"
        : null;
  shim.targetMatchesRouter = expectedTarget ? expectedTarget === target : null;

  if (expectedTarget && expectedTarget !== target) {
    warnings.push(
      `app-providers shim target does not match detected ${routerType} router mode: ${shimPath} -> ${target}`,
    );
  }

  return { shim, warnings };
}

function getRouterPatchabilityDiagnostics(result: DoctorResult): {
  warnings: string[];
  errors: string[];
} {
  const warnings: string[] = [];
  const errors: string[] = [];
  const { routerType } = result.projectSanity;

  if (routerType === "app" || routerType === "hybrid") {
    const appLayout = result.routerPatchability.appLayout;

    if (appLayout.exists && appLayout.writeableInfo.status === "not-writable") {
      errors.push(`App Router layout is not writable: ${appLayout.path}`);
    }

    if (
      appLayout.exists &&
      appLayout.hasSuppressHydrationWarning.status === "not-found"
    ) {
      warnings.push(
        `App Router layout is missing suppressHydrationWarning: ${appLayout.path}`,
      );
    }
  }

  if (routerType === "pages" || routerType === "hybrid") {
    const pagesApp = result.routerPatchability.pagesApp;
    const pagesDocument = result.routerPatchability.pagesDocument;

    if (pagesApp.exists && pagesApp.writeableInfo.status === "not-writable") {
      errors.push(`Pages Router _app.tsx is not writable: ${pagesApp.path}`);
    }

    if (
      pagesDocument.exists &&
      pagesDocument.writeableInfo.status === "not-writable"
    ) {
      errors.push(
        `Pages Router _document.tsx is not writable: ${pagesDocument.path}`,
      );
    }

    if (
      pagesDocument.exists &&
      pagesDocument.hasSuppressHydrationWarning.status === "not-found"
    ) {
      warnings.push(
        `Pages Router _document.tsx is missing suppressHydrationWarning: ${pagesDocument.path}`,
      );
    }

    if (
      !pagesDocument.exists &&
      pagesDocument.writeableInfo.status === "not-found-parent-writable"
    ) {
      warnings.push(
        `Pages Router _document.tsx does not exist and will need to be created during install: ${pagesDocument.path}`,
      );
    }

    if (
      !pagesDocument.exists &&
      pagesDocument.writeableInfo.status === "not-found-parent-not-writable"
    ) {
      errors.push(
        `Pages Router _document.tsx does not exist and its parent directory is not writable: ${pagesDocument.path}`,
      );
    }
  }

  return { warnings, errors };
}

function getManifestFiles(manifest: BlocksManifest): string[] {
  const files = new Set<string>();

  for (const file of manifest.files ?? []) {
    files.add(file);
  }

  for (const group of Object.values(manifest.groups ?? {})) {
    for (const file of group.files) {
      files.add(file);
    }
  }

  return Array.from(files);
}

async function getManifestSourceDiagnostics(
  manifest: BlocksManifest,
  packageRoots: string[],
  manifestPath: string,
): Promise<{ manifestSource: ManifestSourceCheck; warnings: string[] }> {
  const warnings: string[] = [];
  const installedKitPaths = packageRoots;
  const missingFiles: string[] = [];

  for (const file of getManifestFiles(manifest)) {
    const fileExistsInAnyPackage = await Promise.all(
      packageRoots.map((root) => fileExists(path.join(root, file))),
    );

    if (!fileExistsInAnyPackage.some(Boolean)) {
      missingFiles.push(file);
    }
  }

  if (missingFiles.length > 0) {
    warnings.push(
      `Blocks manifest references files missing from installed block packages: ${missingFiles.join(", ")}`,
    );
  }

  return {
    manifestSource: {
      manifestPath,
      installedKitPaths,
      missingFiles,
    },
    warnings,
  };
}

export async function doctor(
  options: DoctorOptions = {},
): Promise<DoctorResult> {
  const cwd = process.cwd();

  const result = createInitialDoctorResult();

  const manifestPath = resolveAssetPath(
    "cli_manifests",
    "blocks_manifest.json",
  );
  const packageRoots = [
    path.join(cwd, "node_modules", "@nextworks", "blocks-core"),
    path.join(cwd, "node_modules", "@nextworks", "blocks-sections"),
    path.join(cwd, "node_modules", "@nextworks", "blocks-templates"),
  ];

  const packageJsonPath = getPackageJsonPath(cwd);
  const hasPackageJson = await fileExists(packageJsonPath);
  result.projectSanity.hasPackageJson = hasPackageJson;

  if (!hasPackageJson) {
    result.errors.push(
      "package.json not found. Run nextworks from a Next.js project root.",
    );
  }

  let packageJson: PackageJsonLike | null = null;

  if (hasPackageJson) {
    const pkg = (await readPackageJson(cwd)) as PackageJsonLike;
    packageJson = pkg;
    result.projectSanity.hasNext = Boolean(
      pkg.dependencies?.next || pkg.devDependencies?.next,
    );

    if (!result.projectSanity.hasNext) {
      result.errors.push(
        'Next.js dependency "next" not found in dependencies or devDependencies.',
      );
    }
  }

  const manifest = (await readJsonFile(manifestPath)) as BlocksManifest;
  result.manifestSource.manifestPath = manifestPath;

  const mode = await detectProjectRootMode(cwd);
  result.projectSanity.projectRoot = mode;

  const detectedLayoutPath =
    mode === "src" ? "src/app/layout.tsx" : "app/layout.tsx";
  const detectedPagesAppPath =
    mode === "src" ? "src/pages/_app.tsx" : "pages/_app.tsx";

  const appRouterLayoutExists = await fileExists(detectedLayoutPath);
  const pagesRouterAppExists = await fileExists(detectedPagesAppPath);

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
      "No supported Next.js router entrypoint found. Expected app/layout.tsx, src/app/layout.tsx, pages/_app.tsx, or src/pages/_app.tsx.",
    );
  }

  result.environmentChecks.nodeVersion = getNodeVersionCheck();

  const detectedPM = await detectPackageManager(cwd);
  const installCmd = getInstallCommand(detectedPM);
  result.environmentChecks.packageManager.pm = detectedPM;
  result.environmentChecks.packageManager.installCommand = installCmd;

  const isYarnPnP = await isYarnPnPProject(cwd);
  result.environmentChecks.yarnPnPDection.isPnP = isYarnPnP;

  if (packageJson) {
    result.environmentChecks.tailwind.hasTailwindDependency =
      hasTailwindDependency(packageJson);
    result.environmentChecks.typescript.hasTypeScriptDependency =
      hasTypeScriptDependency(packageJson);
  }

  result.environmentChecks.tailwind.hasCssBasedTailwindUsage =
    await hasCssBasedTailwindUsage(cwd);
  result.environmentChecks.tailwind.detected =
    result.environmentChecks.tailwind.hasTailwindDependency ||
    result.environmentChecks.tailwind.hasCssBasedTailwindUsage;

  if (!result.environmentChecks.tailwind.detected) {
    result.warnings.push(
      'Tailwind CSS was not detected. Blocks requires Tailwind CSS v4-style setup via a `tailwindcss` dependency or CSS imports such as `@import "tailwindcss"`.',
    );
  }

  result.environmentChecks.typescript.hasTsconfig = await hasTsconfig(cwd);
  result.environmentChecks.typescript.detected =
    result.environmentChecks.typescript.hasTsconfig ||
    result.environmentChecks.typescript.hasTypeScriptDependency;

  if (!result.environmentChecks.typescript.detected) {
    result.errors.push(
      "TypeScript was not detected. Blocks requires a `tsconfig.json` file or a `typescript` dependency in dependencies or devDependencies.",
    );
  }

  result.projectRootWritability = await getProjectRootWritability(cwd);
  if (!result.projectRootWritability.exists) {
    result.errors.push(
      `Project root does not exist: ${result.projectRootWritability.path}`,
    );
  } else if (result.projectRootWritability.writable === false) {
    result.errors.push(
      `Project root is not writable: ${result.projectRootWritability.path}`,
    );
  }

  if (
    result.projectSanity.routerType === "app" ||
    result.projectSanity.routerType === "hybrid"
  ) {
    let layoutFilePath = "";

    if (result.projectSanity.projectRoot === "src") {
      layoutFilePath = path.join(process.cwd(), "src", "app", "layout.tsx");
    } else {
      layoutFilePath = path.join(process.cwd(), "app", "layout.tsx");
    }

    result.routerPatchability.appLayout.path = layoutFilePath;

    const layoutExists = await fileExists(layoutFilePath);
    result.routerPatchability.appLayout.exists = layoutExists;

    const isWriteableInfo = await fileIsWritable(layoutFilePath);
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
      await fileHasSuppressHydrationWarning(layoutFilePath);
    result.routerPatchability.appLayout.hasSuppressHydrationWarning =
      hasHydrationWarning;
  }

  if (
    result.projectSanity.routerType === "pages" ||
    result.projectSanity.routerType === "hybrid"
  ) {
    let _appFilePath = "";

    if (result.projectSanity.projectRoot === "src") {
      _appFilePath = path.join(process.cwd(), "src", "pages", "_app.tsx");
    } else {
      _appFilePath = path.join(process.cwd(), "pages", "_app.tsx");
    }

    result.routerPatchability.pagesApp.path = _appFilePath;

    const _appExists = await fileExists(_appFilePath);
    result.routerPatchability.pagesApp.exists = _appExists;

    const is_appWriteableInfo = await fileIsWritable(_appFilePath);
    result.routerPatchability.pagesApp.writeableInfo = is_appWriteableInfo;

    const _appWriteAble = is_appWriteableInfo.status;
    if (_appWriteAble === "writable") {
      result.routerPatchability.pagesApp.writable = true;
    } else if (_appWriteAble === "not-writable") {
      result.routerPatchability.pagesApp.writable = false;
    } else {
      result.routerPatchability.pagesApp.writable = null;
    }

    let _documentFilePath = "";

    if (result.projectSanity.projectRoot === "src") {
      _documentFilePath = path.join(
        process.cwd(),
        "src",
        "pages",
        "_document.tsx",
      );
    } else {
      _documentFilePath = path.join(process.cwd(), "pages", "_document.tsx");
    }

    result.routerPatchability.pagesDocument.path = _documentFilePath;

    const _documentExists = await fileExists(_documentFilePath);
    result.routerPatchability.pagesDocument.exists = _documentExists;

    const is_documentWriteableInfo = await fileIsWritable(_documentFilePath);
    result.routerPatchability.pagesDocument.writeableInfo =
      is_documentWriteableInfo;

    const _documentWriteAble = is_documentWriteableInfo.status;
    if (_documentWriteAble === "writable") {
      result.routerPatchability.pagesDocument.writable = true;
    } else if (_documentWriteAble === "not-writable") {
      result.routerPatchability.pagesDocument.writable = false;
    } else {
      result.routerPatchability.pagesDocument.writable = null;
    }

    const hasHydrationWarning =
      await fileHasSuppressHydrationWarning(_documentFilePath);
    result.routerPatchability.pagesDocument.hasSuppressHydrationWarning =
      hasHydrationWarning;
  }

  const shimDiagnostics = await getAppProvidersShimDiagnostics(
    cwd,
    result.projectSanity.routerType,
  );
  result.appProvidersShim = shimDiagnostics.shim;
  result.warnings.push(...shimDiagnostics.warnings);

  const manifestDiagnostics = await getManifestSourceDiagnostics(
    manifest,
    packageRoots,
    manifestPath,
  );

  result.manifestSource = manifestDiagnostics.manifestSource;
  result.warnings.push(...manifestDiagnostics.warnings);

  const diagnostics = getRouterPatchabilityDiagnostics(result);
  result.warnings.push(...diagnostics.warnings);
  result.errors.push(...diagnostics.errors);

  return result;
}
