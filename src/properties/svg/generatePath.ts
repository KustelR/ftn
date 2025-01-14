export default function generatePath(
  path: VectorPath,
  node: VectorNode,
  props: Props,
  hasOuterSvg: boolean = false,
): HtmlObject {
  props["d"] = [path.data];
  if (hasOuterSvg) {
    props["transform"] = [`translate(${node.relativeTransform[0][2]},${node.relativeTransform[1][2]})`]
  }
  return {
    tagName: "path",
    props: props,
    children: [],
  };
}
