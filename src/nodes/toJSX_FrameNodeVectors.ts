import { toJSX_VectorNode } from "@/nodes";
import { generateDefs } from "@/properties/svg";

export default function toJSX_FrameNodeVectors(
  node: FrameNode,
  config: Config,
): HtmlObject {
  const className: Map<string, string> = new Map<string, string>();
  className.set("max-w", `[${node.width}]`);
  className.set("max-h", `[${node.height}]`);
  const defs: Set<SvgFill> = new Set();
  const children: Array<HtmlObject> = node.children.map((child) => {
    return toJSX_VectorNode(child as VectorNode, config, {
      hasOuterSvg: true,
      fills: defs,
    });
  });
  return {
    tagName: "svg",
    props: {
      class: className,
    },
    children: [...children, generateDefs(defs, config)],
  };
}
