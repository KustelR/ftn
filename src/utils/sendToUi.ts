export function sendToUi(msg: ToUiMessage, plugin: PluginAPI): void {
  plugin.ui.postMessage(msg);
}
