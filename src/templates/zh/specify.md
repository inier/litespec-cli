# LiteSpec: 定义功能需求

读取项目宪法 ../../AGENTS.md。

检查 docs/ 目录下是否有 *-specify.md 文件：
- 如果有，读取最新的文件并继续下一步
- 如果没有，提示用户先运行 `litespec specify [name]` 命令创建规范

分析用户请求，填充并完善需求规范。如果是遗留项目，必须使用 ADDED/MODIFIED/REMOVED 标签进行影响面分析。
