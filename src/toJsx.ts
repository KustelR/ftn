import { toJSX_SceneNode } from "@/nodes";
import composeHtml from "@/utils/composeHtml";

export default function toJSX(
  node: BaseNode,
  config: Config,
): HtmlObject | null {
  if (node.type === "DOCUMENT") {
    throw new Error("NOT IMPLEMENTED");
    //return toJSX_DocumentNode(node as DocumentNode);
  } else if (node.type === "PAGE") {
    throw new Error("NOT IMPLEMENTED");
    //return [toJSX_PageNode(node as PageNode)];
  } else {
    return toJSX_SceneNode(node, config);
  }
}
