type TextedNode = {
  fontName: { family: string; style: string } | symbol;
  fontSize: number | symbol;
  fontWeight: number | symbol;
  textAlignHorizontal: "LEFT" | "CENTER" | "RIGHT" | "JUSTIFIED";
  textAlignVertical: "TOP" | "BOTTOM" | "CENTER";
};

export default function generateFont(node: TextedNode): TailwindProperties {
  const result: TailwindProperties = new Map(); //result.push(`break-words`)
  
  if (typeof node.fontSize !== `symbol`) {
    result.set(`text`, `[${node.fontSize}px]`);
  }
  if (typeof node.fontWeight !== `symbol`) {
    result.set(`font`, `[${node.fontWeight}]`);
  }
  result.set(`text1`, `${node.textAlignHorizontal.toLowerCase()}`);

  return result;
}
