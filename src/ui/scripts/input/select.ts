const selectClasses = ["bg-neutral-700"];

export default function createSelect(
  name: string,
  options: SelectItems,
  selected?: string,
): HTMLSelectElement {
  const select = document.createElement("select");
  select.setAttribute("class", selectClasses.join(" "));
  select.name = name;
  options.forEach((option) => {
    const opt = document.createElement("option");
    opt.textContent = option.toString();
    if (selected === option) {
      opt.selected = true;
    }
    select.appendChild(opt);
  });

  return select;
}
