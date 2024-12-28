import generateTailwind from "@/utils/generateTailwind";
import generateLayout from "@/properties/layout";

export default function generateSvg(node: VectorNode): {
  classNames: string;
} {
  let strokeWeightResize = 0;
  if (node.width === 0 || node.height === 0) {
    if (typeof node.strokeWeight != "symbol") {
      strokeWeightResize = node.strokeWeight / 2;
    }
  }
  const classNames = generateLayout(node);
  classNames.set("h", `[${node.height}]`);
  classNames.set("w", `[${node.width + strokeWeightResize}]`);

  return { classNames: generateTailwind(classNames) };
}
