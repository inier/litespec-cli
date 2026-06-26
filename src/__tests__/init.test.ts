import { describe, test, expect, beforeEach, afterEach } from "bun:test";
import { join } from "path";
import { mkdir, rm, stat } from "node:fs/promises";
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

  test("should create AGENTS.md and docs/ directory with initial templates", async () => {
    await init([]);

    // Check AGENTS.md exists
    const agentsPath = join(TEST_DIR, "AGENTS.md");
    expect(await stat(agentsPath).then(() => true).catch(() => false)).toBe(true);

    // Check docs/ directory exists
    const docsDir = join(TEST_DIR, "docs");
    expect(await stat(docsDir).then(s => s.isDirectory()).catch(() => false)).toBe(true);

    // Check initial template files exist
    const expectedFiles = [
      "00-specify.md",
      "00-plan.md",
      "00-validate.md",
      "00-reverse.md"
    ];

    for (const file of expectedFiles) {
      const filePath = join(docsDir, file);
      expect(await stat(filePath).then(() => true).catch(() => false)).toBe(true);
    }
  });

  test("should generate correct content in specify template", async () => {
    await init([]);

    const specifyPath = join(TEST_DIR, "docs", "00-specify.md");
    const content = await Bun.file(specifyPath).text();

    expect(content).toContain("功能需求规范");
    expect(content).toContain("用户故事");
    expect(content).toContain("验收标准");
    expect(content).toContain("DoD");
  });

  test("should generate legacy templates when --legacy flag is used", async () => {
    await init(["--legacy"]);

    const specifyPath = join(TEST_DIR, "docs", "00-specify.md");
    const content = await Bun.file(specifyPath).text();

    expect(content).toContain("遗留项目");
    expect(content).toContain("影响面分析");
    expect(content).toContain("ADDED");
    expect(content).toContain("MODIFIED");
    expect(content).toContain("REMOVED");
  });

  test("should not overwrite existing template files", async () => {
    await init([]);

    const specifyPath = join(TEST_DIR, "docs", "00-specify.md");
    const stat1 = await Bun.file(specifyPath).stat();

    await new Promise((r) => setTimeout(r, 10));

    await init([]);
    const stat2 = await Bun.file(specifyPath).stat();

    expect(stat1.size).toBe(stat2.size);
  });

  test("should generate English templates when locale is en", async () => {
    await i18n.setLocale("en");
    await init([]);

    const specifyPath = join(TEST_DIR, "docs", "00-specify.md");
    const content = await Bun.file(specifyPath).text();

    expect(content).toContain("Feature Specification");
    expect(content).toContain("User Story");
    expect(content).toContain("Acceptance Criteria");
  });
});
