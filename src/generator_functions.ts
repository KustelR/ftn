import rgbToHex from "./utils/rgbToHex";
import { Layout } from "./types";

function generateBgColor(paint: Paint): string {
  if (paint.type === "SOLID") {
    return `bg-[${rgbToHex(paint.color)}] `;
  } else return "";
}

function generateTextColor(paint: Paint): string {
  if (paint.type === "SOLID") {
    return `text-[${rgbToHex(paint.color)}] `;
  } else return "";
}

function generateSizes(
  sizes: { width?: number; height?: number },
  autolayout?: Layout,
): string {
  if (sizes.width && sizes.height) {
    return ` w-[${sizes.width}] h-[${sizes.height}]`;
  } else {
    return "";
  }
}

function generateRounded(round?: number, full?: boolean): string {
  if (full) {
    return " rounded-full ";
  }
  return `rounded-[${round}] `;
}

export { generateBgColor, generateRounded, generateTextColor, generateSizes };
