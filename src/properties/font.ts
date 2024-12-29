type TextedNode = {
  fontName: { family: string; style: string } | symbol;
  fontSize: number | symbol;
  fontWeight: number | symbol;
  textAlignHorizontal: "LEFT" | "CENTER" | "RIGHT" | "JUSTIFIED";
  textAlignVertical: "TOP" | "BOTTOM" | "CENTER";
};

export default function generateFont(
  node: TextedNode,
  options?: { calculateResponsiveFont: boolean },
): TailwindProperties {
  const result: TailwindProperties = new Map();

  if (typeof node.fontSize == `symbol` || typeof node.fontWeight == `symbol`) {
    console.warn("");
    return result;
  }
  result.set(`text`, `[${node.fontSize}px]`);
  result.set(`font`, `[${node.fontWeight}]`);
  if (node.textAlignHorizontal != "LEFT") {
    result.set(`text1`, `${node.textAlignHorizontal.toLowerCase()}`);
  }

  return result;
}
