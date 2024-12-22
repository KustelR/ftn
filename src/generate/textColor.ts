import rgbToHex from "../utils/rgbToHex";

export default function generateTextColorFromFills(node: {
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
      case "GRADIENT_ANGULAR":
        break;
      case "GRADIENT_LINEAR":
        break;
      case "GRADIENT_DIAMOND":
        break;
      case "GRADIENT_RADIAL":
        break;
      case "IMAGE":
        break;
      case "VIDEO":
        break;
      default:
    }
  });
  return result;
}
