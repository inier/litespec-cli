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
    createdTemplates: (count: number) => `✅ 已创建 ${count} 个初始模板`,
    agentsContent: `# 项目宪法 (单一事实来源)

## 核心理念
- **规范驱动 (SDD First)**: 所有代码必须由规范驱动。
- **拒绝隐式规则**: 一切必须被文档化。

## 工作流
1. 运行 \`/litespec-specify\` 定义需求。
2. 运行 \`/litespec-plan\` 设计架构。
3. 交接给 Superpowers 执行 TDD。
`,
    agentsLegacyContent: `# 项目宪法 (单一事实来源)

## 核心理念
- **规范驱动 (SDD First)**: 所有代码必须由规范驱动。
- **拒绝隐式规则**: 一切必须被文档化。
- **遗留安全**: 始终使用 ADDED/MODIFIED/REMOVED 标签进行影响面分析。
- **废弃机制**: 每个重构计划必须包含废弃策略。

## 工作流
1. 运行 \`/litespec-specify\` 定义需求。
2. 运行 \`/litespec-plan\` 设计架构。
3. 交接给 Superpowers 执行 TDD。
`,
    specifyTemplate: `# 功能需求规范

## 用户故事
<!-- 作为 [角色]，我想要 [操作]，以便于 [价值] -->

## 验收标准 (DoD)
- [ ] 标准 1
- [ ] 标准 2

## 技术约束
- 
`,
    specifyLegacyTemplate: `# 功能需求规范 (遗留项目)

## 用户故事
<!-- 作为 [角色]，我想要 [操作]，以便于 [价值] -->

## 影响面分析
- **ADDED**: 
- **MODIFIED**: 
- **REMOVED**: 

## 验收标准 (DoD)
- [ ] 标准 1
- [ ] 标准 2

## 技术约束
- 
`,
    planTemplate: `# 架构计划

## 关联规范
<!-- 链接到需求规范文档 -->

## 技术方案
- 

## 废弃机制 (仅限遗留项目)
<!-- 如何安全地废弃或隔离旧代码 -->
- 
`,
    planLegacyTemplate: `# 架构计划 (遗留项目)

## 关联规范
<!-- 链接到需求规范文档 -->

## 技术方案
- 

## 废弃机制 (BREAK MECHANISM)
<!-- 必须定义如何安全地废弃或隔离旧代码 -->
- **阶段 1 (兼容期)**: 
- **阶段 2 (废弃期)**: 
- **阶段 3 (移除期)**: 
`,
    validateTemplate: `# 校验清单

## 规范校验
- [ ] DoD 关键字存在
- [ ] 格式正确

## 计划校验
- [ ] 废弃机制已定义 (如果是遗留项目)
- [ ] 架构符合项目宪法
`,
    reverseTemplate: `# 逆向工程 (现状分析)

## 模块概述
- 

## 隐藏规则与隐式约束
- 

## 重构风险
- 
`,
    reverseLegacyTemplate: `# 逆向工程 (现状分析 - 遗留项目)

## 模块概述
- 

## 隐藏规则与隐式约束
- 

## 重构风险
- 

## 影响面评估
- **ADDED**: 
- **MODIFIED**: 
- **REMOVED**: 
`,
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
    specifyTemplate: `# 功能需求规范

## 用户故事
<!-- 作为 [角色]，我想要 [操作]，以便于 [价值] -->

## 验收标准 (DoD)
- [ ] 标准 1
- [ ] 标准 2

## 技术约束
- 
`,
    planTemplate: `# 架构计划

## 关联规范
<!-- 链接到需求规范文档 -->

## 技术方案
- 

## 废弃机制 (仅限遗留项目)
<!-- 如何安全地废弃或隔离旧代码 -->
- 
`,
    validateTemplate: `# 校验清单

## 规范校验
- [ ] DoD 关键字存在
- [ ] 格式正确

## 计划校验
- [ ] 废弃机制已定义 (如果是遗留项目)
- [ ] 架构符合项目宪法
`,
    reverseTemplate: `# 逆向工程 (现状分析)

## 模块概述
- 

## 隐藏规则与隐式约束
- 

## 重构风险
- 
`,
  }
};
