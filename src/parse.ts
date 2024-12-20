enum classNameGenMods {
  Tailwind = 1,
}

function rgbToHex(color: {r: number, g: number, b: number}) {
    function colorToHex(c: number) {
        const cHex = Math.ceil(c * 255).toString(16);
        return cHex.length !== 1 ? cHex : "0" + cHex;
    }
    return `#${colorToHex(color.r)}${colorToHex(color.g)}${colorToHex(color.b)}`;
}

type bgData = {
  fills: Array<Paint>;
};

class ParsedNode {
  constructor(node: BaseNode) {
    this.name = node.name;
    this.children = [];
    const coloredNode: RectangleNode = node as RectangleNode;
    if (coloredNode.fills !== undefined) {
        if (typeof coloredNode.fills === "symbol") {
        } else {
            this.background = {
                fills: [...coloredNode.fills]
            }
        }
    }
  }
  getTag() {
    return "div";
  }
  getClassNames(mode: number): string {
    let output: string = "";
    if (mode === classNameGenMods.Tailwind) {
        if (this.background && this.background.fills !== undefined && this.background.fills[0] !== undefined) {
            const fill = this.background.fills[0];
            if (fill.type === "SOLID") {

                output += `bg-${rgbToHex(fill.color)}`;
            }
        }
      return output;
    } else throw new Error("Wrong classNameGen mod");
  }
  toJSX(): string {
    return `<${this.getTag()} ` + 
        `className="${this.getClassNames(classNameGenMods.Tailwind)}">` + 
        `${this.children.map((child) => child.toJSX()).join("")}` +
        `</${this.getTag()}>`;
  }
  name: string;
  background?: bgData;
  children: ParsedNode[];
}

function parseNode(node: BaseNode) {
  const serializedNode = new ParsedNode(node);
    console.log(serializedNode);
  return serializedNode;
}

export { parseNode, ParsedNode };
