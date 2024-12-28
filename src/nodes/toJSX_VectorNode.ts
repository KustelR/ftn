import rgbToHex from "@/utils/rgbToHex";
import {
  generateBorders,
  generateSvgColor,
  generateSvgStroke,
} from "@/properties";
import generateTailwind from "@/utils/generateTailwind";

export default function toJSX_VectorNode(
  node: VectorNode,
  options: { noSvg?: boolean } = { noSvg: false },
): string {
  const result: Array<string> = [];
  const pathData: {
    d: string;
  } = { d: "" };

  const defsData: Array<string> = [];
  const fills: Array<Paint> =
    typeof node.fills !== "symbol" ? [...node.fills] : [];
  const otherPathTags: Array<string> = [];
  if (typeof fills != "symbol") {
    generateSvgColor({ name: node.name, fills: fills }).map((pFill) => {
      if (typeof pFill === "string") {
        otherPathTags.push(pFill);
      } else if (pFill.type === "GRADIENT_LINEAR") {
        defsData.push(
          `<linearGradient id="${pFill.id}" ${pFill.stops
            .map((stop) => {
              return `${stop.id}="${stop.color.a}"`;
            })
            .join(" ")}>` +
            `${pFill.stops
              .map((stop) => {
                return `<stop offset="${stop.position}" stopColor="${rgbToHex(stop.color as RGB)}" />`;
              })
              .join("")}` +
            `</linearGradient>`,
        );
      }
    });
  }
  const strokes = generateStrokes(node);

  strokes.forEach((value, key) => {
    otherPathTags.push(`${key}="${value}"`);
  });
  if (!options.noSvg) {
    const svgProps = generateSvg(node);
    node.vectorPaths.map((path) =>
      result.push(
        `<svg className="absolute overflow-visible ${svgProps.classNames.join(" ")}">` +
          `<path d="${path.data}" ${otherPathTags.join(" ")} />` +
          `</svg>`,
      ),
    );
    return result.join("");
  } else {
    node.vectorPaths.map((path) =>
      result.push(
        `<path transform="translate(${node.relativeTransform[0][2]},${node.relativeTransform[1][2]})" d="${path.data}" ${otherPathTags.join(" ")} />`,
      ),
    );
    return result.join();
  }
}

function generateSvg(node: VectorNode): {
  classNames: string[];
} {
  let strokeWeightResize = 0;
  if (node.width === 0 || node.height === 0) {
    if (typeof node.strokeWeight != "symbol") {
      strokeWeightResize = node.strokeWeight / 2;
    }
  }
  const classNames: Array<string> = [
    `top-[${node.y}] left-[${node.x}]`,
    `h-[${node.height}] w-[${node.width + strokeWeightResize}]`,
  ];

  return { classNames: classNames };
}

function generateStrokes(node: VectorNode): Map<string, string> {
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
