import rgbToHex from "@/utils/rgbToHex";

export default function generateSVGFill(
  strokes: Array<Paint>,
  node: {
    name: string;
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
  },
): Array<string> {
  const result: Array<string> = [];
  strokes.map((stroke) => {
    if (!stroke.visible) return;

    switch (stroke.type) {
      case "SOLID":
        result.push(`stroke-[${rgbToHex(stroke.color)}]`);
        break;
      default:
        console.warn(
          `Unsupported stroke type (${stroke.type}) for vector node: ${node.name}`,
        );
    }
  });

  if (typeof node.strokeWeight !== "symbol" && node.strokeWeight >= 1) {
    result.push(`stroke-[${node.strokeWeight}px]`);
  }

  return result;
}
