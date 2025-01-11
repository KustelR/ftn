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

type Json = {
  [key: string]: string;
};

export function createJsonForm(
  itemTypes: Array<ItemString | ItemSelect>,
  obj: Json,
): HTMLFormElement {
  const form = document.createElement("form");
  form.setAttribute("class", formClasses.join(" "));
  itemTypes.forEach((entry) => {
    const itemContainer = document.createElement("div");

    const label = document.createElement("h4");
    label.textContent = entry.name;
    itemContainer.appendChild(label);

    const child = createInteractiveFromItem(entry, obj);
    if (child) itemContainer.appendChild(child);

    form.appendChild(itemContainer);
  });

  return form;
}
function createInteractiveFromItem(entry: ItemSelect | ItemString, obj: Json) {
  let value = obj[entry.name];
  switch (entry.type) {
    case "string":
      if (typeof value !== "string") return;
      return createInputFromItem(entry.name, value);
    case "select":
      return createSelectFromItem(entry.name, entry.data, value);
    default:
      console.warn("Unknown item type");
  }
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
