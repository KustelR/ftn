import { describe, test, expect } from "@jest/globals";
import { generateLayout } from "@/properties/index";
import { generateConfig } from "@/utils/config";

const node: Layouted = {
  type: "literal fake",
  parent: null,
  height: 100,
  width: 200,
  x: 0,
  y: 0,
  absoluteBoundingBox: {
    x: 0,
    y: 0,
    width: 200,
    height: 100,
  },
  absoluteRenderBounds: {
    x: 0,
    y: 0,
    width: 200,
    height: 100,
  },
  layoutMode: "NONE",
  relativeTransform: [
    [1, 0, 0],
    [0, 1, 0],
  ],
};

describe("generateLayout()", () => {
  test("should generate w-full because there is no parent node", () => {
    expect(generateLayout(node, generateConfig()).get("w")).toEqual("full");
  });
  test("should correctly generate max/min height/width", () => {
    expect(
      (
        generateLayout(
          Object.assign({}, node, { maxHeight: 10 }),
          generateConfig(),
        ).get("max-h") as Size
      ).absolute,
    ).toBe(10);
  });
  expect(
    (
      generateLayout(
        Object.assign({}, node, { maxWidth: 10 }),
        generateConfig(),
      ).get("max-w") as Size
    ).absolute,
  ).toBe(10);
  expect(
    (
      generateLayout(
        Object.assign({}, node, { minHeight: 10 }),
        generateConfig(),
      ).get("min-h") as Size
    ).absolute,
  ).toBe(10);
  expect(
    (
      generateLayout(
        Object.assign({}, node, { minWidth: 10 }),
        generateConfig(),
      ).get("min-w") as Size
    ).absolute,
  ).toBe(10);
});
