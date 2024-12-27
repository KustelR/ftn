import { describe, expect, test } from "@jest/globals";
import { generateBorders } from "@/properties";

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
const borderedMockFull: BorderedNode = {
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
};
const borderedMockSeparate: BorderedNode = {
  name: "mock",
  width: 10,
  height: 10,
  cornerRadius: Symbol(),
  strokeWeight: Symbol(),

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
  strokeCap: undefined,
};
describe("generateBorders", () => {
  test("should not generate border with empty strokes", () => {
    expect(generateBorders([], borderedMockFull).get("border")).toBeUndefined();
  });
  test("should generate correct borders and rounded", () => {
    expect(
      generateBorders(mockStrokes, borderedMockFull).get("border"),
    ).toEqual("[5px]");
    expect(
      generateBorders(mockStrokes, borderedMockFull).get("rounded"),
    ).toEqual("[5]");
    expect(
      generateBorders(mockStrokes, borderedMockFull).get("box"),
    ).toBeUndefined();
    expect(
      generateBorders(mockStrokes, borderedMockSeparate).get("rounded-tl"),
    ).toEqual("[1]");
    expect(
      generateBorders(mockStrokes, borderedMockSeparate).get("rounded-tr"),
    ).toEqual("[2]");
    expect(
      generateBorders(mockStrokes, borderedMockSeparate).get("rounded-bl"),
    ).toEqual("[3]");
    expect(
      generateBorders(mockStrokes, borderedMockSeparate).get("rounded-br"),
    ).toEqual("[4]");
    expect(
      generateBorders(mockStrokes, borderedMockSeparate).get("border-r"),
    ).toEqual("[5px]");
    expect(
      generateBorders(mockStrokes, borderedMockSeparate).get("border-l"),
    ).toEqual("[6px]");
    expect(
      generateBorders(mockStrokes, borderedMockSeparate).get("border-t"),
    ).toEqual("[7px]");
    expect(
      generateBorders(mockStrokes, borderedMockSeparate).get("border-b"),
    ).toEqual("[8px]");
    expect(
      generateBorders(mockStrokes, borderedMockSeparate).get("border"),
    ).toBeUndefined();
    expect(
      generateBorders(mockStrokes, borderedMockSeparate).get("rounded"),
    ).toBeUndefined();
  });
  test("should not generate corner-specific borders", () => {
    expect(
      generateBorders(mockStrokes, borderedMockFull).get("border-r"),
    ).toBeUndefined();
    expect(
      generateBorders(mockStrokes, borderedMockFull).get("border-l"),
    ).toBeUndefined();
    expect(
      generateBorders(mockStrokes, borderedMockFull).get("border-t"),
    ).toBeUndefined();
    expect(
      generateBorders(mockStrokes, borderedMockFull).get("border-b"),
    ).toBeUndefined();
  });
  test("should not generate corner-specific rounding", () => {
    expect(
      generateBorders(mockStrokes, borderedMockFull).get("rounded-tr"),
    ).toBeUndefined();
  });
  expect(
    generateBorders(mockStrokes, borderedMockFull).get("rounded-tl"),
  ).toBeUndefined();
  expect(
    generateBorders(mockStrokes, borderedMockFull).get("rounded-bl"),
  ).toBeUndefined();
  expect(
    generateBorders(mockStrokes, borderedMockFull).get("rounded-br"),
  ).toBeUndefined();
  test("should generate correct coloring", () => {
    expect(
      generateBorders(mockStrokes, borderedMockFull).get("border1"),
    ).toEqual("[#ff0000]");
    expect(
      generateBorders(mockStrokesOpacity, borderedMockFull).get("border1"),
    ).toEqual("[#ff0000]/[0.5]");
  });
  test("undefined stroke cap should not apply", () => {
    expect(
      generateBorders(mockStrokes, strokeCappedMock).get("rounded"),
    ).toBeUndefined();
  });
  strokeCappedMock.strokeCap = "NONE";
  test("none stroke cap should not apply", () => {
    expect(
      generateBorders(mockStrokes, strokeCappedMock).get("rounded"),
    ).toBeUndefined();
  });
  test("square stroke cap should not apply", () => {
    strokeCappedMock.strokeCap = "SQUARE";
    expect(
      generateBorders(mockStrokes, strokeCappedMock).get("rounded"),
    ).toBeUndefined();
  });
  test("round stroke cap should apply rounded-[ceil of half of width (3)]", () => {
    strokeCappedMock.strokeCap = "ROUND";
    expect(
      generateBorders(mockStrokes, strokeCappedMock).get("rounded"),
    ).toEqual("[3]");
  });
  test("should not generate corner-specific borders on strokeCapped", () => {
    expect(
      generateBorders(mockStrokes, strokeCappedMock).get("border-r"),
    ).toBeUndefined();
    expect(
      generateBorders(mockStrokes, strokeCappedMock).get("border-l"),
    ).toBeUndefined();
    expect(
      generateBorders(mockStrokes, strokeCappedMock).get("border-t"),
    ).toBeUndefined();
    expect(
      generateBorders(mockStrokes, strokeCappedMock).get("border-b"),
    ).toBeUndefined();
  });
  strokeCappedMock.topLeftRadius = 5;
  test("should not generate corner-specific rounded on strokeCapped", () => {
    expect(
      generateBorders(mockStrokes, strokeCappedMock).get("rounded-tl"),
    ).toBeUndefined();
    expect(
      generateBorders(mockStrokes, strokeCappedMock).get("rounded-tr"),
    ).toBeUndefined();
    expect(
      generateBorders(mockStrokes, strokeCappedMock).get("rounded-bl"),
    ).toBeUndefined();
    expect(
      generateBorders(mockStrokes, strokeCappedMock).get("rounded-br"),
    ).toBeUndefined();
  });
});
