declare global {
  type Config = {
    outputType: OutputType;
    size: SizeSetting;
  };
  type ConfigKey = keyof Config;
  type OutputType = "jsx" | "html";
  type SizeSetting = {
    sizeRound: SizeRound;
    sizeType: SizeType;
  };
  type SizeSettingKey = keyof SizeSetting;
  type SizeRound = "none" | "round";
  type SizeType = "absolute" | "relative";
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
  type TailwindProperties = Map<string, TailwindType>;
  type TailwindType = string | Size | boolean;
  type Size = {
    absolute: number;
    relative: number;
  };
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
    absoluteBoundingBox: Rect | null;
    absoluteRenderBounds: Rect | null;
    x: number;
    y: number;
    relativeTransform: Transform;
    layoutSizingVertical?: "FIXED" | "HUG" | "FILL";
    layoutSizingHorizontal?: "FIXED" | "HUG" | "FILL";
    primaryAxisAlignItems?: "MIN" | "MAX" | "SPACE_BETWEEN" | "CENTER";
    counterAxisAlignItems?: "MIN" | "MAX" | "BASELINE" | "CENTER";
  };
  type SvgFill = {
    id: string;
    type?: "GRADIENT_LINEAR" | "IMAGE";
    stops?: Array<{
      offset: number;
      color: RGBA;
    }>;
    pattern?: {
      name: string;
      height: number;
      width: number;
    };
  };
  type TextedNode = {
    name: string;
    fontName: { family: string; style: string } | symbol;
    fontSize: number | symbol;
    fontWeight: number | symbol;
    textAlignHorizontal: "LEFT" | "CENTER" | "RIGHT" | "JUSTIFIED";
    textAlignVertical: "TOP" | "BOTTOM" | "CENTER";
  };
  type Props = {
    [key: string]: Prop;
  };
  type HtmlObject = {
    tagName: string;
    props: Props;
    children: Array<HtmlObject | string | null>;
    destroyOnRender?: boolean;
  };
  type Prop = Array<string> | TailwindProperties;
  type ToUiMessage = {
    type: "CODE" | "LAST_CODE" | "IMPORTS" | "CONFIG";
    data: string;
  };
  type SpacedNode = {
    parent: BaseNode | null;
    paddingTop: number;
    paddingBottom: number;
    paddingLeft: number;
    paddingRight: number;
  };
}
export {};
