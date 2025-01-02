type SpacedNode = {
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
};
export default function generateSpacings(node: SpacedNode): TailwindProperties {
  let result: TailwindProperties = new Map();
  if (node.paddingTop == node.paddingBottom) {
    result.set(`py`, `[${node.paddingTop}]`);
  } else {
    result.set(`pt`, `[${node.paddingTop}] pb-[${node.paddingBottom}]`);
  }
  if (node.paddingLeft == node.paddingRight) {
    result.set(`px`, `[${node.paddingLeft}]`);
  } else {
    result.set(`pl`, `[${node.paddingLeft}] pr-[${node.paddingRight}]`);
  }
  return result;
}
