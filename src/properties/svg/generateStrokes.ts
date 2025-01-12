import { getPropName } from "@/utils/config";
import rgbToHex from "@/utils/rgbToHex";
import generateDefs from "./generateDefs";
import generateFillDefs from "./generateFillDefs";
import { generateFillProp } from ".";

export default function generateStrokes(
  node: VectorNode,
  config: { outputType: OutputType },
  defs: Set<SvgFill>,
): Array<Prop> {
  const result: Array<Prop> = [];
  if (node.strokes.length === 0) return result;
  if (typeof node.strokes !== "symbol") {
    const fill = node.strokes[0];
    const strokeProps = generateFillProp(fill);
    console.log(strokeProps);
    if (strokeProps.opacity) {
      result.push({
        name: "stroke-opacity",
        data: [strokeProps.opacity.toString()],
      });
    }
    result.push({
      name: "stroke",
      data: [strokeProps.fill],
    });
  }
  generateFillDefs([...node.strokes], defs, node);
  generateDefs(defs, config);

  if (typeof node.strokeCap !== "symbol") {
    if (
      node.strokeCap !== "NONE" &&
      node.strokeCap !== "ARROW_LINES" &&
      node.strokeCap !== "ARROW_EQUILATERAL"
    ) {
      result.push({
        name: "stroke-linecap",
        data: [`${node.strokeCap.toLowerCase()}`],
      });
    }
  }
  if (typeof node.strokeJoin !== "symbol") {
    result.push({
      name: "stroke-linejoin",
      data: [`${node.strokeJoin.toLowerCase()}`],
    });
  }
  if (typeof node.strokeWeight !== "symbol") {
    result.push({
      name: "stroke-width",
      data: [`${node.strokeWeight}px`],
    });
  }
  return result;
}
