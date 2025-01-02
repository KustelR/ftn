import toJSX from "./toJsx";
import { isConfig, generateConfig } from "@/utils/config";
import composeHtml from "@/utils/composeHtml";

enum FromUiMessageType {
  GET_CODE_FROM_SELECTION = 0,
  GET_LAST_CODE = 1,
  GET_IMPORTS = 2,
}
type FromUiMessage = {
  type: FromUiMessageType;
  data: string;
};
type ToUiMessage = {
  type: "CODE";
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
        figma.ui.postMessage({ type: "CODE", data: lastCode });
        break;
      case FromUiMessageType.GET_IMPORTS:
        figma.ui.postMessage({ type: "IMPORTS", data: "test" });
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
