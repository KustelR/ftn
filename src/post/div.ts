type VectorPos = {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
};

function getVectorPosition(node: HtmlObject): VectorPos {
  if (!node.props.class || Array.isArray(node.props.class))
    throw new Error(`Invalid node provided: ${node}`);

  const classes = node.props.class as TailwindProperties;
  let rotation = 0;
  const rotationClass = classes.get("rotate");
  if (rotationClass) {
    if (typeof rotationClass === "string") {
      const matched = rotationClass.match(/([0-9]+)/);
      if (matched) {
        rotation = Number(matched[0]);
      }
    }
  }
  const position: {
    x: Size | undefined;
    y: Size | undefined;
    width: Size | undefined;
    height: Size | undefined;
    rotation: number;
  } = {
    x: classes.get("left") as Size | undefined,
    y: classes.get("top") as Size | undefined,
    width: classes.get("w") as Size | undefined,
    height: classes.get("h") as Size | undefined,
    rotation: rotation,
  };
  const x = position.x ? position.x.absolute : 0;
  const y = position.y ? position.y.absolute : 0;
  const width = position.width ? position.width.absolute : 0;
  const height = position.height ? position.height.absolute : 0;

  return { x, y, width, height, rotation };
}

export default function postprocessDiv(node: HtmlObject): void {
  let isSvgOnly = false;
  const filtered = node.children.filter((child) => {
    return !child || typeof child === "string" || child.tagName !== "svg";
  });

  if (filtered.length === 0 && node.children.length !== 0) {
    isSvgOnly = true;
  }

  if (isSvgOnly) joinSvg(node);
}

function joinSvg(node: HtmlObject) {
  node.tagName = "svg";

  node.children.forEach((child) => {
    child = child as HtmlObject;

    child.destroyOnRender = true;

    const childPos = getVectorPosition(child);
    const childClasses = child.props.class as TailwindProperties;
    child.children.forEach((child2) => {
      child2 = child2 as HtmlObject;
      if (child2.tagName !== "path") return;
      let transform = [`translate(${childPos.x},${childPos.y})`];
      if (childPos.rotation !== 0) {
        transform.push(`rotate(${childPos.rotation})`);
      }
      child2.props.transform = transform;
    });
  });
}
