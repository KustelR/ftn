import generateTailwind from "@/utils/generateTailwind";
import { generateFont, generateLayout, generateTextColor } from "../properties";
import { getPropName } from "@/utils/config";

export default function toJSXWIP_TextNode(
  node: TextNode,
  config: Config,
): HtmlObject {
  let tagName: string = "span";
  let classNames: TailwindProperties = new Map();

  if (typeof node.fills !== "symbol") {
    classNames = new Map(
      generateTextColor({ name: node.name, fills: [...node.fills] }),
    );
  }
  classNames = new Map([...generateFont(node), ...classNames]);
  classNames = new Map([...generateLayout(node, config), ...classNames]);
  classNames.set("overflow", "visible");
  return {
    tagName: tagName,
    props: {
      class: classNames,
    },
    children: [node.characters],
  };
}
