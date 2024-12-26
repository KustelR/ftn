export default function generateTailwindString(
  properties: TailwindProperties,
): string {
  let result: Array<string> = [];

  properties.forEach((value, key) => {
    let item: string;
    if (typeof value === "boolean" && value) {
      result.push(`${key.match("[a-zA-Z\-]+")}`);
    } else {
      result.push(`${key.match("[a-zA-Z\-]+")}-${value}`);
    }
  });

  return result.join(" ");
}
