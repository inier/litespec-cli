# 项目宪法 (单一事实来源)

## 核心理念
- **规范驱动 (SDD First)**: 所有代码必须由规范驱动。
- **拒绝隐式规则**: 一切必须被文档化。
- **遗留安全**: 始终使用 ADDED/MODIFIED/REMOVED 标签进行影响面分析。
- **废弃机制**: 每个重构计划必须包含废弃策略。

## 工作流
1. 运行 `/litespec-specify` 定义需求。
2. 运行 `/litespec-plan` 设计架构。
3. 交接给 Superpowers 执行 TDD。
