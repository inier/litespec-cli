export interface LitespecConfig {
  version: string;        // 配置文件版本
  locale: "en" | "zh";    // 语言设置
  legacyMode: boolean;    // 是否遗留模式
  adapters: string[];     // 启用的 adapter 列表
}

export interface MemoryHistory {
  lastRun?: string;       // 最后运行时间
  workflows: Array<{
    type: "specify" | "plan" | "validate" | "reverse";
    timestamp: string;
    filename: string;
  }>;
}
