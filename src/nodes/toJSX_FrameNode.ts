import {
  generateBgColor,
  generateBorders,
  generateLayout,
  generateSpacing,
} from "@/properties";
import toJSX from "@/toJsx";
import generateTailwind from "@/utils/generateTailwind";

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
  classNames.push(generateLayout(node).join(" "));
  classNames.push(generateSpacing(node).join(" "));
  const borders = generateBorders([...node.strokes], node);
  classNames.push(generateTailwind(borders));

  node.children.map((child) => {
    children.push(toJSX(child));
  });

  const otherTags: Array<{ tagName: string; data: string }> = [];

  return `<${tagName} className="${classNames.join(" ")}"  ${otherTags.map(
    (tag) => {
      return `${tag.tagName}="${tag.data}"`;
    },
  )}>${children.join("")}<\/${tagName}>`;
}
