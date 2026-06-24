import { currentLang } from "../utils";

export function getSlashCommands() {
  const isZh = currentLang === "zh";

  return [
    {
      name: "litespec-init.md",
      content: isZh
        ? `# LiteSpec: 初始化项目\n读取项目宪法 ../../AGENTS.md。\n检查是否为遗留代码库。如果是，应用遗留规则（增量规范、逆向工程、隔离分支）。生成全局宪法并链接到所有 AI IDE。`
        : `# LiteSpec: Initialize Project\nRead the project constitution at ../../AGENTS.md.\nCheck if the project is a legacy codebase. If yes, apply Legacy Rules (Delta Spec, Reverse Engineering, Isolation Branches). Generate the global constitution and link to all AI IDEs.`
    },
    {
      name: "litespec-specify.md",
      content: isZh
        ? `# LiteSpec: 定义功能需求\n读取项目宪法 ../../AGENTS.md。\n读取 docs/ 目录下最新的 *-specify.md 模板文件。\n分析用户请求，填充并完善需求规范。如果是遗留项目，必须使用 ADDED/MODIFIED/REMOVED 标签进行影响面分析。`
        : `# LiteSpec: Specify Feature\nRead the project constitution at ../../AGENTS.md.\nRead the latest *-specify.md template file in the docs/ folder.\nAnalyze the user's request and populate the requirement specification. If this is a legacy project, you MUST use ADDED/MODIFIED/REMOVED tags for impact analysis.`
    },
    {
      name: "litespec-plan.md",
      content: isZh
        ? `# LiteSpec: 架构计划\n读取项目宪法 ../../AGENTS.md 和 docs/ 中对应的 *-specify.md 规范。\n读取 docs/ 目录下最新的 *-plan.md 模板文件。\n生成技术架构计划。如果修改了遗留代码，必须显式声明 BREAK MECHANISM（废弃机制）。`
        : `# LiteSpec: Architect Plan\nRead the project constitution at ../../AGENTS.md and the corresponding *-specify.md spec in docs/.\nRead the latest *-plan.md template file in the docs/ folder.\nGenerate a technical architecture plan. You MUST explicitly declare a BREAK MECHANISM if modifying legacy code to prevent technical debt.`
    },
    {
      name: "litespec-validate.md",
      content: isZh
        ? `# LiteSpec: 校验规范\n读取项目宪法 ../../AGENTS.md 和 docs/ 中的目标规范/计划。\n读取 docs/ 目录下最新的 *-validate.md 模板文件。\n执行最小化校验。确保 DoD（完成定义）关键字存在且格式正确。将逻辑一致性检查留给 Superpowers TDD 引擎。`
        : `# LiteSpec: Validate Spec\nRead the project constitution at ../../AGENTS.md and the target spec/plan in docs/.\nRead the latest *-validate.md template file in the docs/ folder.\nPerform a minimal validation check. Ensure the DoD (Definition of Done) keywords are present and the format is correct. Leave logical consistency checks to the Superpowers TDD engine.`
    },
    {
      name: "litespec-reverse.md",
      content: isZh
        ? `# LiteSpec: 逆向工程 (仅限遗留项目)\n读取项目宪法 ../../AGENTS.md。\n读取 docs/ 目录下最新的 *-reverse.md 模板文件。\n在遗留模块中开发新功能之前，阅读现有代码库并生成“现状规范”。识别隐藏规则和隐式约束，以安全地规划未来的重构。`
        : `# LiteSpec: Reverse Engineer (Legacy Only)\nRead the project constitution at ../../AGENTS.md.\nRead the latest *-reverse.md template file in the docs/ folder.\nBefore developing new features in this legacy module, read the existing codebase and generate a "Current State Specification". Identify hidden rules and implicit constraints to safely plan future refactors.`
    }
  ];
}
