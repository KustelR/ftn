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
import { getClassName } from "@/utils/config";

export default function toJSX_VectorNode(
  node: VectorNode,
  config: Config,
  options: { hasOuterSvg?: boolean; fills: Set<SvgFill> } = {
    hasOuterSvg: false,
    fills: new Set<SvgFill>(),
  },
): HtmlObject {
  const itemTags: Array<string> = [];

  if (typeof node.fills != "symbol" && options.fills) {
    if (node.fills.length == 0)
      itemTags.push(
        `${config.outputType === "JSX" ? "fillOpacity" : "fill-opacity"}="0"`,
      );
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

  const strokes = generateStrokes(node, config);
  strokes.forEach((value, key) => {
    itemTags.push(`${key}="${value}"`);
  });

  let resultObject: HtmlObject;
  const svgProps = generateSvg(node);
  resultObject = {
    tagName: `svg`,
    children: [],
    props: [
      {
        name: getClassName(config),
        data: [`absolute`, `overflow-visible`, svgProps.classNames],
      },
    ],
  };
  if (!options.hasOuterSvg) {
    resultObject.destroyOnRender = true;
  }
  if (typeof node.fills !== "symbol") {
    if (
      node.fills.every((fill) => {
        return fill.type === "SOLID";
      })
    ) {
      resultObject.children.push(
        ...node.vectorPaths.map((path) => {
          return generatePath(path, node, itemTags, options.hasOuterSvg);
        }),
      );
    } else {
      resultObject.children.push(
        generatePolygon(node, itemTags, options.hasOuterSvg),
      );
    }
  }
  return resultObject;
}
