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

  const tagName = getPropName(obj.tagName, config);

  const props: Array<string> = Object.entries(obj.props).map(([key, value]) => {
    if (Array.isArray(value)) {
      return `${key}="${value.join(" ")}"`;
    } else {
      return `${key}="${generateTailwind(value, config)}"`;
    }
  });

  return [
    `<${tagName}`,
    `${props.length > 0 ? " " + props.join(" ") : ""}>`,
    `${obj.children.map((child) => composeElement(child, config)).join("")}</${tagName}>`,
  ].join("");
}
