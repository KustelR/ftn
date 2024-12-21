export default function rgbToHex(color: { r: number; g: number; b: number }) {
  function colorToHex(c: number) {
    const cHex = Math.ceil(c * 255).toString(16);
    return cHex.length !== 1 ? cHex : "0" + cHex;
  }
  return `#${colorToHex(color.r)}${colorToHex(color.g)}${colorToHex(color.b)}`;
}
