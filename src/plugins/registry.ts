import { Adapter } from "../adapters/registry";

export interface Plugin {
  name: string;
  version: string;
  adapters?: Adapter[];
  templates?: Record<string, string>;
}

class PluginRegistry {
  private plugins: Map<string, Plugin> = new Map();

  register(plugin: Plugin): void {
    this.plugins.set(plugin.name, plugin);
  }

  getAdapters(): Adapter[] {
    const adapters: Adapter[] = [];
    for (const plugin of this.plugins.values()) {
      if (plugin.adapters) {
        adapters.push(...plugin.adapters);
      }
    }
    return adapters;
  }
}

export const pluginRegistry = new PluginRegistry();
