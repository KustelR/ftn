import { generateLayout } from "@/properties";
import { default as toJSX } from "@/toJsx";
import { getPropName } from "@/utils/config";

export default function toJSX_GroupNode(
  node: GroupNode,
  config: Config,
): HtmlObject {
  const props: Array<Prop> = [];
  let classNames: TailwindProperties = new Map();

  classNames = new Map([...generateLayout(node, config), ...classNames]);

  props.push({ name: getPropName("class", config), data: classNames });
  return {
    tagName: "div",
    props: props,
    children: node.children.map((child) => toJSX(child, config)),
  };
}
