#!/bin/bash
# 自动下载 GitHub Actions 构建产物的脚本
# 
# 使用方法：
#   ./scripts/download-artifacts.sh
# 
# 前提条件：
#   1. 已安装 GitHub CLI (gh): https://cli.github.com/
#   2. 已登录 GitHub CLI: gh auth login

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
DIST_DIR="$PROJECT_DIR/dist"

echo "📥 下载 GitHub Actions 构建产物..."
echo ""

# 获取最新的成功构建运行
echo "🔍 查找最新的成功构建..."
RUN_ID=$(gh run list --workflow=ci.yml --limit 1 --json databaseId -q '.[0].databaseId')

if [ -z "$RUN_ID" ]; then
  echo "❌ 未找到任何构建运行"
  exit 1
fi

echo "✅ 找到构建运行：$RUN_ID"
echo ""

# 创建 dist 目录
mkdir -p "$DIST_DIR"

# 下载所有 artifacts
echo "📦 下载构建产物..."
cd "$DIST_DIR"

# 使用 gh API 下载 artifacts
gh run download "$RUN_ID" --pattern "litespec-binaries-*"

echo ""
echo "✅ 下载完成！"
echo ""
echo "📂 文件列表："
ls -la "$DIST_DIR"

# 扁平化目录结构
echo ""
echo "🔧 扁平化目录结构..."

# 将所有二进制文件移动到 dist/ 根目录
find . -type f -name 'litespec-*' -exec mv {} . \; 2>/dev/null || true

# 删除空目录
find . -type d -empty -delete 2>/dev/null || true

echo ""
echo "📂 最终文件列表："
ls -la "$DIST_DIR"

echo ""
echo "🎉 多平台构建完成！"
echo ""
echo "现在可以发布 npm 包："
echo "   npm publish --access public"
