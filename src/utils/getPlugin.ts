export function getPlugin(): PluginAPI {
  let plugin: PluginAPI | undefined;
  // #!if api === 'pixso'
  plugin = pixso;
  // #!elseif api === 'figma'
  plugin = figma;
  // #!endif

  if (!plugin) {
    throw new Error("Plugin API not found");
  }

  return plugin;
}
