import {
  generateDefs,
  generateFillDefs,
  generateFillProp,
  generatePath,
  generatePolygon,
  generateStrokes,
  generateSvg,
} from "@/properties/svg";

export default function toJSX_VectorNode(
  node: VectorNode,
  config: Config,
  options: { hasOuterSvg?: boolean; fills: Set<SvgFill> } = {
    hasOuterSvg: false,
    fills: new Set<SvgFill>(),
  },
): HtmlObject {
  let itemProps: Props = {};

  if (typeof node.fills != "symbol" && options.fills) {
    generateFillDefs([...node.fills], options.fills, node);
    if (node.fills.length === 0) {
      itemProps["fill-opacity"] = ["0"];
    }
    if (node.strokes.length === 0) {
      itemProps["stroke-opacity"] = ["0"];
    }
    node.fills.forEach((fill) => {
      const fillProps = generateFillProp(fill);
      if (fillProps.opacity) {
        itemProps["fill-opacity"] = [`${fillProps.opacity}`];
      }
      itemProps["fill"] = [fillProps.fill];
    });
  }

  const strokes = generateStrokes(node, config, options.fills);
  itemProps = Object.assign(itemProps, strokes);

  let resultObject: HtmlObject;
  const svgProps = generateSvg(node, config);
  svgProps.set("overflow", "visible");
  resultObject = {
    tagName: `svg`,
    children: [],
    props: {
      class: svgProps,
    },
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
