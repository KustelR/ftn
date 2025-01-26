import {
  toJSX_ShapeNode,
  toJSX_VectorNode,
  toJSX_TextNode,
  toJSX_GroupNode,
  toJSX_ComponentNode,
  toJSX_SectionNode,
} from "@/nodes";
import toJSX_FrameNode from "@/nodes/toJSX_FrameNode";
import {
  getBlendMode,
  getRotation,
  getAutolayout,
  getAbsolutePosition,
  getNodeSize,
} from "@/properties";
import { addTailwindProperties } from "@/utils/changeTailwindProperties";
import { BlendModeBlacklist, BackgroundColorBlacklist } from "./parserLists";
import { generateBgColor as getBgColor } from "@/properties";
import postProcess from "@/post";
import getSize from "@/utils/getSize";
import { UnsupportedNodeTypeError } from "@/types/errors";
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
      let env: string;
      // #!if env === "dev"
      env = "dev";
      // #!elseif env === "prod"
      env = "prod";
      // #!endif
      if (env === "dev") {
        throw new UnsupportedNodeTypeError(`Unknown node type: ${node.type}`, {
          cause: node,
        });
      } else {
        parsedNode = {
          tagName: "div",
          props: {},
          children: [`unknown node: ${node.type}`],
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
      }
  }

  addTailwindProperties(parsedNode, getRotation(node));
  addTailwindProperties(parsedNode, getBlendMode(node, BlendModeBlacklist));
  addTailwindProperties(parsedNode, getBgColor(node, BackgroundColorBlacklist));
  if (node.type === "FRAME") {
    addTailwindProperties(parsedNode, getAutolayout(node, config));
  }
  if (
    node.parent &&
    ((node.parent.type === "FRAME" && node.parent.layoutMode === "NONE") ||
      node.parent.type !== "FRAME")
  ) {
    addTailwindProperties(parsedNode, getAbsolutePosition(node, config));
  }
  addTailwindProperties(parsedNode, getNodeSize(node, config));

  //postProcess(parsedNode, config);

  return parsedNode;
}
