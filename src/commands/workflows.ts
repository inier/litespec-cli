import { join } from "path";
import { mkdir, writeFile, stat } from "node:fs/promises";
import { log, colors } from "../utils";
import { i18n } from "../i18n";

export type WorkflowType = "specify" | "plan" | "validate" | "reverse";

function getTimestamp() {
  return new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
}

export async function runWorkflow(type: WorkflowType, args: string[]) {
  const t = i18n.t;
  const root = process.cwd();
  const docsDir = join(root, "docs");
  
  await mkdir(docsDir, { recursive: true });

  let name = args[0];
  if (!name) {
    name = `${getTimestamp()}-${type}`;
  }

  const filePath = join(docsDir, `${name}.md`);

  try {
    await stat(filePath);
    log(colors.yellow, `${t.workflows.fileExists} ${filePath}`);
    return;
  } catch {}

  let content = "";
  switch (type) {
    case "specify":
      content = t.workflows.specifyTemplate;
      break;
    case "plan":
      content = t.workflows.planTemplate;
      break;
    case "validate":
      content = t.workflows.validateTemplate;
      break;
    case "reverse":
      content = t.workflows.reverseTemplate;
      break;
  }

  await writeFile(filePath, content);
  log(colors.green, `${t.workflows.created} ${filePath}`);
  log(colors.gray, t.workflows.nextStep);
}