import generateTailwind from "@/utils/generateTailwind";
import { ShapeNode } from "./toJSX_ShapeNode";
import { generateBgColor } from "@/properties";
import { getClassName } from "@/utils/config";

export default function toJSX_ShapeImageNode(
  node: ShapeNode,
  config: Config,
): HtmlObject {
  let classNames: TailwindProperties = new Map();
  const otherTags: Map<string, string> = new Map();

  const tagName = "Image";

  if (node.type === "ELLIPSE") {
    classNames.set(`rounded`, `full`);
  }
  if (node.absoluteRenderBounds) {
    otherTags.set("width", `${node.absoluteRenderBounds.width}`);
    otherTags.set("height", `${node.absoluteRenderBounds.height}`);
  }
  otherTags.set("src", `SRC HERE`);
  otherTags.set("alt", `${node.name}`);

  const fills = typeof node.fills != "symbol" ? node.fills : [];
  classNames.set(`object`, `center`);
  classNames.set(`opacity`, `[${fills[0].opacity}]`);
  if (typeof node.fills != "symbol") {
    classNames = new Map([
      ...generateBgColor({ name: node.name, fills: [...node.fills] }),
      ...classNames,
    ]);
  }
  return {
    tagName: tagName,
    props: [
      {
        name: getClassName(config),
        data: classNames,
      },
      ...[...otherTags].map((tag) => {
        return { name: tag[0], data: [tag[1]] };
      }),
    ],
    children: [],
  };
}
