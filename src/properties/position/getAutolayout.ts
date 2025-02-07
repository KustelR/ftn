import { joinTailwindProperties } from "@/utils/changeTailwindProperties";
import getSize from "@/utils/getSize";

export default function getLayout(
  node: SceneNode,
  config: Config,
): TailwindProperties {
  let res: TailwindProperties = new Map();
  if (!("layoutMode" in node)) return res;
  res = joinTailwindProperties(res, getLayoutMode(node, config));

  switch (node.primaryAxisAlignItems) {
    case "MIN":
      res.set("justify", "start");
      break;
    case "MAX":
      res.set("justify", "end");
      break;
    case "SPACE_BETWEEN":
      res.set("justify", "stretch");
      break;
    case "CENTER":
      res.set("justify", "center");
      break;
  }

  switch (node.counterAxisAlignItems) {
    case "MIN":
      res.set("items", "start");
      break;
    case "MAX":
      res.set("items", "end");
      break;
    case "BASELINE":
      res.set("items", "stretch");
      break;
    case "CENTER":
      res.set("items", "center");
      break;
  }
  return res;
}

function getLayoutMode(node: SceneNode, config: Config): TailwindProperties {
  let res: TailwindProperties = new Map();
  if (!("layoutMode" in node)) return res;
  switch (node.layoutMode) {
    case "NONE":
      break;
    case "HORIZONTAL":
      res.set("flex", true);
      res.set("flex-row", true);
      res.set(
        "space-x",
        getSize(node.itemSpacing ? node.itemSpacing : 0, config, node, "X"),
      );
      break;
    case "VERTICAL":
      res.set("flex", true);
      res.set("flex-col", true);
      res.set(
        "space-y",
        getSize(node.itemSpacing ? node.itemSpacing : 0, config, node, "Y"),
      );
      break;
  }
  return res;
}
