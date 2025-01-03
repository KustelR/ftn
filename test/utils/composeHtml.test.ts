import composeElement from "@/utils/composeHtml";
import { describe, expect, test } from "@jest/globals";

const emptyObject: HtmlObject = {
  tagName: "mock",
  children: [],
  props: [],
  destroyOnRender: true,
};
const groupObject: HtmlObject = {
  tagName: "groupMock",
  children: [
    {
      tagName: "div",
      children: [],
      props: [],
    },
  ],
  props: [],
  destroyOnRender: true,
};

const mockTailwind: TailwindProperties = new Map();
mockTailwind.set("flex", true);
const mockObject: HtmlObject = {
  tagName: "div",
  children: [
    {
      tagName: "div",
      props: [{ name: "class", data: mockTailwind }],
      children: [],
    },
    "some string",
  ],
  props: [
    { name: "class", data: mockTailwind },
    { name: "width", data: ["1440"] },
  ],
};

describe("composeHtml", () => {
  test("renders a string", () => {
    expect(composeElement("some string")).toBe("some string");
  });
  test("renders nothing with destroyOnRender", () => {
    expect(composeElement(emptyObject)).toBe("");
  });
  test("renders only children of the group", () => {
    expect(composeElement(groupObject)).toBe("<div></div>");
  });
  test("renders a element with multiple props and children", () => {
    expect(composeElement(mockObject)).toBe(
      '<div class="flex" width="1440"><div class="flex"></div>some string</div>',
    );
  });
});
