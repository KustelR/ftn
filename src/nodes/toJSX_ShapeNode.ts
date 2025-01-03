import { generateBgColor, generateLayout } from "@/properties";
import { toJSX_ShapeImageNode } from "@/nodes";
import generateTailwind from "@/utils/generateTailwind";
import { getPropName } from "@/utils/config";

export type ShapeNode = RectangleNode | EllipseNode;
export default function toJSX_ShapeNode(
  node: ShapeNode,
  config: Config,
): HtmlObject {
  if (typeof node.fills !== "symbol") {
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
  classNames = new Map([...generateLayout(node), ...classNames]);

  if (typeof node.fills !== "symbol") {
    classNames = new Map([
      ...generateBgColor({ name: node.name, fills: [...node.fills] }),
      ...classNames,
    ]);
  }

  return {
    tagName: tagName,
    props: [
      {
        name: getPropName("class", config),
        data: classNames,
      },
      ...[...otherTags].map((tag) => {
        return { name: tag[0], data: [tag[1]] };
      }),
    ],
    children: [],
  };
}
