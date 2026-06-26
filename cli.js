#!/usr/bin/env node
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { platform } from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 确定平台特定的可执行文件名
const currentPlatform = platform();
let binaryName = 'litespec';
if (currentPlatform === 'win32') {
  binaryName = 'litespec.exe';
}

const binaryPath = join(__dirname, 'dist', binaryName);

// 直接运行编译后的二进制文件
const result = spawnSync(binaryPath, process.argv.slice(2), {
  stdio: 'inherit',
  cwd: process.cwd()
});

// 如果二进制文件不存在或执行失败，给出友好提示
if (result.error || result.status === 127) {
  console.error('❌ Error: LiteSpec binary not found or cannot be executed.');
  console.error('');
  console.error('This may happen if:');
  console.error('  1. The package was not built properly');
  console.error('  2. You are running on an unsupported platform');
  console.error('');
  console.error('Solutions:');
  console.error('  - Reinstall the package: npm uninstall -g @ozo/litespec-cli && npm install -g @ozo/litespec-cli');
  console.error('  - Or build from source: git clone https://github.com/inier/litespec-cli.git && cd litespec-cli && bun install && bun run build');
  process.exit(1);
}

process.exit(result.status || 0);
