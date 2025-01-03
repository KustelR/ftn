import rgbToHex from "@/utils/rgbToHex";
import { describe, expect, test } from "@jest/globals";

describe("rgb to hex conversion", () => {
  test("converts RGB to HEX", () => {
    expect(rgbToHex({ r: 1, g: 0, b: 0 })).toBe("#ff0000");
  });

  test("handles RGB values more than 1", () => {
    expect(rgbToHex({ r: 256, g: 0, b: 0 })).toBe("#ff0000");
    expect(rgbToHex({ r: 0, g: 256, b: 0 })).toBe("#00ff00");
    expect(rgbToHex({ r: 0, g: 0, b: 256 })).toBe("#0000ff");
  });
});
