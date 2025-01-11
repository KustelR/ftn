import createInput from "./input";
import createSelect from "./select";

const formClasses = ["flex", "flex-col bg-white/[0.02] rounded-md p-2"];

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
): [HTMLFormElement, () => string] {
  const form = document.createElement("form");
  form.setAttribute("class", formClasses.join(" "));

  const valueGenerators: Map<string, () => string> = new Map();

  itemTypes.forEach((entry) => {
    const itemContainer = document.createElement("div");

    const label = document.createElement("h4");
    label.textContent = entry.name;
    itemContainer.appendChild(label);

    const genResult = createInteractiveFromItem(entry, obj);
    let child: HTMLElement;
    let generator: () => string;
    if (genResult) [child, generator] = genResult;
    else throw new Error("can't generate form from json");
    if (child) itemContainer.appendChild(child);
    valueGenerators.set(entry.name, generator);

    form.appendChild(itemContainer);
  });
  return [
    form,
    () => {
      const result: { [key: string]: string } = {};
      valueGenerators.forEach((func, name) => {
        result[name] = func();
      });
      return JSON.stringify(result);
    },
  ];
}
function createInteractiveFromItem(
  entry: ItemSelect | ItemString,
  obj: Json,
): [HTMLElement, () => string] | undefined {
  let value = obj[entry.name];
  switch (entry.type) {
    case "string":
      if (typeof value !== "string")
        throw new Error("wrong string input type while generating json form");
      return createInputFromItem(entry.name, value);
    case "select":
      return createSelectFromItem(entry.name, entry.data, value);
    default:
      throw new Error("Unknown item type provided for form generator");
  }
}
function createInputFromItem(
  name: string,
  value: string | null,
): [HTMLInputElement, () => string] {
  const input = createInput(undefined, name);
  if (value) input.value = value;
  return [
    input,
    () => {
      return input.value;
    },
  ];
}

function createSelectFromItem(
  name: string,
  value: Array<string> | null,
  selected: string | null,
): [HTMLSelectElement, () => string] {
  if (!value) {
    throw new Error("Can't generate select: no options provided");
  }
  const select = createSelect(name, value, selected ? selected : undefined);
  return [
    select,
    () => {
      return select.value;
    },
  ];
}
