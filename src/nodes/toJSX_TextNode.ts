import generateTailwind from "@/utils/generateTailwind";
import { generateFont, generateLayout, generateTextColor } from "../properties";
import { getClassName } from "@/utils/config";

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
  classNames = new Map([...generateLayout(node), ...classNames]);
  console.log(classNames.get("text1"));
  return {
    tagName: tagName,
    props: [
      {
        name: getClassName(config),
        data: classNames,
      },
    ],
    children: [node.characters],
  };
}
