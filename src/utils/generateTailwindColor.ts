import rgbToHex from "./rgbToHex";

export default function generate(
  color: RGB,
  alpha: number | undefined,
): string {
  if (alpha && alpha != 1 && alpha > 0)
    return `[${rgbToHex(color)}]/[${alpha}]`;
  else return `[${rgbToHex(color)}]`;
}
