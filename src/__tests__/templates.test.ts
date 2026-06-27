import { describe, test, expect, beforeEach, afterEach } from "bun:test";
import { join } from "path";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { getSlashCommands } from "../commands/templates";
import { i18n } from "../i18n";

const TEST_DIR = join(process.cwd(), ".test-templates");

describe("Templates Module", () => {
  beforeEach(async () => {
    await mkdir(TEST_DIR, { recursive: true });
    process.chdir(TEST_DIR);
  });

  afterEach(async () => {
    process.chdir(join(TEST_DIR, ".."));
    await rm(TEST_DIR, { recursive: true, force: true });
  });

  test("should return default content when .litespec/templates doesn't exist", async () => {
    await i18n.setLocale("zh");
    const commands = await getSlashCommands();

    expect(commands).toHaveLength(5);
    expect(commands[0].name).toBe("litespec-init.md");
    expect(commands[1].name).toBe("litespec-specify.md");
    expect(commands[2].name).toBe("litespec-plan.md");
    expect(commands[3].name).toBe("litespec-validate.md");
    expect(commands[4].name).toBe("litespec-reverse.md");

    // Verify content is not empty
    for (const cmd of commands) {
      expect(cmd.content.length).toBeGreaterThan(0);
    }
  });

  test("should read templates from .litespec/templates/ when they exist", async () => {
    await i18n.setLocale("zh");

    // Create template directory and files (flat structure)
    const templatesDir = join(TEST_DIR, ".litespec", "templates");
    await mkdir(templatesDir, { recursive: true });

    const customContent = "# Custom Template\n\nThis is a custom template.";
    await writeFile(join(templatesDir, "init.md"), customContent);
    await writeFile(join(templatesDir, "specify.md"), customContent);
    await writeFile(join(templatesDir, "plan.md"), customContent);
    await writeFile(join(templatesDir, "validate.md"), customContent);
    await writeFile(join(templatesDir, "reverse.md"), customContent);

    const commands = await getSlashCommands();

    // Verify all commands use custom content
    for (const cmd of commands) {
      expect(cmd.content).toBe(customContent);
    }
  });

  test("should read English templates when locale is en", async () => {
    await i18n.setLocale("en");

    // Create template directory and files (flat structure)
    const templatesDir = join(TEST_DIR, ".litespec", "templates");
    await mkdir(templatesDir, { recursive: true });

    const customContent = "# English Custom Template\n\nEnglish content.";
    await writeFile(join(templatesDir, "init.md"), customContent);
    await writeFile(join(templatesDir, "specify.md"), customContent);
    await writeFile(join(templatesDir, "plan.md"), customContent);
    await writeFile(join(templatesDir, "validate.md"), customContent);
    await writeFile(join(templatesDir, "reverse.md"), customContent);

    const commands = await getSlashCommands();

    // Verify all commands use custom content
    for (const cmd of commands) {
      expect(cmd.content).toBe(customContent);
    }
  });

  test("should fallback to default content if some templates are missing", async () => {
    await i18n.setLocale("zh");

    // Create template directory with only some files (flat structure)
    const templatesDir = join(TEST_DIR, ".litespec", "templates");
    await mkdir(templatesDir, { recursive: true });

    const customContent = "# Only Init Template";
    await writeFile(join(templatesDir, "init.md"), customContent);
    // Other files are missing

    const commands = await getSlashCommands();

    // init.md should have custom content
    expect(commands.find(c => c.name === "litespec-init.md")?.content).toBe(customContent);

    // Others should have default content (not empty)
    const specifyCmd = commands.find(c => c.name === "litespec-specify.md");
    expect(specifyCmd?.content.length).toBeGreaterThan(0);
    expect(specifyCmd?.content).not.toBe(customContent);
  });

  test("should handle mixed locales correctly", async () => {
    // Test Chinese
    await i18n.setLocale("zh");
    let commands = await getSlashCommands();
    expect(commands[0].content).toContain("初始化项目");

    // Test English
    await i18n.setLocale("en");
    commands = await getSlashCommands();
    expect(commands[0].content).toContain("Initialize Project");
  });
});
