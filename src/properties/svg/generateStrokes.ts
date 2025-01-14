import { getPropName } from "@/utils/config";
import rgbToHex from "@/utils/rgbToHex";
import generateDefs from "./generateDefs";
import generateFillDefs from "./generateFillDefs";
import { generateFillProp } from ".";

export default function generateStrokes(
  node: VectorNode,
  config: { outputType: OutputType },
  defs: Set<SvgFill>,
): Props {
  const result: Props = {};
  if (node.strokes.length === 0) return result;
  if (typeof node.strokes !== "symbol") {
    const fill = node.strokes[0];
    const strokeProps = generateFillProp(fill);
    console.log(strokeProps);
    if (strokeProps.opacity) {
      result["stroke-opacity"] = [strokeProps.opacity.toString()];
    }
    result["stroke"] = [strokeProps.fill];
  }
  generateFillDefs([...node.strokes], defs, node);
  generateDefs(defs, config);

  if (typeof node.strokeCap !== "symbol") {
    if (
      node.strokeCap !== "NONE" &&
      node.strokeCap !== "ARROW_LINES" &&
      node.strokeCap !== "ARROW_EQUILATERAL"
    ) {
      result["stroke-linecap"] = [`${node.strokeCap.toLowerCase()}`];
    }
  }
  if (typeof node.strokeJoin !== "symbol") {
    result["stroke-linejoin"] = [`${node.strokeJoin.toLowerCase()}`];
  }
  if (typeof node.strokeWeight !== "symbol") {
    result["stroke-width"] = [`${node.strokeWeight}px`];
  }
  return result;
}
