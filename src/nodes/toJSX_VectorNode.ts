import rgbToHex from "@/utils/rgbToHex";
import {
  generateDefs,
  generateFillDefs,
  generateId,
  generatePath,
  generatePolygon,
  generateStrokes,
  generateSvg,
} from "@/properties/svg";

export default function toJSX_VectorNode(
  node: VectorNode,
  options: { hasOuterSvg?: boolean; fills: Set<SvgFill> } = {
    hasOuterSvg: false,
    fills: new Set<SvgFill>(),
  },
): string {
  const itemTags: Array<string> = [];

  if (typeof node.fills != "symbol" && options.fills) {
    if (node.fills.length == 0) itemTags.push(`fillOpacity="0"`);
    generateFillDefs([...node.fills], options.fills);
    node.fills.forEach((fill) => {
      switch (fill.type) {
        case "SOLID":
          itemTags.push(`fill="${rgbToHex(fill.color)}"`);
          break;
        case "GRADIENT_LINEAR":
          itemTags.push(`fill="url('#${generateId(fill)}')"`);
          break;
        default:
          console.warn(
            `Unsupported fill type ${fill.type} for svg gradient for node ${node.name}`,
          );
      }
    });
  }

  const strokes = generateStrokes(node);
  strokes.forEach((value, key) => {
    itemTags.push(`${key}="${value}"`);
  });

  const resultStrings: Array<string> = [];
  if (!options.hasOuterSvg) {
    const svgProps = generateSvg(node);
    resultStrings.push(
      `<svg className="absolute overflow-visible ${svgProps.classNames}">`,
      generateDefs(options.fills),
    );
  }
  if (typeof node.fills !== "symbol") {
    if (
      node.fills.every((fill) => {
        return fill.type === "SOLID";
      })
    ) {
      resultStrings.push(
        ...node.vectorPaths.map((path) => {
          return generatePath(path, node, itemTags, options.hasOuterSvg);
        }),
      );
    } else {
      resultStrings.push(generatePolygon(node, itemTags, options.hasOuterSvg));
    }
  }
  if (!options.hasOuterSvg) resultStrings.push("</svg>");
  return resultStrings.join("");
}
