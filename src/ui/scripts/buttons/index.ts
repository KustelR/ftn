import createGenericButton from "./createGenericButton";

import buttonClear from "./buttonClear";
import buttonCode from "./buttonCode";
import buttonConfig from "./buttonConfig";
import buttonGenerate from "./buttonGenerate";
import buttonImports from "./buttonImports";
import addButtonExplorer from "./buttonExplorer";
import { buttonCopy } from "./buttonCopy";
/*
export {default as addButton} from './button';
export {default as addButton} from './button';
export {default as addButton} from './button';
*/

export function addTopNavButtons() {
  const code = createGenericButton("CODE", undefined, undefined, buttonCode);
  const config = createGenericButton(
    "CONFIG",
    undefined,
    undefined,
    buttonConfig,
  );
  const imports = createGenericButton(
    "IMPORTS",
    undefined,
    undefined,
    buttonImports,
  );

  const explorer = createGenericButton(
    "EXPLORER",
    undefined,
    undefined,
    addButtonExplorer,
  );
  const topNav = document.getElementById("topNav");
  if (!topNav) throw new Error("Can't add nav button, topnav was not found");
  topNav.appendChild(code);
  topNav.appendChild(imports);
  topNav.appendChild(config);
  topNav.appendChild(explorer);
}

export function addBotNavButtons() {
  const generate = createGenericButton(
    "GENERATE",
    undefined,
    undefined,
    buttonGenerate,
  );
  const copy = createGenericButton("COPY", undefined, undefined, buttonCopy);
  const clear = createGenericButton("CLEAR", undefined, undefined, buttonClear);
  const botNav = document.getElementById("botNav");
  if (!botNav) throw new Error("Can't add nav button, topnav was not found");
  botNav.appendChild(generate);
  botNav.appendChild(clear);
  botNav.appendChild(copy);
}
