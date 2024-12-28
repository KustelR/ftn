//import { ResultObject } from "@/types";
import generateTailwindColor from "@/utils/generateTailwindColor";
//type HtmlData = Map<string, string | Array<string | TailwindProperty>>;

export default function generateBgFromFills(node: {
  name: string;
  fills: Array<Paint>;
}): TailwindProperties {
  const localClassNames: TailwindProperties = new Map();
  for (let i = 0; i < node.fills.length; i++) {
    const fill = node.fills[i];
    //if (!fill) continue;
    if (!fill.visible) continue;

    switch (fill.type) {
      case "SOLID":
        localClassNames.set(
          "bg",
          generateTailwindColor(fill.color, fill.opacity),
        );
        break;
      case "GRADIENT_LINEAR":
        localClassNames.set("bg-gradient-to", `l`);
        for (let j = 0; j < fill.gradientStops.length; j++) {
          const stop = fill.gradientStops[j];
          const opacity = fill.opacity
            ? stop.color.a * fill.opacity
            : stop.color.a;
          if (j === 0) {
            localClassNames.set(
              "from",
              generateTailwindColor(stop.color, opacity),
            );
            if (stop.position !== 0)
              localClassNames.set(`from${j}`, `[${stop.position}]`);
            continue;
          } else if (j === fill.gradientStops.length - 1) {
            localClassNames.set(
              `to`,
              generateTailwindColor(stop.color, opacity),
            );
            if (stop.position != 1)
              localClassNames.set(`to${j}`, `[${stop.position}]`);
            continue;
          }
          localClassNames.set(
            `via${j}`,
            generateTailwindColor(stop.color, opacity),
          );
          localClassNames.set(`via${j}.${1}`, `[${stop.position}]`);
        }
        break;
      default:
        console.warn(
          `Unsupported fill type (${fill.type}) for node: ${node.name}`,
        );
    }
  }
  return localClassNames;
}
