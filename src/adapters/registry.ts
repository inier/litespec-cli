import { cursorAdapter } from "./cursor";
import { traeAdapter } from "./trae";
import { qoderAdapter } from "./qoder";
import { claudeAdapter } from "./claude";
import { codebuddyAdapter } from "./codebuddy";
import { workbuddyAdapter } from "./workbuddy";

export interface Adapter {
  name: string;
  configPath: string;
  contentTemplate: string;
}

export function getAdapters(): Adapter[] {
  return [
    cursorAdapter,
    traeAdapter,
    qoderAdapter,
    claudeAdapter,
    codebuddyAdapter,
    workbuddyAdapter,
  ];
}
