import { describe, test, expect } from "@jest/globals";
import { getPropName } from "@/utils/config";

describe("getPropName", () => {
  test("returns the correct prop name for html", () => {
    expect(getPropName("obscure-html-prop", { outputType: "html" })).toBe(
      "obscure-html-prop",
    );
  });
  test("should return correct JSX prop name", () => {
    expect(getPropName("normal-prop", { outputType: "jsx" })).toBe(
      "normalProp",
    );
    expect(getPropName("obscure-jsx-prop", { outputType: "jsx" })).toBe(
      "obscureJsxProp",
    );
  });
});
