import toJSX from "./toJsx";
import {
  isConfig,
  generateConfig,
  isConfigKey,
  isOutputType,
} from "@/utils/config";
import composeHtml from "@/utils/composeHtml";

enum FromUiMessageType {
  GET_CODE_FROM_SELECTION = 0,
  GET_LAST_CODE = 1,
  GET_IMPORTS = 2,
  GET_CONFIG = 3,
  SET_CONFIG = 4,
}

type FromUiMessage = {
  type: FromUiMessageType;
  data: string;
};

if (figma.editorType === "figma") {
  let config: Config | undefined = await figma.clientStorage.getAsync("config");
  if (!isConfig(config)) {
    config = generateConfig();
    await figma.clientStorage.setAsync("config", config);
  }
  let lastCode: string = "";
  figma.showUI(__html__);
  figma.ui.resize(600, 500);
  figma.ui.onmessage = async (msg: FromUiMessage) => {
    switch (msg.type) {
      case FromUiMessageType.GET_CODE_FROM_SELECTION:
        lastCode = "";
        const selection = figma.currentPage.selection;
        lastCode = await getDataFromSelection([...selection], config);

        figma.ui.postMessage({ type: "CODE", data: lastCode });
        break;
      case FromUiMessageType.GET_LAST_CODE:
        if (lastCode === "") {
          const selection = figma.currentPage.selection;
          lastCode = await getDataFromSelection([...selection], config);
        }
        figma.ui.postMessage({ type: "CODE", data: lastCode });
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
): Promise<string> {
  let result = "";
  let conversionPromises: Array<Promise<BaseNode | null>> = [];
  selection.forEach((node) => {
    conversionPromises.push(figma.getNodeByIdAsync(node.id));
  });
  const nodes = await Promise.all(conversionPromises);
  nodes.forEach((node) => {
    if (!node) return;
    result += composeHtml(toJSX(node, config));
  });
  return result;
}

async function changeConfig(
  changedProperty: { property: string; value: string },
  config: Config,
) {
  changedProperty.value = changedProperty.value.toLowerCase();
  if (!isConfigKey(changedProperty.property))
    throw new Error(`Wrong property name: ${changedProperty.property}`);
  if (!isOutputType(changedProperty.value))
    throw new Error(`wrong config value: ${changedProperty.value}`);

  config[changedProperty.property] = changedProperty.value;
  await figma.clientStorage.setAsync("config", config);
}
