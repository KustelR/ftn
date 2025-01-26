import toJSX from "./toJsx";
import { setProperty, getConfig, fillConfig } from "@/utils/config";
import composeHtml from "@/utils/composeHtml";
import { FromUiMessageType } from "./types/FromUiEnum";

type ApiType = "figma" | "pixso";
const API_TYPE: ApiType = "pixso";

let plugin: PluginAPI;
/*  We are using hardcoded value so typescript thinks 
   he is smarter than me and tells that this check can't be true!
*/ //@ts-ignore
if (API_TYPE === "pixso") {
  // @ts-expect-error Well i don't know where to find pixso types so i use this for now...
  plugin = pixso as PluginAPI;
} else {
  plugin = figma;
}

function sendToUi(msg: ToUiMessage): void {
  plugin.ui.postMessage(msg);
}

try {
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
          selectedNodes = await getDataFromSelection([...selection], config);
          lastCode = selectedNodes
            .map((node) => {
              return composeHtml(node, config);
            })
            .join(``);
          sendToUi({ type: "CODE", data: lastCode });
          break;
        case FromUiMessageType.GET_LAST_CODE:
          sendToUi({ type: "LAST_CODE", data: lastCode });
          break;
        case FromUiMessageType.GET_IMPORTS:
          sendToUi({ type: "IMPORTS", data: "test" });
          break;
        case FromUiMessageType.GET_CONFIG:
          sendToUi({
            type: "CONFIG",
            data: JSON.stringify(config),
          });
          break;
        case FromUiMessageType.SET_CONFIG:
          const changedProperty: { property: string; value: string } =
            JSON.parse(msg.data);
          await changeConfig(changedProperty, config);
          sendToUi({
            type: "CONFIG",
            data: JSON.stringify(config),
          });
          break;
        case FromUiMessageType.GET_NODES:
          sendToUi({
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
          });
      }
    } catch (e) {
      if (e instanceof Error) {
        sendToUi({
          type: "ERROR",
          data: `Thrown an error: ${e.name}\nerror message: ${e.message}\nCause: ${e.cause}\n Stack trace:\n${e.stack}`,
        });
      }
    }
    //plugin.closePlugin();
  };

  async function getDataFromSelection(
    selection: Array<SceneNode>,
    config: Config,
  ): Promise<Array<HtmlObject>> {
    let result: Array<HtmlObject | null> = [];
    let conversionPromises: Array<Promise<BaseNode | null>> = [];
    let nodes: Array<BaseNode | null> = [];
    selection.forEach((node) => {
      if (API_TYPE === "figma") {
        conversionPromises.push(plugin.getNodeByIdAsync(node.id));
      } else {
        nodes.push(plugin.getNodeById(node.id));
      }
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
  ) {
    setProperty(config, changedProperty.property, changedProperty.value);

    await plugin.clientStorage.setAsync("config", config);
  }
} catch (error) {
  plugin.ui.postMessage(error);
}
