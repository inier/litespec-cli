import { join } from "path";
import { mkdir, exists, writeFile } from "node:fs/promises";
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
  if (!(await exists(agentsMd))) {
    const content = isLegacy ? t.init.agentsLegacyContent : t.init.agentsContent;
    await writeFile(agentsMd, content);
    log(colors.green, t.init.createdAgents);
  }

  const docsDir = join(root, "docs");
  await mkdir(docsDir, { recursive: true });
  log(colors.green, t.init.createdDocs);

  await link();
}
