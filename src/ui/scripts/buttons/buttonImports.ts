import { FromUiMessageType } from "@/types/FromUiEnum";

export default function buttonImports() {
  parent.postMessage(
    { pluginMessage: { type: FromUiMessageType.GET_IMPORTS } },
    "*",
  );
}
