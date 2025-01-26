import { FromUiMessageType } from "./FromUiEnum";

declare global {
  type FromUiMessage = {
    type: FromUiMessageType;
    data: string;
  };
  type ToUiMessage = {
    type: "CODE" | "LAST_CODE" | "IMPORTS" | "CONFIG" | "NODES" | "ERROR";
    data: string;
  };
}
export {};
