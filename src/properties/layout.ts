export default function generateLayout(
  node: Layouted,
  options?: {
    percentageSizes?: boolean;
  },
): TailwindProperties {
  let res: TailwindProperties = new Map();
  res = new Map([...generateLayoutMode(node), ...res]);
  res = new Map([...generateAlign(node), ...res]);
  res = new Map([...generateLayoutSizing(node), ...res]);
  if (node.maxHeight) res.set("max-h", node.maxHeight);
  if (node.minHeight) res.set("min-h", node.minHeight);
  if (node.maxWidth) res.set("max-w", node.maxWidth);
  if (node.minWidth) res.set("min-w", node.minWidth);
  res = new Map([...res, ...fixedLayout(node)]);
  return res;
}

function fixedLayout(node: Layouted): TailwindProperties {
  const result: TailwindProperties = new Map();
  if (
    !node.parent ||
    node.parent.type == "DOCUMENT" ||
    node.parent.type == "PAGE"
  ) {
    result.set("w", "full");
    result.set("min-h", "screen");
    return result;
  }
  if (
    (node.parent as Layouted).layoutMode === "FIXED" ||
    (node.parent as Layouted).layoutMode === "NONE" ||
    !(node.parent as Layouted).layoutMode
  ) {
    result.set("absolute", true);
    result.set("left", `[${node.x}]`);
    result.set("top", `[${node.y}]`);
  }
  return result;
}

function generateLayoutMode(node: Layouted): TailwindProperties {
  let res: TailwindProperties = new Map();
  switch (node.layoutMode) {
    case "NONE":
    case "FIXED":
      res.set("relative", true);
      break;
    case "HORIZONTAL":
      res.set("flex", true);
      res.set("flex-row", true);
      res.set("space-x", `[${node.itemSpacing}px]`);
      break;
    case "VERTICAL":
      res.set("flex", true);
      res.set("flex-col", true);
      res.set("space-y", `[${node.itemSpacing}px]`);
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

function generateLayoutSizing(node: Layouted): TailwindProperties {
  let res: TailwindProperties = new Map();

  switch (node.layoutSizingHorizontal) {
    case "FIXED":
      res.set("w", `[${node.width}px]`);
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
      res.set("h", `[${node.height}px]`);
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
