import generateTailwind from "@/utils/generateTailwind";
import generateLayout from "@/properties/layout";
import getSize from "@/utils/getSize";

export default function generateSvg(
  node: VectorNode,
  config: Config,
): {
  classNames: string;
} {
  let strokeWeightResize = 0;
  if (node.width === 0 || node.height === 0) {
    if (typeof node.strokeWeight != "symbol") {
      strokeWeightResize = node.strokeWeight / 2;
    }
  }
  const classNames = generateLayout(node, config);
  classNames.set(
    "h",
    getSize(node.height + strokeWeightResize, config, node.parent, "H"),
  );
  classNames.set(
    "w",
    getSize(node.width + strokeWeightResize, config, node.parent, "W"),
  );

  return { classNames: generateTailwind(classNames, config) };
}
