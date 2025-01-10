import toJSX_FrameNode from "./toJSX_FrameNode";

export default function toJSX_ComponentNode(
  node: ComponentNode,
  config: Config,
): HtmlObject {
  console.warn("Converting component to frame...");
  return toJSX_FrameNode(node as unknown as FrameNode, config);
}
