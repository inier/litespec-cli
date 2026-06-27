import { cursorAdapter } from "./cursor";
import { traeAdapter } from "./trae";
import { qoderAdapter } from "./qoder";
import { qoderCnAdapter } from "./qodercn";
import { claudeAdapter } from "./claude";
import { codebuddyAdapter } from "./codebuddy";
import { workbuddyAdapter } from "./workbuddy";
import { pluginRegistry } from "../plugins/registry";

export interface Adapter {
  name: string;
  configPath: string;
  contentTemplate: string;
}

export function getAdapters(): Adapter[] {
  const builtinAdapters = [
    cursorAdapter,
    traeAdapter,
    qoderAdapter,
    qoderCnAdapter,
    claudeAdapter,
    codebuddyAdapter,
    workbuddyAdapter,
  ];
  
  const pluginAdapters = pluginRegistry.getAdapters();
  return [...builtinAdapters, ...pluginAdapters];
}
