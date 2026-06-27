#!/usr/bin/env bun
/**
 * Build Script: Pre-generate .litespec/ directory in dist/
 *
 * This script runs before `bun build` to create a complete .litespec/
 * directory inside dist/. The `init` command then simply copies this
 * pre-built directory to the user's project.
 */

import { cp, mkdir, writeFile, rm } from "node:fs/promises";
import { join, dirname } from "path";

const __dirname = import.meta.dir;
const distDir = join(__dirname, "..", "dist");
const litespecDir = join(distDir, ".litespec");
const templatesDir = join(litespecDir, "templates");
const workflowsDir = join(litespecDir, "workflows");
const agentsDir = join(litespecDir, "agents");
const specsDir = join(litespecDir, "specs");
const scriptsDir = join(litespecDir, "scripts");
const memoryDir = join(litespecDir, "memory");

async function build() {
  console.log("📦 Building .litespec/ directory...\n");

  // 1. Clean previous build and create directories
  await rm(litespecDir, { recursive: true, force: true });
  await mkdir(templatesDir, { recursive: true });
  await mkdir(workflowsDir, { recursive: true });
  await mkdir(agentsDir, { recursive: true });
  await mkdir(specsDir, { recursive: true });
  await mkdir(scriptsDir, { recursive: true });
  await mkdir(memoryDir, { recursive: true });

  // 2. Copy template files from src/templates/
  for (const locale of ["zh", "en"]) {
    const sourceDir = join(__dirname, "..", "src", "templates", locale);
    const targetDir = join(templatesDir, locale);
    await cp(sourceDir, targetDir, { recursive: true });
    console.log(`   ✅ Copied templates/${locale}/`);
  }

  // 2.1 Copy workflow templates from src/workflows/
  for (const locale of ["zh", "en"]) {
    const sourceDir = join(__dirname, "..", "src", "workflows", locale);
    const targetDir = join(workflowsDir, locale);
    await cp(sourceDir, targetDir, { recursive: true });
    console.log(`   ✅ Copied workflows/${locale}/`);
  }

  // 2.2 Copy agents templates from src/agents/
  for (const locale of ["zh", "en"]) {
    const sourceDir = join(__dirname, "..", "src", "agents", locale);
    const targetDir = join(agentsDir, locale);
    await cp(sourceDir, targetDir, { recursive: true });
    console.log(`   ✅ Copied agents/${locale}/`);
  }

  // 3. Create default config.json
  const config = {
    version: "1.0.0",
    locale: "en",
    legacyMode: false,
    adapters: ["cursor", "trae", "qoder", "qodercn", "claude", "codebuddy", "workbuddy"],
  };
  await writeFile(
    join(litespecDir, "config.json"),
    JSON.stringify(config, null, 2) + "\n"
  );
  console.log("   ✅ Created config.json");

  // 4. Create empty history.json
  const history = { workflows: [] };
  await writeFile(
    join(memoryDir, "history.json"),
    JSON.stringify(history, null, 2) + "\n"
  );
  console.log("   ✅ Created memory/history.json");

  // 5. Create feature.json
  const feature = { feature_directory: null };
  await writeFile(
    join(litespecDir, "feature.json"),
    JSON.stringify(feature, null, 2) + "\n"
  );
  console.log("   ✅ Created feature.json\n");

  console.log("🎉 Build complete. dist/.litespec/ is ready.\n");
}

build().catch((err) => {
  console.error("❌ Build failed:", err);
  process.exit(1);
});
