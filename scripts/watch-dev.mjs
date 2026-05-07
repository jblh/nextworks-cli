// scripts/watch-dev.mjs
import chokidar from "chokidar";
import fs from "fs";
import path from "path";

const MAPPINGS = [
  {
    src: "C:/Users/Jakob/Documents/WareHouse/nextworks/1_nextworks-cli/cli/kits/blocks/components",
    dest: "C:/Users/Jakob/Documents/WareHouse/nextworks/0_test_npm/components",
  },
  {
    src: "C:/Users/Jakob/Documents/WareHouse/nextworks/1_nextworks-cli/cli/kits/blocks/app/templates",
    dest: "C:/Users/Jakob/Documents/WareHouse/nextworks/0_test_npm/app/templates",
  },
];

for (const { src, dest } of MAPPINGS) {
  chokidar.watch(src, { ignoreInitial: true }).on("all", (event, filePath) => {
    const relative = path.relative(src, filePath);
    const destPath = path.join(dest, relative);

    if (event === "add" || event === "change") {
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.copyFileSync(filePath, destPath);
      console.log(`✓ [${event}] ${relative}`);
    }

    if (event === "unlink") {
      fs.rmSync(destPath, { force: true });
      console.log(`✗ [removed] ${relative}`);
    }
  });

  console.log(`Watching: ${src}`);
  console.log(`      → : ${dest}\n`);
}
