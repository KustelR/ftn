import { FromUiMessageType } from "@/types/FromUiEnum";

export default function addButtonGenerate() {
  parent.postMessage(
    { pluginMessage: { type: FromUiMessageType.GET_CODE_FROM_SELECTION } },
    "*",
  );
}
