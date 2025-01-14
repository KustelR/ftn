import { FromUiMessageType } from "@/types/FromUiEnum";
import createGenericButton from "./buttons/createGenericButton";
import createSelect from "@/ui/scripts/input/select";
import createInput from "./input/input";
import { createJsonForm } from "./input/form";

export default function createConfigEditor(config: Config): HTMLElement {
  let list = document.createElement("ul");
  list.setAttribute("class", "w-full space-y-2");
  const entries = Object.entries(config);
  entries.forEach((entry) => {
    const propertyName = entry[0];
    const item = document.createElement("li");
    item.setAttribute(
      "class",
      "justify-stretch space-x-1 mx-1 p-2 w-full grid grid-cols-9 rounded-md bg-white/[0.05]",
    );
    const configOptionName = document.createElement("h3");
    configOptionName.setAttribute("class", "col-span-3 text-lg font-bold");
    configOptionName.textContent = propertyName;
    let valueSource: () => string;
    const inputHolder = document.createElement("span");
    inputHolder.setAttribute(
      "class",
      "col-span-5 justify-start items-start relative",
    );
    if (propertyName === "outputType") {
      const selected: string = entry[1] as OutputType;
      const configSelect = createSelect(entry[0], ["jsx", "html"], selected);

      inputHolder.appendChild(configSelect);
      valueSource = () => {
        return configSelect.value;
      };
    } else if (propertyName === "size") {
      const currentSize: SizeSetting = entry[1] as SizeSetting;
      try {
        const [form, valueHolder] = createJsonForm(
          [
            { name: "sizeRound", type: "select", data: ["original", "round"] },
            {
              name: "sizeType",
              type: "select",
              data: ["relative", "absolute"],
            },
          ],
          currentSize,
        );

        inputHolder.appendChild(form);
        valueSource = valueHolder;
      } catch (error) {
        const failDiv = document.createElement("div");
        failDiv.textContent =
          "something went wrong while generating form. see console";
        inputHolder.appendChild(failDiv);
      }
    }
    const configOptionButton = createGenericButton("set");
    configOptionButton.onclick = () => {
      parent.postMessage(
        {
          pluginMessage: {
            type: FromUiMessageType.SET_CONFIG,
            data: JSON.stringify({
              property: configOptionName.textContent,
              value: valueSource(),
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
