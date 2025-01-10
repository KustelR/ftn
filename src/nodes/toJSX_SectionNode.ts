import toJSX_FrameNode from "./toJSX_FrameNode";

export default function toJSX_ComponentNode(
  node: SectionNode,
  config: Config,
): HtmlObject {
  console.warn("Converting section to frame...");
  return toJSX_FrameNode(node as unknown as FrameNode, config);
}
