import generateTailwind from "@/utils/generateTailwind";
import { generateFont, generateLayout, generateTextColor } from "../properties";

export default function toJSXWIP_TextNode(node: TextNode): string {
  let tagName: string = "span";
  let classNames: TailwindProperties = new Map();

  if (typeof node.fills !== "symbol") {
    classNames = new Map(
      generateTextColor({ name: node.name, fills: [...node.fills] }),
    );
  }
  classNames = new Map([...generateFont(node), ...classNames]);
  classNames = new Map([...generateLayout(node), ...classNames]);
  return `<${tagName} className="${generateTailwind(classNames)}">${node.characters}</${tagName}>`;
}
