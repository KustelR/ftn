import { toJSX_VectorNode } from "@/nodes";
import generateTailwind from "@/utils/generateTailwind";

export default function toJSX_FrameNodeVectors(node: FrameNode): string {
  const classNames: TailwindProperties = new Map();
  classNames.set("relative", true);
  classNames.set("[&>*]:absolute", true);
  return `<svg className="${generateTailwind(classNames)}" >${node.children
    .map((child) => {
      return toJSX_VectorNode(child as VectorNode, { noSvg: true });
    })
    .join("")}</svg>`;
}
