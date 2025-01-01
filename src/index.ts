import toJSX from "./toJsx";
import { isConfig, generateConfig } from "@/utils/config";

type UiMessageType = "GET_CODE_FROM_SELECTION" | "GET_LAST_CODE";
type UiMessage = {
  type: UiMessageType;
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
  figma.ui.onmessage = async (msg: UiMessage) => {
    switch (msg.type) {
      case "GET_CODE_FROM_SELECTION":
        lastCode = "";
        const selection = figma.currentPage.selection;
        lastCode = await getDataFromSelection([...selection], config);

        figma.ui.postMessage(lastCode);
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
    result += toJSX(node, config);
  });
  return result;
}
