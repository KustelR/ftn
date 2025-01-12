import rgbToHex from "@/utils/rgbToHex";
import {
  generateDefs,
  generateFillDefs,
  generateFillProp,
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
    generateFillDefs([...node.fills], options.fills, node);
    if (node.fills.length === 0) {
      itemProps.push({
        name: "fill-opacity",
        data: ["0"],
      });
    }
    if (node.strokes.length === 0) {
      itemProps.push({
        name: "stroke-opacity",
        data: ["0"],
      });
    }
    node.fills.forEach((fill) => {
      const fillProps = generateFillProp(fill);
      if (fillProps.opacity)
        itemProps.push({
          name: "fill-opacity",
          data: [`${fillProps.opacity}`],
        });
      itemProps.push({
        name: "fill",
        data: [fillProps.fill],
      });
    });
  }

  const strokes = generateStrokes(node, config, options.fills);
  itemProps = [...strokes, ...itemProps];

  let resultObject: HtmlObject;
  const svgProps = generateSvg(node, config);
  resultObject = {
    tagName: `svg`,
    children: [],
    props: [
      {
        name: getPropName("class", config),
        data: [`overflow-visible`, svgProps.classNames],
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
