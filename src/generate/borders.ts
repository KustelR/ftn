import rgbToHex from "../utils/rgbToHex";

type BorderedNode = {
  name: string;
  width: number;
  height: number;
  cornerRadius?: number | symbol;
  topLeftRadius?: number;
  topRightRadius?: number;
  bottomLeftRadius?: number;
  bottomRightRadius?: number;
  strokeWeight: number | symbol;
  strokeRightWeight?: number;
  strokeLeftWeight?: number;
  strokeTopWeight?: number;
  strokeBottomWeight?: number;
  strokeALign?: "CENTER" | "INSIDE" | "OUTSIDE";
  strokeCap:
    | "NONE"
    | "ROUND"
    | "SQUARE"
    | "ARROW_LINES"
    | "ARROW_EQUILATERAL"
    | symbol;
};
export default function generateBorders(
  strokes: Array<Paint>,
  node: BorderedNode,
): Array<string> {
  let result: Array<string> = [];

  if (typeof node.strokeWeight !== "symbol" && node.strokeWeight !== 0) {
    result.push(`border-[${node.strokeWeight}px]`);
  } else {
    if (node.strokeRightWeight !== 0) {
      result.push(`border-r-[${node.strokeRightWeight}]`);
    }
    if (node.strokeLeftWeight !== 0) {
      result.push(`border-l-[${node.strokeLeftWeight}]`);
    }
    if (node.strokeTopWeight !== 0) {
      result.push(`border-t-[${node.strokeTopWeight}]`);
    }
    if (node.strokeBottomWeight !== 0) {
      result.push(`border-b-[${node.strokeBottomWeight}]`);
    }
  }
  if (typeof node.cornerRadius !== "symbol") {
    if (node.cornerRadius == 0) result.push(`rounded-[${node.cornerRadius}px]`);
    else result.push(``);
  } else {
    if (node.topLeftRadius && node.topLeftRadius !== 0) {
      result.push(`rounded-tl-[${node.topLeftRadius}]`);
    }
    if (node.topRightRadius !== 0) {
      result.push(`rounded-tr-[${node.topRightRadius}]`);
    }
    if (node.bottomLeftRadius !== 0) {
      result.push(`rounded-bl-[${node.bottomLeftRadius}]`);
    }
    if (node.topRightRadius !== 0) {
      result.push(`rounded-br-[${node.bottomRightRadius}]`);
    }
  }
  strokes.map((fill) => {
    switch (fill.type) {
      case "SOLID":
        result.push(
          `border-[${rgbToHex(fill.color)}]/[${fill.opacity ? fill.opacity : 1}] `,
        );
        break;
      case "GRADIENT_ANGULAR":
        break;
      case "GRADIENT_LINEAR":
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

  switch (node.strokeALign) {
    case "INSIDE":
      result.push("box-border");
      break;
    case "OUTSIDE":
      break;
    default:
      console.warn(
        `Unsupported stroke alignment: ${node.strokeALign} in node ${node.name}`,
      );
  }

  switch (node.strokeCap) {
    case "NONE":
      break;
    case "ROUND":
      result.push(
        `rounded-[${node.width !== 0 ? node.width / 2 : node.height / 2}px]`,
      );
      break;
    case "SQUARE":
      break;
    default:
      if (typeof node.strokeCap === "symbol") break;
      console.warn(
        `Unsupported stroke cap: ${node.strokeCap} in node ${node.name}`,
      );
  }

  return result;
}
