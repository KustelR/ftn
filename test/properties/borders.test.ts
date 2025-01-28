import { describe, expect, test } from "@jest/globals";
import { generateBorders } from "@/properties";

type BorderedNode = {
  name: string;
  width?: number;
  height?: number;
  cornerRadius?: number | symbol;
  topLeftRadius?: number;
  topRightRadius?: number;
  bottomLeftRadius?: number;
  bottomRightRadius?: number;
  strokeWeight: number | symbol;
  strokeRightWeight?: number;
  strokes: Array<Paint>;
  strokeLeftWeight?: number;
  strokeTopWeight?: number;
  strokeBottomWeight?: number;
  strokeALign?: "CENTER" | "INSIDE" | "OUTSIDE";
  strokeCap?:
    | "NONE"
    | "ROUND"
    | "SQUARE"
    | "ARROW_LINES"
    | "ARROW_EQUILATERAL"
    | symbol;
};
const mockStrokes: Array<Paint> = [
  {
    type: "SOLID",
    color: { r: 1, g: 0, b: 0 },
    visible: true,
  },
];
const mockStrokesOpacity: Array<Paint> = [
  {
    type: "SOLID",
    color: { r: 1, g: 0, b: 0 },
    visible: true,
    opacity: 0.5,
  },
];
const borderedMockFull = {
  name: "mock",
  width: 10,
  height: 10,
  cornerRadius: 5,
  topLeftRadius: 5,
  topRightRadius: 5,
  bottomLeftRadius: 5,
  bottomRightRadius: 5,
  strokeWeight: 5,
  strokeLeftWeight: 5,
  strokeRightWeight: 5,
  strokeTopWeight: 5,
  strokeBottomWeight: 5,
  strokeALign: "OUTSIDE",
  strokes: mockStrokes,
};
const borderedMockSeparate = {
  name: "mock",
  width: 10,
  height: 10,
  cornerRadius: Symbol(),
  strokeWeight: Symbol(),
  strokes: mockStrokes,

  topLeftRadius: 1,
  topRightRadius: 2,
  bottomLeftRadius: 3,
  bottomRightRadius: 4,
  strokeRightWeight: 5,
  strokeLeftWeight: 6,
  strokeTopWeight: 7,
  strokeBottomWeight: 8,
  strokeALign: "OUTSIDE",
};
const strokeCappedMock: BorderedNode = {
  name: "mock",
  strokeWeight: 5,
  height: 5,
  width: 5,
  strokes: mockStrokes,
  strokeCap: undefined,
};
describe("generateBorders", () => {
  test("should not generate border with empty strokes", () => {
    expect(
      generateBorders(
        Object.assign({}, borderedMockFull, {
          strokes: [],
        }) as unknown as SceneNode,
      ).get("border"),
    ).toBeUndefined();
  });
  test("should generate correct borders and rounded", () => {
    expect(
      generateBorders(borderedMockFull as unknown as SceneNode).get("border"),
    ).toEqual("[5px]");
    expect(
      generateBorders(
        Object.assign({}, borderedMockFull, {
          strokes: mockStrokes,
        }) as unknown as SceneNode,
      ).get("rounded"),
    ).toEqual("[5]");
    expect(
      generateBorders(borderedMockFull as unknown as SceneNode).get("box"),
    ).toBeUndefined();
    expect(
      generateBorders(borderedMockSeparate as unknown as SceneNode).get(
        "rounded-tl",
      ),
    ).toEqual("[1]");
    expect(
      generateBorders(borderedMockSeparate as unknown as SceneNode).get(
        "rounded-tr",
      ),
    ).toEqual("[2]");
    expect(
      generateBorders(borderedMockSeparate as unknown as SceneNode).get(
        "rounded-bl",
      ),
    ).toEqual("[3]");
    expect(
      generateBorders(borderedMockSeparate as unknown as SceneNode).get(
        "rounded-br",
      ),
    ).toEqual("[4]");
    expect(
      generateBorders(borderedMockSeparate as unknown as SceneNode).get(
        "border-r",
      ),
    ).toEqual("[5px]");
    expect(
      generateBorders(borderedMockSeparate as unknown as SceneNode).get(
        "border-l",
      ),
    ).toEqual("[6px]");
    expect(
      generateBorders(borderedMockSeparate as unknown as SceneNode).get(
        "border-t",
      ),
    ).toEqual("[7px]");
    expect(
      generateBorders(borderedMockSeparate as unknown as SceneNode).get(
        "border-b",
      ),
    ).toEqual("[8px]");
    expect(
      generateBorders(borderedMockSeparate as unknown as SceneNode).get(
        "border",
      ),
    ).toBeUndefined();
    expect(
      generateBorders(borderedMockSeparate as unknown as SceneNode).get(
        "rounded",
      ),
    ).toBeUndefined();
  });
  test("should not generate corner-specific borders", () => {
    expect(
      generateBorders(borderedMockFull as unknown as SceneNode).get("border-r"),
    ).toBeUndefined();
    expect(
      generateBorders(borderedMockFull as unknown as SceneNode).get("border-l"),
    ).toBeUndefined();
    expect(
      generateBorders(borderedMockFull as unknown as SceneNode).get("border-t"),
    ).toBeUndefined();
    expect(
      generateBorders(borderedMockFull as unknown as SceneNode).get("border-b"),
    ).toBeUndefined();
  });
  test("should not generate corner-specific rounding", () => {
    expect(
      generateBorders(borderedMockFull as unknown as SceneNode).get(
        "rounded-tr",
      ),
    ).toBeUndefined();
  });
  expect(
    generateBorders(borderedMockFull as unknown as SceneNode).get("rounded-tl"),
  ).toBeUndefined();
  expect(
    generateBorders(borderedMockFull as unknown as SceneNode).get("rounded-bl"),
  ).toBeUndefined();
  expect(
    generateBorders(borderedMockFull as unknown as SceneNode).get("rounded-br"),
  ).toBeUndefined();
  test("should generate correct coloring", () => {
    expect(
      generateBorders(borderedMockFull as unknown as SceneNode).get("border1"),
    ).toEqual("[#ff0000]");
    expect(
      generateBorders(
        Object.assign({}, borderedMockFull, {
          strokes: mockStrokesOpacity,
        }) as unknown as SceneNode,
      ).get("border1"),
    ).toEqual("[#ff0000]/[0.5]");
  });
  test("undefined stroke cap should not apply", () => {
    expect(
      generateBorders(
        Object.assign({}, strokeCappedMock, {
          strokeCap: undefined,
        }) as unknown as SceneNode,
      ).get("rounded"),
    ).toBeUndefined();
  });
  strokeCappedMock.strokeCap = "NONE";
  test("none stroke cap should not apply", () => {
    expect(
      generateBorders(strokeCappedMock as unknown as SceneNode).get("rounded"),
    ).toBeUndefined();
  });
  strokeCappedMock.strokeCap = "SQUARE";
  test("square stroke cap should not apply", () => {
    expect(
      generateBorders(strokeCappedMock as unknown as SceneNode).get("rounded"),
    ).toBeUndefined();
  });
  test("round stroke cap should apply rounded-[ceil of half of width (3)]", () => {
    let localMock = Object.assign({}, strokeCappedMock) as unknown as FrameNode;
    localMock.strokeCap = "ROUND";
    expect(generateBorders(localMock).get("rounded")).toEqual("[3]");
  });
  test("should not generate corner-specific borders on strokeCapped", () => {
    expect(
      generateBorders(strokeCappedMock as unknown as SceneNode).get("border-r"),
    ).toBeUndefined();
    expect(
      generateBorders(strokeCappedMock as unknown as SceneNode).get("border-l"),
    ).toBeUndefined();
    expect(
      generateBorders(strokeCappedMock as unknown as SceneNode).get("border-t"),
    ).toBeUndefined();
    expect(
      generateBorders(strokeCappedMock as unknown as SceneNode).get("border-b"),
    ).toBeUndefined();
  });
  strokeCappedMock.topLeftRadius = 5;
  test("should not generate corner-specific rounded on strokeCapped", () => {
    expect(
      generateBorders(strokeCappedMock as unknown as SceneNode).get(
        "rounded-tl",
      ),
    ).toBeUndefined();
    expect(
      generateBorders(strokeCappedMock as unknown as SceneNode).get(
        "rounded-tr",
      ),
    ).toBeUndefined();
    expect(
      generateBorders(strokeCappedMock as unknown as SceneNode).get(
        "rounded-bl",
      ),
    ).toBeUndefined();
    expect(
      generateBorders(strokeCappedMock as unknown as SceneNode).get(
        "rounded-br",
      ),
    ).toBeUndefined();
  });
});
