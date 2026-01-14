const fs = require("fs-extra");
const path = require("path");

// repo layout note: cli_manifests lives at the repository root, while this script
// runs from cli/scripts. Resolve repoRoot and the cli root explicitly.
const cliRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(__dirname, "..", "..");
const dist = path.join(cliRoot, "dist");

fs.ensureDirSync(dist);

// copy manifests from repo root and kits from cli into dist
// IMPORTANT: dist/ may contain stale folders from previous builds.
// Remove the destination folders first so deleted kits/manifests do not linger.
const manifestsSrc = path.join(repoRoot, "cli_manifests");
const kitsSrc = path.join(cliRoot, "kits");

const manifestsDest = path.join(dist, "cli_manifests");
const kitsDest = path.join(dist, "kits");

// Clean destinations to avoid stale files being published
fs.removeSync(manifestsDest);
fs.removeSync(kitsDest);

if (fs.existsSync(manifestsSrc)) {
  fs.copySync(manifestsSrc, manifestsDest);
} else {
  console.warn("Warning: cli_manifests not found at", manifestsSrc);
}

if (fs.existsSync(kitsSrc)) {
  fs.copySync(kitsSrc, kitsDest);
} else {
  console.warn("Warning: kits directory not found at", kitsSrc);
}

console.log("Copied cli_manifests and kits into dist/");
