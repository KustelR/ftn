import { ColoredNode, SizedNode, Layout, bgData } from "./types";
import {
  generateBgColor,
  generateRounded,
  generateTextColor,
  generateSizes,
} from "./generator_functions";

type JSXConvertable = string | ParsedNode;

enum classNameGenMods {
  Tailwind = 1,
}

class ParsedNode {
  constructor(node: BaseNode) {
    this.type = node.type;
    this.name = node.name;

    let sizedNode = node as SizedNode;
    this.width = sizedNode.width;
    this.height = sizedNode.height;
    this.autolayout = {
      sizingHorizontal: sizedNode.layoutSizingHorizontal,
      sizingVertical: sizedNode.layoutSizingVertical,
    };

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
        /* TS expects that here can be passed symbol, but it checked above
         */ //@ts-expect-error
        fills: [...coloredNode.fills],
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
        return "div";
      case "TEXT":
        if (this.text && this.text.length > 100) return "p";
        else return "span";
    }
    return "div";
  }

  getClassNames(mode: number): string {
    let output: string = "";
    if (mode === classNameGenMods.Tailwind) {
      if (this.paints && this.paints.fills !== undefined) {
        if (this.type === "TEXT")
          this.paints.fills.forEach(
            (fill) => (output += generateTextColor(fill)),
          );
        else
          this.paints.fills.forEach(
            (fill) => (output += generateBgColor(fill)),
          );
      }
      output += generateSizes(this);
      if (this.type === "ELLIPSE") {
        output += `${generateRounded(undefined, true)} `;
      }
      return output;
    } else throw new Error("Wrong classNameGen mod");
  }
  type: string;
  name: string;
  width?: number;
  height?: number;
  text?: string;
  autolayout?: Layout;
  paints?: bgData | null;
  children: Array<JSXConvertable>;
}

function parseNode(node: BaseNode) {
  const serializedNode = new ParsedNode(node);
  return serializedNode;
}

function toJSX(node: JSXConvertable): string {
  if (typeof node === "string") return node;
  return (
    `<${node.getTag()} ` +
    `className="${node.getClassNames(classNameGenMods.Tailwind)}"> ` +
    `${node.children.map((child) => toJSX(child)).join("")}` +
    `</${node.getTag()}>`
  );
}

export { parseNode, ParsedNode, toJSX };
