import { ShapeNode } from "./toJSX_ShapeNode";

export default function toJSX_ShapeImageNode(node: ShapeNode): string {
  const classNames: Array<string> = [];
  const otherTags: Array<string> = [];

  const tagName = "Image";

  if (node.type === "ELLIPSE") {
    classNames.push(`rounded-full`);
  }

  otherTags.push(
    `width="${node.absoluteRenderBounds?.width}"`,
    `height="${node.absoluteRenderBounds?.height}"`,
    `src="SRC HERE"`,
    `alt="${node.name}"`,
  );
  classNames.push(
    `object-center`,
    // @ts-expect-error This is literally reason why it is an Image Node...
    `opacity-[${node.fills[0].opacity}]`,
    // @ts-expect-error This is literally reason why it is an Image Node...
    generateBgColor({ name: node.name, fills: [...node.fills] }).join(" "),
  );

  return `<${tagName} className="${classNames.join(" ")}" ${otherTags.join(" ")}></${tagName}>`;
}
