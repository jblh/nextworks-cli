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

let baselineTotals = createEmptyTotals();
let hasBaseline = false;

const ANSI = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  gray: "\x1b[90m",
};

const MODEL_COLUMN_GAP = 2;

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

function styleText(text, ...styles) {
  if (!process.stdout.isTTY || styles.length === 0) {
    return text;
  }

  return `${styles.map((style) => ANSI[style]).join("")}${text}${ANSI.reset}`;
}

function clearTerminal() {
  if (!process.stdout.isTTY) {
    return;
  }

  process.stdout.write("\x1b[3J\x1b[H\x1b[2J");
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
    return;
  }

  const currentTotals = readCurrentTotals();

  if (!currentTotals) {
    printTotals("reset skipped");
    return;
  }

  baselineTotals = currentTotals;
  hasBaseline = true;
  printTotals("after reset");
}

function printPerModelTotals(totals) {
  const modelEntries = Object.entries(totals.byModel)
    .filter(([, modelTotals]) => modelTotals.totalTokens > 0)
    .sort(([, left], [, right]) => right.totalTokens - left.totalTokens);

  if (modelEntries.length === 0) {
    console.log(styleText("No token data", "gray"));
    return;
  }

  const rows = modelEntries.map(([modelName, modelTotals]) => ({
    modelName,
    total: formatNumber(modelTotals.totalTokens),
  }));

  const modelWidth = Math.max(...rows.map((row) => row.modelName.length));
  const totalWidth = Math.max(...rows.map((row) => row.total.length));

  for (const row of rows) {
    console.log(
      [
        styleText(row.modelName.padEnd(modelWidth), "magenta"),
        styleText(row.total.padStart(totalWidth), "green"),
      ].join(" ".repeat(MODEL_COLUMN_GAP)),
    );
  }
}

function printTotals(reason) {
  const currentTotals = readCurrentTotals();

  clearTerminal();

  console.log(styleText("Continue token watcher", "cyan", "bold"));
  console.log(styleText(`File: ${logPath}`, "dim"));
  console.log(styleText(`Mode: ${getModeLabel()}`, "dim"));
  if (reason) {
    console.log(styleText(`Update: ${reason}`, "dim"));
  }
  console.log("");

  if (!currentTotals) {
    console.log(styleText("File not found", "red", "bold"));
    return;
  }

  ensureBaseline(currentTotals);

  const visibleTotals = subtractTotals(currentTotals, baselineTotals);

  console.log(
    [
      `Entries: ${formatNumber(visibleTotals.entries)}`,
      `Prompt: ${formatNumber(visibleTotals.promptTokens)}`,
      `Generated: ${formatNumber(visibleTotals.generatedTokens)}`,
      `Total: ${formatNumber(visibleTotals.totalTokens)}`,
    ].join("  "),
  );

  if (visibleTotals.lastTimestamp && visibleTotals.lastTimestamp !== "-") {
    console.log(
      styleText(`Last timestamp: ${visibleTotals.lastTimestamp}`, "dim"),
    );
  }

  if (visibleTotals.invalidLines > 0) {
    console.log(
      styleText(
        `Invalid lines: ${formatNumber(visibleTotals.invalidLines)}`,
        "yellow",
      ),
    );
  }

  console.log("");
  printPerModelTotals(visibleTotals);
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
  hasBaseline = false;
  baselineTotals = createEmptyTotals();
  printTotals("file removed");
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
