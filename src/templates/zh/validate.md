# LiteSpec: 校验规范

读取项目宪法 ../../AGENTS.md 和 docs/ 中的目标规范/计划。

检查 docs/ 目录下是否有 *-validate.md 文件：
- 如果有，读取最新的文件并继续下一步
- 如果没有，提示用户先运行 `litespec validate [name]` 命令创建校验清单

执行最小化校验。确保 DoD（完成定义）关键字存在且格式正确。将逻辑一致性检查留给 Superpowers TDD 引擎。
