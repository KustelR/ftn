export default function generateTailwindString(
  properties: TailwindProperties,
): string {
  let result: Array<string> = [];

  properties.forEach((value, key) => {
    console.log(key, value);
    result.push(`${key.match("[a-zA-Z\-]+")}-${value}`);
  });

  return result.join(" ");
}
