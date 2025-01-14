import { generateLayout } from "@/properties";
import { default as toJSX } from "@/toJsx";

export default function toJSX_GroupNode(
  node: GroupNode,
  config: Config,
): HtmlObject {
  const props: Props = {};
  let classNames: TailwindProperties = new Map();

  classNames = new Map([...generateLayout(node, config), ...classNames]);

  props["class"] = classNames;
  return {
    tagName: "div",
    props: props,
    children: node.children.map((child) => toJSX(child, config)),
  };
}
