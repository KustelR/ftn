export default function getRotation(node: SceneNode): TailwindProperties {
  const result: TailwindProperties = new Map();
  if (
    node.type !== "STICKY" &&
    node.type !== "CODE_BLOCK" &&
    node.type !== "WIDGET" &&
    node.type !== "EMBED" &&
    node.type !== "LINK_UNFURL" &&
    node.type !== "MEDIA" &&
    node.type !== "SECTION" &&
    node.type !== "TABLE"
  ) {
    if (node.rotation == 0) return result;
    result.set("rotate", `[${-node.rotation}deg]`);
  }

  return result;
}
