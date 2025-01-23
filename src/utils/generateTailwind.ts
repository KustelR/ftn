export default function generateTailwindString(
  properties: TailwindProperties,
  config: Config,
): string {
  let result: Array<string> = [];

  properties.forEach((value, key) => {
    result.push(generateProperty(key, value, config));
  });

  return result.join(" ");
}

function isSize(obj: any): obj is Size {
  if (!obj) return false;
  if (!obj.absolute && obj.absolute != 0) return false;
  if (!obj.relative && obj.relative != 0) return false;
  return true;
}

function generateProperty(
  key: string,
  value: TailwindType,
  config: Config,
): string {
  const selector = key.match(`(\\[&.+\\]:)(.+)`);
  if (selector) {
    return selector[1] + generateProperty(selector[2], value, config);
  }
  if (typeof value === "boolean") {
    return `${key.match("[a-zA-Z\-]+")}`;
  }
  if (typeof value === "string") {
    return `${key.match("[a-zA-Z\-]+")}-${value}`;
  }
  if (isSize(value)) {
    if (config.size.sizeType === "absolute")
      return `${key.match("[a-zA-Z\-]+")}-[${value.absolute}px]`;
    if (config.size.sizeType === "relative")
      if (value.relative >= 1) {
        console.warn(
          `relative size is bigger or equal to 1, using absolute size for: ${key}`,
        );
        return `${key.match("[a-zA-Z\-]+")}-[${value.absolute}px]`;
      }
    if (value.relative <= 0) {
      console.warn(
        `relative size is less or equal to 0, using absolute size for: ${key}`,
      );
      return `${key.match("[a-zA-Z\-]+")}-[${value.absolute}${value.dropValue ? "px" : ""}]`;
    }
    return `${key.match("[a-zA-Z\-]+")}-[${value.relative * 100}%]`;
  }
  return ``;
}
