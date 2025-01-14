import propToJsx from "@/utils/propNameToJsx";
import { describe, test, expect } from "@jest/globals";

describe("propToJsx", () => {
  test("changes nothing on universal property", () => {
    expect(propToJsx("offset")).toBe("offset");
  });
  test("removes minus and uppercases followind letters", () => {
    expect(propToJsx("stroke-width")).toBe("strokeWidth");
  });
  test('correctly converts "class" to "className"', () => {
    expect(propToJsx("className")).toBe("className");
  });
  test("correctly convert long props", () => {
    expect(propToJsx("long-long-long-prop")).toBe("longLongLongProp");
  });
  test("correctly convert class", () => {
    expect(propToJsx("class")).toBe("className");
  });
});
