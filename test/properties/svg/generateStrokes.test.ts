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

const defs: Set<SvgFill> = new Set();

describe("generateStrokes()", () => {
  test("should generate correct stroke properties", () => {
    expect(
      generateStrokes(
        nodeWithNormalStroke as unknown as VectorNode,
        {
          outputType: "html",
        },
        defs,
      ),
    ).toEqual({
      "stroke-opacity": ["0.9"],
      stroke: ["#800080"],
      "stroke-linecap": ["round"],
      "stroke-linejoin": ["miter"],
      "stroke-width": ["1px"],
    });
  });
});
