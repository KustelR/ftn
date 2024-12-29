export default function generatePolygon(
  node: VectorNode,
  itemTags: Array<string>,
  hasOuterSvg: boolean = false,
): string {
  const points = node.vectorNetwork.vertices.map((vertice) => {
    return `${vertice.x},${vertice.y}`;
  });
  let polygonProperties: Map<string, string> = new Map<string, string>();
  polygonProperties.set("points", points.join(" "));
  const propList: Array<string> = itemTags;
  polygonProperties.forEach((value, key) => {
    propList.push(`${key}="${value}"`);
  });
  if (!hasOuterSvg) {
    return `<polygon ${propList.join(" ")} />`;
  } else {
    return `<polygon transform="translate(${node.relativeTransform[0][2]},${node.relativeTransform[1][2]})" ${propList.join(" ")} />`;
  }
}
