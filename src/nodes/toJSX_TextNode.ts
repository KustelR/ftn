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
  return {
    tagName: tagName,
    props: [
      {
        name: getPropName("class", config),
        data: classNames,
      },
    ],
    children: [node.characters],
  };
}
