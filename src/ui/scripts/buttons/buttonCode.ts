import { FromUiMessageType } from "@/types/FromUiEnum";

export default function buttonCode() {
  parent.postMessage(
    { pluginMessage: { type: FromUiMessageType.GET_LAST_CODE } },
    "*",
  );
}
