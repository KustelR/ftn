import rgbToHex from "@/utils/rgbToHex";

type SvgGradientData = {
  type:
    | "GRADIENT_LINEAR"
    | "GRADIENT_RADIAL"
    | "GRADIENT_DIAMOND"
    | "GRADIENT_ANGULAR";
  id: string;
  stops: Array<{ id: string; color: RGBA; position: number }>;
};
export default function generateSVGFill(node: {
  name: string;
  fills: Array<Paint>;
}): Array<string | SvgGradientData> {
  const result: Array<string | SvgGradientData> = [];

  if (node.fills.length === 0) {
    result.push(`fillOpacity="0"`);
  }

  let i = 0;
  node.fills.map((fill) => {
    if (!fill.visible) return;

    switch (fill.type) {
      case "SOLID":
        result.push(
          `fill="${rgbToHex(fill.color)}"`,
          fill.opacity != 1
            ? `fillOpacity="${fill.opacity ? fill.opacity : 0}"`
            : "",
        );
        break;
      case "GRADIENT_LINEAR":
        const gradient = fill as GradientPaint;
        let j = 0;
        result.push({
          id: `lingrad${i}`,
          type: gradient.type,
          stops: gradient.gradientStops.map((stop) => {
            j++;
            return { id: `x${j}`, position: stop.position, color: stop.color };
          }),
        });
        break;
      default:
        console.warn(
          `Unsupported fill type (${fill.type}) for vector node: ${node.name}`,
        );
    }
    i++;
  });
  return result;
}
