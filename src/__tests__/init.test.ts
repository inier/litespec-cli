import { describe, test, expect, beforeEach, afterEach } from "bun:test";
import { join } from "path";
import { mkdir, rm, stat, readdir, readFile } from "node:fs/promises";
import { init } from "../commands/init";
import { i18n } from "../i18n";

const TEST_DIR = join(process.cwd(), ".test-init");
const ROOT_DIR = process.cwd();

describe("Init Command", () => {
  beforeEach(async () => {
    await mkdir(TEST_DIR, { recursive: true });
    await i18n.setLocale("zh");
    process.chdir(TEST_DIR);
  });

  afterEach(async () => {
    process.chdir(ROOT_DIR);
    await rm(TEST_DIR, { recursive: true, force: true });
  });

  test("should create AGENTS.md and docs/ directory", async () => {
    await init([]);

    // Check AGENTS.md exists
    const agentsPath = join(TEST_DIR, "AGENTS.md");
    expect(await stat(agentsPath).then(() => true).catch(() => false)).toBe(true);

    // Check docs/ directory exists
    const docsDir = join(TEST_DIR, "docs");
    expect(await stat(docsDir).then(s => s.isDirectory()).catch(() => false)).toBe(true);
  });

  test("should create .litespec/ directory structure", async () => {
    await init(["--lang=zh"]);

    // Check .litespec/ directory exists
    const litespecDir = join(TEST_DIR, ".litespec");
    expect(await stat(litespecDir).then(s => s.isDirectory()).catch(() => false)).toBe(true);

    // Check .litespec/templates/ exists (flat structure, no language subdir)
    const templatesDir = join(litespecDir, "templates");
    expect(await stat(templatesDir).then(s => s.isDirectory()).catch(() => false)).toBe(true);

    // Check .litespec/memory/ exists
    const memoryDir = join(litespecDir, "memory");
    expect(await stat(memoryDir).then(s => s.isDirectory()).catch(() => false)).toBe(true);
  });

  test("should copy template files to .litespec/templates/", async () => {
    await init(["--lang=zh"]);

    const templatesDir = join(TEST_DIR, ".litespec", "templates");
    const files = await readdir(templatesDir);

    expect(files).toContain("init.md");
    expect(files).toContain("specify.md");
    expect(files).toContain("plan.md");
    expect(files).toContain("validate.md");
    expect(files).toContain("reverse.md");
  });

  test("should create config.json with correct structure", async () => {
    await init([]);

    const configPath = join(TEST_DIR, ".litespec", "config.json");
    const content = await readFile(configPath, "utf-8");
    const config = JSON.parse(content);

    expect(config.version).toBe("1.0.0");
    expect(config.locale).toBe("en");
    expect(config.legacyMode).toBe(false);
    expect(config.adapters).toBeDefined();
    expect(Array.isArray(config.adapters)).toBe(true);
  });

  test("should create history.json with empty workflows array", async () => {
    await init([]);

    const historyPath = join(TEST_DIR, ".litespec", "memory", "history.json");
    const content = await readFile(historyPath, "utf-8");
    const history = JSON.parse(content);

    expect(history.workflows).toEqual([]);
  });

  test("should create legacy config when --legacy flag is used", async () => {
    await init(["--legacy"]);

    const configPath = join(TEST_DIR, ".litespec", "config.json");
    const content = await readFile(configPath, "utf-8");
    const config = JSON.parse(content);

    expect(config.legacyMode).toBe(true);
  });

  test("should copy English templates when locale is en", async () => {
    await i18n.setLocale("en");
    await init(["--lang=en"]);

    const templatesDir = join(TEST_DIR, ".litespec", "templates");
    const files = await readdir(templatesDir);

    expect(files).toContain("init.md");
    expect(files).toContain("specify.md");
    expect(files).toContain("plan.md");
    expect(files).toContain("validate.md");
    expect(files).toContain("reverse.md");

    // Verify config has correct locale
    const configPath = join(TEST_DIR, ".litespec", "config.json");
    const configContent = await readFile(configPath, "utf-8");
    const config = JSON.parse(configContent);
    expect(config.locale).toBe("en");
  });

  test("should not overwrite existing AGENTS.md", async () => {
    await init([]);

    const agentsPath = join(TEST_DIR, "AGENTS.md");
    const stat1 = await stat(agentsPath);

    await new Promise((r) => setTimeout(r, 10));

    await init([]);
    const stat2 = await stat(agentsPath);

    expect(stat1.size).toBe(stat2.size);
  });
});
