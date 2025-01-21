
/**
 * @throws {UnsupportedNodeTypeError} if provided node type is not supported by api
 */
import {
  toJSX_ShapeNode,
  toJSX_VectorNode,
  toJSX_TextNode,
  toJSX_GroupNode,
  toJSX_ComponentNode,
  toJSX_SectionNode,
} from "@/nodes";
import toJSX_FrameNode from "@/nodes/toJSX_FrameNode";
import { getBlendMode, getRotation } from "@/properties";
import getSize from "@/utils/getSize";
import { addTailwindProperties } from "@/utils/changeTailwindProperties";
import {
  BlendModeBlacklist,
  TextColorWhitelist,
  BackgroundColorBlacklist,
} from "./parserLists";
import { generateBgColor as getBgColor } from "@/properties";
/**
 * @throws {UnsupportedNodeTypeError} if provided node type is not supported by api
 */
export default function toJSX_SceneNode(
  node: SceneNode,
  config: Config,
): HtmlObject {
  let parsedNode: HtmlObject;
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
      throw new UnsupportedNodeTypeError(`Unknown node type: ${node.type}`)
      /*
      console.warn(`[WARNING!] Unsupported node type: ${node.type}`);
      parsedNode = {
        tagName: "div",
        props: {},
        children: [],
      };
      parsedNode.props.class = new Map();
      parsedNode.props.class.set(
        "w",
        getSize(node.width, config, node.parent, "X"),
      );
      parsedNode.props.class.set(
        "h",
        getSize(node.width, config, node.parent, "Y"),
      );
      */
  }

  addTailwindProperties(parsedNode, getRotation(node));
  addTailwindProperties(parsedNode, getBlendMode(node, BlendModeBlacklist));
  addTailwindProperties(parsedNode, getBgColor(node, BackgroundColorBlacklist));
  return parsedNode;
}
