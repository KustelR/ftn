import generateTailwind from "@/utils/generateTailwind";

export default function composeElement(
  obj: HtmlObject | string | null,
): string {
  if (!obj) {
    return "";
  }
  if (typeof obj === "string") {
    return obj;
  }
  if (obj.destroyOnRender) {
    return obj.children.map((child) => composeElement(child)).join("");
  }

  const props: Array<string> = [];
  obj.props.forEach((prop) => {
    if (Array.isArray(prop.data)) {
      props.push(`${prop.name}="${prop.data.join(" ")}"`);
    } else if (prop.name === "class" || prop.name === "className") {
      props.push(
        `${prop.name}="${generateTailwind(prop.data as TailwindProperties)}"`,
      );
    }
  });
  return [
    `<${obj.tagName}`,
    `${props.length > 0 ? " " + props.join(" ") : ""}>`,
    `${obj.children.map((child) => composeElement(child)).join("")}</${obj.tagName}>`,
  ].join("");
}
