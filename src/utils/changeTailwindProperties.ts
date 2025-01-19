export function joinTailwindProperties(
  val1: TailwindProperties,
  val2: TailwindProperties,
): TailwindProperties {
  return new Map([...val1, ...val2]);
}

function addTailwindPropertiesSingle(
  node: HtmlObject,
  props: TailwindProperties,
): HtmlObject {
  if (node.props["class"]) {
    const classes = node.props["class"] as TailwindProperties;
    node.props["class"] = joinTailwindProperties(classes, props);
  } else {
    node.props["class"] = props;
  }

  return node;
}
/**
 * Adds provided properties to an object and returns it
 */
export function addTailwindProperties(
  node: HtmlObject,
  props: TailwindProperties | Array<TailwindProperties>,
): HtmlObject {
  if (Array.isArray(props)) {
    props.forEach((prop) => {
      node = addTailwindPropertiesSingle(node, prop);
    });
  } else {
    node = addTailwindPropertiesSingle(node, props);
  }

  return node;
}
