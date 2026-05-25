import chokidar from "chokidar";
import fs from "fs";
import os from "os";
import path from "path";
import readline from "readline";

const DEFAULT_LOG_PATH = path.join(
  os.homedir(),
  ".continue",
  "dev_data",
  "0.2.0",
  "tokensGenerated.jsonl",
);
const DAILY_RESET_HOUR = 2;

const rawArgs = process.argv.slice(2);
const options = {
  sinceStart: false,
  day: false,
  help: false,
};

let argPath;

for (const arg of rawArgs) {
  if (arg === "--since-start" || arg === "-s") {
    options.sinceStart = true;
    continue;
  }

  if (arg === "--day" || arg === "-d") {
    options.day = true;
    continue;
  }

  if (arg === "--help" || arg === "-h") {
    options.help = true;
    continue;
  }

  if (!argPath) {
    argPath = arg;
  }
}

if (options.help) {
  console.log(
    "Usage: node scripts/watch-continue-tokens.mjs [path] [--since-start|--day]",
  );
  console.log("");
  console.log("Modes:");
  console.log("  default        Show totals for the entire file");
  console.log(
    "  --since-start  Show only tokens added after this script starts",
  );
  console.log(
    `  --day         Show totals since the last daily reset at ${String(DAILY_RESET_HOUR).padStart(2, "0")}:00 local time`,
  );
  console.log("");
  console.log("While running:");
  console.log("  r              Reset the baseline to the current totals");
  console.log("  q              Quit");
  process.exit(0);
}

const logPath = resolvePath(
  argPath || process.env.CONTINUE_TOKENS_FILE || DEFAULT_LOG_PATH,
);

let lastSignature = "";
let baselineTotals = createEmptyTotals();
let hasBaseline = false;

function createEmptyTotals() {
  return {
    entries: 0,
    promptTokens: 0,
    generatedTokens: 0,
    totalTokens: 0,
    lastTimestamp: "-",
    invalidLines: 0,
    byModel: {},
  };
}

function createEmptyModelTotals() {
  return {
    entries: 0,
    promptTokens: 0,
    generatedTokens: 0,
    totalTokens: 0,
  };
}

function resolvePath(inputPath) {
  if (!inputPath) {
    return DEFAULT_LOG_PATH;
  }

  if (inputPath === "~") {
    return os.homedir();
  }

  if (inputPath.startsWith("~/") || inputPath.startsWith("~\\")) {
    return path.join(os.homedir(), inputPath.slice(2));
  }

  return path.resolve(inputPath);
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

function getModeLabel() {
  if (options.day) {
    return `day window since ${String(DAILY_RESET_HOUR).padStart(2, "0")}:00`;
  }

  if (options.sinceStart) {
    return "since start / reset";
  }

  return "entire file";
}

function getDailyWindowStart(now = new Date()) {
  const start = new Date(now);
  start.setHours(DAILY_RESET_HOUR, 0, 0, 0);

  if (now < start) {
    start.setDate(start.getDate() - 1);
  }

  return start;
}

function shouldIncludeEntry(entry) {
  if (!options.day) {
    return true;
  }

  if (!entry.timestamp) {
    return false;
  }

  const entryDate = new Date(entry.timestamp);

  if (Number.isNaN(entryDate.getTime())) {
    return false;
  }

  return entryDate >= getDailyWindowStart();
}

function addEntryToTotals(totals, entry) {
  const promptTokens = Number(entry.promptTokens || 0);
  const generatedTokens = Number(entry.generatedTokens || 0);
  const totalTokens = promptTokens + generatedTokens;
  const modelName = String(entry.model || "unknown");

  totals.entries += 1;
  totals.promptTokens += promptTokens;
  totals.generatedTokens += generatedTokens;
  totals.totalTokens += totalTokens;
  totals.lastTimestamp = entry.timestamp || totals.lastTimestamp;

  if (!totals.byModel[modelName]) {
    totals.byModel[modelName] = createEmptyModelTotals();
  }

  totals.byModel[modelName].entries += 1;
  totals.byModel[modelName].promptTokens += promptTokens;
  totals.byModel[modelName].generatedTokens += generatedTokens;
  totals.byModel[modelName].totalTokens += totalTokens;
}

function parseTotals(fileContents) {
  const totals = createEmptyTotals();
  const lines = fileContents.split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      continue;
    }

    try {
      const entry = JSON.parse(trimmed);

      if (!shouldIncludeEntry(entry)) {
        continue;
      }

      addEntryToTotals(totals, entry);
    } catch {
      totals.invalidLines += 1;
    }
  }

  return totals;
}

function subtractModelTotals(modelTotals, baselineModelTotals) {
  return {
    entries: Math.max(0, modelTotals.entries - baselineModelTotals.entries),
    promptTokens: Math.max(
      0,
      modelTotals.promptTokens - baselineModelTotals.promptTokens,
    ),
    generatedTokens: Math.max(
      0,
      modelTotals.generatedTokens - baselineModelTotals.generatedTokens,
    ),
    totalTokens: Math.max(
      0,
      modelTotals.totalTokens - baselineModelTotals.totalTokens,
    ),
  };
}

