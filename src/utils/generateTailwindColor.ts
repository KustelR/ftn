import rgbToHex from "./rgbToHex";

export default function generate(
  color: RGB,
  alpha: number | undefined,
): string | null {
  if (alpha && alpha != 1) return `[${rgbToHex(color)}]/[${alpha}]`;
  else if (alpha === 0) return null;
  else return `[${rgbToHex(color)}]`;
}
