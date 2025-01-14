import {
  toJSX_ShapeNode,
  toJSX_VectorNode,
  toJSX_TextNode,
  toJSX_GroupNode,
  toJSX_ComponentNode,
  toJSX_SectionNode,
} from "@/nodes";
import toJSX_FrameNode from "@/nodes/toJSX_FrameNode";
import { getPropName } from "@/utils/config";

export default function toJSX_SceneNode(
  node: SceneNode,
  config: Config,
): HtmlObject {
  let parsedNode: HtmlObject;
  let nodeClasses: TailwindProperties = new Map();
  switch (node.type) {
    case "FRAME":
      parsedNode = toJSX_FrameNode(node, config);
      break;
    case "VECTOR":
      parsedNode = toJSX_VectorNode(node, config);
      break;
    case "TEXT":
      parsedNode = toJSX_TextNode(node, config);
      break;
    case "RECTANGLE":
      parsedNode = toJSX_ShapeNode(node, config);
      break;
    case "RECTANGLE":
      parsedNode = toJSX_ShapeNode(node, config);
      break;
    case "ELLIPSE":
      parsedNode = toJSX_ShapeNode(node, config);
      break;
    case "GROUP":
      parsedNode = toJSX_GroupNode(node, config);
      break;
    case "COMPONENT":
      parsedNode = toJSX_ComponentNode(node, config);
      break;
    case "SECTION":
      parsedNode = toJSX_SectionNode(node, config);
      break;
    default:
      console.warn(`[WARNING!] Unsupported node type: ${node.type}`);
      //parsedNode = `<div className="${`w-[${node.width}] h-[${node.height}]`}">${`Unsupported node type: ${node.type}`}</div>`;
      parsedNode = {
        tagName: "div",
        props: {
          class: [`w-[${node.width}] h-[${node.height}]`],
        },
        children: [],
      };
  }
  if (
    node.type !== "STICKY" &&
    node.type !== "CODE_BLOCK" &&
    node.type !== "WIDGET" &&
    node.type !== "EMBED" &&
    node.type !== "LINK_UNFURL" &&
    node.type !== "MEDIA" &&
    node.type !== "SECTION" &&
    node.type !== "TABLE"
  )
    nodeClasses.set("rotate", `[${-node.rotation}deg]`);
  console.log(parsedNode);
  if (parsedNode.props["class"]) {
    const classes = parsedNode.props["class"] as TailwindProperties;
    parsedNode.props["class"] = new Map([...classes, ...nodeClasses]);
  }
  return parsedNode;
}
