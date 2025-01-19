import createInput from "./input";
import createSelect from "./select";

const formClasses = ["flex", "flex-col bg-white/[0.02] rounded-md p-2"];

interface ItemString extends Item {
  type: "string";
  data: string;
}

interface ItemNumber extends Item {
  type: "number";
  data: number;
}

interface ItemSelect extends Item {
  type: "select";
  data: Array<string>;
}

interface Item {
  name: string;
  type: string;
}

type Json = {
  [key: string]: string | number | undefined;
};

type ValueHolder = () => string | number;

export function createJsonForm(
  itemTypes: Array<ItemString | ItemSelect | ItemNumber>,
  obj: Json,
): [HTMLFormElement, ValueHolder] {
  const form = document.createElement("form");
  form.setAttribute("class", formClasses.join(" "));

  const valueGenerators: Map<string, ValueHolder> = new Map();

  itemTypes.forEach((entry) => {
    const itemContainer = document.createElement("div");

    const label = document.createElement("h4");
    label.textContent = entry.name;
    itemContainer.appendChild(label);

    const genResult = createInteractiveFromItem(entry, obj);
    let child: HTMLElement;
    let generator: ValueHolder;
    if (genResult) [child, generator] = genResult;
    else throw new Error("can't generate form from json");
    if (child) itemContainer.appendChild(child);
    valueGenerators.set(entry.name, generator);

    form.appendChild(itemContainer);
  });
  return [
    form,
    () => {
      const result: { [key: string]: string | number } = {};
      valueGenerators.forEach((func, name) => {
        result[name] = func();
      });
      return JSON.stringify(result);
    },
  ];
}
function createInteractiveFromItem(
  entry: ItemString | ItemSelect | ItemNumber,
  obj: Json,
): [HTMLElement, () => string | number] | undefined {
  let value = obj[entry.name];
  if (!value) {
    value = "";
  }
  switch (entry.type) {
    case "string":
      return createInputFromItem(entry.name, value.toString());
    case "number":
      return createInputFromItem(entry.name, value.toString(), "number");
    case "select":
      return createSelectFromItem(entry.name, entry.data, value.toString());
    default:
      throw new Error("Unknown item type provided for form generator");
  }
}
function createInputFromItem(
  name: string,
  value: string | null,
  typecastTo?: "number",
): [HTMLInputElement, () => string | number] {
  const input = createInput(undefined, name);
  if (value) input.value = value;
  let valueHolder: () => string | number;
  if (typecastTo === "number") {
    valueHolder = () => Number(input.value);
  } else {
    valueHolder = () => input.value;
  }
  return [input, valueHolder];
}

function createSelectFromItem(
  name: string,
  value: SelectItems | null,
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
