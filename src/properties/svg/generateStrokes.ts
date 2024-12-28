import rgbToHex from "@/utils/rgbToHex";

export default function generateStrokes(node: VectorNode): Map<string, string> {
  const result = new Map<string, string>();
  if (typeof node.strokes !== "symbol") {
    const fill = node.strokes[0];
    if (!fill) return result;
    switch (fill.type) {
      case "SOLID":
        result.set("stroke", `${rgbToHex(fill.color)}`);
        break;
    }
  }
  if (node.strokes[0].opacity !== undefined) {
    result.set("strokeOpacity", `${node.strokes[0].opacity}`);
  }
  if (typeof node.strokeCap !== "symbol") {
    if (
      node.strokeCap !== "NONE" &&
      node.strokeCap !== "ARROW_LINES" &&
      node.strokeCap !== "ARROW_EQUILATERAL"
    ) {
      result.set("strokeLinecap", `${node.strokeCap.toLowerCase()}`);
    }
  }
  if (typeof node.strokeJoin !== "symbol") {
    result.set("strokeLinejoin", `${node.strokeJoin.toLowerCase()}`);
  }
  if (typeof node.strokeWeight !== "symbol") {
    result.set("strokeWidth", `${node.strokeWeight}px`);
  }
  return result;
}
