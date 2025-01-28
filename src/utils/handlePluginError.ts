import { sendToUi } from "./sendToUi";

export function handlePluginError(e: any, plugin: PluginAPI) {
  // #!if env === "dev"
  // #!if api === "pixso"
  if (e instanceof Error) {
    sendToUi(
      {
        type: "ERROR",
        data: `Thrown an error: ${e.name}\nerror message: ${e.message}\nCause: ${e.cause}\n Stack trace:\n${e.stack}`,
      },
      plugin,
    );
  }
  // #!else
  throw e;
  // #!endif
  // #!endif
}
