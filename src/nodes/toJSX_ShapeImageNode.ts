import generateTailwind from "@/utils/generateTailwind";
import { ShapeNode } from "./toJSX_ShapeNode";
import { generateBgColor } from "@/properties";

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
