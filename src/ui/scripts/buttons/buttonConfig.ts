import { FromUiMessageType } from "@/types/FromUiEnum";

export default function addButtonConfig() {
  parent.postMessage(
    { pluginMessage: { type: FromUiMessageType.GET_CONFIG } },
    "*",
  );
}
