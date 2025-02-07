import {
  generateBgColor,
  generateBorders,
  generateSpacing,
} from "@/properties";
import toJSX from "@/toJsx";

export default function toJSX_FrameNode(
  node: FrameNode,
  config: Config,
): HtmlObject {
  let classNames: TailwindProperties = new Map();
  let tagName: string = "div";
  const children: Array<HtmlObject | null> = [];

  node.children.map((child) => {
    children.push(toJSX(child, config));
  });

  classNames.set("overflow", "hidden");

  return {
    tagName: tagName,
    props: {
      class: classNames,
    },
    children: children,
  };
}
