export default function generatePath(
  path: VectorPath,
  parentNode: VectorNode,
  otherPathTags: Array<string>,
  hasOuterSvg: boolean = true,
): string {
  if (!hasOuterSvg)
    return `<path d="${path.data}" ${otherPathTags.join(" ")} />`;
  else
    return `<path transform="translate(${parentNode.relativeTransform[0][2]},${parentNode.relativeTransform[1][2]})" d="${path.data}" ${otherPathTags.join(" ")} />`;
}
