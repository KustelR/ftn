import generateTailwind from "@/utils/generateTailwind";
import { getPropName } from "./config";

export default function composeElement(
  obj: HtmlObject | string | null,
  config: Config,
): string {
  if (!obj) {
    return "";
  }
  if (typeof obj === "string") {
    return obj;
  }
  if (obj.destroyOnRender) {
    return obj.children.map((child) => composeElement(child, config)).join("");
  }

  const props: Array<string> = [];
  obj.props.forEach((prop) => {
    const name = getPropName(prop.name, config);
    if (Array.isArray(prop.data)) {
      props.push(`${name}="${prop.data.join(" ")}"`);
    } else if (name === "class" || name === "className") {
      props.push(
        `${name}="${generateTailwind(prop.data as TailwindProperties, config)}"`,
      );
    }
  });
  return [
    `<${obj.tagName}`,
    `${props.length > 0 ? " " + props.join(" ") : ""}>`,
    `${obj.children.map((child) => composeElement(child, config)).join("")}</${obj.tagName}>`,
  ].join("");
}
