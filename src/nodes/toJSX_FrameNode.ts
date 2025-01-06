import {
  generateBgColor,
  generateBorders,
  generateLayout,
  generateSpacing,
} from "@/properties";
import toJSX from "@/toJsx";
import generateTailwind from "@/utils/generateTailwind";
import { toJSX_FrameNodeVectors } from "@/nodes";
import { getPropName } from "@/utils/config";

export default function toJSX_FrameNode(
  node: FrameNode,
  config: Config,
): HtmlObject {
  let classNames: TailwindProperties = new Map();
  let tagName: string = "div";
  const children: Array<HtmlObject | null> = [];
  let svgOnly = true;
  node.children.map((child) => {
    if (!child || child.type !== "VECTOR") {
      svgOnly = false;
    }
  });
  if (svgOnly && node.children.length > 0)
    return toJSX_FrameNodeVectors(node, config);

  if (typeof node.fills !== "symbol") {
    const bgColorClasses = generateBgColor({
      name: node.name,
      fills: [...node.fills],
    });
    classNames = new Map([...bgColorClasses, ...classNames]);
  }
  classNames = new Map([
    ...generateLayout(node, config),
    ...generateSpacing(node),
    ...generateBorders([...node.strokes], node),
    ...classNames,
  ]);
  node.children.map((child) => {
    children.push(toJSX(child, config));
  });

  classNames.set("overflow", "hidden");

  const otherTags: Array<{ tagName: string; data: string }> = [];
  return {
    tagName: tagName,
    props: [
      {
        name: getPropName("class", config),
        data: classNames,
      },
    ],
    children: children,
  };
  /*
  return `<${tagName} ${getClassName(config)}="overflow-hidden ${generateTailwind(classNames)}"  ${otherTags.map(
    (tag) => {
      return `${tag.tagName}="${tag.data}"`;
    },
  )}>${children.join("")}<\/${tagName}>`;
  */
}
