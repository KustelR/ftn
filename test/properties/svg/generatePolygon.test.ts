import { describe, test, expect, jest } from "@jest/globals";
import { generatePolygon } from "@/properties/svg";

const vertices = [
  { x: 0, y: 0 },
  { x: 1, y: 1 },
  { x: 2, y: 3 },
  { x: 0, y: 0 },
];
const relativeTransform = [
  [1, 0, 0],
  [0, 1, 0],
];

const props: Array<Prop> = [];

describe("generatePolygon", () => {
  test("generating correct html object from polygon with no outer svg specified", () => {
    expect(
      generatePolygon(
        {
          vectorNetwork: { vertices: vertices },
          relativeTransform: relativeTransform,
        } as unknown as VectorNode,
        [...props],
      ),
    ).toEqual({
      tagName: "polygon",
      children: [],
      props: [
        {
          name: "points",
          data: ["0,0", "1,1", "2,3", "0,0"],
        },
      ],
    });
  });
  test("generating correct html object from polygon with outer svg specified", () => {
    expect(
      generatePolygon(
        {
          vectorNetwork: { vertices: vertices },
          relativeTransform: relativeTransform,
        } as unknown as VectorNode,
        [...props],
        true,
      ),
    ).toEqual({
      tagName: "polygon",
      children: [],
      props: [
        {
          name: "points",
          data: ["0,0", "1,1", "2,3", "0,0"],
        },
        {
          name: "transform",
          data: ["translate(0,0)"],
        },
      ],
    });
  });
  test("loads external props correctly", () => {
    expect(
      generatePolygon(
        {
          vectorNetwork: { vertices: vertices },
          relativeTransform: relativeTransform,
        } as unknown as VectorNode,
        [{ name: "fill", data: ["someFill"] }],
      ).props[0],
    ).toEqual({ name: "fill", data: ["someFill"] });
  });
});
