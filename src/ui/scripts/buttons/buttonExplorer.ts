import { FromUiMessageType } from "@/types/FromUiEnum";

export default function addButtonExplorer() {
  parent.postMessage(
    { pluginMessage: { type: FromUiMessageType.GET_NODES } },
    "*",
  );
}
