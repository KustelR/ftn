export default function getSize(
  size: number,
  parent?: BaseNode | Layouted | null,
  dimension?: "W" | "H",
  config?: Config,
): Size {
  const sizeSetting = config ? config.size : "original";
  let parentSize = 0;
  if (parent && parent.type !== "DOCUMENT" && parent.type !== "PAGE") {
    if (dimension === "W") {
      parentSize = (parent as SceneNode).width;
    } else if (dimension === "H") {
      parentSize = (parent as SceneNode).height;
    }
  }
  if (parentSize === 0) {
    return { absolute: round(size, sizeSetting), relative: 0 };
  }
  return {
    absolute: round(size, sizeSetting),
    relative: round(size / parentSize, sizeSetting),
  };
}

function round(value: number, setting: SizeSetting): number {
  if (setting === "round") {
    return Math.round(value);
  }
  return value;
}
