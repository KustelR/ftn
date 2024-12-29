import generateTailwindColor from "@/utils/generateTailwindColor";
import rgbToHex from "@/utils/rgbToHex";

export default function generateTextColorFromFills(node: {
  name: string;
  fills: Array<Paint>;
}): TailwindProperties {
  const result: TailwindProperties = new Map();
  node.fills.map((fill) => {
    if (!fill.visible) return;

    switch (fill.type) {
      case "SOLID":
        result.set(`text`, generateTailwindColor(fill.color, fill.opacity));
        break;
      default:
        console.warn(
          `[WARNING] Unsupported fill type (${fill.type}) for text node: ${node.name}`,
        );
    }
  });
  return result;
}
