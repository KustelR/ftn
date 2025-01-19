import toJSX from "./toJsx";
import { setProperty, getConfig, fillConfig } from "@/utils/config";
import composeHtml from "@/utils/composeHtml";
import { FromUiMessageType } from "./types/FromUiEnum";

if (figma.editorType === "figma") {
  let config: Config = getConfig(await figma.clientStorage.getAsync("config"));
  fillConfig(config);
  let selectedNodes: Array<HtmlObject>;
  let lastCode: string = "";
  figma.showUI(__html__);
  figma.ui.resize(450, 500);
  figma.ui.onmessage = async (msg: FromUiMessage) => {
    switch (msg.type) {
      case FromUiMessageType.GET_CODE_FROM_SELECTION:
        lastCode = "";
        const selection = figma.currentPage.selection;
        console.log(selection);
        selectedNodes = await getDataFromSelection([...selection], config);
        lastCode = selectedNodes
          .map((node) => {
            return composeHtml(node, config);
          })
          .join(``);
        figma.ui.postMessage({ type: "CODE", data: lastCode });
        break;
      case FromUiMessageType.GET_LAST_CODE:
        figma.ui.postMessage({ type: "LAST_CODE", data: lastCode });
        break;
      case FromUiMessageType.GET_IMPORTS:
        figma.ui.postMessage({ type: "IMPORTS", data: "test" });
        break;
      case FromUiMessageType.GET_CONFIG:
        figma.ui.postMessage({ type: "CONFIG", data: JSON.stringify(config) });
        break;
      case FromUiMessageType.SET_CONFIG:
        const changedProperty: { property: string; value: string } = JSON.parse(
          msg.data,
        );
        await changeConfig(changedProperty, config);
        figma.ui.postMessage({ type: "CONFIG", data: JSON.stringify(config) });
        break;
      case FromUiMessageType.GET_NODES:
        figma.ui.postMessage({
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
    //figma.closePlugin();
  };
}

// Runs this code if the plugin is run in FigJam
if (figma.editorType === "figjam") {
  console.log("doesn't support figjam yet");
  figma.closePlugin();
}

async function getDataFromSelection(
  selection: Array<SceneNode>,
  config: Config,
): Promise<Array<HtmlObject>> {
  let result: Array<HtmlObject | null> = [];
  let conversionPromises: Array<Promise<BaseNode | null>> = [];
  selection.forEach((node) => {
    conversionPromises.push(figma.getNodeByIdAsync(node.id));
  });
  const nodes = await Promise.all(conversionPromises);
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

  await figma.clientStorage.setAsync("config", config);
}
