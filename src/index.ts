import toJSX from "./toJsx";
import { setProperty, getConfig, fillConfig } from "@/utils/config";
import composeHtml from "@/utils/composeHtml";
import { FromUiMessageType } from "./types/FromUiEnum";
import type {} from "@figma/plugin-typings";
import type {} from "@pixso/plugin-typings";

run();
async function run() {
  let plugin: PluginAPI | undefined;

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

  let config: Config = getConfig(await plugin.clientStorage.getAsync("config"));
  fillConfig(config);
  let selectedNodes: Array<HtmlObject>;
  let lastCode: string = "";
  plugin.showUI(__html__);
  plugin.ui.resize(450, 500);
  plugin.ui.onmessage = async (msg: FromUiMessage) => {
    try {
      switch (msg.type) {
        case FromUiMessageType.GET_CODE_FROM_SELECTION:
          lastCode = "";
          const selection = plugin.currentPage.selection;
          console.log(selection);
          selectedNodes = await getDataFromSelection(
            [...selection],
            plugin,
            config,
          );
          lastCode = selectedNodes
            .map((node) => {
              return composeHtml(node, config);
            })
            .join(``);
          sendToUi({ type: "CODE", data: lastCode }, plugin);
          break;
        case FromUiMessageType.GET_LAST_CODE:
          sendToUi({ type: "LAST_CODE", data: lastCode }, plugin);
          break;
        case FromUiMessageType.GET_IMPORTS:
          sendToUi({ type: "IMPORTS", data: "test" }, plugin);
          break;
        case FromUiMessageType.GET_CONFIG:
          sendToUi(
            {
              type: "CONFIG",
              data: JSON.stringify(config),
            },
            plugin,
          );
          break;
        case FromUiMessageType.SET_CONFIG:
          const changedProperty: { property: string; value: string } =
            JSON.parse(msg.data);
          await changeConfig(changedProperty, config, plugin);
          sendToUi(
            {
              type: "CONFIG",
              data: JSON.stringify(config),
            },
            plugin,
          );
          break;
        case FromUiMessageType.GET_NODES:
          sendToUi(
            {
              type: "NODES",
              data: JSON.stringify(selectedNodes, (key, value) => {
                if (value instanceof Map) {
                  return {
                    dataType: "Map",
                    value: Array.from(value.entries()),
                  };
                }
                return value;
              }),
            },
            plugin,
          );
      }
    } catch (e) {
      handlePluginError(e, plugin);
    }
    //plugin.closePlugin();
  };
}
async function getDataFromSelection(
  selection: Array<SceneNode>,
  plugin: PluginAPI,
  config: Config,
): Promise<Array<HtmlObject>> {
  let result: Array<HtmlObject | null> = [];
  let conversionPromises: Array<Promise<BaseNode | null>> = [];
  let nodes: Array<BaseNode | null> = [];
  selection.forEach((node) => {
    // #!if api === "figma"
    conversionPromises.push(plugin.getNodeByIdAsync(node.id));
    // #!endif
    // #!if api === "pixso"
    nodes.push(plugin.getNodeById(node.id));
    // #!endif
  });
  nodes = [...nodes, ...(await Promise.all(conversionPromises))];
  nodes.forEach((node) => {
    if (!node) return;
    result.push(toJSX(node, config));
  });
  return result.filter((node) => !!node);
}

async function changeConfig(
  changedProperty: { property: string; value: string },
  config: Config,
  plugin: PluginAPI,
) {
  setProperty(config, changedProperty.property, changedProperty.value);

  await plugin.clientStorage.setAsync("config", config);
}

function handlePluginError(e: any, plugin: PluginAPI) {
  // #!if api === "pixso"
  if (e instanceof Error) {
    sendToUi(
      {
        type: "ERROR",
        data: `Thrown an error: ${e.name}\nerror message: ${e.message}\nCause: ${e.cause}\n Stack trace:\n${e.stack}`,
      },
      plugin,
    );
  }
  // #!else
  throw e;
  // #!endif
}

function sendToUi(msg: ToUiMessage, plugin: PluginAPI): void {
  plugin.ui.postMessage(msg);
}
