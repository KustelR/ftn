const inputClasses = [
  "w-full",
  "justify-start",
  "items-start",
  "relative",
  "border-b-[2px]",
  "border-black",
  "bg-neutral-700",
];

export default function createInput(value?: string, placeholder?: string) {
  const input = document.createElement("input");
  input.setAttribute("type", "text");
  if (placeholder) input.setAttribute("placeholder", placeholder);
  if (value) input.value = value;
  input.setAttribute("class", inputClasses.join(" "));
  return input;
}
