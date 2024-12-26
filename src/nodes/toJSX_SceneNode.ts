import {
  toJSX_ShapeNode,
  toJSX_VectorNode,
  toJSX_TextNode,
  toJSX_GroupNode,
} from "@/nodes";
import toJSX_FrameNode from "@/nodes/toJSX_FrameNode";

export default function toJSX_SceneNode(node: SceneNode): string {
  switch (node.type) {
    case "FRAME":
      return toJSX_FrameNode(node);
    case "VECTOR":
      return toJSX_VectorNode(node);
    case "TEXT":
      return toJSX_TextNode(node);
    case "RECTANGLE":
      return toJSX_ShapeNode(node);
    case "RECTANGLE":
      return toJSX_ShapeNode(node);
    case "ELLIPSE":
      return toJSX_ShapeNode(node);
    case "GROUP":
      return toJSX_GroupNode(node);
    default:
      console.warn(`[WARNING!] Unsupported node type: ${node.type}`);
      return `<div className="${`w-[${node.width}] h-[${node.height}]`}">${`Unsupported node type: ${node.type}`}</div>`;
  }
}
