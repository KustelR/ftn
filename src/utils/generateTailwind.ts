export default function generateTailwindString(
  properties: TailwindProperties,
): string {
  let result: Array<string> = [];

  properties.forEach((value, key) => {
    result.push(generateProperty(key, value));
  });

  return result.join(" ");
}

function generateProperty(
  key: string,
  value: string | number | boolean,
): string {
  const selector = key.match(`(\\[&.+\\]:)(.+)`);
  if (selector) {
    return selector[1] + generateProperty(selector[2], value);
  }
  if (typeof value === "boolean" && value) {
    return `${key.match("[a-zA-Z\-]+")}`;
  }
  return `${key.match("[a-zA-Z\-]+")}-${value}`;
}
