import { UnsupportedPropertyError } from "@/types/errors";
import { joinTailwindProperties } from "@/utils/changeTailwindProperties";
import generateTailwindColor from "@/utils/generateTailwindColor";

export default function generateBorders(node: SceneNode): TailwindProperties {
  let result: TailwindProperties = new Map();
  if (!("strokes" in node) || node.type === "VECTOR") return result;
  const strokes = node.strokes;
  if ("strokeWeight" in node && strokes.length > 0) {
    result = new Map([...generateBorder(node), ...result]);
  }
  if ("cornerRadius" in node) {
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

  result = joinTailwindProperties(result, generateStrokeCap(node));
  result = joinTailwindProperties(result, generateStrokeAlign(node));

  return result;
}

function generateBorder(node: SceneNode): TailwindProperties {
  let result: TailwindProperties = new Map();
  if (!("strokeWeight" in node)) return result;
  if (typeof node.strokeWeight !== "symbol") {
    result.set(`border`, `[${node.strokeWeight}px]`);
  } else if ("strokeRightWeight" in node) {
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

function generateRounded(node: SceneNode): TailwindProperties {
  let result: TailwindProperties = new Map();
  if ("cornerRadius" in node && typeof node.cornerRadius !== "symbol") {
    if (node.cornerRadius !== 0) {
      result.set(`rounded`, `[${node.cornerRadius}]`);
      return result;
    }
  }
  if ("topLeftRadius" in node && node.topLeftRadius !== 0) {
    result.set(`rounded-tl`, `[${node.topLeftRadius}]`);
  }
  if ("topRightRadius" in node && node.topRightRadius !== 0) {
    result.set(`rounded-tr`, `[${node.topRightRadius}]`);
  }
  if ("bottomLeftRadius" in node && node.bottomLeftRadius !== 0) {
    result.set(`rounded-bl`, `[${node.bottomLeftRadius}]`);
  }
  if ("bottomRightRadius" in node && node.topRightRadius !== 0) {
    result.set(`rounded-br`, `[${node.bottomRightRadius}]`);
  }
  return result;
}

function generateStrokeCap(node: SceneNode): TailwindProperties {
  const result: TailwindProperties = new Map();
  //throw JSON.stringify(node);
  if (!("strokeCap" in node)) {
    return result;
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

function generateStrokeAlign(node: SceneNode): TailwindProperties {
  const result: TailwindProperties = new Map();
  if (!("strokeAlign" in node)) return result;
  switch (node.strokeAlign) {
    case "INSIDE":
      result.set("box", "border");
      break;
    case undefined:
    case "OUTSIDE":
      break;
    default:
      throw new UnsupportedPropertyError(
        "Unsupported stroke alignment: " + node.strokeAlign,
      );
  }
  return result;
}
