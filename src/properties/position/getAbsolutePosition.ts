import getSize from "@/utils/getSize";


export default function getFixedLayout(node: SceneNode, config: Config): TailwindProperties {
  const result: TailwindProperties = new Map();
  result.set("absolute", true);
  const [left, top] = getCoordinates(node);
  if (left !== 0) result.set("left", getSize(left, config, node.parent, "X"));
  if (top !== 0) result.set("top", getSize(top, config, node.parent, "Y"));
  return result;
}

function getCoordinates(node: SceneNode) {
  if (
    !node.parent ||
    node.parent.type === "DOCUMENT" ||
    node.parent.type === "PAGE"
  ) {
    return [0, 0];
  }

  let left = node.x;
  let top = node.y; 
  let [offsetLeft, offsetTop] = [0, 0];
  if (node.parent.type === "GROUP") {
    offsetTop = node.parent.y;
    offsetLeft = node.parent.x;
  }

  return [left - offsetLeft, top - offsetTop];
}
