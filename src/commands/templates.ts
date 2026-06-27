import { join } from "path";
import { readFile } from "node:fs/promises";
import { i18n } from "../i18n";

export async function getSlashCommands() {
  const root = process.cwd();
  const lang = i18n.currentLocale === "zh" ? "zh" : "en";
  const templatesDir = join(root, ".litespec", "templates");

  const commands = [
    { name: "litespec-init.md", file: "init.md" },
    { name: "litespec-specify.md", file: "specify.md" },
    { name: "litespec-plan.md", file: "plan.md" },
    { name: "litespec-validate.md", file: "validate.md" },
    { name: "litespec-reverse.md", file: "reverse.md" },
  ];

  const results = [];
  for (const cmd of commands) {
    const filePath = join(templatesDir, cmd.file);
    try {
      const content = await readFile(filePath, "utf-8");
      results.push({ name: cmd.name, content });
    } catch {
      // 如果文件不存在，使用默认内容（兜底）
      results.push({ name: cmd.name, content: getDefaultContent(cmd.file, lang) });
    }
  }

  return results;
}

function getDefaultContent(file: string, lang: string): string {
  // 兜底逻辑：返回内置的默认模板
  const zhDefaults: Record<string, string> = {
    "init.md": "# LiteSpec: 初始化项目\n\n读取项目宪法 ../../AGENTS.md。\n\n检查是否为遗留代码库。如果是，应用遗留规则（增量规范、逆向工程、隔离分支）。生成全局宪法并链接到所有 AI IDE。",
    "specify.md": "# LiteSpec: 定义功能需求\n\n读取项目宪法 ../../AGENTS.md。\n\n检查 docs/ 目录下是否有 *-specify.md 文件：\n- 如果有，读取最新的文件并继续下一步\n- 如果没有，提示用户先运行 `litespec specify [name]` 命令创建规范\n\n分析用户请求，填充并完善需求规范。如果是遗留项目，必须使用 ADDED/MODIFIED/REMOVED 标签进行影响面分析。",
    "plan.md": "# LiteSpec: 架构计划\n\n读取项目宪法 ../../AGENTS.md 和 docs/ 中对应的 *-specify.md 规范。\n\n检查 docs/ 目录下是否有 *-plan.md 文件：\n- 如果有，读取最新的文件并继续下一步\n- 如果没有，提示用户先运行 `litespec plan [name]` 命令创建计划\n\n生成技术架构计划。如果修改了遗留代码，必须显式声明 BREAK MECHANISM（废弃机制）。",
    "validate.md": "# LiteSpec: 校验规范\n\n读取项目宪法 ../../AGENTS.md 和 docs/ 中的目标规范/计划。\n\n检查 docs/ 目录下是否有 *-validate.md 文件：\n- 如果有，读取最新的文件并继续下一步\n- 如果没有，提示用户先运行 `litespec validate [name]` 命令创建校验清单\n\n执行最小化校验。确保 DoD（完成定义）关键字存在且格式正确。将逻辑一致性检查留给 Superpowers TDD 引擎。",
    "reverse.md": "# LiteSpec: 逆向工程 (仅限遗留项目)\n\n读取项目宪法 ../../AGENTS.md。\n\n检查 docs/ 目录下是否有 *-reverse.md 文件：\n- 如果有，读取最新的文件并继续下一步\n- 如果没有，提示用户先运行 `litespec reverse [name]` 命令创建逆向工程文档\n\n在遗留模块中开发新功能之前，阅读现有代码库并生成\"现状规范\"。识别隐藏规则和隐式约束，以安全地规划未来的重构。",
  };

  const enDefaults: Record<string, string> = {
    "init.md": "# LiteSpec: Initialize Project\n\nRead the project constitution at ../../AGENTS.md.\n\nCheck if the project is a legacy codebase. If yes, apply Legacy Rules (Delta Spec, Reverse Engineering, Isolation Branches). Generate the global constitution and link to all AI IDEs.",
    "specify.md": "# LiteSpec: Specify Feature\n\nRead the project constitution at ../../AGENTS.md.\n\nCheck if a *-specify.md file exists in the docs/ folder:\n- If yes, read the latest file and proceed\n- If not, instruct the user to run `litespec specify [name]` first\n\nAnalyze the user's request and populate the requirement specification. If this is a legacy project, you MUST use ADDED/MODIFIED/REMOVED tags for impact analysis.",
    "plan.md": "# LiteSpec: Architect Plan\n\nRead the project constitution at ../../AGENTS.md and the corresponding *-specify.md spec in docs/.\n\nCheck if a *-plan.md file exists in the docs/ folder:\n- If yes, read the latest file and proceed\n- If not, instruct the user to run `litespec plan [name]` first\n\nGenerate a technical architecture plan. You MUST explicitly declare a BREAK MECHANISM if modifying legacy code to prevent technical debt.",
    "validate.md": "# LiteSpec: Validate Spec\n\nRead the project constitution at ../../AGENTS.md and the target spec/plan in docs/.\n\nCheck if a *-validate.md file exists in the docs/ folder:\n- If yes, read the latest file and proceed\n- If not, instruct the user to run `litespec validate [name]` first\n\nPerform a minimal validation check. Ensure the DoD (Definition of Done) keywords are present and the format is correct. Leave logical consistency checks to the Superpowers TDD engine.",
    "reverse.md": "# LiteSpec: Reverse Engineer (Legacy Only)\n\nRead the project constitution at ../../AGENTS.md.\n\nCheck if a *-reverse.md file exists in the docs/ folder:\n- If yes, read the latest file and proceed\n- If not, instruct the user to run `litespec reverse [name]` first\n\nBefore developing new features in this legacy module, read the existing codebase and generate a \"Current State Specification\". Identify hidden rules and implicit constraints to safely plan future refactors.",
  };

  return lang === "zh" ? zhDefaults[file] : enDefaults[file] || "";
}
