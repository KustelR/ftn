import { joinTailwindProperties } from "@/utils/changeTailwindProperties";
import getSize from "@/utils/getSize";

export default function getLayout(
  node: SceneNode,
  config: Config,
): TailwindProperties {
  if (node.type !== "FRAME") {
    return new Map();
  }

  let res: TailwindProperties = new Map();

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

function getLayoutMode(node: FrameNode, config: Config): TailwindProperties {
  let res: TailwindProperties = new Map();
  switch (node.layoutMode) {
    case "NONE":
      res.set("relative", true);
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
