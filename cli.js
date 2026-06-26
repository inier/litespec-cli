#!/usr/bin/env node
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { platform, arch } from 'os';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * 根据当前平台和架构获取对应的二进制文件名
 */
function getBinaryName() {
  const p = platform();
  const a = arch();

  if (p === 'win32') return 'litespec-win-x64.exe';
  if (p === 'darwin') return a === 'arm64' ? 'litespec-macos-arm64' : 'litespec-macos-x64';
  if (p === 'linux') return 'litespec-linux-x64';

  // 默认回退
  return 'litespec-linux-x64';
}

/**
 * 尝试用指定命令运行源代码
 */
function tryRunSource(cmd, args) {
  const result = spawnSync(cmd, [join(__dirname, 'src', 'cli.ts'), ...args], {
    stdio: 'inherit',
    cwd: process.cwd(),
    shell: true
  });
  return result;
}

const binaryName = getBinaryName();
const binaryPath = join(__dirname, 'dist', binaryName);

// 1. 尝试运行编译后的二进制文件
if (existsSync(binaryPath)) {
  const result = spawnSync(binaryPath, process.argv.slice(2), {
    stdio: 'inherit',
    cwd: process.cwd()
  });

  if (!result.error && result.status !== 127) {
    process.exit(result.status || 0);
  }
}

// 2. 回退到用 bun 运行源代码
const bunResult = tryRunSource('bun', process.argv.slice(2));
if (!bunResult.error) {
  process.exit(bunResult.status || 0);
}

// 3. 回退到用 node 运行（需要 ts-node 或类似工具）
const nodeResult = tryRunSource('node', ['--loader', 'ts-node/esm', ...process.argv.slice(2)]);
if (!nodeResult.error) {
  process.exit(nodeResult.status || 0);
}

// 4. 所有方案都失败了
console.error('❌ Error: LiteSpec binary not found and cannot run from source.');
console.error('');
console.error('This may happen if:');
console.error('  1. You are running on an unsupported platform');
console.error('  2. The package was not built properly');
console.error('');
console.error('Solutions:');
console.error('  - Install Bun: https://bun.sh/docs/installation');
console.error('  - Reinstall the package: npm uninstall -g @ozo/litespec-cli && npm install -g @ozo/litespec-cli');
console.error('  - Or build from source:');
console.error('    git clone https://github.com/inier/litespec-cli.git');
console.error('    cd litespec-cli && bun install && bun run build');
process.exit(1);
