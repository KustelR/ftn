import rgbToHex from "@/utils/rgbToHex";

export default function generateStrokes(
  node: VectorNode,
  config: Config,
): Map<string, string> {
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
    const tag =
      config.outputType === "HTML" ? "stroke-opacity" : "strokeOpacity";
    result.set("stroke-opacity", `${node.strokes[0].opacity}`);
  }
  if (typeof node.strokeCap !== "symbol") {
    if (
      node.strokeCap !== "NONE" &&
      node.strokeCap !== "ARROW_LINES" &&
      node.strokeCap !== "ARROW_EQUILATERAL"
    ) {
      const tag =
        config.outputType === "HTML" ? "stroke-linecap" : "strokeLinecap";
      result.set(tag, `${node.strokeCap.toLowerCase()}`);
    }
  }
  if (typeof node.strokeJoin !== "symbol") {
    const tag =
      config.outputType === "HTML" ? "stroke-linejoin" : "strokeLinejoin";
    result.set(tag, `${node.strokeJoin.toLowerCase()}`);
  }
  if (typeof node.strokeWeight !== "symbol") {
    const tag = config.outputType === "HTML" ? "stroke-width" : "stroke-width";
    result.set(tag, `${node.strokeWeight}px`);
  }
  return result;
}
