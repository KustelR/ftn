import { generateBgColor, generateLayout } from "@/properties";
import { toJSX_ShapeImageNode } from "@/nodes";
import generateTailwind from "@/utils/generateTailwind";

export type ShapeNode = RectangleNode | EllipseNode;
export default function toJSX_ShapeNode(node: ShapeNode): string {
  if (typeof node.fills !== "symbol") {
    if (node.fills[0].type === "IMAGE") {
      return toJSX_ShapeImageNode(node);
    }
  }
  let tagName = "div";
  const classNames: Array<string> = [];
  const otherTags: Array<string> = [];

  if (node.type === "ELLIPSE") {
    classNames.push(`rounded-full`);
  }
  classNames.push(generateTailwind(generateLayout(node)));

  if (typeof node.fills !== "symbol") {
    classNames.push(
      generateTailwind(
        generateBgColor({ name: node.name, fills: [...node.fills] }),
      ),
    );
  }

  return `<${tagName} className="${classNames.join(" ")}" ${otherTags.join(" ")}></${tagName}>`;
}
