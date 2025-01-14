import { generateDefs } from "@/properties/svg";
import { beforeEach, describe, expect, test } from "@jest/globals";

const EmptyDefs: HtmlObject = {
  tagName: "defs",
  children: [],
  props: {},
  destroyOnRender: true,
};

const mockFill: Set<SvgFill> = new Set();
mockFill.add({
  id: "mockfill",
  type: "GRADIENT_LINEAR",
  stops: [
    {
      offset: 0,
      color: { r: 1, g: 0, b: 0, a: 1 },
    },
    {
      offset: 0.5,
      color: { r: 1, g: 0.5, b: 0, a: 0.5 },
    },
    {
      offset: 1,
      color: { r: 0.5, g: 0, b: 0.5, a: 0.1 },
    },
  ],
});

describe("generating defs for svg", () => {
  test("should return empty html object with destroyOnRender true on undefined", () => {
    expect(generateDefs(undefined, { outputType: "html" })).toEqual(EmptyDefs);
  });
  test("should return filled defs for linear gradient", () => {
    const linearDefs = generateDefs(mockFill, { outputType: "html" });

    expect(linearDefs.children[0]).toEqual({
      tagName: "linear-gradient",
      props: {
        id: ["mockfill"],
      },
      children: [
        {
          tagName: "stop",
          props: {
            offset: ["0"],
            "stop-color": ["#ff0000"],
          },
          children: [],
        },
        {
          tagName: "stop",
          props: {
            offset: ["0.5"],
            "stop-color": ["#ff8000"],
            "stop-opacity": ["0.5"],
          },
          children: [],
        },
        {
          tagName: "stop",
          props: {
            offset: ["1"],
            "stop-color": ["#800080"],
            "stop-opacity": ["0.1"],
          },
          children: [],
        },
      ],
    });
  });
});
