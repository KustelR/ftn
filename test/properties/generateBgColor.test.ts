import { describe, expect, test } from "@jest/globals";
import { generateBgColor } from "@/properties";
import generateBgFromFills from "@/properties/bgColor";

import { BackgroundColorBlacklist } from "@/nodes/parserLists";

const fillSolid: { name: string; fills: Array<Paint> } = {
  name: "name",
  fills: [
    {
      type: "SOLID",
      color: { r: 1, g: 0, b: 0 },
      visible: true,
    },
  ],
};
const fillSolidOpacity05: { name: string; fills: Array<Paint> } = {
  name: "name",
  fills: [
    {
      type: "SOLID",
      color: { r: 1, g: 0, b: 0 },
      visible: true,
      opacity: 0.5,
    },
  ],
};
const fillSolidInvisible: { name: string; fills: Array<Paint> } = {
  name: "name",
  fills: [
    {
      type: "SOLID",
      color: { r: 1, g: 0, b: 0 },
      visible: false,
    },
  ],
};

describe("ignores invisible", () => {
  test('should be undefined due to visible: false"', () => {
    expect(
      generateBgColor(fillSolidInvisible as unknown as SceneNode).get("bg"),
    ).toBeUndefined();
  });
});

describe("solid fill", () => {
  test('should have item by key "bg"', () =>
    expect(
      generateBgColor(fillSolid as unknown as SceneNode).get("bg"),
    ).toBeDefined());
  test('bg should be [#ff0000]"', () =>
    expect(
      generateBgColor(fillSolid as unknown as SceneNode).get("bg"),
    ).toEqual("[#ff0000]"));
  test('bg should be [#ff0000]/[0.5]"', () =>
    expect(
      generateBgColor(fillSolidOpacity05 as unknown as SceneNode).get("bg"),
    ).toEqual("[#ff0000]/[0.5]"));
});

const gradientLinear: { name: string; fills: Array<Paint> } = {
  name: "name",
  fills: [
    {
      visible: true,
      type: "GRADIENT_LINEAR",
      gradientStops: [
        {
          position: 0,
          color: { r: 0, g: 0, b: 0, a: 1 },
        },
        {
          position: 0,
          color: { r: 1, g: 1, b: 1, a: 1 },
        },
      ],
      gradientTransform: [
        [1, 0, 0],
        [0, 1, 0],
      ],
    },
  ],
};

const gradientLinearBig: { name: string; fills: Array<Paint> } = {
  name: "name",
  fills: [
    {
      visible: true,
      type: "GRADIENT_LINEAR",
      gradientStops: [
        {
          position: 0,
          color: { r: 0, g: 0, b: 0, a: 1 },
        },
        {
          position: 0.3,
          color: { r: 1, g: 0, b: 0, a: 1 },
        },
        {
          position: 0.6,
          color: { r: 0, g: 1, b: 0, a: 1 },
        },
        {
          position: 0,
          color: { r: 1, g: 1, b: 1, a: 1 },
        },
      ],
      gradientTransform: [
        [1, 0, 0],
        [0, 1, 0],
      ],
    },
  ],
};

describe("simple linear gradient", () => {
  test("should generate classes: bg-gradient-to-r", () => {
    expect(
      generateBgFromFills(gradientLinear as unknown as SceneNode).get(
        "bg-gradient-to",
      ),
    ).toEqual("l");
  });
  test("should generate classes: from-[#000000]", () => {
    expect(
      generateBgFromFills(gradientLinear as unknown as SceneNode).get("from"),
    ).toEqual("[#000000]");
  });
  test("should not generate classes: from-0", () => {
    expect(
      generateBgFromFills(gradientLinear as unknown as SceneNode).get("from0"),
    ).toBeUndefined();
  });
  test("should generate classes: to-[#ffffff]", () => {
    expect(
      generateBgFromFills(gradientLinear as unknown as SceneNode).get("to"),
    ).toEqual("[#ffffff]");
  });
  test("should not generate classes: to-1", () => {
    expect(
      generateBgFromFills(gradientLinear as unknown as SceneNode).get("to2"),
    ).toBeUndefined();
  });
});

describe("complicated linear gradient", () => {
  test("should generate classes: from-[#000000]", () => {
    expect(
      generateBgFromFills(gradientLinearBig as unknown as SceneNode).get(
        "from",
      ),
    ).toEqual("[#000000]");
  });
  test("should not generate classes: from-0", () => {
    expect(
      generateBgFromFills(gradientLinearBig as unknown as SceneNode).get(
        "from0",
      ),
    ).toBeUndefined();
  });
  test("should generate classes: to-[#ffffff]", () => {
    expect(
      generateBgFromFills(gradientLinearBig as unknown as SceneNode).get("to"),
    ).toEqual("[#ffffff]");
  });
  test("should not generate classes: to-1", () => {
    expect(
      generateBgFromFills(gradientLinearBig as unknown as SceneNode).get("to4"),
    ).toBeUndefined();
  });
  test("should generate classes: via2-[#ff0000]", () => {
    expect(
      generateBgFromFills(gradientLinearBig as unknown as SceneNode).get(
        "via1",
      ),
    ).toEqual("[#ff0000]");
  });
  test("should generate classes: via2.1-[0.3]", () => {
    expect(
      generateBgFromFills(gradientLinearBig as unknown as SceneNode).get(
        "via1.1",
      ),
    ).toEqual("[0.3]");
  });
  test("should generate classes: via3-[#00ff00]", () => {
    expect(
      generateBgFromFills(gradientLinearBig as unknown as SceneNode).get(
        "via2",
      ),
    ).toEqual("[#00ff00]");
  });
  test("should generate classes: via3.1-[0.6]", () => {
    expect(
      generateBgFromFills(gradientLinearBig as unknown as SceneNode).get(
        "via2.1",
      ),
    ).toEqual("[0.6]");
  });
});
