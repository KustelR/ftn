export default function rgbToHex(color: {
  r: number;
  g: number;
  b: number;
}): string {
  return `#${colorToHex(color.r)}${colorToHex(color.g)}${colorToHex(color.b)}`;
}

function colorToHex(c: number) {
  const cHex = Math.ceil(Math.min(c, 1) * 255).toString(16);
  return cHex.length >= 2 ? cHex : "0" + cHex;
}
