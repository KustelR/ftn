import toJSX from "@/toJsx";
import {
  generateBgColor,
  generateBorders,
  generateLayout,
  generateSpacing,
} from "../properties";
import {
  toJSX_ShapeNode,
  toJSX_VectorNode,
  toJSX_TextNode,
  toJSX_GroupNode,
} from "@/nodes";

import generateTailwind from "@/utils/generateTailwind";

export default function toJSX_SceneNode(node: SceneNode): string {
  switch (node.type) {
    case "FRAME":
      return toJSX_FrameNode(node);
    case "VECTOR":
      return toJSX_VectorNode(node);
    case "TEXT":
      return toJSX_TextNode(node);
    case "RECTANGLE":
      return toJSX_ShapeNode(node);
    case "RECTANGLE":
      return toJSX_ShapeNode(node);
    case "ELLIPSE":
      return toJSX_ShapeNode(node);
    case "GROUP":
      return toJSX_GroupNode(node);
    default:
      console.warn(`[WARNING!] Unsupported node type: ${node.type}`);
      return `<div className="${`w-[${node.width}] h-[${node.height}]`}">${`Unsupported node type: ${node.type}`}</div>`;
  }
}

type NodeData = {
  htmlTag: string;
  props: { [key: string]: string };
  children: Array<NodeData | null>;
};

function toJSX_FrameNode(node: FrameNode): string {
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
