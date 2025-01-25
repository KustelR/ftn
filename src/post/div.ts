type VectorPos = {
  x: number;
  y: number;
  width: number;
  height: number;
};

function getVectorPosition(node: HtmlObject): VectorPos {
  if (!node.props.class || Array.isArray(node.props.class))
    throw new Error(`Invalid node provided: ${node}`);

  const classes = node.props.class as TailwindProperties;
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

  return { x, y, width, height };
}

export default function postprocessDiv(node: HtmlObject): void {
  const isSvgOnly = !(
    node.children.filter((child) => {
      return !child || typeof child === "string" || child.tagName !== "svg";
    }).length > 0
  );

  if (!isSvgOnly) {
    return;
  }

  node.children.forEach((child) => {
    child = child as HtmlObject;
    child.destroyOnRender = true;

    const childPos = getVectorPosition(child);

    child.children.forEach((child2) => {
      child2 = child2 as HtmlObject;
      if (child2.tagName !== "path") return;

      if (child2.props.class) {
        const transform = `translate(${childPos.x},${childPos.y})`;
        if (Array.isArray(child2.props.class)) {
          child2.props.class.push(`transform="${transform}"`);
        } else {
          child2.props.class.set("transform", transform);
        }
      }
    });
  });
}
