export default function getSize(
  size: number,
  config: Config,
  parent?: BaseNode | Layouted | null,
  dimension?: "X" | "Y",
  dropValue?: boolean,
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
    dropValue: dropValue,
  };
}

function round(value: number, setting: SizeSetting): number {
  const roundExtent = setting.roundExtent ? setting.roundExtent : 1;
  if (setting.sizeRound === "round") {
    return (
      Math.round(value * Math.pow(10, roundExtent)) / Math.pow(10, roundExtent)
    );
  }
  return value;
}
