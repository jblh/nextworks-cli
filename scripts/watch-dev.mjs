// scripts/watch-dev.mjs
import chokidar from "chokidar";
import fs from "fs";
import path from "path";

const shouldForceCopy =
  process.argv.includes("--force") || process.env.npm_config_force === "true";

const MAPPINGS = [

    {
    src: "C:/Users/Jakob/Documents/WareHouse/nextworks/1_nextworks-cli/cli/kits/blocks/components",
    dest: "C:/Users/Jakob/Documents/WareHouse/nextworks/0_test_npm/components",

  },
  {
    src: "C:/Users/Jakob/Documents/WareHouse/nextworks/1_nextworks-cli/cli/kits/blocks/app/templates",
    dest: "C:/Users/Jakob/Documents/WareHouse/nextworks/0_test_npm/app/templates",
  },
  {
    src: "C:/Users/Jakob/Documents/WareHouse/nextworks/1_nextworks-cli/cli/kits/blocks/public",
    dest: "C:/Users/Jakob/Documents/WareHouse/nextworks/0_test_npm/public",
  },
];

function copyFile(srcPath, destPath, label) {
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  const contents = fs.readFileSync(srcPath);
  fs.writeFileSync(destPath, contents);
  const now = new Date();
  fs.utimesSync(destPath, now, now);
  console.log(`✓ [${label}] ${srcPath} -> ${destPath}`);
}

function copyDirectoryContents(srcDir, destDir, baseDir = srcDir) {
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = path.join(srcDir, entry.name);
    const relative = path.relative(baseDir, srcPath);
    const destPath = path.join(destDir, relative);

    if (entry.isDirectory()) {
      copyDirectoryContents(srcPath, destDir, baseDir);
      continue;
    }

    copyFile(srcPath, destPath, "force");
  }
}

for (const { src, dest } of MAPPINGS) {
  if (shouldForceCopy) {
    copyDirectoryContents(src, dest);
  }

  chokidar.watch(src, { ignoreInitial: true }).on("all", (event, filePath) => {
    const relative = path.relative(src, filePath);
    const destPath = path.join(dest, relative);

    if (event === "add" || event === "change") {
      copyFile(filePath, destPath, event);
    }

    if (event === "unlink") {
      fs.rmSync(destPath, { force: true });
      console.log(`✗ [removed] ${relative}`);
    }
  });

  // console.log(`Watching: ${src}`);
  console.log(`      → : ${dest}${shouldForceCopy ? " [forced sync]" : ""}\n`);
}

