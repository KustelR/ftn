export default function generatePolygon(
  node: VectorNode,
  props: Props,
  hasOuterSvg: boolean = false,
): HtmlObject {
  const points = node.vectorNetwork.vertices.map((vertice) => {
    return `${vertice.x},${vertice.y}`;
  });
  props["points"] = points;
  if (hasOuterSvg) {
    props["transform"] = [
      `translate(${node.relativeTransform[0][2]},${node.relativeTransform[1][2]})`,
    ];
  }
  return {
    tagName: "polygon",
    props: props,
    children: [],
  };
}
