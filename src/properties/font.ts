export default function generateFont(
  node: TextedNode,
  options?: { calculateResponsiveFont: boolean },
): TailwindProperties {
  const result: TailwindProperties = new Map();

  if (typeof node.fontSize == `symbol` || typeof node.fontWeight == `symbol`) {
    console.warn(`mixed fonts are not supported. node ${node.name}`);
    return result;
  }
  if (typeof node.fontName !== "symbol") {
    result.set(`font`, `['${node.fontName.family}']`);
  }
  result.set(`text2`, `[${node.fontSize}px]`);
  result.set(`font1`, `[${node.fontWeight}]`);
  if (node.textAlignHorizontal != "LEFT") {
    result.set(`text1`, `${node.textAlignHorizontal.toLowerCase()}`);
  }

  return result;
}
