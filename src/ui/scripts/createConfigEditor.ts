import { FromUiMessageType } from "@/types/FromUiType";
import createGenericButton from "./buttons/createGenericButton";
import createSelect from "@/ui/scripts/input/select";
import createInput from "./input/input";

export default function createConfigEditor(config: Config): HTMLElement {
  let list = document.createElement("ul");
  list.setAttribute("class", "w-full space-y-2");
  const entries = Object.entries(config);
  entries.forEach((entry) => {
    const propertyName = entry[0];
    const item = document.createElement("li");
    item.setAttribute(
      "class",
      "justify-stretch space-x-1 px-2 w-full grid grid-cols-9",
    );
    const configOptionName = document.createElement("h3");
    configOptionName.setAttribute("class", "col-span-3 text-lg font-bold");
    configOptionName.textContent = propertyName;
    let valueSource: HTMLSelectElement | HTMLInputElement;
    const inputHolder = document.createElement("span");
    inputHolder.setAttribute(
      "class",
      "col-span-5 justify-start items-start relative",
    );
    if (propertyName === "outputType") {
      const selected: string = entry[1] as OutputType;
      const configSelect = createSelect(entry[0], selected, ["jsx", "html"]);

      inputHolder.appendChild(configSelect);
      valueSource = configSelect;
    } else if (propertyName === "size") {
      const input = createInput(undefined, "size");
      try {
        const inputValue: string = JSON.stringify(entry[1]);
        input.value = inputValue;
      } catch (e) {
        console.error("Error occured while parsing JSON", e);
        input.value = "Error occured while parsing JSON";
      }
      valueSource = input;
      inputHolder.appendChild(input);
    }
    const configOptionButton = createGenericButton("set");
    configOptionButton.onclick = () => {
      parent.postMessage(
        {
          pluginMessage: {
            type: FromUiMessageType.SET_CONFIG,
            data: JSON.stringify({
              property: configOptionName.textContent,
              value: valueSource.value,
            }),
          },
        },
        "*",
      );
    };
    item.appendChild(configOptionName);
    item.appendChild(inputHolder);
    item.appendChild(configOptionButton);
    list.appendChild(item);
  });
  return list;
}
