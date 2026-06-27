#!/usr/bin/env node
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const args = process.argv.slice(2);

/**
 * 尝试执行编译后的单文件二进制。
 * 返回 { ok, exitCode } - ok 为 true 表示成功执行。
 * 如果二进制崩溃、超时或不存在，返回 ok=false。
 */
function tryBinary(binaryPath) {
  if (!existsSync(binaryPath)) return { ok: false };

  try {
    const result = spawnSync(binaryPath, args, {
      stdio: ['inherit', 'pipe', 'pipe'],
      cwd: process.cwd(),
      timeout: 30000,
    });

    // Output captured stdout/stderr
    if (result.stdout && result.stdout.length > 0) process.stdout.write(result.stdout);
    if (result.stderr && result.stderr.length > 0) process.stderr.write(result.stderr);

    // Binary ran and exited normally (no crash, no signal, no error)
    if (!result.error && !result.signal && result.status === 0) {
      return { ok: true, exitCode: 0 };
    }

    // Binary crashed or was killed - fall through
    return { ok: false, error: result.error, status: result.status, signal: result.signal };
  } catch (e) {
    return { ok: false, error: e };
  }
}

/**
 * 使用 bun 执行指定文件
 */
function tryBunRun(filePath) {
  if (!existsSync(filePath)) return { ok: false };

  try {
    const result = spawnSync('bun', [filePath, ...args], {
      stdio: 'inherit',
      cwd: process.cwd(),
      shell: true,
    });
    return { ok: !result.error && result.status === 0 };
  } catch {
    return { ok: false };
  }
}

// ── Strategy 1: Compiled single-file binary (fastest, no runtime dependency) ──
const exeName = process.platform === 'win32' ? 'litespec.exe' : 'litespec';
const binaryPath = join(__dirname, 'dist', exeName);
const binResult = tryBinary(binaryPath);
if (binResult.ok) {
  process.exit(binResult.exitCode);
}

// ── Strategy 2: Bundled JS via bun (fallback when binary crashes/unavailable) ──
const bundlePath = join(__dirname, 'dist', 'litespec-bundle.js');
if (tryBunRun(bundlePath).ok) {
  process.exit(0);
}

// ── Strategy 3: Source TypeScript via bun run (development fallback) ──
const srcPath = join(__dirname, 'src', 'cli.ts');
if (existsSync(srcPath)) {
  try {
    const result = spawnSync('bun', ['run', srcPath, ...args], {
      stdio: 'inherit',
      cwd: process.cwd(),
      shell: true,
    });
    if (!result.error) {
      process.exit(result.status || 0);
    }
  } catch {}
}

// All strategies failed
console.error('Error: LiteSpec cannot start.');
console.error('');
console.error('Possible causes:');
console.error('  1. Bun is not installed or not in PATH');
console.error('  2. The compiled binary crashed (DLL initialization failure)');
console.error('');
console.error('Solutions:');
console.error('  - Rebuild binary: bun run build:win-x64');
console.error('  - Or use bundle:  bun run build');
process.exit(1);
