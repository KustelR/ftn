export default function generateTailwindString(
  properties: TailwindProperties,
): string {
  let result: Array<string> = [];

  properties.forEach((value, key) => {
    result.push(generateProperty(key, value));
  });

  return result.join(" ");
}

function isSize(obj: any): obj is Size {
  if (!obj.absolute && obj.absolute != 0) return false;
  if (!obj.relative && obj.relative != 0) return false;
  return true;
}

function generateProperty(key: string, value: TailwindType): string {
  const selector = key.match(`(\\[&.+\\]:)(.+)`);
  if (selector) {
    return selector[1] + generateProperty(selector[2], value);
  }
  if (typeof value === "boolean") {
    return `${key.match("[a-zA-Z\-]+")}`;
  }
  if (typeof value === "string") {
    return `${key.match("[a-zA-Z\-]+")}-${value}`;
  }
  if (isSize(value)) {
    return `${key.match("[a-zA-Z\-]+")}-[${value.absolute}px]`;
  }
  console.log(value, isSize(value));
  return ``;
}
