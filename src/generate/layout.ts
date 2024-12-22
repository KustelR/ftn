type LayoutMode = "NONE" | "HORIZONTAL" | "VERTICAL" | "FIXED";
type Layouted = {
  height: number;
  maxHeight?: number | null | undefined;
  minHeight?: number | null | undefined;
  width: number;
  maxWidth?: number | null | undefined;
  minWidth?: number | null | undefined;
  layoutMode?: LayoutMode;
  itemSpacing?: number;
  layoutSizingVertical?: "FIXED" | "HUG" | "FILL";
  layoutSizingHorizontal?: "FIXED" | "HUG" | "FILL";
  primaryAxisAlignItems?: "MIN" | "MAX" | "SPACE_BETWEEN" | "CENTER";
  counterAxisAlignItems?: "MIN" | "MAX" | "BASELINE" | "CENTER";
};
export default function generateLayout(node: Layouted): Array<string> {
  let result: Array<string> = [];
  switch (node.layoutMode) {
    case "NONE":
      break;
    case "HORIZONTAL":
      result.push(`flex flex-row ${`space-x-[${node.itemSpacing}px]`}`);
      break;
    case "VERTICAL":
      result.push(`flex flex-col ${`space-y-[${node.itemSpacing}px]`}`);

      break;
    case "FIXED":
      result.push();
      break;
  }
  switch (node.primaryAxisAlignItems) {
    case "MIN":
      result.push(`justify-start`);
      break;
    case "MAX":
      result.push(`justify-end`);
      break;
    case "SPACE_BETWEEN":
      result.push(`justify-stretch`);
      break;
    case "CENTER":
      result.push(`justify-center`);
      break;
  }

  switch (node.counterAxisAlignItems) {
    case "MIN":
      result.push(`items-start`);
      break;
    case "MAX":
      result.push(`items-end`);
      break;
    case "BASELINE":
      result.push(`items-stretch`);
      break;
    case "CENTER":
      result.push(`items-center`);
      break;
  }

  if (node.maxHeight) {
    result.push(`max-h-${node.maxHeight}`);
  }
  if (node.minHeight) {
    result.push(`min-h-${node.minHeight}`);
  }
  if (node.maxWidth) {
    result.push(`max-w-${node.maxWidth}`);
  }
  if (node.minWidth) {
    result.push(`min-w-${node.minWidth}`);
  }
  switch (node.layoutSizingHorizontal) {
    case "FIXED":
      result.push(`w-[${node.width}]`);
      break;
    case "HUG":
      result.push(`w-fit`);
      break;
    case "FILL":
      result.push(`w-full`);
      break;
  }
  switch (node.layoutSizingVertical) {
    case "FIXED":
      result.push(`h-[${node.height}]`);
      break;
    case "HUG":
      result.push(`h-fit`);
      break;
    case "FILL":
      result.push(`h-full`);
      break;
  }

  return result;
}
