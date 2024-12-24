import { default as toJSX } from "@/toJsx";

export default function toJSX_GroupNode(node: GroupNode): string {
  const children = node.children.map((child) => toJSX(child));
  return `<div className="w-[${node.width}] h-[${node.height}] relative [&>*]:absolute">${children.join("")}</div>`;
}