function subtractTotals(totals, baseline) {
  const modelNames = new Set([
    ...Object.keys(totals.byModel),
    ...Object.keys(baseline.byModel),
  ]);
  const byModel = {};

  for (const modelName of modelNames) {
    byModel[modelName] = subtractModelTotals(
      totals.byModel[modelName] || createEmptyModelTotals(),
      baseline.byModel[modelName] || createEmptyModelTotals(),
    );
  }

  return {
    entries: Math.max(0, totals.entries - baseline.entries),
    promptTokens: Math.max(0, totals.promptTokens - baseline.promptTokens),
    generatedTokens: Math.max(
      0,
      totals.generatedTokens - baseline.generatedTokens,
    ),
    totalTokens: Math.max(0, totals.totalTokens - baseline.totalTokens),
    lastTimestamp: totals.lastTimestamp,
    invalidLines: totals.invalidLines,
    byModel,
  };
}

function getSignature(totals) {
  const modelSignature = Object.entries(totals.byModel)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(
      ([modelName, modelTotals]) =>
        `${modelName}:${modelTotals.entries}:${modelTotals.promptTokens}:${modelTotals.generatedTokens}:${modelTotals.totalTokens}`,
    )
    .join("|");

  return [
    totals.entries,
    totals.promptTokens,
    totals.generatedTokens,
    totals.totalTokens,
    totals.lastTimestamp,
    totals.invalidLines,
    modelSignature,
  ].join("|");
}

function readCurrentTotals() {
  if (!fs.existsSync(logPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(logPath, "utf8");
  return parseTotals(fileContents);
}

function ensureBaseline(currentTotals) {
  if (hasBaseline) {
    return;
  }

  if (options.sinceStart) {
    baselineTotals = currentTotals;
    hasBaseline = true;
    return;
  }

  baselineTotals = createEmptyTotals();
  hasBaseline = true;
}

function resetBaseline() {
  if (options.day) {
    console.log(`\n[${new Date().toLocaleTimeString()}] reset skipped`);
    console.log("Manual reset is disabled in --day mode.");
    return;
  }

  const currentTotals = readCurrentTotals();

  if (!currentTotals) {
    console.log(`\n[${new Date().toLocaleTimeString()}] reset skipped`);
    console.log(`File not found: ${logPath}`);
    return;
  }

  baselineTotals = currentTotals;
  hasBaseline = true;
  lastSignature = "";
  console.log(`\n[${new Date().toLocaleTimeString()}] baseline reset`);
  printTotals("after reset");
}

function printPerModelTotals(totals) {
  const modelEntries = Object.entries(totals.byModel).sort(
    ([, left], [, right]) => right.totalTokens - left.totalTokens,
  );

  if (modelEntries.length === 0) {
    return;
  }

  console.log("By model:");

  for (const [modelName, modelTotals] of modelEntries) {
    console.log(
      `  ${modelName}: total=${formatNumber(modelTotals.totalTokens)} prompt=${formatNumber(modelTotals.promptTokens)} generated=${formatNumber(modelTotals.generatedTokens)} entries=${formatNumber(modelTotals.entries)}`,
    );
  }
}

function printTotals(reason) {
  const currentTotals = readCurrentTotals();

  if (!currentTotals) {
    console.log(`[${reason}] File not found: ${logPath}`);
    return;
  }

  ensureBaseline(currentTotals);

  const visibleTotals = subtractTotals(currentTotals, baselineTotals);
  const signature = getSignature(visibleTotals);

  if (signature === lastSignature) {
    return;
  }

  lastSignature = signature;

  console.log(`\n[${new Date().toLocaleTimeString()}] ${reason}`);
  console.log(`File: ${logPath}`);
  console.log(`Mode:              ${getModeLabel()}`);

  if (options.day) {
    console.log(`Window start:      ${getDailyWindowStart().toLocaleString()}`);
  }

  console.log(`Entries:           ${formatNumber(visibleTotals.entries)}`);
  console.log(`Prompt tokens:     ${formatNumber(visibleTotals.promptTokens)}`);
  console.log(
    `Generated tokens:  ${formatNumber(visibleTotals.generatedTokens)}`,
  );
  console.log(`Total tokens:      ${formatNumber(visibleTotals.totalTokens)}`);
  console.log(`Last timestamp:    ${visibleTotals.lastTimestamp}`);
  printPerModelTotals(visibleTotals);

  if (currentTotals.invalidLines > 0) {
    console.log(
      `Invalid lines:     ${formatNumber(currentTotals.invalidLines)}`,
    );
  }
}

function setupKeyboardShortcuts() {
  if (!process.stdin.isTTY) {
    return;
  }

  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.on("keypress", (_, key) => {
    if (!key) {
      return;
    }

    if (key.name === "r") {
      resetBaseline();
      return;
    }

    if (key.name === "q") {
      watcher.close().finally(() => process.exit(0));
    }
  });
}

console.log(`Watching Continue tokens: ${logPath}`);
console.log(`Mode: ${getModeLabel()}`);
console.log(
  `Keys: r = ${options.day ? "disabled in day mode" : "reset baseline"}, q = quit\n`,
);
printTotals("initial");

const watcher = chokidar.watch(logPath, {
  ignoreInitial: true,
  awaitWriteFinish: {
    stabilityThreshold: 200,
    pollInterval: 100,
  },
});

setupKeyboardShortcuts();

watcher.on("add", () => printTotals("file added"));
watcher.on("change", () => printTotals("file changed"));
watcher.on("unlink", () => {
  lastSignature = "";
  hasBaseline = false;
  baselineTotals = createEmptyTotals();
  console.log(`\n[${new Date().toLocaleTimeString()}] file removed`);
  console.log(`File: ${logPath}`);
});
watcher.on("error", (error) => {
  console.error("Watcher error:", error);
});

process.on("SIGINT", () => {
  watcher.close().finally(() => process.exit(0));
});
process.on("SIGTERM", () => {
  watcher.close().finally(() => process.exit(0));
});
