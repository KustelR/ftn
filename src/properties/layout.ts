import getSize from "@/utils/getSize";

export default function generateLayout(
  node: Layouted,
  config: Config,
): TailwindProperties {
  let res: TailwindProperties = new Map();
  res = new Map([...generateLayoutMode(node, config), ...res]);
  res = new Map([...generateAlign(node), ...res]);
  res = new Map([...generateLayoutSizing(node, config), ...res]);
  if (node.maxHeight)
    res.set("max-h", getSize(node.maxHeight, config, node.parent, "H"));
  if (node.minHeight)
    res.set("min-h", getSize(node.minHeight, config, node.parent, "H"));
  if (node.maxWidth)
    res.set("max-w", getSize(node.maxWidth, config, node.parent, "W"));
  if (node.minWidth)
    res.set("min-w", getSize(node.minWidth, config, node.parent, "W"));
  res = new Map([...res, ...fixedLayout(node, config)]);
  return res;
}

function fixedLayout(node: Layouted, config: Config): TailwindProperties {
  const result: TailwindProperties = new Map();
  result.set("absolute", true);
  const [left, top] = getCoordinates(node);
  if (left !== 0) result.set("left", getSize(left, config, node.parent, "W"));
  if (top !== 0) result.set("top", getSize(top, config, node.parent, "H"));
  return result;
}

function generateLayoutMode(
  node: Layouted,
  config: Config,
): TailwindProperties {
  let res: TailwindProperties = new Map();
  switch (node.layoutMode) {
    case "NONE":
    case "FIXED":
      res.set("relative", true);
      break;
    case "HORIZONTAL":
      res.set("flex", true);
      res.set("flex-row", true);
      res.set(
        "space-x",
        getSize(node.itemSpacing ? node.itemSpacing : 0, config, node, "W"),
      );
      break;
    case "VERTICAL":
      res.set("flex", true);
      res.set("flex-col", true);
      res.set(
        "space-y",
        getSize(node.itemSpacing ? node.itemSpacing : 0, config, node, "H"),
      );
      break;
    case "FIXED":
  }
  return res;
}

function generateAlign(node: Layouted): TailwindProperties {
  let res: TailwindProperties = new Map();
  switch (node.primaryAxisAlignItems) {
    case "MIN":
      res.set("justify", "start");
      break;
    case "MAX":
      res.set("justify", "end");
      break;
    case "SPACE_BETWEEN":
      res.set("justify", "stretch");
      break;
    case "CENTER":
      res.set("justify", "center");
      break;
  }

  switch (node.counterAxisAlignItems) {
    case "MIN":
      res.set("items", "start");
      break;
    case "MAX":
      res.set("items", "end");
      break;
    case "BASELINE":
      res.set("items", "stretch");
      break;
    case "CENTER":
      res.set("items", "center");
      break;
  }
  return res;
}

function generateLayoutSizing(
  node: Layouted,
  config: Config,
): TailwindProperties {
  let res: TailwindProperties = new Map();

  switch (node.layoutSizingHorizontal) {
    case "FIXED":
      res.set("w", getSize(node.width, config, node.parent, "W"));
      break;
    case "HUG":
      res.set("w", "fit");
      break;
    case "FILL":
      res.set("w", "full");
      break;
  }
  switch (node.layoutSizingVertical) {
    case "FIXED":
      res.set("h", getSize(node.height, config, node.parent, "H"));
      break;
    case "HUG":
      res.set("h", "fit");
      break;
    case "FILL":
      res.set("h", "full");
      break;
  }

  return res;
}

function getCoordinates(node: Layouted) {
  if (
    !node.parent ||
    node.parent.type === "DOCUMENT" ||
    node.parent.type === "PAGE"
  ) {
    return [0, 0, 0, 0];
  }

  const rotation: number = node.rotation ? node.rotation : 0;
  let left = node.x; // + node.width * Math.sin((rotation / 180) * Math.PI);
  let top = node.y; // - node.height * Math.cos((rotation / 180) * Math.PI);
  let [offsetLeft, offsetTop] = [0, 0];
  if (node.parent.type === "GROUP") {
    offsetTop = node.parent.y;
    offsetLeft = node.parent.x;
  }

  return [left - offsetLeft, top - offsetTop];
}
