# Changelog

本项目的所有重要变更都将记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
并且本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/) (Semantic Versioning)。

## [2.0.0] - 2026-06-25

### ✨ 新增 (Added)
- **核心架构重构**: 引入高内聚低耦合的 `Adapter + Command` 模式，支持灵活扩展新的 AI IDE 适配器。
- **国际化 (i18n) 引擎**: 基于动态 `import()` 的零侵入式多语言架构，默认支持英文，可通过 `--lang=zh` 无缝切换中文。
- **SDD 工作流命令**: 新增四大核心工作流指令：
  - `specify`: 生成需求规范模板。
  - `plan`: 生成架构计划模板。
  - `validate`: 生成校验清单模板。
  - `reverse`: 生成逆向工程（现状分析）模板。
- **多 IDE 上下文同步**: 实现 `link` 命令，一键将 `AGENTS.md` 项目宪法同步至 Cursor, Trae, Qoder, Claude Code, CodeBuddy, WorkBuddy 等 6 款主流 AI 工具。
- **遗留系统安全机制**: 新增 `--legacy` 模式，强制要求影响面分析 (Delta Specs) 与废弃机制 (Break Mechanism)。
- **工程化构建**: 新增 `bun build --compile` 脚本，支持一键打包为跨平台的独立可执行文件。
- **CI/CD 流水线**: 配备 GitHub Actions 自动化测试与构建工作流。
- **实战案例**: 在 `example/` 目录下补充了完整的 `user-auth-workflow` 用户认证模块实战案例。

### 🛡️ 测试与质量 (Test & Quality)
- 引入 `bun:test` 单元测试框架。
- 新增 i18n 模块测试，覆盖默认语言、语言切换及未知语言降级逻辑。
- 新增 Workflows 模块测试，覆盖自定义命名、自动生成文件名及防覆盖机制。

### 📝 文档 (Documentation)
- 完善 `README.md`，提供详尽的安装、使用指南及核心特性说明。
- 规范化 `.gitignore` 配置，防止构建产物、测试工作区与本地环境变量污染版本库。

### 🔥 破坏性变更 (BREAKING CHANGES)
- 全面重构 CLI 参数解析逻辑，废弃旧版 1.x 的隐式配置方式，统一采用显式命令 (`init`, `link`, `specify` 等)。
- 配置文件路径与模板结构发生调整，升级前请重新运行 `bun run litespec init`。