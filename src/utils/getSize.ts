export default function getSize(
  size: number,
  config: Config,
  parent?: BaseNode | Layouted | null,
  dimension?: "X" | "Y",
  dimension?: "W" | "H",
): Size {
  let parentSize = 0;
  if (parent && parent.type !== "DOCUMENT" && parent.type !== "PAGE") {
    if (dimension === "X") {
      parentSize = (parent as SceneNode).width;
    } else if (dimension === "Y") {
      parentSize = (parent as SceneNode).height;
    }
  }
  if (parentSize === 0) {
    return { absolute: round(size, config.size), relative: 0 };
  }
  return {
    absolute: round(size, config.size),
    relative: round(size, config.size) / round(parentSize, config.size),
  };
}

function round(value: number, setting: SizeSetting): number {
  if (setting.sizeRound === "round") {
    return Math.round(value);
  }
  return value;
}
