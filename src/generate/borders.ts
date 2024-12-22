import rgbToHex from "../utils/rgbToHex";

type BorderedNode = {
  cornerRadius: number | symbol;
  topLeftRadius: number;
  topRightRadius: number;
  bottomLeftRadius: number;
  bottomRightRadius: number;
  strokeWeight: number | symbol;
  strokeRightWeight: number;
  strokeLeftWeight: number;
  strokeTopWeight: number;
  strokeBottomWeight: number;
};
export default function generateBorders(
  strokes: Array<Paint>,
  node: BorderedNode,
): Array<string> {
  let result: Array<string> = [];

  if (typeof node.strokeWeight !== "symbol") {
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

  return result;
}
