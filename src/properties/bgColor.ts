import generateTailwindColor from "@/utils/generateTailwindColor";
import { FigmaMixedError, UnsupportedFillTypeError } from "@/types/errors";
/**
 * @throws {FigmaMixedError} Error if node has mixed fills
 * @throws {UnsupportedFillTypeError} Thrown  on unsupported fill type
 */
export default function generateBgFromFills(
  node: SceneNode,
): TailwindProperties {
  const localClassNames: TailwindProperties = new Map();

  if (node.type === "TEXT" || !("fills" in node)) {
    return localClassNames;
  }

  if (typeof node.fills === "symbol") {
    throw new FigmaMixedError(
      "Figma Mixed type is not supported for BG color now",
    );
  }

  for (let i = 0; i < node.fills.length; i++) {
    const fill = node.fills[i];

    if (!fill.visible) continue;

    switch (fill.type) {
      case "SOLID":
        const color = generateTailwindColor(fill.color, fill.opacity);
        if (color) localClassNames.set("bg", color);
        break;
      case "GRADIENT_LINEAR":
        localClassNames.set("bg-gradient-to", `l`);
        for (let j = 0; j < fill.gradientStops.length; j++) {
          const stop = fill.gradientStops[j];
          const opacity = fill.opacity
            ? stop.color.a * fill.opacity
            : stop.color.a;
          let color = generateTailwindColor(stop.color, opacity);
          if (!color) color = `[#000000]/0`;
          if (j === 0) {
            localClassNames.set("from", color);
            if (stop.position !== 0)
              localClassNames.set(`from${j}`, `[${stop.position}]`);
            continue;
          } else if (j === fill.gradientStops.length - 1) {
            localClassNames.set(`to`, color);
            if (stop.position != 1)
              localClassNames.set(`to${j}`, `[${stop.position}]`);
            continue;
          }
          localClassNames.set(`via${j}`, color);
          localClassNames.set(`via${j}.${1}`, `[${stop.position}]`);
        }
        break;
      default:
        throw new UnsupportedFillTypeError(
          `Unsupported fill type (${fill.type}) for background in node: ${node.name}`,
        );
    }
  }
  return localClassNames;
}
