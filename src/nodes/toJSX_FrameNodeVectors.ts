import { toJSX_VectorNode } from "@/nodes";
import { generateBorders, generateSpacing } from "@/properties";
import { generateDefs } from "@/properties/svg";
import generateTailwind from "@/utils/generateTailwind";

export default function toJSX_FrameNodeVectors(node: FrameNode): string {
  const className: Map<string, string> = new Map<string, string>();
  className.set("max-w", `[${node.width}]`);
  className.set("max-h", `[${node.height}]`);
  const defs: Set<SvgFill> = new Set();
  const children: string = node.children
    .map((child) => {
      return toJSX_VectorNode(child as VectorNode, {
        hasOuterSvg: true,
        fills: defs,
      });
    })
    .join("");
  return `<svg className="${generateTailwind(className)}" >${generateDefs(defs)}${children}</svg>`;
}
