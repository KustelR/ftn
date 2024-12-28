export {};
declare global {
  type BorderedNode = {
    name: string;
    width?: number;
    height?: number;
    cornerRadius?: number | symbol;
    topLeftRadius?: number;
    topRightRadius?: number;
    bottomLeftRadius?: number;
    bottomRightRadius?: number;
    strokeWeight: number | symbol;
    strokeRightWeight?: number;
    strokeLeftWeight?: number;
    strokeTopWeight?: number;
    strokeBottomWeight?: number;
    strokeALign?: "CENTER" | "INSIDE" | "OUTSIDE";
    strokeCap?:
      | "NONE"
      | "ROUND"
      | "SQUARE"
      | "ARROW_LINES"
      | "ARROW_EQUILATERAL"
      | symbol;
  };
  type TailwindProperties = Map<string, string | number | boolean>;
  type ResultObject = {
    tagName: string;
    otherTags: Map<string, string>;
    className: TailwindProperties;
    children: Array<ResultObject>;
  };
  type LayoutMode = "NONE" | "HORIZONTAL" | "VERTICAL" | "FIXED";
  type Layouted = {
    type: string;
    parent: BaseNode | null;
    height: number;
    maxHeight?: number | null | undefined;
    minHeight?: number | null | undefined;
    width: number;
    maxWidth?: number | null | undefined;
    minWidth?: number | null | undefined;
    layoutMode?: LayoutMode;
    itemSpacing?: number;
    x: number;
    y: number;
    absoluteRenderBounds: Rect | null;
    relativeTransform: Transform;
    layoutSizingVertical?: "FIXED" | "HUG" | "FILL";
    layoutSizingHorizontal?: "FIXED" | "HUG" | "FILL";
    primaryAxisAlignItems?: "MIN" | "MAX" | "SPACE_BETWEEN" | "CENTER";
    counterAxisAlignItems?: "MIN" | "MAX" | "BASELINE" | "CENTER";
  };
}
