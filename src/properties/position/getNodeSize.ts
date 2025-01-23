import getSize from "@/utils/getSize";

/**
 * @throws {FigmaMixedError} thrown on vector node with mixed stroke
 */
export default function generateLayoutSizing(
  node: SceneNode,
  config: Config,
): TailwindProperties {
  let res: TailwindProperties = new Map();
  if (
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
  ) {
    return res;
  }

  let width = node.width;
  if (node.type === "VECTOR") {
    if (typeof node.strokeWeight === "symbol") {
      throw new FigmaMixedError("Mixed stokes are not supported");
    }
    width += node.strokeWeight;
  }

  switch (node.layoutSizingHorizontal) {
    case "FIXED":
      res.set("w", getSize(node.width, config, node.parent, "X"));
      break;
    case "HUG":
      res.set("w", "fit");
      break;
    case "FILL":
      res.set("w", "full");
      break;
  }
  switch (node.layoutSizingVertical) {
    case "FIXED":
      res.set("h", getSize(node.height, config, node.parent, "Y"));
      break;
    case "HUG":
      res.set("h", "fit");
      break;
    case "FILL":
      res.set("h", "full");
      break;
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
