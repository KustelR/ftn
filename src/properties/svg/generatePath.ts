import getSize from "@/utils/getSize";

export default function generatePath(
  path: VectorPath,
  node: VectorNode,
  props: Props,
  hasOuterSvg: boolean = false,
  config: Config,
): HtmlObject {
  props["d"] = [joinMoves(splitPath(path.data, config))];
  if (hasOuterSvg) {
    props["transform"] = [
      `translate(${node.relativeTransform[0][2]},${node.relativeTransform[1][2]})`,
    ];
  }
  return {
    tagName: "path",
    props: props,
    children: [],
  };
}

type PathMove = {
  action: "M" | "Q" | "C" | "L" | "Z";
  points: Array<Size>;
};

export function splitPath(path: string, config: Config): Array<PathMove> {
  let moves: Array<PathMove> = [];

  const parsedPath = path.match(/[MQCLZ](?:\ {0,1}\-{0,1}[0-9]+\.*[0-9]*)*/gm);
  if (!parsedPath) return [];

  return parsedPath.map((action) => {
    const points = action.match(/([0-9]+\.*[0-9]*)/gm);
    const actionName = action[0];
    if (
      actionName !== "M" &&
      actionName !== "Q" &&
      actionName !== "C" &&
      actionName !== "L" &&
      actionName !== "Z"
    ) {
      throw new VectorPathsError("Unintelligeable path: " + path, {
        cause: path,
      });
    }
    if (!points) return { action: actionName, points: [] };
    return {
      action: actionName,
      points: points.map((point) => getSize(Number(point), config)),
    };
  });
}

export function joinMoves(moves: Array<PathMove>) {
  return moves
    .map((move) => {
      if (move.points.length === 0) return [move.action];
      return `${move.action} ${move.points.map((point) => point.absolute).join(" ")}`;
    })
    .join(" ");
}
