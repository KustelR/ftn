import {
  ColoredNode,
  SizedNode,
  LayoutNode,
  Layout,
  VectorData,
  bgData,
} from "./types";
import {
  generateBgColor,
  generateRounded,
  generateTextColor,
  generateSizes,
  generateFlex,
  generateVectorPath,
  generateHexColor,
} from "./generator_functions";

type JSXConvertable = string | ParsedNode;

enum classNameGenMods {
  Tailwind = 1,
}

class ParsedNode {
  constructor(node: BaseNode) {
    this.type = node.type;
    this.name = node.name;

    this.x = (node as SceneNode).x;
    this.y = (node as SceneNode).y;

    let sizedNode = node as SizedNode;
    this.width = sizedNode.width;
    this.height = sizedNode.height;
    this.autolayout = {
      sizingHorizontal: sizedNode.layoutSizingHorizontal,
      sizingVertical: sizedNode.layoutSizingVertical,
    };
    let layoutNode = node as LayoutNode;
    this.autolayout.layoutMode = layoutNode.layoutMode;

    if (node.type === "VECTOR") {
      let vectorNode = node as VectorNode;
      this.vectorData = { paths: [...vectorNode.vectorPaths] };
    }
    let textNode = node as TextNode;
    this.text = textNode.characters;

    this.children = [];
    if (node.type === "FRAME") {
      node.children.forEach((child) => {
        this.children.push(new ParsedNode(child));
      });
    } else if (node.type === "TEXT") {
      this.children.push(this.text);
    }
    let coloredNode: ColoredNode = node as ColoredNode;
    if (coloredNode.fills == undefined) this.paints = null;
    if (typeof coloredNode.fills === "symbol") this.paints = null;
    if (this.paints !== null) {
      this.paints = {
        fills: [...(coloredNode.fills as Array<Paint>)],
      };
    }
  }
  getTag() {
    switch (this.type) {
      case "RECTANGLE":
        return "div";
      case "ELLIPSE":
        return "div";
      case "FRAME":
        if (this.name.match("Logo")) {
          return "svg";
        }
        return "div";
      case "TEXT":
        if (this.text && this.text.length > 100) return "p";
        else return "span";
      case "VECTOR": {
        return "path";
      }
    }
    return "div";
  }

  getClassNames(mode: number): string {
    let output: string = "";
    if (mode === classNameGenMods.Tailwind) {
      if (
        this.paints &&
        this.paints.fills !== undefined &&
        this.type !== "VECTOR"
      ) {
        if (this.type === "TEXT")
          this.paints.fills.forEach(
            (fill) => (output += generateTextColor(fill)),
          );
        else
          this.paints.fills.forEach(
            (fill) => (output += generateBgColor(fill)),
          );
      }
      if (this.type !== "VECTOR") {
        output += generateSizes(this);
      }
      if (this.type === "ELLIPSE") {
        output += `${generateRounded(undefined, true)} `;
      }
      if (this.type === "VECTOR") {
        output += `translate-x-[${this.x}px] translate-y-[${this.y}px] `;
      }
      output += generateFlex(this); //
      return output;
    } else throw new Error("Wrong classNameGen mod");
  }

  getOtherProperties(): Array<string> {
    const result: Array<string> = [];
    let fills: Array<Paint> | undefined = undefined;
    if (this.paints) {
      fills = this.paints.fills;
    }
    if (this.type === "VECTOR") {
      result.push(
        `d="${generateVectorPath(this.vectorData)}" `,
        fills ? `fill="${generateHexColor(fills[0])}" ` : "",
      );
    }
    return result;
  }

  type: string;
  name: string;
  width?: number;
  height?: number;
  text?: string;
  autolayout?: Layout;
  paints?: bgData | null;
  vectorData?: VectorData;
  children: Array<JSXConvertable>;
  x: number;
  y: number;
}

function parseNode(node: BaseNode) {
  const serializedNode = new ParsedNode(node);
  console.log(serializedNode);
  return serializedNode;
}

function toJSX(node: JSXConvertable): string {
  if (typeof node === "string") return node;
  return (
    `<${node.getTag()} ` +
    `className="${node.getClassNames(classNameGenMods.Tailwind)}" ${node.getOtherProperties().join("")}> ` +
    `${node.children.map((child) => toJSX(child)).join("")}` +
    `</${node.getTag()}>`
  );
}

export { parseNode, ParsedNode, toJSX };
