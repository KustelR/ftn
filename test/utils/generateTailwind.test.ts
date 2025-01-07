import { describe, expect, test } from "@jest/globals";
import generateTailwind from "@/utils/generateTailwind";
import { generateConfig } from "@/utils/config";

let mockNumbered: TailwindProperties = new Map();
mockNumbered.set("from2.1", "[0.6]");

let mockBoolean: TailwindProperties = new Map();
mockBoolean.set("flex", true);
let mockSize: TailwindProperties = new Map();
mockSize.set("w", { absolute: 1, relative: 1 });

describe("generateTailwind", () => {
  test("ignores boilerplate data in keys", () => {
    expect(generateTailwind(mockNumbered, generateConfig())).toEqual(
      "from-[0.6]",
    );
  });
  test("generate only key in boolean properties", () => {
    expect(generateTailwind(mockBoolean, generateConfig())).toEqual("flex");
  });
  test("handles empty properties", () => {
    expect(generateTailwind(new Map(), generateConfig())).toEqual("");
  });
  test("handles Size typed properties", () => {
    expect(generateTailwind(mockSize, generateConfig())).toBe("w-[1px]");
  });
});
