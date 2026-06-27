# LiteSpec: 架构计划

读取项目宪法 ../../AGENTS.md 和 docs/ 中对应的 *-specify.md 规范。

检查 docs/ 目录下是否有 *-plan.md 文件：
- 如果有，读取最新的文件并继续下一步
- 如果没有，提示用户先运行 `litespec plan [name]` 命令创建计划

生成技术架构计划。如果修改了遗留代码，必须显式声明 BREAK MECHANISM（废弃机制）。
