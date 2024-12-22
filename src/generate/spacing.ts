type SpacedNode = {
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
};
export default function generateSpacings(node: SpacedNode): Array<string> {
  let result: Array<string> = [];
  if (node.paddingTop == node.paddingBottom) {
    result.push(`py-[${node.paddingTop}]`);
  } else {
    result.push(`pt-[${node.paddingTop}] pb-[${node.paddingBottom}]`);
  }
  if (node.paddingLeft == node.paddingRight) {
    result.push(`px-[${node.paddingLeft}]`);
  } else {
    result.push(`pl-[${node.paddingLeft}] pr-[${node.paddingRight}]`);
  }
  return result;
}
