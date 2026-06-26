import { join } from "path";
import { mkdir, writeFile, stat } from "node:fs/promises";
import { log, colors } from "../utils";
import { i18n } from "../i18n";
import { link } from "./link";

export async function init(args: string[]) {
  const isLegacy = args.includes("--legacy");
  const root = process.cwd();
  const t = i18n.t;

  log(colors.blue, t.init.start);
  if (isLegacy) log(colors.yellow, t.init.legacyMode);

  const agentsMd = join(root, "AGENTS.md");
  let agentsExists = false;
  try { await stat(agentsMd); agentsExists = true; } catch {}
  if (!agentsExists) {
    const content = isLegacy ? t.init.agentsLegacyContent : t.init.agentsContent;
    await writeFile(agentsMd, content);
    log(colors.green, t.init.createdAgents);
  }

  const docsDir = join(root, "docs");
  await mkdir(docsDir, { recursive: true });
  log(colors.green, t.init.createdDocs);

  // 生成初始模板文件到 docs/
  const specifyTemplate = isLegacy ? t.init.specifyLegacyTemplate : t.init.specifyTemplate;
  const planTemplate = isLegacy ? t.init.planLegacyTemplate : t.init.planTemplate;
  const validateTemplate = isLegacy ? t.init.validateTemplate : t.init.validateTemplate;
  const reverseTemplate = isLegacy ? t.init.reverseLegacyTemplate : t.init.reverseTemplate;

  const templates = [
    { name: "00-specify.md", content: specifyTemplate },
    { name: "00-plan.md", content: planTemplate },
    { name: "00-validate.md", content: validateTemplate },
    { name: "00-reverse.md", content: reverseTemplate },
  ];

  let createdCount = 0;
  for (const tpl of templates) {
    const filePath = join(docsDir, tpl.name);
    let fileExists = false;
    try { await stat(filePath); fileExists = true; } catch {}
    if (!fileExists) {
      await writeFile(filePath, tpl.content);
      createdCount++;
    }
  }

  if (createdCount > 0) {
    log(colors.green, t.init.createdTemplates(createdCount));
  }

  await link();
}
