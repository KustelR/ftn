import rgbToHex from "./utils/rgbToHex";

import {
  generateBgColor,
  generateLayout,
  generateSpacing,
  generateBorders,
  generateTextColor,
  generateFont,
} from "./generate";

type ShapeNode = RectangleNode | EllipseNode;

export default function toJSXWIP(node: BaseNode): string | null {
  if (node.type === "DOCUMENT") {
    throw new Error("NOT IMPLEMENTED");
    //return toJSX_DocumentNode(node as DocumentNode);
  } else if (node.type === "PAGE") {
    throw new Error("NOT IMPLEMENTED");
    //return [toJSX_PageNode(node as PageNode)];
  } else {
    return toJSX_SceneNode(node);
  }
}

function toJSX_SceneNode(node: SceneNode): string {
  switch (node.type) {
    case "FRAME":
      return toJSX_FrameNode(node);
    case "VECTOR":
      return toJSX_VectorNode(node);
    case "TEXT":
      return toJSXWIP_TextNode(node);
    case "RECTANGLE":
      return toJSX_ShapeNode(node);
    case "RECTANGLE":
      return toJSX_ShapeNode(node);
    case "ELLIPSE":
      return toJSX_ShapeNode(node);
    default:
      console.warn(`[WARNING!] Unsupported node type: ${node.type}`);
      return `<div></div>`;
  }
}

function toJSX_FrameNode(node: FrameNode): string {
  let classNames: Array<string> = [];
  let tagName: string = "div";
  const children: Array<string | null> = [];

  if (typeof node.fills !== "symbol") {
    classNames.push(generateBgColor({ fills: [...node.fills] }).join(" "));
  }
  classNames.push(generateLayout(node).join(" "));
  classNames.push(generateSpacing(node).join(" "));

  if (node.strokes.length > 0) {
    classNames.push(generateBorders([...node.strokes], node).join(" "));
  }

  node.children.map((child) => {
    children.push(toJSXWIP(child));
  });

  const otherTags: Array<{ tagName: string; data: string }> = [];
  if (node.children[0] && node.children[0].type === "VECTOR") {
    tagName = "svg";
    otherTags.push({
      tagName: "viewBox",
      data: `0 0 ${node.width} ${node.height}`,
    });
  }

  return `<${tagName} className="${classNames.join(" ")}"  ${otherTags.map(
    (tag) => {
      return `${tag.tagName}="${tag.data}"`;
    },
  )}>${children.join("")}<\/${tagName}>`;
}

function toJSX_VectorNode(node: VectorNode): string {
  const result: Array<string> = [];

  let colors: Array<string | undefined>;
  const fills: Array<Paint> =
    typeof node.fills !== "symbol" ? [...node.fills] : [];
  if (typeof node.fills != "symbol") {
    colors = [...node.fills].map((fill) => {
      if (fill.type === "SOLID") {
        return rgbToHex((fills[0] as SolidPaint).color);
      } else {
        console.warn(
          `[WARNING] Unsupported fill type in vector node ${node.name}`,
        );
        return;
      }
    });
  }
  const classNames: Array<string> = [
    `translate-x-[${node.x}px] translate-y-[${node.y}px]`,
  ];
  node.vectorPaths.map((path) =>
    result.push(
      `<path className="${classNames.join(" ")}" x="${node.x}" y="${node.y}" d="${path.data}" fill="${colors[0]}" />`,
    ),
  );

  return result.join("");
}

function toJSXWIP_TextNode(node: TextNode): string {
  let tagName: string = "span";
  let classNames: Array<string> = [];

  if (typeof node.fills !== "symbol") {
    classNames.push(generateTextColor({ fills: [...node.fills] }).join(" "));
  }
  classNames.push(generateFont(node).join(" "));
  classNames.push(generateLayout(node).join(" "));
  return `<${tagName} className="${classNames.join(" ")}">${node.characters}</${tagName}>`;
}
function toJSX_ShapeNode(node: ShapeNode): string {
  const tagName = "div";
  const classNames: Array<string> = [];

  if (typeof node.fills !== "symbol") {
    classNames.push(generateBgColor({ fills: [...node.fills] }).join(" "));
  }
  classNames.push(generateLayout(node).join(" "));

  return `<${tagName} className="${classNames.join(" ")}"></${tagName}>`;
}