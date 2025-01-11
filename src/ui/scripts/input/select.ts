export default function createSelect(
  name: string,
  selected: string,
  options: Array<string>,
): HTMLSelectElement {
  const select = document.createElement("select");
  select.name = name;
  options.forEach((option) => {
    const opt = document.createElement("option");
    if (selected === option) {
      opt.selected = true;
    }
    select.appendChild(opt);
  });

  return select;
}
