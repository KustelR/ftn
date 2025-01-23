import generateTailwind from "@/utils/generateTailwind";
import getSize from "@/utils/getSize";

export default function generateSvg(
  node: VectorNode,
  config: Config,
): TailwindProperties {
  let strokeWeightResize = 0;
  if (node.width === 0 || node.height === 0) {
    if (typeof node.strokeWeight != "symbol") {
      strokeWeightResize = node.strokeWeight / 2;
    }
  }
  const classNames: TailwindProperties = new Map();
  classNames.set(
    "h",
    getSize(node.height + strokeWeightResize, config, node.parent, "Y"),
  );
  classNames.set(
    "w",
    getSize(node.width + strokeWeightResize, config, node.parent, "X"),
  );

  return classNames;
}
