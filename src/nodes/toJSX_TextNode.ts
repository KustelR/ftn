import generateTailwind from "@/utils/generateTailwind";
import { generateFont, generateLayout, generateTextColor } from "../properties";

export default function toJSXWIP_TextNode(node: TextNode): string {
  let tagName: string = "span";
  let classNames: Array<string> = [];

  if (typeof node.fills !== "symbol") {
    classNames.push(
      generateTextColor({ name: node.name, fills: [...node.fills] }).join(" "),
    );
  }
  classNames.push(generateFont(node).join(" "));
  classNames.push(generateTailwind(generateLayout(node)));
  return `<${tagName} className="${classNames.join(" ")}">${node.characters}</${tagName}>`;
}
