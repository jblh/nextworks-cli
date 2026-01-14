import fs from "node:fs";

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function main() {
  const twAnimatePath = "app/tw-animate.css";
  const globalsPath = "app/globals.css";

  const twAnimateExists = fs.existsSync(twAnimatePath);
  console.log(`${twAnimatePath} exists:`, twAnimateExists);
  assert(twAnimateExists, `Expected ${twAnimatePath} to exist (vendored CSS must be copied by kit).`);

  const globalsExists = fs.existsSync(globalsPath);
  console.log(`${globalsPath} exists:`, globalsExists);
  assert(globalsExists, `Expected ${globalsPath} to exist.`);

  const globalsCss = fs.readFileSync(globalsPath, "utf8");
  const importRegex = /@import\s+["']\.\/tw-animate\.css["']\s*;/;
  const importsVendored = importRegex.test(globalsCss);
  console.log(`${globalsPath} imports ./tw-animate.css:`, importsVendored);
  assert(
    importsVendored,
    `Expected ${globalsPath} to include an @import for ./tw-animate.css (vendored).`,
  );

  console.log("Sandbox blocks checks passed.");
}

try {
  main();
} catch (err) {
  console.error("Sandbox blocks checks failed:");
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
}
