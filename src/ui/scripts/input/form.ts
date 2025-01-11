import createInput from "./input";
import createSelect from "./select";

const formClasses = ["flex", "flex-col"];

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
  obj: { [key: string]: string },
): HTMLFormElement {
  const form = document.createElement("form");
  form.setAttribute("class", formClasses.join(" "));
  itemTypes.forEach((entry) => {
    let child: HTMLElement | undefined = undefined;
    switch (entry.type) {
      case "string":
        const stringValue: string | null =
          typeof obj[entry.name] === "string"
            ? (obj[entry.name] as string)
            : null;
        child = createInputFromItem(entry.name, stringValue);
        break;
      case "select":
        const selected: string | null =
          typeof obj[entry.name] === "string"
            ? (obj[entry.name] as string)
            : null;
        child = createSelectFromItem(entry.name, entry.data, selected);
        break;
      default:
        break;
    }
    if (child) form.appendChild(child);
  });

  return form;
}

function createInputFromItem(
  name: string,
  value: string | null,
): HTMLInputElement {
  const input = createInput(undefined, name);
  if (value) input.value = value;
  return input;
}

function createSelectFromItem(
  name: string,
  value: Array<string> | null,
  selected: string | null,
) {
  if (!value) {
    throw new Error("Can't generate select: no options provided");
  }
  return createSelect(name, value, selected ? selected : undefined);
}
