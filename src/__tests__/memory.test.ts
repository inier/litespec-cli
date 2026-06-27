import { describe, test, expect, beforeEach, afterEach } from "bun:test";
import { join } from "path";
import { mkdir, rm, readFile } from "node:fs/promises";
import { MemoryManager } from "../memory";

const TEST_DIR = join(process.cwd(), ".test-memory");

describe("Memory Manager", () => {
  let memory: MemoryManager;

  beforeEach(async () => {
    await mkdir(TEST_DIR, { recursive: true });
    memory = new MemoryManager(TEST_DIR);
  });

  afterEach(async () => {
    await rm(TEST_DIR, { recursive: true, force: true });
  });

  test("should return empty history when file doesn't exist", async () => {
    const history = await memory.loadHistory();
    expect(history.workflows).toEqual([]);
    expect(history.lastRun).toBeUndefined();
  });

  test("should save and load history correctly", async () => {
    const history = {
      workflows: [
        { type: "specify" as const, timestamp: "2026-06-27T00:00:00Z", filename: "test.md" },
      ],
      lastRun: "2026-06-27T00:00:00Z",
    };

    await memory.saveHistory(history);
    const loaded = await memory.loadHistory();

    expect(loaded.workflows).toHaveLength(1);
    expect(loaded.workflows[0].type).toBe("specify");
    expect(loaded.workflows[0].filename).toBe("test.md");
    expect(loaded.lastRun).toBe("2026-06-27T00:00:00Z");
  });

  test("should record workflow to history", async () => {
    await memory.recordWorkflow("specify", "user-auth.md");

    const history = await memory.loadHistory();
    expect(history.workflows).toHaveLength(1);
    expect(history.workflows[0]).toMatchObject({
      type: "specify",
      filename: "user-auth.md",
    });
    expect(history.workflows[0].timestamp).toBeDefined();
    expect(history.lastRun).toBeDefined();
  });

  test("should append multiple workflows", async () => {
    await memory.recordWorkflow("specify", "feature1.md");
    await memory.recordWorkflow("plan", "feature1.md");
    await memory.recordWorkflow("validate", "feature1.md");

    const history = await memory.loadHistory();
    expect(history.workflows).toHaveLength(3);
    expect(history.workflows[0].type).toBe("specify");
    expect(history.workflows[1].type).toBe("plan");
    expect(history.workflows[2].type).toBe("validate");
  });

  test("should handle all workflow types", async () => {
    const types: Array<"specify" | "plan" | "validate" | "reverse"> = ["specify", "plan", "validate", "reverse"];

    for (const type of types) {
      await memory.recordWorkflow(type, `${type}-test.md`);
    }

    const history = await memory.loadHistory();
    expect(history.workflows).toHaveLength(4);

    const recordedTypes = history.workflows.map(w => w.type);
    expect(recordedTypes).toContain("specify");
    expect(recordedTypes).toContain("plan");
    expect(recordedTypes).toContain("validate");
    expect(recordedTypes).toContain("reverse");
  });
});
