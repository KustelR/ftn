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

function generateSizes(sizes: {
  width?: number;
  height?: number;
  autolayout?: Layout;
}): string {
  let result: string = "";
  if (sizes.autolayout === undefined) {
    return `w-[${sizes.width}] h-[${sizes.height}]`;
  }
  let autoWidth: "fit" | "full" | null;
  let autoHeight: "fit" | "full" | null;
  switch (sizes.autolayout.sizingHorizontal) {
    case "FIXED":
      autoWidth = null;
      break;
    case "HUG":
      autoWidth = "fit";
      break;
    case "FILL":
      autoWidth = "full";
      break;
  }
  switch (sizes.autolayout.sizingVertical) {
    case "FIXED":
      autoHeight = null;
      break;
    case "HUG":
      autoHeight = "fit";
      break;
    case "FILL":
      autoHeight = "full";
      break;
  }
  result += `${autoWidth ? `w-${autoWidth}` : `w-[${sizes.width}]`} ${autoHeight ? `h-${autoHeight}` : `h-[${sizes.height}]`} `;
  return result;
}

function generateRounded(round?: number, full?: boolean): string {
  if (full) {
    return " rounded-full ";
  }
  return `rounded-[${round}] `;
}

export { generateBgColor, generateRounded, generateTextColor, generateSizes };
