import rgbToHex from "../utils/rgbToHex";

export default function generateTextColorFromFills(node: {
  name: string;
  fills: Array<Paint>;
}): Array<string> {
  const result: Array<string> = [];
  node.fills.map((fill) => {
    if (!fill.visible) return;

    switch (fill.type) {
      case "SOLID":
        result.push(
          `text-[${rgbToHex(fill.color)}]/[${fill.opacity ? fill.opacity : 1}] `,
        );
        break;
      default:
        console.warn(
          `[WARNING] Unsupported fill type (${fill.type}) for text node: ${node.name}`,
        );
    }
  });
  return result;
}
