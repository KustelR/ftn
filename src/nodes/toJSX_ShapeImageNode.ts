import generateTailwind from "@/utils/generateTailwind";
import { ShapeNode } from "./toJSX_ShapeNode";
import { generateBgColor } from "@/properties";
import { getClassName } from "@/utils/config";

export default function toJSX_ShapeImageNode(
  node: ShapeNode,
  config: Config,
): string {
  const classNames: Array<string> = [];
  const otherTags: Array<string> = [];

  const tagName = "Image";

  if (node.type === "ELLIPSE") {
    classNames.push(`rounded-full`);
  }

  otherTags.push(
    `width="${node.absoluteRenderBounds?.width}"`,
    `height="${node.absoluteRenderBounds?.height}"`,
    `src="SRC HERE"`,
    `alt="${node.name}"`,
  );
  const fills = typeof node.fills != "symbol" ? node.fills : [];
  classNames.push(
    `object-center`,
    `opacity-[${fills[0].opacity}]`,
    generateTailwind(generateBgColor({ name: node.name, fills: [...fills] })),
  );

  return `<${tagName} ${getClassName(config)}="${classNames.join(" ")}" ${otherTags.join(" ")}></${tagName}>`;
}
