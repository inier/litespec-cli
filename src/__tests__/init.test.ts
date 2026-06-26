import { describe, test, expect, beforeEach, afterEach } from "bun:test";
import { join } from "path";
import { mkdir, rm, stat, readdir } from "node:fs/promises";
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

  test("should not create template files in docs/", async () => {
    await init([]);

    // docs/ should be empty (no template files)
    const docsDir = join(TEST_DIR, "docs");
    const files = await readdir(docsDir);
    expect(files.length).toBe(0);
  });

  test("should create AGENTS.md with correct content", async () => {
    await init([]);

    const agentsPath = join(TEST_DIR, "AGENTS.md");
    const content = await Bun.file(agentsPath).text();

    expect(content).toContain("项目宪法");
    expect(content).toContain("SDD First");
    expect(content).toContain("litespec-specify");
    expect(content).toContain("litespec-plan");
  });

  test("should create legacy AGENTS.md when --legacy flag is used", async () => {
    await init(["--legacy"]);

    const agentsPath = join(TEST_DIR, "AGENTS.md");
    const content = await Bun.file(agentsPath).text();

    expect(content).toContain("遗留安全");
    expect(content).toContain("ADDED/MODIFIED/REMOVED");
    expect(content).toContain("废弃机制");
  });

  test("should not overwrite existing AGENTS.md", async () => {
    await init([]);

    const agentsPath = join(TEST_DIR, "AGENTS.md");
    const stat1 = await Bun.file(agentsPath).stat();

    await new Promise((r) => setTimeout(r, 10));

    await init([]);
    const stat2 = await Bun.file(agentsPath).stat();

    expect(stat1.size).toBe(stat2.size);
  });

  test("should create English AGENTS.md when locale is en", async () => {
    await i18n.setLocale("en");
    await init([]);

    const agentsPath = join(TEST_DIR, "AGENTS.md");
    const content = await Bun.file(agentsPath).text();

    expect(content).toContain("Project Constitution");
    expect(content).toContain("SDD First");
  });
});
