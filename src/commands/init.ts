import { join, dirname } from "path";
import { cp, mkdir, writeFile, readFile, stat } from "node:fs/promises";
import { log, colors } from "../utils";
import { i18n } from "../i18n";
import { link } from "./link";
import { LitespecConfig } from "../config/schema";

/**
 * Find the source .litespec/ directory.
 *
 * Strategy 1 (compiled binary): Look next to the executable via process.execPath
 * Strategy 2 (compiled binary fallback): Look via process.argv[0]
 * Strategy 3 (development): Build from src/templates/ into a cached directory
 */
async function findSourceLitespecDir(): Promise<string> {
  const { realpath } = await import("node:fs/promises");

  // Helper: check if .litespec/config.json exists in a directory
  async function tryLitespecDir(dir: string): Promise<boolean> {
    try {
      await stat(join(dir, "config.json"));
      return true;
    } catch {
      return false;
    }
  }

  // Strategy 1: process.execPath (most reliable for compiled Bun binaries)
  try {
    const resolved = await realpath(process.execPath);
    const execDir = dirname(resolved);
    const candidate = join(execDir, ".litespec");
    if (await tryLitespecDir(candidate)) return candidate;
  } catch {}

  // Strategy 2: process.argv[0] fallback
  try {
    const exePath = await realpath(process.argv[0]);
    const exeDir = dirname(exePath);
    const candidate = join(exeDir, ".litespec");
    if (await tryLitespecDir(candidate)) return candidate;
  } catch {}

  // Strategy 3: import.meta.dir (works for bundled JS files)
  try {
    const bundleDir = import.meta.dir;
    const candidate = join(bundleDir, ".litespec");
    if (await tryLitespecDir(candidate)) return candidate;
  } catch {}

  // Strategy 4: Development mode - use cached .litespec/ from node_modules/.cache/
  const projectRoot = join(import.meta.dir, "..", "..");
  const cacheDir = join(projectRoot, "node_modules", ".cache", "litespec");
  const cacheLitespec = join(cacheDir, ".litespec");

  try {
    await stat(join(cacheLitespec, "config.json"));
    await stat(join(cacheLitespec, "agents", "zh", "default.md"));
    return cacheLitespec;
  } catch {
    // Cache miss - build from src/templates/
  }

  const devDir = join(projectRoot, "src", "templates");
  try {
    await stat(join(devDir, "zh", "init.md"));
  } catch {
    throw new Error(
      "Could not find .litespec source directory. " +
      "Please ensure the CLI is properly installed."
    );
  }

  // Build cached .litespec/ structure
  await mkdir(join(cacheLitespec, "templates", "zh"), { recursive: true });
  await mkdir(join(cacheLitespec, "templates", "en"), { recursive: true });
  await mkdir(join(cacheLitespec, "workflows", "zh"), { recursive: true });
  await mkdir(join(cacheLitespec, "workflows", "en"), { recursive: true });
  await mkdir(join(cacheLitespec, "agents", "zh"), { recursive: true });
  await mkdir(join(cacheLitespec, "agents", "en"), { recursive: true });
  await mkdir(join(cacheLitespec, "specs"), { recursive: true });
  await mkdir(join(cacheLitespec, "scripts"), { recursive: true });
  await mkdir(join(cacheLitespec, "memory"), { recursive: true });

  await cp(join(devDir, "zh"), join(cacheLitespec, "templates", "zh"), { recursive: true });
  await cp(join(devDir, "en"), join(cacheLitespec, "templates", "en"), { recursive: true });

  // Copy workflow templates
  const devWorkflowsDir = join(projectRoot, "src", "workflows");
  await cp(join(devWorkflowsDir, "zh"), join(cacheLitespec, "workflows", "zh"), { recursive: true });
  await cp(join(devWorkflowsDir, "en"), join(cacheLitespec, "workflows", "en"), { recursive: true });

  // Copy agents templates
  const devAgentsDir = join(projectRoot, "src", "agents");
  await cp(join(devAgentsDir, "zh"), join(cacheLitespec, "agents", "zh"), { recursive: true });
  await cp(join(devAgentsDir, "en"), join(cacheLitespec, "agents", "en"), { recursive: true });

  const config = {
    version: "1.0.0",
    locale: "en",
    legacyMode: false,
    adapters: ["cursor", "trae", "qoder", "qodercn", "claude", "codebuddy", "workbuddy"],
  };
  await writeFile(join(cacheLitespec, "config.json"), JSON.stringify(config, null, 2));
  await writeFile(join(cacheLitespec, "memory", "history.json"), JSON.stringify({ workflows: [] }, null, 2));
  await writeFile(join(cacheLitespec, "feature.json"), JSON.stringify({ feature_directory: null }, null, 2));

  return cacheLitespec;
}

