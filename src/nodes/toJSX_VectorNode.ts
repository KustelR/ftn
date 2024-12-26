import rgbToHex from "@/utils/rgbToHex";
import {
  generateBorders,
  generateSvgColor,
  generateSvgStroke,
} from "@/properties";

export default function toJSX_VectorNode(node: VectorNode): string {
  const result: Array<string> = [];

  const otherSvgTags: Array<string> = [
    `viewBox="0 0 ${node.absoluteRenderBounds?.width} ${node.absoluteRenderBounds?.height}"`,
    ``,
  ];

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

  const classNames: Array<string> = [
    `top-[${node.y}] left-[${node.x}]`,
    `h-[${node.height}] w-[${node.width}]`,
  ];

  const strokes: Array<Paint> =
    typeof node.strokes !== "symbol" ? [...node.strokes] : [];
  if (node.height == 0 || node.width == 0) {
    classNames.push(...generateBorders(strokes, node));
  } else {
    classNames.push(...generateSvgStroke(strokes, node));
  }

  node.vectorPaths.map((path) =>
    result.push(
      `<svg className="absolute ${classNames.join(" ")}" ${otherSvgTags.join(" ")}>` +
        `<path d="${path.data}" ${otherPathTags.join(" ")} />` +
        `<defs>${defsData.join()}</defs>` +
        `</svg>`,
    ),
  );

  return result.join("");
}
