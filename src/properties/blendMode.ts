export default function getBlendMode(node: SceneNode): TailwindProperties {
  const result: TailwindProperties = new Map();
  if (
    node.type === "SLICE" ||
    node.type === "WIDGET" ||
    node.type === "EMBED" ||
    node.type === "LINK_UNFURL" ||
    node.type === "MEDIA" ||
    node.type === "SECTION"
  ) {
    return result;
  }

  switch (node.blendMode) {
    case "PASS_THROUGH":
    case "NORMAL":
      break;
    case "MULTIPLY":
      result.set("mix-blend", "multiply");
      break;
    case "DARKEN":
      result.set("mix-blend", "darken");
      break;
    case "LIGHTEN":
      result.set("mix-blend", "lighten");
      break;
    case "LINEAR_BURN":
      result.set("mix-blend", "plus-darker");
      break;
    case "COLOR_BURN":
      result.set("mix-blend", "color-burn");
      break;
    case "SCREEN":
      result.set("mix-blend", "screen");
      break;
    case "OVERLAY":
      result.set("mix-blend", "overlay");
      break;
    case "LINEAR_DODGE":
      result.set("mix-blend", "plus-lighter");
      break;
    case "COLOR_DODGE":
      result.set("mix-blend", "color-dodge");
      break;
    case "SOFT_LIGHT":
      result.set("mix-blend", "soft-light");
      break;
    case "HARD_LIGHT":
      result.set("mix-blend", "hard-light");
      break;
    case "DIFFERENCE":
      result.set("mix-blend", "difference");
      break;
    case "EXCLUSION":
      result.set("mix-blend", "exclusion");
      break;
    case "HUE":
      result.set("mix-blend", "hue");
      break;
    case "SATURATION":
      result.set("mix-blend", "saturation");
      break;
    case "COLOR":
      result.set("mix-blend", "color");
      break;
    case "LUMINOSITY":
      result.set("mix-blend", "luminosity");
      break;
    default:
      throw new Error("Unknown blend mode: " + node.blendMode);
  }

  return result;
}
