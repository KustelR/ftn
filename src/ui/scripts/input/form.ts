import createInput from "./input";
import createSelect from "./select";


interface ItemString extends Item {
  type: "string";
  data: string;
}

interface ItemSelect extends Item {
  type: "select";
  data: Array<string>;
}

interface Item {
  name: string;
  type: "string" | "select";
}

export function createJsonForm(
  itemTypes: Array<ItemString | ItemSelect>,
  obj: { [key: string]: string | Array<string> },
): HTMLFormElement {
  const form = document.createElement("form");
  itemTypes.forEach((entry) => {
    let child: HTMLElement | undefined = undefined;
    switch (entry.type) {
      case "string":
        const input = createInput(undefined, entry.name);
        if (typeof obj[entry.name] !== "string") {
          console.warn(
            "Wrong type of data provided for string value in form generator",
          );
        } else {
          input.value = obj[entry.name] as string;
        }
        child = input;
        break;
      case "select":
        if (!obj[entry.name] || !Array.isArray(obj[entry.name])) {
          throw new Error("Can't generate select: no options provided");
        }
        const select = createSelect(
          entry.name,
          obj[entry.name] as Array<string>,
        );
        child = select;
        break;
      default:
        break;
      }
    if (child) form.appendChild(child);
  });

  return form;
}
