//import { ResultObject } from "@/types";
import rgbToHex from "@/utils/rgbToHex";
//type HtmlData = Map<string, string | Array<string | TailwindProperty>>;

export default function generateBgFromFills(node: {
  name: string;
  fills: Array<Paint>;
}): TailwindProperties {
  //let res: htmlData = new Map();
  const localClassNames: TailwindProperties = new Map();
  for (let i = 0; i < node.fills.length; i++) {
    const fill = node.fills[i];
    //if (!fill) continue;
    if (!fill.visible) continue;

    switch (fill.type) {
      case "SOLID":
        localClassNames.set(
          "bg",
          `[${rgbToHex(fill.color)}]/[${fill.opacity ? fill.opacity : 1}]`,
        );
        break;
      case "GRADIENT_LINEAR":
        localClassNames.set("bg-gradient-to", `l`);
        for (let j = 0; j < fill.gradientStops.length; j++) {
          const stop = fill.gradientStops[j];
          if (j === 0) {
            localClassNames.set(
              "from",
              `[${rgbToHex(stop.color)}]/[${stop.color.a * (fill.opacity ? fill.opacity : 1)}]`,
            );
            if (stop.position !== 0)
              localClassNames.set(`from${j}`, `[${stop.position}]`);
            continue;
          } else if (j === fill.gradientStops.length - 1) {
            localClassNames.set(
              `to`,
              `[${rgbToHex(stop.color)}]/[${stop.color.a * (fill.opacity ? fill.opacity : 1)}]`,
            );
            if (stop.position != 1)
              localClassNames.set(`to${j}`, `[${stop.position}]`);
            continue;
          }
          localClassNames.set(
            `via${j}`,
            `[${rgbToHex(stop.color)}]/[${stop.color.a * (fill.opacity ? fill.opacity : 1)}]`,
          );
          localClassNames.set(`via${j}.${1}`, `[${stop.position}]`);
        }
        break;
      default:
        console.warn(
          `Unsupported fill type (${fill.type}) for text node: ${node.name}`,
        );
    }
  }
  return localClassNames;
}
