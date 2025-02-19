import { toJSX_ShapeImageNode } from "@/nodes";

export type ShapeNode = RectangleNode | EllipseNode;
export default function toJSX_ShapeNode(
  node: ShapeNode,
  config: Config,
): HtmlObject {
  if (typeof node.fills !== "symbol" && node.fills.length > 0) {
    if (node.fills[0].type === "IMAGE") {
      return toJSX_ShapeImageNode(node, config);
    }
  }
  let tagName = "div";
  let classNames: TailwindProperties = new Map();
  const otherTags: Map<string, string> = new Map();

  if (node.type === "ELLIPSE") {
    classNames.set(`rounded`, `full`);
  }

  const result: HtmlObject = {
    tagName: tagName,
    props: {
      class: classNames,
    },
    children: [],
  };
  otherTags.forEach((value, key) => {
    result.props[key] = [value];
  });

  return result;
}
