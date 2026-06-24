# 🚀 LiteSpec CLI

  LiteSpec 是一个轻量级的规范驱动开发 (SDD) CLI 工具。它旨在将 AI 编程助手从“聊天式代码生成”转变为“结构化软件开发伙伴”，确保所有生成的代码都遵循项目规范，并具备极高的可维护性。
## ✨ 核心特性
  - **规范驱动 (SDD First)**: 所有代码生成均基于严格的需求规范与架构计划。
  - **多 AI IDE 无缝集成**: 一键同步上下文，支持 Cursor, Trae, Qoder, Claude Code 等主流 AI 工具。
  - **国际化 (i18n) 支持**: 内置动态语言加载，开箱支持中/英文，零侵入式架构。
  - **遗留系统安全**: 专为老旧代码库设计，强制要求影响面分析与废弃机制。
  - **极速运行**: 基于 Bun 运行时，毫秒级响应。

## 📦 安装与使用
### 1. 安装依赖
  ```bash       
  bun install
  ```
### 2. 初始化项目
  ```bash 
  # 标准初始化
  bun run litespec init --lang=zh

  # 针对遗留代码库的初始化（强制增量规范与逆向工程）
  bun run litespec init --legacy --lang=zh
  ```
### 3. 核心工作流命令
  ```bash 
  # 定义功能需求
  bun run litespec specify user-auth --lang=zh

  # 生成架构计划
  bun run litespec plan user-auth --lang=zh

  # 校验规范完整性
  bun run litespec validate user-auth --lang=zh

  # 逆向工程（仅限遗留项目）
  bun run litespec reverse legacy-module --lang=zh
  ```
### 🏗️ 编译为独立可执行文件
LiteSpec 支持一键编译为跨平台的独立二进制文件，无需安装 Bun 即可运行：
  ```bash 
  bun run build
  # 生成的可执行文件位于 dist/litespec

  # 编译当前平台（如 Windows）
  bun run litespec compile --platform=current

  # 编译指定平台（如 Linux）
  bun run litespec compile --platform=linux
  ```

## 🤝 贡献指南
欢迎提交 Issue 或 Pull Request 来完善 LiteSpec 生态！

## 📄 开源协议
MIT License.