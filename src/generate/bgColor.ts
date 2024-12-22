import rgbToHex from "../utils/rgbToHex";

export default function generateBgFromFills(node: {
  fills: Array<Paint>;
}): Array<String> {
  const result: Array<string> = [];
  node.fills.map((fill) => {
    if (!fill.visible) return;

    switch (fill.type) {
      case "SOLID":
        result.push(
          `bg-[${rgbToHex(fill.color)}]/[${fill.opacity ? fill.opacity : 1}] `,
        );
        break;
      case "GRADIENT_ANGULAR":
        break;
      case "GRADIENT_LINEAR":
        let gradientStrings: Array<string> = [`bg-gradient-to-l`];
        for (let i = 0; i < fill.gradientStops.length; i++) {
          const stop = fill.gradientStops[i];
          if (i === 0) {
            gradientStrings.push(
              `from-[${rgbToHex(stop.color)}]/[${stop.color.a * (fill.opacity ? fill.opacity : 1)}]`,
            );
            if (stop.position != 0)
              gradientStrings.push(`from-[${stop.position}]`);
            continue;
          } else if (i === fill.gradientStops.length - 1) {
            gradientStrings.push(
              ` to-[${rgbToHex(stop.color)}]/[${stop.color.a * (fill.opacity ? fill.opacity : 1)}]`,
            );
            if (stop.position != 1)
              gradientStrings.push(`to-[${stop.position}]`);
            continue;
          }
          gradientStrings.push(
            `via-[${rgbToHex(stop.color)}]/[${stop.color.a * (fill.opacity ? fill.opacity : 1)}]`,
          );
          gradientStrings.push(`via-[${stop.position}]`);
        }
        result.push(gradientStrings.join(" "));
        break;
      case "GRADIENT_DIAMOND":
        break;
      case "GRADIENT_RADIAL":
        break;
      case "IMAGE":
        break;
      case "VIDEO":
        break;
      default:
    }
  });
  return result;
}
