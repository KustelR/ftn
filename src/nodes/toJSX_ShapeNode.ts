import { generateBgColor, generateLayout } from "@/properties";
import { toJSX_ShapeImageNode } from "@/nodes";

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
  classNames.push(generateLayout(node).join(" "));

  if (typeof node.fills !== "symbol") {
    classNames.push(
      generateBgColor({ name: node.name, fills: [...node.fills] }).join(" "),
    );
  }

  return `<${tagName} className="${classNames.join(" ")}" ${otherTags.join(" ")}></${tagName}>`;
}
