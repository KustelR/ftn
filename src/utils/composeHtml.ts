import generateTailwind from "@/utils/generateTailwind";
import { adaptName } from "./config";

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

  const tagName = adaptName(obj.tagName, config);

  const props: Array<string> = Object.entries(obj.props).map(([key, value]) => {
    const adaptedKey = adaptName(key, config);
    if (Array.isArray(value)) {
      return `${adaptedKey}="${value.join(" ")}"`;
    } else if (key === "class") {
      return `${adaptedKey}="${generateTailwind(value, config)}"`;
    }
    throw new Error(`Invalid prop provided:\n${key}:\n${JSON.stringify(key)}`);
  });

  return [
    `<${tagName}`,
    `${props.length > 0 ? " " + props.join(" ") : ""}>`,
    `${obj.children.map((child) => composeElement(child, config)).join("")}</${tagName}>`,
  ].join("");
}
