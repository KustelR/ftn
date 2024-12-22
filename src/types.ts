export type ColoredNode = RectangleNode | EllipseNode;
export type SizedNode = RectangleNode | EllipseNode | FrameNode;
export type LayoutNode = FrameNode;

export type Padding = {
  top: number;
  bootom: number;
  left: number;
  right: number;
};
export type Layout = {
  sizingHorizontal: "FIXED" | "HUG" | "FILL";
  sizingVertical: "FIXED" | "HUG" | "FILL";
  layoutMode?: "NONE" | "HORIZONTAL" | "VERTICAL";
};

type vertice = {
  x: number;
  y: number;
};
export type VectorData = {
  paths: Array<VectorPath>;
};
export type bgData = {
  fills: Array<Paint>;
};
