import { getPropName } from "@/utils/config";
import rgbToHex from "@/utils/rgbToHex";

export default function generateStrokes(
  node: VectorNode,
  config: Config,
): Array<Prop> {
  const result: Array<Prop> = [];
  if (typeof node.strokes !== "symbol") {
    const fill = node.strokes[0];
    if (!fill) return result;
    switch (fill.type) {
      case "SOLID":
        result.push({ name: "stroke", data: [`${rgbToHex(fill.color)}`] });
        break;
    }
  }
  if (node.strokes[0].opacity !== undefined) {
    result.push({
      name: getPropName("stroke-opacity", config),
      data: [`${node.strokes[0].opacity}`],
    });
  }
  if (typeof node.strokeCap !== "symbol") {
    if (
      node.strokeCap !== "NONE" &&
      node.strokeCap !== "ARROW_LINES" &&
      node.strokeCap !== "ARROW_EQUILATERAL"
    ) {
      result.push({
        name: getPropName("stroke-linecap", config),
        data: [`${node.strokeCap.toLowerCase()}`],
      });
    }
  }
  if (typeof node.strokeJoin !== "symbol") {
    result.push({
      name: getPropName("stroke-linejoin", config),
      data: [`${node.strokeJoin.toLowerCase()}`],
    });
  }
  if (typeof node.strokeWeight !== "symbol") {
    result.push({
      name: getPropName("stroke-width", config),
      data: [`${node.strokeWeight}px`],
    });
  }
  return result;
}
