import { generateLayout } from "@/properties";
import { default as toJSX } from "@/toJsx";
import generateTailwind from "@/utils/generateTailwind";

export default function toJSX_GroupNode(
  node: GroupNode,
  config: Config,
): HtmlObject {
  return {
    tagName: "group",
    props: [],
    children: node.children.map((child) => toJSX(child, config)),
    destroyOnRender: true,
  };
}
