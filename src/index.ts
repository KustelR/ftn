import toJSX from "./toJsx";
import { setProperty, getConfig, fillConfig } from "@/utils/config";
import composeHtml from "@/utils/composeHtml";
import { FromUiMessageType } from "./types/FromUiEnum";
console.log("runs");
// @ts-expect-error Well i don't know where to find pixso types so i use this for now...
const localPixso = pixso as PluginAPI;



try {
  let config: Config = getConfig(
    await localPixso.clientStorage.getAsync("config"),
  );
  fillConfig(config);
  let selectedNodes: Array<HtmlObject>;
  let lastCode: string = "";
  localPixso.showUI(__html__);
  localPixso.ui.resize(450, 500);
  localPixso.ui.onmessage = async (msg: FromUiMessage) => {
    switch (msg.type) {
      case FromUiMessageType.GET_CODE_FROM_SELECTION:
        lastCode = "";
        const selection = localPixso.currentPage.selection;
        console.log(selection);
        selectedNodes = await getDataFromSelection([...selection], config);
        lastCode = selectedNodes
          .map((node) => {
            return composeHtml(node, config);
          })
          .join(``);
        localPixso.ui.postMessage({ type: "CODE", data: lastCode });
        break;
      case FromUiMessageType.GET_LAST_CODE:
        localPixso.ui.postMessage({ type: "LAST_CODE", data: lastCode });
        break;
      case FromUiMessageType.GET_IMPORTS:
        localPixso.ui.postMessage({ type: "IMPORTS", data: "test" });
        break;
      case FromUiMessageType.GET_CONFIG:
        localPixso.ui.postMessage({
          type: "CONFIG",
          data: JSON.stringify(config),
        });
        break;
      case FromUiMessageType.SET_CONFIG:
        const changedProperty: { property: string; value: string } = JSON.parse(
          msg.data,
        );
        await changeConfig(changedProperty, config);
        localPixso.ui.postMessage({
          type: "CONFIG",
          data: JSON.stringify(config),
        });
        break;
      case FromUiMessageType.GET_NODES:
        localPixso.ui.postMessage({
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

  async function getDataFromSelection(
    selection: Array<SceneNode>,
    config: Config,
  ): Promise<Array<HtmlObject>> {
    let result: Array<HtmlObject | null> = [];
    let conversionPromises: Array<Promise<BaseNode | null>> = [];
    selection.forEach((node) => {
      conversionPromises.push(localPixso.getNodeByIdAsync(node.id));
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

    await localPixso.clientStorage.setAsync("config", config);
  }
} catch (error) {
  localPixso.ui.postMessage(error);
}
