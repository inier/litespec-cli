export default {
  cli: {
    unknownCommand: "\n 未知命令: ",
    usage: "\n用法: litespec <command>",
    helpTitle: "\n📖 LiteSpec CLI - 规范驱动开发工具",
    initDesc: "  init [--legacy] [--lang zh]  初始化项目并同步 IDE",
    linkDesc: "  link                     同步上下文到所有支持的 AI 工具",
    specifyDesc: "  specify [name]           生成需求规范模板",
    planDesc: "  plan [name]              生成架构计划模板",
    validateDesc: "  validate [name]          生成校验清单模板",
    reverseDesc: "  reverse [name]           生成逆向工程模板",
    aiWorkflow: (cmd: string) => `\n⚠️  '${cmd}' 是 AI 驱动的工作流。`,
    aiWorkflowHint: "   请打开你的 AI IDE 并使用 /litespec- 命令。",
  },
  init: {
    start: "\n🚀 正在初始化 LiteSpec v2.0...",
    legacyMode: "⚠️  遗留模式已开启: 强制使用增量规范与逆向工程。",
    createdAgents: "✅ 已创建 AGENTS.md",
    createdDocs: "✅ 已创建 docs/ 目录",
    agentsContent: `# 项目宪法 (单一事实来源)\n\n## 核心理念\n- **规范驱动 (SDD First)**: 所有代码必须由规范驱动。\n- **拒绝隐式规则**: 一切必须被文档化。\n\n## 工作流\n1. 运行 \`/litespec-specify\` 定义需求。\n2. 运行 \`/litespec-plan\` 设计架构。\n3. 交接给 Superpowers 执行 TDD。\n`,
    agentsLegacyContent: `# 项目宪法 (单一事实来源)\n\n## 核心理念\n- **规范驱动 (SDD First)**: 所有代码必须由规范驱动。\n- **拒绝隐式规则**: 一切必须被文档化。\n- **遗留安全**: 始终使用 ADDED/MODIFIED/REMOVED 标签进行影响面分析。\n- **废弃机制**: 每个重构计划必须包含废弃策略。\n\n## 工作流\n1. 运行 \`/litespec-specify\` 定义需求。\n2. 运行 \`/litespec-plan\` 设计架构。\n3. 交接给 Superpowers 执行 TDD。\n`,
  },
  link: {
    start: "\n🔗 正在同步 LiteSpec 上下文到 AI IDE 与 Agent...",
    skipped: "\n⚠️  所有 IDE/Agent 配置已存在。跳过以防止覆盖。",
    success: (count: number) => `\n🎉 成功同步 ${count} 个配置！`,
    successHint1: "   ✅ 所有工具现在都指向同一个 AGENTS.md (单一事实来源)。",
    successHint2: "   🚀 可用的斜杠命令: /litespec-init, specify, plan, validate, reverse",
  },
  workflows: {
    fileExists: "文件已存在，跳过以防止覆盖:",
    created: "已创建工作流模板:",
    nextStep: "下一步: 打开你的 AI IDE 并运行对应的 /litespec-* 命令。",
    specifyTemplate: `# 功能需求规范\n\n## 用户故事\n<!-- 作为 [角色]，我想要 [操作]，以便于 [价值] -->\n\n## 验收标准 (DoD)\n- [ ] 标准 1\n- [ ] 标准 2\n\n## 技术约束\n- \n`,
    planTemplate: `# 架构计划\n\n## 关联规范\n<!-- 链接到需求规范文档 -->\n\n## 技术方案\n- \n\n## 废弃机制 (仅限遗留项目)\n<!-- 如何安全地废弃或隔离旧代码 -->\n- \n`,
    validateTemplate: `# 校验清单\n\n## 规范校验\n- [ ] DoD 关键字存在\n- [ ] 格式正确\n\n## 计划校验\n- [ ] 废弃机制已定义 (如果是遗留项目)\n- [ ] 架构符合项目宪法\n`,
    reverseTemplate: `# 逆向工程 (现状分析)\n\n## 模块概述\n- \n\n## 隐藏规则与隐式约束\n- \n\n## 重构风险\n- \n`,
  }
};
