import rgbToHex from "@/utils/rgbToHex";

export default function generateDefs(data: Set<SvgFill> | undefined): string {
  let result: Array<string> = [];
  if (!data) return "";
  data.forEach((fill) => {
    console.log(fill.type);
    switch (fill.type) {
      case "GRADIENT_LINEAR":
        const stops = fill.stops?.map((stop) => {
          return `<stop offset="${stop.offset}" stopColor="${rgbToHex(stop.color)}" />`;
        });
        result.push(
          `<linearGradient id="${fill.id}">${stops?.join("")}</linearGradient>`,
        );
        break;
      default:
    }
  });
  if (result.length === 0) return "";
  return `<defs>${result.join("")}</defs>`;
}