export async function init(args: string[]) {
  const isLegacy = args.includes("--legacy");
  const root = process.cwd();
  // Parse --lang: support both `--lang=zh` and `--lang zh`
  let locale = "en";
  const eqArg = args.find(a => a.startsWith("--lang="));
  if (eqArg) locale = eqArg.split("=")[1];
  else {
    const idx = args.indexOf("--lang");
    if (idx !== -1 && args[idx + 1]) locale = args[idx + 1];
  }
  const t = i18n.t;

  log(colors.blue, t.init.start);
  if (isLegacy) log(colors.yellow, t.init.legacyMode);

  // Resolve source .litespec/ directory once
  const sourceLitespecDir = await findSourceLitespecDir();

  // 1. Create AGENTS.md
  const agentsMd = join(root, "AGENTS.md");
  let agentsExists = false;
  try { await stat(agentsMd); agentsExists = true; } catch {}
  if (!agentsExists) {
    const lang = locale === "zh" ? "zh" : "en";
    const templateFile = isLegacy ? "legacy.md" : "default.md";
    const templatePath = join(sourceLitespecDir, "agents", lang, templateFile);
    let content: string;
    try {
      content = await readFile(templatePath, "utf-8");
    } catch {
      // Fallback to English
      const fallbackPath = join(sourceLitespecDir, "agents", "en", templateFile);
      content = await readFile(fallbackPath, "utf-8");
    }
    await writeFile(agentsMd, content);
    log(colors.green, t.init.createdAgents);
  }

  // 2. Copy .litespec/ to user's project (only selected language, skip if exists)
  const targetLitespecDir = join(root, ".litespec");
  let litespecExists = false;
  try { await stat(targetLitespecDir); litespecExists = true; } catch {}

  if (!litespecExists) {
    const lang = locale === "zh" ? "zh" : "en";

    // Create directory structure
    await mkdir(targetLitespecDir, { recursive: true });
    await mkdir(join(targetLitespecDir, "templates"), { recursive: true });
    await mkdir(join(targetLitespecDir, "workflows"), { recursive: true });
    await mkdir(join(targetLitespecDir, "agents"), { recursive: true });
    await mkdir(join(targetLitespecDir, "specs"), { recursive: true });
    await mkdir(join(targetLitespecDir, "scripts"), { recursive: true });
    await mkdir(join(targetLitespecDir, "memory"), { recursive: true });

    // Copy selected language templates/workflows/agents (without language subdirectory)
    await cp(join(sourceLitespecDir, "templates", lang), join(targetLitespecDir, "templates"), { recursive: true });
    await cp(join(sourceLitespecDir, "workflows", lang), join(targetLitespecDir, "workflows"), { recursive: true });
    await cp(join(sourceLitespecDir, "agents", lang), join(targetLitespecDir, "agents"), { recursive: true });

    // Copy non-language-specific files
    await cp(join(sourceLitespecDir, "config.json"), join(targetLitespecDir, "config.json"));
    await cp(join(sourceLitespecDir, "memory", "history.json"), join(targetLitespecDir, "memory", "history.json"));
    try { await cp(join(sourceLitespecDir, "feature.json"), join(targetLitespecDir, "feature.json")); } catch {}

    log(colors.green, t.init.createdLitespecDir);
  } else {
    log(colors.yellow, "⚠️  .litespec/ already exists, skipping to prevent overwrites.");
  }

  // 3. Update config.json based on user arguments
  const configPath = join(targetLitespecDir, "config.json");
  const config: LitespecConfig = JSON.parse(await readFile(configPath, "utf-8"));
  config.locale = locale as "en" | "zh";
  config.legacyMode = isLegacy;
  await writeFile(configPath, JSON.stringify(config, null, 2));

  // 4. Create docs/litespec/ directory
  const docsDir = join(root, "docs", "litespec");
  await mkdir(docsDir, { recursive: true });
  log(colors.green, t.init.createdDocs);

  // 5. Sync IDE configurations
  await link();
}
