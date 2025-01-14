import { describe, test, expect } from "@jest/globals";
import { generatePath } from "@/properties/svg";

const relativeTransform = [
  [1, 0, 0],
  [0, 1, 0],
];

const vectorPath = { data: "somePath" };

const props: Props = {};

describe("generatePath", () => {
  test("should generate correct path without translate property", () => {
    expect(
      generatePath(
        vectorPath as VectorPath,
        { relativeTransform: relativeTransform } as unknown as VectorNode,
        Object.assign({}, props),
        false,
      ),
    ).toEqual({
      tagName: "path",
      children: [],
      props: {
        d: ["somePath"],
      },
    });
  });
  test("should generate correct path with translate property", () => {
    expect(
      generatePath(
        vectorPath as VectorPath,
        { relativeTransform: relativeTransform } as unknown as VectorNode,
        Object.assign({}, props),
        true,
      ),
    ).toEqual({
      tagName: "path",
      children: [],
      props: {
        d: ["somePath"],
        transform: ["translate(0,0)"],
      },
    });
  });
  test("loads outer props correctly", () => {
    expect(
      generatePath(
        vectorPath as VectorPath,
        { relativeTransform: relativeTransform } as unknown as VectorNode,
        { fill: ["someFill"] },
        true,
      ).props.fill,
    ).toEqual(["someFill"]);
  });
});
