# 🚀 LiteSpec CLI

  LiteSpec 是一个轻量级的规范驱动开发 (SDD) CLI 工具。它旨在将 AI 编程助手从“聊天式代码生成”转变为“结构化软件开发伙伴”，确保所有生成的代码都遵循项目规范，并具备极高的可维护性。
## ✨ 核心特性
  - **规范驱动 (SDD First)**: 所有代码生成均基于严格的需求规范与架构计划。
  - **多 AI IDE 无缝集成**: 一键同步上下文，支持 Cursor, Trae, Qoder, Claude Code 等主流 AI 工具。
  - **国际化 (i18n) 支持**: 内置动态语言加载，开箱支持中/英文，零侵入式架构。
  - **遗留系统安全**: 专为老旧代码库设计，强制要求影响面分析与废弃机制。
  - **极速运行**: 基于 Bun 运行时，毫秒级响应。

## 📦 安装

### 方式一：从 npm 安装（推荐）

```bash
# 全局安装
npm install -g @ozo/litespec-cli

# 或使用 bun/yarn
bun add -g @ozo/litespec-cli
yarn global add @ozo/litespec-cli
```

安装后可以直接使用 `litespec` 命令：

```bash
litespec init --lang=zh
litespec specify user-auth --lang=zh
```

### 方式二：从源码安装

```bash
git clone https://github.com/inier/litespec-cli.git
cd litespec-cli
bun install
bun run build

# 将 dist/litespec 添加到 PATH，或直接使用
./dist/litespec init --lang=zh
```
## 🚀 快速开始

### 初始化项目

```bash
# 标准初始化
litespec init --lang=zh

# 针对遗留代码库的初始化（强制增量规范与逆向工程）
litespec init --legacy --lang=zh
```
### 核心工作流命令

LiteSpec 提供四大核心 SDD 工作流命令：

```bash
# 1. 定义功能需求
litespec specify user-auth --lang=zh

# 2. 生成架构计划
litespec plan user-auth --lang=zh

# 3. 校验规范完整性
litespec validate user-auth --lang=zh

# 4. 逆向工程（仅限遗留项目）
litespec reverse legacy-module --lang=zh
```

每个命令会在 `docs/` 目录下生成对应的 Markdown 模板文件，你可以基于这些模板编写详细的规范和计划。
### 同步 AI IDE 上下文

使用 `link` 命令将项目规范同步到主流 AI 编程工具：

```bash
# 同步 AGENTS.md 到 Cursor, Trae, Qoder, Claude Code 等
litespec link
```

支持的 AI IDE：
- **Cursor**: `.cursor/rules/AGENTS.md`
- **Trae**: `.trae/rules/AGENTS.md`
- **Qoder**: `.qoder/rules/AGENTS.md`
- **Claude Code**: `CLAUDE.md`
- **CodeBuddy**: `.codebuddy/rules/AGENTS.md`
- **WorkBuddy**: `.workbuddy/rules/AGENTS.md`

### 🏗️ 编译为独立可执行文件

LiteSpec 支持一键编译为跨平台的独立二进制文件，无需安装 Bun 即可运行：

```bash
# 编译当前平台（如 Windows）
bun run build
# 生成的可执行文件位于 dist/litespec

# 编译指定平台（如 Linux）
bun run litespec compile --platform=linux
```

支持的 `--platform` 参数：
- `current`: 当前操作系统
- `windows`: Windows x64
- `linux`: Linux x64
- `macos`: macOS x64

## 🤝 贡献指南
欢迎提交 Issue 或 Pull Request 来完善 LiteSpec 生态！

## 📄 开源协议
MIT License.