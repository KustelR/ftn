export default function generatePath(
  path: VectorPath,
  node: VectorNode,
  props: Array<Prop>,
  hasOuterSvg: boolean = false,
): HtmlObject {
  props.push({ name: "d", data: [path.data] });
  if (hasOuterSvg) {
    props.push({
      name: "transform",
      data: [
        `translate(${node.relativeTransform[0][2]},${node.relativeTransform[1][2]})`,
      ],
    });
  }
  return {
    tagName: "path",
    props: props,
    children: [],
  };
}
