import rgbToHex from "./utils/rgbToHex";
import { Layout, VectorData } from "./types";

function generateHexColor(paint: Paint): string {
  if (paint.type === "SOLID") {
    return rgbToHex(paint.color);
  } else return "";
}
function generateBgColor(paint: Paint): string {
  if (paint.type === "SOLID") {
    return `bg-[${generateHexColor(paint)}] `;
  } else return "";
}

function generateTextColor(paint: Paint): string {
  if (paint.type === "SOLID") {
    return `text-[${generateHexColor(paint)}] `;
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

function generateFlex(node: { autolayout?: Layout }) {
  if (!node.autolayout) {
    return "";
  }
  switch (node.autolayout.layoutMode) {
    case "NONE":
      return "";
    case "HORIZONTAL":
      return "flex flex-row ";
    case "VERTICAL":
      return "flex flex-col ";
    default:
      return "";
  }
}

function generateVectorPath(vectorData?: VectorData): string {
  if (!vectorData) return "";

  return vectorData.paths[0].data;
}

export {
  generateHexColor,
  generateBgColor,
  generateRounded,
  generateTextColor,
  generateSizes,
  generateFlex,
  generateVectorPath,
};
