import { join } from "path";
import { exists, mkdir, writeFile } from "node:fs/promises";
import { log, colors } from "../utils";
import { i18n } from "../i18n";
import { getAdapters } from "../adapters/registry";
import { getSlashCommands } from "./templates";

export async function link() {
  const t = i18n.t;
  const root = process.cwd();

  log(colors.blue, t.link.start);

  const adapters = getAdapters();
  const slashCommands = getSlashCommands();
  let syncedCount = 0;

  for (const adapter of adapters) {
    const configPath = join(root, adapter.configPath);
    const configDir = join(configPath, "..");

    if (await exists(configPath)) {
      continue;
    }

    await mkdir(configDir, { recursive: true });

    let content = adapter.contentTemplate;
    for (const cmd of slashCommands) {
      content += `\n\n---\n\n## ${cmd.name}\n\n${cmd.content}`;
    }

    await writeFile(configPath, content);
    syncedCount++;
  }

  if (syncedCount === 0) {
    log(colors.yellow, t.link.skipped);
  } else {
    log(colors.green, t.link.success(syncedCount));
    log(colors.gray, t.link.successHint1);
    log(colors.gray, t.link.successHint2);
  }
}