export default function generatePolygon(
  node: VectorNode,
  props: Array<Prop>,
  hasOuterSvg: boolean = false,
): HtmlObject {
  const points = node.vectorNetwork.vertices.map((vertice) => {
    return `${vertice.x},${vertice.y}`;
  });
  props.push({ name: "points", data: points });
  if (hasOuterSvg) {
    props.push({
      name: "transform",
      data: [
        `translate(${node.relativeTransform[0][2]},${node.relativeTransform[1][2]})`,
      ],
    });
  }
  return {
    tagName: "polygon",
    props: props,
    children: [],
  };
}
