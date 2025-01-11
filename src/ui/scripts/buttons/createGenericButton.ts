const btnClasses = [
  "overflow-hidden",
  "bg-neutral-700",
  "hover:bg-neutral-600",
  "hover:border-orange-300",
  "w-fit",
  "h-fit",
  "justify-center",
  "items-center",
  "flex",
  "flex-row",
  "space-x-[10px]",
  "py-[0]",
  "px-[5]",
  "border-2",
  "rounded-xl",
  "border-[#363636]",
  "transition-colors",
  "active:border-orange-500",
  "active:bg-amber-500",
];

export default function createGenericButton(
  label: string,
  id?: string,
  className?: string,
  onclick?: Function,
): HTMLElement {
  const btn: HTMLElement = document.createElement("button");
  btn.textContent = label;
  if (className) btnClasses.push(className);
  btn.setAttribute("class", btnClasses.join(" "));
  if (id) btn.id = id;
  if (onclick)
    btn.onclick = () => {
      onclick();
    };

  return btn;
}
