import { generateLayout } from "@/properties";
import { default as toJSX } from "@/toJsx";
import generateTailwind from "@/utils/generateTailwind";

export default function toJSX_GroupNode(
  node: GroupNode,
  config: Config,
): string {
  return node.children
    .map((child) => {
      return toJSX(child, config);
    })
    .join("");
}
