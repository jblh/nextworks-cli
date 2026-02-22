const fs = require("fs-extra");
const path = require("path");

// Script location: cli/scripts. Assets: repoRoot/cli_manifests and cliRoot/kits.
const cliRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(__dirname, "..", "..");
const dist = path.join(cliRoot, "dist");

fs.ensureDirSync(dist);

// dist/ can contain leftovers from prior builds; destinations are removed before copying.
const manifestsSrc = path.join(repoRoot, "cli_manifests");
const kitsSrc = path.join(cliRoot, "kits");

const manifestsDest = path.join(dist, "cli_manifests");
const kitsDest = path.join(dist, "kits");

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
