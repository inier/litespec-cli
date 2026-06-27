import { describe, test, expect, beforeEach, afterEach } from "bun:test";
import { join } from "path";
import { mkdir, rm, stat } from "node:fs/promises";
import { runWorkflow } from "../commands/workflows";
import { i18n } from "../i18n";

const TEST_DIR = join(process.cwd(), ".test-workspace");
const ROOT_DIR = process.cwd();

describe("Workflows Module", () => {
  beforeEach(async () => {
    await mkdir(TEST_DIR, { recursive: true });
    await i18n.setLocale("zh");
    process.chdir(TEST_DIR);
  });

  afterEach(async () => {
    process.chdir(ROOT_DIR);
    await rm(TEST_DIR, { recursive: true, force: true });
  });

  test("should generate a specify template with custom name", async () => {
    await runWorkflow("specify", ["user-auth"]);
    
    const filePath = join(TEST_DIR, "docs", "litespec", "user-auth.md");
    expect(await stat(filePath).then(() => true).catch(() => false)).toBe(true);
    
    const content = await Bun.file(filePath).text();
    expect(content).toContain("功能需求规范");
  });

  test("should auto-generate filename if not provided", async () => {
    await runWorkflow("plan", []);
    
    const files = await Array.fromAsync(new Bun.Glob("*-plan.md").scan(join(TEST_DIR, "docs", "litespec")));
    expect(files.length).toBe(1);
  });

  test("should prevent overwriting existing files", async () => {
    await runWorkflow("validate", ["checklist"]);
    const filePath = join(TEST_DIR, "docs", "litespec", "checklist.md");
    const stat1 = await Bun.file(filePath).stat();

    await new Promise((r) => setTimeout(r, 10));

    await runWorkflow("validate", ["checklist"]);
    const stat2 = await Bun.file(filePath).stat();

    expect(stat1.size).toBe(stat2.size);
  });
});