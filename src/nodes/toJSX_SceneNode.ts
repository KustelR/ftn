import {
  toJSX_ShapeNode,
  toJSX_VectorNode,
  toJSX_TextNode,
  toJSX_GroupNode,
} from "@/nodes";
import toJSX_FrameNode from "@/nodes/toJSX_FrameNode";
import { getClassName } from "@/utils/config";

export default function toJSX_SceneNode(
  node: SceneNode,
  config: Config,
): HtmlObject {
  switch (node.type) {
    case "FRAME":
      return toJSX_FrameNode(node, config);
    case "VECTOR":
      return toJSX_VectorNode(node, config);
    case "TEXT":
      return toJSX_TextNode(node, config);
    case "RECTANGLE":
      return toJSX_ShapeNode(node, config);
    case "RECTANGLE":
      return toJSX_ShapeNode(node, config);
    case "ELLIPSE":
      return toJSX_ShapeNode(node, config);
    case "GROUP":
      return toJSX_GroupNode(node, config);
    default:
      console.warn(`[WARNING!] Unsupported node type: ${node.type}`);
      //return `<div className="${`w-[${node.width}] h-[${node.height}]`}">${`Unsupported node type: ${node.type}`}</div>`;
      return {
        tagName: "div",
        props: [
          {
            name: getClassName(config),
            data: [`w-[${node.width}] h-[${node.height}]`],
          },
        ],
        children: [],
      };
  }
}
