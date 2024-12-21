export type ColoredNode = RectangleNode | EllipseNode;
export type SizedNode = RectangleNode | EllipseNode;

export type Padding = {
  top: number;
  bootom: number;
  left: number;
  right: number;
};
export type Layout = {
  sizingHorizontal: "FIXED" | "HUG" | "FILL";
  sizingVertical: "FIXED" | "HUG" | "FILL";
};
export type bgData = {
  fills: Array<Paint>;
};
