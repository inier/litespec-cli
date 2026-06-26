#!/usr/bin/env node
/**
 * 多平台构建脚本
 * 
 * 此脚本会触发 GitHub Actions 构建所有平台的二进制文件，
 * 然后下载构建产物到本地 dist/ 目录。
 * 
 * 使用方法：
 *   bun run build:remote
 * 
 * 前提条件：
 *   1. 已安装 GitHub CLI (gh): https://cli.github.com/
 *   2. 已登录 GitHub CLI: gh auth login
 */

import { spawnSync } from 'child_process';
import { existsSync, mkdirSync, readdirSync, copyFileSync, rmSync } from 'fs';
import { join } from 'path';

const __dirname = process.cwd();

console.log('🚀 触发 GitHub Actions 多平台构建...\n');

// 检查 gh CLI 是否安装
const ghCheck = spawnSync('gh', ['--version'], { encoding: 'utf-8' });
if (ghCheck.error) {
  console.error('❌ 未安装 GitHub CLI。');
  console.error('');
  console.error('请先安装：');
  console.error('  - Windows: winget install --id GitHub.cli');
  console.error('  - macOS: brew install gh');
  console.error('  - Linux: https://cli.github.com/');
  console.error('');
  console.error('然后登录：gh auth login');
  process.exit(1);
}

// 检查是否已登录
const authCheck = spawnSync('gh', ['auth', 'status'], { encoding: 'utf-8' });
if (authCheck.status !== 0) {
  console.error('❌ 未登录 GitHub CLI。请运行：gh auth login');
  process.exit(1);
}

// 触发 workflow
console.log('📤 正在触发 CI 工作流...');
const runResult = spawnSync('gh', [
  'workflow', 'run', 'CI & Publish',
  '--ref', 'main'
], { encoding: 'utf-8', stdio: 'inherit' });

if (runResult.status !== 0) {
  console.error('❌ 无法触发工作流。请检查权限或工作流配置。');
  process.exit(1);
}

console.log('\n✅ 工作流已触发！');
console.log('');
console.log('📋 查看构建进度：');
console.log('   gh run list --workflow=ci.yml');
console.log('');
console.log('⏳ 等待构建完成后，手动下载构建产物：');
console.log('   1. 打开 GitHub Actions 页面：');
console.log('      https://github.com/inier/litespec-cli/actions');
console.log('');
console.log('   2. 找到最新的构建运行，下载 Artifacts 中的二进制文件');
console.log('');
console.log('   3. 将下载的文件解压到 dist/ 目录：');
console.log('      - dist/litespec-linux-x64');
console.log('      - dist/litespec-macos-x64');
console.log('      - dist/litespec-macos-arm64 (如有)');
console.log('      - dist/litespec-win-x64.exe');
console.log('');
console.log('💡 提示：你也可以使用以下命令自动下载（需要安装 jq）：');
console.log('   ./scripts/download-artifacts.sh');
