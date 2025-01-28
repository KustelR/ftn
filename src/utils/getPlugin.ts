export function getPlugin(): PluginAPI {
  let plugin: PluginAPI;
  // #!if api === 'pixso'
  plugin = pixso;
  // #!elseif api === 'figma'
  plugin = figma;
  // #!else
  console.error("API was not provided");
  // #!endif

  if (!plugin) {
    throw new Error("Plugin API not found");
  }

  return plugin;
}
