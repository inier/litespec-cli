import { describe, test, expect, beforeEach } from "bun:test";
import { I18n } from "../i18n";

describe("I18n Module", () => {
  let i18n: I18n;

  beforeEach(() => {
    i18n = new I18n();
  });

  test("should default to English when no locale is set", async () => {
    expect(i18n.t.cli.unknownCommand).toContain("Unknown command");
  });

  test("should switch to Chinese successfully", async () => {
    await i18n.setLocale("zh");
    expect(i18n.t.cli.unknownCommand).toContain("未知命令");
    expect(i18n.t.init.start).toContain("正在初始化");
  });

  test("should fallback to English for unsupported locales", async () => {
    await i18n.setLocale("ja");
    expect(i18n.t.cli.unknownCommand).toContain("Unknown command");
  });
});