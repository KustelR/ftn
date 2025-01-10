import getSize from "@/utils/getSize";

export default function generateSpacings(
  node: SpacedNode,
  config: Config,
): TailwindProperties {
  let result: TailwindProperties = new Map();
  if (node.paddingTop == node.paddingBottom && node.paddingTop != 0) {
    result.set(`py`, getSize(node.paddingTop, config, node.parent, "H"));
  } else {
    if (node.paddingTop !== 0)
      result.set(`pt`, getSize(node.paddingTop, config, node.parent, "H"));
    if (node.paddingLeft !== 0)
      result.set(`pb`, getSize(node.paddingBottom, config, node.parent, "H"));
  }
  if (node.paddingLeft == node.paddingRight && node.paddingRight != 0) {
    result.set(`px`, getSize(node.paddingLeft, config, node.parent, "W"));
  } else {
    if (node.paddingLeft !== 0)
      result.set(`pl`, getSize(node.paddingLeft, config, node.parent, "W"));
    if (node.paddingRight !== 0)
      result.set(`pr`, getSize(node.paddingRight, config, node.parent, "W"));
  }
  return result;
}
