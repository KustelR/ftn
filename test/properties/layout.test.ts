import { describe, test, expect } from "@jest/globals";
import { generateLayout } from "@/properties/index";

const node: Layouted = {
  type: "literal fake",
  parent: null,
  height: 100,
  width: 200,
  x: 0,
  y: 0,
  layoutMode: "NONE",
  relativeTransform: [
    [1, 0, 0],
    [0, 1, 0],
  ],
};

describe("generateLayout()", () => {
  test("should generate w-full because there is no parent node", () => {
    expect(
      generateLayout(node, { outputType: "html", size: "original" }).get("w"),
    ).toEqual("full");
  });
});
