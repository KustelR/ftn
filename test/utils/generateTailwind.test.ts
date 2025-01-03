import { describe, expect, test } from "@jest/globals";
import generateTailwind from "@/utils/generateTailwind";

let mockNumbered: TailwindProperties = new Map<
  string,
  string | number | boolean
>();
mockNumbered.set("from2.1", "[0.6]");

let mockBoolean: TailwindProperties = new Map<
  string,
  string | number | boolean
>();
mockBoolean.set("flex", true);

describe("generateTailwind", () => {
  test("ignores boilerplate data in keys", () => {
    expect(generateTailwind(mockNumbered)).toEqual("from-[0.6]");
  });
  test("generate only key in boolean properties", () => {
    expect(generateTailwind(mockBoolean)).toEqual("flex");
  });
});
