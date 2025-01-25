import { joinMoves, splitPath } from "@/properties/svg/generatePath";
import { joinTailwindProperties } from "@/utils/changeTailwindProperties";
import composeHtml from "@/utils/composeHtml";
import postprocessDiv from "./div";

export default function postProcess(
  node: HtmlObject | string | null,
  config: Config,
): void {
  if (typeof node === "string") return;
  if (!node) return;
  processNode(node, config);
  node.children.forEach((child) => postProcess(child, config));
}

function processNode(node: HtmlObject, config: Config): void {
  if (node.tagName === "div") {
    postprocessDiv(node);
  }
  /*
  const svgs: Array<HtmlObject> = [];
  const svgPositions: Array<number> = [];
  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];
    if (!child || typeof child === "string") continue;
    
    if (child.tagName === "svg") {
      svgs.push(child);
      svgPositions.push(i);
    }
  }
  let newChildren = Array<HtmlObject>();
  let joined: HtmlObject | undefined = undefined;
  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];
    if (!child || typeof child === "string") continue;
    
    if (child.tagName === "svg") {
      console.log("start", joined);
      if (!joined) {
        joined = child;
      } else if (
        checkOverlap(
          getVectorPositions([joined])[0],
          getVectorPositions([child])[0],
        )
      ) {
        joined = joinVectors(joined, child, config);
      } else {
        newChildren.push(joined);
        joined = undefined;
      }
      console.log(joined, newChildren);
      continue;
    }
    if (joined) {
      newChildren.push(joined);
      joined = undefined;
    }
    newChildren.push(child);
  }
  if (joined) {
    newChildren.push(joined);
    joined = undefined;
  }
  node.children = newChildren;
  */
}
/*
function getVectorPositions(children: Array<HtmlObject>): Array<VectorPos> {
  const vectorPositions: Array<VectorPos> = [];
  children.forEach((child) => {
    if (!child.props.class || Array.isArray(child.props.class)) return;

    const classes = child.props.class as TailwindProperties;
    const position: {
      x: Size | undefined;
      y: Size | undefined;
      width: Size | undefined;
      height: Size | undefined;
    } = {
      x: classes.get("left") as Size | undefined,
      y: classes.get("top") as Size | undefined,
      width: classes.get("w") as Size | undefined,
      height: classes.get("h") as Size | undefined,
    };
    const x = position.x ? position.x.absolute : 0;
    const y = position.y ? position.y.absolute : 0;
    const width = position.width ? position.width.absolute : 0;
    const height = position.height ? position.height.absolute : 0;

    vectorPositions.push({ x, y, width, height });
  });
  return vectorPositions;
}

function checkOverlap(pos1: VectorPos, pos2: VectorPos): boolean {
  return (
    pos1.x + pos1.width > pos2.x &&
    pos2.x + pos2.width > pos1.x &&
    pos1.y + pos1.height > pos2.y &&
    pos2.y + pos2.height > pos1.y
  );
}

function joinVectors(
  node1: HtmlObject,
  node2: HtmlObject,
  config: Config,
): HtmlObject {
  const n1Classes = node1.props.class;
  const n2Classes = node2.props.class;
  const newClasses: TailwindProperties = new Map();
  if (
    Array.isArray(n1Classes) ||
    Array.isArray(n2Classes) ||
    !n1Classes ||
    !n2Classes
  ) {
    throw new Error(
      `${n1Classes} or ${n2Classes} are wrong type. Only TailwindProperties are supported`,
    );
  }
  if (!n1Classes.get("absolute") !== !n2Classes.get("absolute")) {
    throw new Error("Both vectors must be absolute or relative to join", {
      cause: [node1, node2],
    });
  }

  let x: Size;
  let y: Size;
  let width: Size;
  let height: Size;

  const n1Left = n1Classes.get("left")
    ? (n1Classes.get("left") as Size).absolute
    : 0;
  const n2Left = n2Classes.get("left")
    ? (n2Classes.get("left") as Size).absolute
    : 0;
  const n1Top = n1Classes.get("top")
    ? (n1Classes.get("top") as Size).absolute
    : 0;
  const n2Top = n2Classes.get("top")
    ? (n2Classes.get("top") as Size).absolute
    : 0;

  if (n1Left <= n2Left) {
    x = { absolute: n1Left, relative: 0 };
  } else {
    x = { absolute: n2Left, relative: 0 };
  }
  if (n1Top <= n2Top) {
    y = { absolute: n1Top, relative: 0 };
  } else {
    y = { absolute: n2Top, relative: 0 };
  }
  newClasses.set("left", x);
  newClasses.set("top", y);
  if (
    (n1Classes.get("w") as Size).absolute >
    (n2Classes.get("w") as Size).absolute
  )
    width = {
      absolute:
        (n1Classes.get("w") as Size).absolute +
        Math.max(
          0,
          (n2Classes.get("w") as Size).absolute +
            n2Left -
            (n1Classes.get("w") as Size).absolute,
        ),
      relative: 0,
    };
  else {
    width = {
      absolute:
        (n2Classes.get("w") as Size).absolute +
        Math.max(
          0,
          (n2Classes.get("w") as Size).absolute +
            n1Left -
            (n2Classes.get("w") as Size).absolute,
        ),
      relative: 0,
    };
  }
  if (
    (n1Classes.get("h") as Size).absolute <=
    (n2Classes.get("h") as Size).absolute
  ) {
    height = n1Classes.get("h") as Size;
  } else {
    height = n2Classes.get("h") as Size;
  }

  newClasses.set("w", width);
  newClasses.set("h", height);

  n1Classes.forEach((value, key) => {
    if (value === n2Classes.get(key)) {
      newClasses.set(key, value);
    }
  });

  node1.children.forEach((child) => {
    if (!child || typeof child === "string") {
      throw new UnsupportedNodeTypeError(
        "Invalid node type provided to svg postprocessor",
      );
    }
    offsetNode(child, n1Classes, x, y);
  });
  node2.children.forEach((child) => {
    if (!child || typeof child === "string") {
      throw new UnsupportedNodeTypeError(
        "Invalid node type provided to svg postprocessor",
      );
    }
    offsetNode(child, n2Classes, x, y);
  });

  return {
    tagName: "svg",
    props: {
      class: newClasses,
    },
    children: [...node1.children, ...node2.children],
  };
}
/*
function findAndJoin(
  originalNodes: Array<HtmlObject>,
  config: Config,
  result: Array<HtmlObject> = [],
): Array<HtmlObject> {
  const nodes = originalNodes.map((x) => x);
  if (nodes.length == 0) {
    return result;
  }

  const findResult = findAndJoinRec(nodes, config);
  if (findResult.nodes.length >= 1) {
    result = [...result, ...findResult.nodes];
    if (findResult.joined) result.push(findResult.joined);
    return result;
  }
  if (!findResult.joined) {
    result.push(findResult.nodes[0]);
    return findAndJoin(findResult.nodes.slice(1), config, result);
  } else {
    return findAndJoin(
      [findResult.joined, ...findResult.nodes],
      config,
      result,
    );
  }
}

function findAndJoinRec(
  nodes: Array<HtmlObject>,
  config: Config,
): { joined: undefined | HtmlObject; nodes: Array<HtmlObject> } {
  const blacklist: Array<number> = [];
  const positions = getVectorPositions(nodes);
  let joining: HtmlObject | undefined;
  for (let j = 1; j < nodes.length; j++) {
    //console.log((nodes[j].props.class as TailwindProperties).get("left"));
    if (checkOverlap(positions[0], positions[j])) {
      joining = joinVectors(nodes[0], nodes[j], config);
      blacklist.push(j);
      blacklist.push(0);
      break;
    }
  }
  let newNodes: Array<HtmlObject> = [];
  for (let i = 0; i < nodes.length; i++) {
    if (!blacklist.includes(i)) newNodes.push(nodes[i]);
  }
  return { joined: joining, nodes: newNodes };
}

function offsetNode(
  node: HtmlObject,
  nodeClasses: TailwindProperties,
  x: Size,
  y: Size,
) {
  if (!x || !y) return;
  const offsetLeftOld = nodeClasses.get("left")
    ? (nodeClasses.get("left") as Size)
    : { absolute: 0, relative: 0 };
  const offsetTopOld = nodeClasses.get("top")
    ? (nodeClasses.get("top") as Size)
    : { absolute: 0, relative: 0 };
  const offsetLeft = offsetLeftOld.absolute - x.absolute;
  const offsetTop = offsetTopOld.absolute - y.absolute;

  node.props.transform = [`translate(${offsetLeft}, ${offsetTop})`];
}
*/
