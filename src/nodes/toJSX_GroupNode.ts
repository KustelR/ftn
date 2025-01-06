import { default as toJSX } from "@/toJsx";

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
