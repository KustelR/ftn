import { toJSX_VectorNode } from "@/nodes";
import { generateDefs } from "@/properties/svg";
import generateTailwind from "@/utils/generateTailwind";

export default function toJSX_FrameNodeVectors(node: FrameNode): string {
  const classNames: TailwindProperties = new Map();
  classNames.set("relative", true);
  classNames.set("[&>*]:absolute", true);
  const defs: Set<SvgFill> = new Set();
  const children: string = node.children
    .map((child) => {
      return toJSX_VectorNode(child as VectorNode, {
        hasOuterSvg: true,
        fills: defs,
      });
    })
    .join("");
  return `<svg className="${generateTailwind(classNames)}" >${generateDefs(defs)}${children}</svg>`;
}
