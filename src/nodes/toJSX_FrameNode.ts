import {
  generateBgColor,
  generateBorders,
  generateLayout,
  generateSpacing,
} from "@/properties";
import toJSX from "@/toJsx";
import generateTailwind from "@/utils/generateTailwind";
import { toJSX_FrameNodeVectors } from "@/nodes";

export default function toJSX_FrameNode(node: FrameNode): string {
  let classNames: Array<string> = [];
  let tagName: string = "div";
  const children: Array<string | null> = [];
  let nodeData = {
    htmlTag: "div",
    props: {},
    children: [],
  };

  if (typeof node.fills !== "symbol") {
    const bgColorClasses = generateBgColor({
      name: node.name,
      fills: [...node.fills],
    });
    classNames.push(generateTailwind(bgColorClasses));
  }
  classNames.push(generateTailwind(generateLayout(node)));
  classNames.push(generateSpacing(node).join(" "));
  const borders = generateBorders([...node.strokes], node);
  classNames.push(generateTailwind(borders));

  let svgOnly = true;
  node.children.map((child) => {
    if (!child || child.type !== "VECTOR") {
      svgOnly = false;
    }
  });
  if (svgOnly) return toJSX_FrameNodeVectors(node);

  node.children.map((child) => {
    children.push(toJSX(child));
  });

  const otherTags: Array<{ tagName: string; data: string }> = [];

  return `<${tagName} className="overflow-hidden ${classNames.join(" ")}"  ${otherTags.map(
    (tag) => {
      return `${tag.tagName}="${tag.data}"`;
    },
  )}>${children.join("")}<\/${tagName}>`;
}
