import generateTailwindColor from "@/utils/generateTailwindColor";

export default function generateBorders(
  strokes: Array<Paint>,
  node: BorderedNode,
): TailwindProperties {
  let result: TailwindProperties = new Map();
  if (node.strokeWeight !== undefined && strokes.length > 0) {
    result = new Map([...generateBorder(node), ...result]);
  }
  if (node.cornerRadius !== undefined) {
    result = new Map([...generateRounded(node), ...result]);
  }
  strokes.map((fill) => {
    switch (fill.type) {
      case "SOLID":
        const color = generateTailwindColor(fill.color, fill.opacity);
        if (color) result.set(`border1`, color);
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

function generateBorder(node: BorderedNode): TailwindProperties {
  let result: TailwindProperties = new Map();
  if (typeof node.strokeWeight !== "symbol") {
    result.set(`border`, `[${node.strokeWeight}px]`);
  } else {
    if (node.strokeRightWeight !== 0) {
      result.set(`border-r`, `[${node.strokeRightWeight}px]`);
    }
    if (node.strokeLeftWeight !== 0) {
      result.set(`border-l`, `[${node.strokeLeftWeight}px]`);
    }
    if (node.strokeTopWeight !== 0) {
      result.set(`border-t`, `[${node.strokeTopWeight}px]`);
    }
    if (node.strokeBottomWeight !== 0) {
      result.set(`border-b`, `[${node.strokeBottomWeight}px]`);
    }
  }
  return result;
}

function generateRounded(node: BorderedNode): TailwindProperties {
  let result: TailwindProperties = new Map();
  if (node.cornerRadius && typeof node.cornerRadius !== "symbol") {
    if (node.cornerRadius !== 0) {
      result.set(`rounded`, `[${node.cornerRadius}]`);
      return result;
    }
  }
  if (node.topLeftRadius && node.topLeftRadius !== 0) {
    result.set(`rounded-tl`, `[${node.topLeftRadius}]`);
  }
  if (node.topRightRadius && node.topRightRadius !== 0) {
    result.set(`rounded-tr`, `[${node.topRightRadius}]`);
  }
  if (node.bottomLeftRadius && node.bottomLeftRadius !== 0) {
    result.set(`rounded-bl`, `[${node.bottomLeftRadius}]`);
  }
  if (node.bottomRightRadius && node.topRightRadius !== 0) {
    result.set(`rounded-br`, `[${node.bottomRightRadius}]`);
  }
  return result;
}
