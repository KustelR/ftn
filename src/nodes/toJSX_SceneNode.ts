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
  generateBorders,
} from "@/properties";
import { addTailwindProperties } from "@/utils/changeTailwindProperties";
import { generateBgColor as getBgColor } from "@/properties";
import { generateSpacing as getSpacing } from "@/properties";
import postProcess from "@/post";
import getSize from "@/utils/getSize";
import { UnsupportedNodeTypeError } from "@/types/errors";
import { handlePluginError } from "@/utils/handlePluginError";
import { getPlugin } from "@/utils/getPlugin";
/**
 * @throws {UnsupportedNodeTypeError} if provided node type is not supported by api
 */
export default function toJSX_SceneNode(
  node: SceneNode,
  config: Config,
): HtmlObject {
  let parsedNode: HtmlObject = {
    tagName: "div",
    props: {},
    children: [],
  };
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
      // #!if env === "dev"
      handleUnknownNode(node, config);
      // #!else
      try {
        handleUnknownNode(node, config);
      } catch (e) {
        if (e instanceof UnsupportedNodeTypeError) {
          parsedNode = e.placeholder;
        } else {
          throw e;
        }
      }
    // #!endif
  }
  handlePluginError(node, pixso);
  runGenMulti(
    parsedNode,
    node,
    config,
    getRotation,
    getBlendMode,
    getBgColor,
    getAutolayout,
    getAbsolutePosition,
    getNodeSize,
    getSpacing,
    generateBorders,
  );
  postProcess(parsedNode, config);

  return parsedNode;
}

function runGenMulti(
  parsedNode: HtmlObject,
  node: SceneNode,
  config: Config,
  ...funcs: Array<(node: SceneNode, config: Config) => TailwindProperties>
): void {
  funcs.forEach((func) => {
    runGen(func, parsedNode, node, config);
  });
}
function runGen(
  func: (node: SceneNode, config: Config) => TailwindProperties,
  parsedNode: HtmlObject,
  node: SceneNode,
  config: Config,
): void {
  try {
    addTailwindProperties(parsedNode, func(node, config));
  } catch (e) {
    handlePluginError(e, getPlugin());
  }
}

function handleUnknownNode(node: SceneNode, config: Config) {
  const placeholder = {
    tagName: "div",
    props: { class: new Map() },
    children: [`unknown node: ${node.type}`],
  };
  placeholder.props.class = new Map();
  placeholder.props.class.set(
    "w",
    getSize(node.width, config, node.parent, "X"),
  );
  placeholder.props.class.set(
    "h",
    getSize(node.width, config, node.parent, "Y"),
  );
  throw new UnsupportedNodeTypeError(
    `Unknown node type: ${node.type}`,
    {
      cause: node,
    },
    placeholder,
  );
}
