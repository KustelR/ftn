import { describe, test, expect } from "@jest/globals";
import { generatePath } from "@/properties/svg";

const relativeTransform = [
  [1, 0, 0],
  [0, 1, 0],
];

const vectorPath = { data: "somePath" };

const props: Array<Prop> = [];

describe("generatePath", () => {
  test("should generate correct path without translate property", () => {
    expect(
      generatePath(
        vectorPath as VectorPath,
        { relativeTransform: relativeTransform } as unknown as VectorNode,
        [...props],
        false,
      ),
    ).toEqual({
      tagName: "path",
      children: [],
      props: [
        {
          name: "d",
          data: ["somePath"],
        },
      ],
    });
  });
  test("should generate correct path with translate property", () => {
    expect(
      generatePath(
        vectorPath as VectorPath,
        { relativeTransform: relativeTransform } as unknown as VectorNode,
        [...props],
        true,
      ),
    ).toEqual({
      tagName: "path",
      children: [],
      props: [
        {
          name: "d",
          data: ["somePath"],
        },
        {
          name: "transform",
          data: ["translate(0,0)"],
        },
      ],
    });
  });
  test("loads outer props correctly", () => {
    expect(
      generatePath(
        vectorPath as VectorPath,
        { relativeTransform: relativeTransform } as unknown as VectorNode,
        [{ name: "fill", data: ["someFill"] }],
        true,
      ).props[0],
    ).toEqual({ name: "fill", data: ["someFill"] });
  });
});
