import rgbToHex from "@/utils/rgbToHex";
import generateId from "./generateId";

export default function getFillProps(paint: Paint): {
  opacity?: number;
  fill: string;
} {
  let fill: string | undefined = "";
  let opacity: number | undefined = undefined;

  if (paint.opacity !== 1) {
    opacity = paint.opacity ? paint.opacity : 0;
  }

  switch (paint.type) {
    case "SOLID":
      fill = rgbToHex(paint.color);
      break;
    case "GRADIENT_LINEAR":
    case "IMAGE":
      fill = `url('#${generateId(paint)}')`;
      break;
    default:
      console.warn(`Unsuppored paint type in svg fill: ${paint.type}`);
  }

  if (!fill) console.warn(`Can't create fill from: ${paint}`);

  return {
    opacity: opacity,
    fill: fill,
  };
}
