import { describe, test, expect } from "@jest/globals";
import { generatePath } from "@/properties/svg";
import { generateConfig } from "@/utils/config";

const relativeTransform = [
  [1, 0, 0],
  [0, 1, 0],
];

const vectorPath = { data: "Z" };

const props: Props = {};

describe("generatePath", () => {
  test("should generate correct path without translate property", () => {
    expect(
      generatePath(
        vectorPath as VectorPath,
        { relativeTransform: relativeTransform } as unknown as VectorNode,
        Object.assign({}, props),
        false,
        generateConfig()
      ),
    ).toEqual({
      tagName: "path",
      children: [],
      props: {
        d: ["Z"],
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
        generateConfig()
      ),
    ).toEqual({
      tagName: "path",
      children: [],
      props: {
        d: ["Z"],
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
        generateConfig()
      ).props.fill,
    ).toEqual(["someFill"]);
  });
});
