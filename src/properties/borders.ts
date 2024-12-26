import generateTailwindColor from "@/utils/generateTailwindColor";

export default function generateBorders(
  strokes: Array<Paint>,
  node: BorderedNode,
): TailwindProperties {
  let result: TailwindProperties = new Map();

  if (typeof node.strokeWeight !== "symbol" && node.strokeWeight !== 0) {
    result.set(`border`, `[${node.strokeWeight}]`);
  } else {
    if (node.strokeRightWeight !== 0) {
      result.set(`border-r`, `[${node.strokeRightWeight}]`);
    }
    if (node.strokeLeftWeight !== 0) {
      result.set(`border-l`, `[${node.strokeLeftWeight}]`);
    }
    if (node.strokeTopWeight !== 0) {
      result.set(`border-t`, `[${node.strokeTopWeight}]`);
    }
    if (node.strokeBottomWeight !== 0) {
      result.set(`border-b`, `[${node.strokeBottomWeight}]`);
    }
  }
  if (node.cornerRadius && typeof node.cornerRadius !== "symbol") {
    if (node.cornerRadius !== 0)
      result.set(`rounded`, `[${node.cornerRadius}]`);
  } else {
    if (node.topLeftRadius && node.topLeftRadius !== 0) {
      result.set(`rounded-tl`, `[${node.topLeftRadius}]`);
    }
    if (node.topRightRadius !== 0) {
      result.set(`rounded-tr`, `[${node.topRightRadius}]`);
    }
    if (node.bottomLeftRadius !== 0) {
      result.set(`rounded-bl`, `[${node.bottomLeftRadius}]`);
    }
    if (node.topRightRadius !== 0) {
      result.set(`rounded-br`, `[${node.bottomRightRadius}]`);
    }
  }
  strokes.map((fill) => {
    switch (fill.type) {
      case "SOLID":
        result.set(`border1`, generateTailwindColor(fill.color, fill.opacity));
        break;
      default:
        console.warn(
          `[WARNING] Unsupported stroke fill ${fill.type} in ${node.name}`,
        );
    }
  });

  switch (node.strokeALign) {
    case "INSIDE":
      result.set("box", "border");
      break;
    case undefined:
    case "OUTSIDE":
      break;
    default:
      console.warn(
        `Unsupported stroke alignment: ${node.strokeALign} in node ${node.name}`,
      );
  }

  switch (node.strokeCap) {
    case undefined:
    case "NONE":
    case "SQUARE":
      break;
    case "ROUND":
      let radius = 0;
      if (node.width && node.width > 0) radius = Math.ceil(node.width / 2);
      if (node.height && node.height > 0) radius = Math.ceil(node.height / 2);
      result.set(`rounded`, `[${radius}]`);
      break;
    default:
      if (typeof node.strokeCap === "symbol") break;
      console.warn(
        `Unsupported stroke cap: ${node.strokeCap} in node ${node.name}`,
      );
  }

  return result;
}
