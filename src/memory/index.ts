import { join } from "path";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { MemoryHistory } from "../config/schema";

export class MemoryManager {
  private root: string;
  private dynamicRoot: boolean;

  constructor(root?: string) {
    this.root = root ?? process.cwd();
    this.dynamicRoot = root === undefined;
  }

  private get historyPath(): string {
    const r = this.dynamicRoot ? process.cwd() : this.root;
    return join(r, ".litespec", "memory", "history.json");
  }

  async loadHistory(): Promise<MemoryHistory> {
    try {
      const content = await readFile(this.historyPath, "utf-8");
      return JSON.parse(content);
    } catch {
      return { workflows: [] };
    }
  }

  async saveHistory(history: MemoryHistory): Promise<void> {
    const dir = join(this.historyPath, "..");
    await mkdir(dir, { recursive: true });
    await writeFile(this.historyPath, JSON.stringify(history, null, 2));
  }

  async recordWorkflow(type: "specify" | "plan" | "validate" | "reverse", filename: string): Promise<void> {
    const history = await this.loadHistory();
    history.workflows.push({
      type,
      timestamp: new Date().toISOString(),
      filename,
    });
    history.lastRun = new Date().toISOString();
    await this.saveHistory(history);
  }
}

export const memory = new MemoryManager();
