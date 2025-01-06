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
import { getPropName } from "@/utils/config";

export default function toJSX_VectorNode(
  node: VectorNode,
  config: Config,
  options: { hasOuterSvg?: boolean; fills: Set<SvgFill> } = {
    hasOuterSvg: false,
    fills: new Set<SvgFill>(),
  },
): HtmlObject {
  let itemProps: Array<Prop> = [];

  if (typeof node.fills != "symbol" && options.fills) {
    if (node.fills.length == 0)
      itemProps.push({
        name: getPropName("fill-opacity", config),
        data: ["0"],
      });
    generateFillDefs([...node.fills], options.fills);
    node.fills.forEach((fill) => {
      switch (fill.type) {
        case "SOLID":
          itemProps.push({ name: `fill`, data: [`${rgbToHex(fill.color)}`] });
          break;
        case "GRADIENT_LINEAR":
          itemProps.push({
            name: `fill`,
            data: [`url('#${generateId(fill)}')`],
          });
          break;
        default:
          console.warn(
            `Unsupported fill type ${fill.type} for svg gradient for node ${node.name}`,
          );
      }
    });
  }

  const strokes = generateStrokes(node, config);
  itemProps = [...strokes, ...itemProps];

  let resultObject: HtmlObject;
  const svgProps = generateSvg(node, config);
  resultObject = {
    tagName: `svg`,
    children: [],
    props: [
      {
        name: getPropName("class", config),
        data: [`absolute`, `overflow-visible`, svgProps.classNames],
      },
    ],
  };
  if (options.hasOuterSvg) {
    resultObject.destroyOnRender = true;
  } else {
    resultObject.children.push(generateDefs(options.fills, config));
  }
  if (typeof node.fills !== "symbol") {
    if (
      node.fills.every((fill) => {
        return fill.type === "SOLID";
      })
    ) {
      resultObject.children.push(
        ...node.vectorPaths.map((path) => {
          return generatePath(path, node, itemProps, options.hasOuterSvg);
        }),
      );
    } else {
      resultObject.children.push(
        generatePolygon(node, itemProps, options.hasOuterSvg),
      );
    }
  }
  return resultObject;
}
