import { describe, test, expect } from "@jest/globals";
import { generateStrokes } from "@/properties/svg";

const nodeWithNormalStroke = {
  strokes: [
    {
      type: "SOLID",
      color: { r: 0.5, g: 0, b: 0.5 },
      opacity: 0.9,
    },
  ],
  strokeCap: "ROUND",
  strokeJoin: "MITER",
  strokeWeight: 1,
};

describe("generateStrokes()", () => {
  test("should generate correct stroke properties", () => {
    expect(
      generateStrokes(nodeWithNormalStroke as unknown as VectorNode, {
        outputType: "html",
      }),
    ).toEqual([
      { name: "stroke", data: ["#800080"] },
      { name: "stroke-opacity", data: ["0.9"] },
      { name: "stroke-linecap", data: ["round"] },
      { name: "stroke-linejoin", data: ["miter"] },
      { name: "stroke-width", data: ["1px"] },
    ]);
  });
});
