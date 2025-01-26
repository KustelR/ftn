import { FigmaMixedError } from "@/types/errors";
import { joinTailwindProperties } from "@/utils/changeTailwindProperties";
import getSize from "@/utils/getSize";

type PixsoSceneNode = {
  primaryAxisSizingMode: "FIXED" | "AUTO";
  counterAxisSizingMode: "FIXED" | "AUTO";
  x: number;
  y: number;
  width: number;
  height: number;
};

/**
 * @throws {FigmaMixedError} thrown on vector node with mixed stroke
 */
export default function generateLayoutSizing(
  node: SceneNode,
  config: Config,
): TailwindProperties {
  let res: TailwindProperties = new Map();
  if (!hasSize(node)) {
    return res;
  }
  res = joinTailwindProperties(res, getNodeSizes(node, config));
  let width = node.width;
  if (node.type === "VECTOR") {
    if (typeof node.strokeWeight === "symbol") {
      throw new FigmaMixedError("Mixed stokes are not supported");
    }
    width += node.strokeWeight;
  }

  if (node.maxHeight)
    res.set("max-h", getSize(node.maxHeight, config, node.parent, "Y"));
  if (node.minHeight)
    res.set("min-h", getSize(node.minHeight, config, node.parent, "Y"));
  if (node.maxWidth)
    res.set("max-w", getSize(node.maxWidth, config, node.parent, "X"));
  if (node.minWidth)
    res.set("min-w", getSize(node.minWidth, config, node.parent, "X"));

  return res;
}

function getNodeSizes(node: SceneNode, config: Config): TailwindProperties {
  const result: TailwindProperties = new Map();
  if (!hasSize(node)) {
    return result;
  }
  // #!if api === "figma"
  node = node as RectangleNode;
  switch (node.layoutSizingHorizontal) {
    case "FIXED":
      result.set("w", getSize(node.width, config, node.parent, "X"));
      break;
    case "HUG":
      result.set("w", "fit");
      break;
    case "FILL":
      result.set("w", "full");
      break;
  }
  switch (node.layoutSizingVertical) {
    case "FIXED":
      result.set("h", getSize(node.height, config, node.parent, "Y"));
      break;
    case "HUG":
      result.set("h", "fit");
      break;
    case "FILL":
      result.set("h", "full");
      break;
  }
  // #!elseif api === "pixso"
  const pixsoNode = node as unknown as PixsoSceneNode;
  result.set("h", getSize(pixsoNode.height, config));
  result.set("w", getSize(pixsoNode.width, config));
  // #!endif
  return result;
}

function hasSize(node: SceneNode): boolean {
  return !(
    node.type === "STICKY" ||
    node.type === "TABLE" ||
    node.type === "CONNECTOR" ||
    node.type === "SHAPE_WITH_TEXT" ||
    node.type == "CODE_BLOCK" ||
    node.type === "WIDGET" ||
    node.type === "EMBED" ||
    node.type === "LINK_UNFURL" ||
    node.type === "MEDIA" ||
    node.type === "SECTION"
  );
}
