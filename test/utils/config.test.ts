import { describe, test, expect, jest } from "@jest/globals";
import {
  fillConfig,
  generateConfig,
  getConfig,
  adaptName,
} from "@/utils/config";

describe("getPropName", () => {
  test("returns the correct prop name for html", () => {
    expect(adaptName("obscure-html-prop", { outputType: "html" })).toBe(
      "obscure-html-prop",
    );
  });
  test("should return correct JSX prop name", () => {
    expect(adaptName("normal-prop", { outputType: "jsx" })).toBe(
      "normalProp",
    );
    expect(adaptName("obscure-jsx-prop", { outputType: "jsx" })).toBe(
      "obscureJsxProp",
    );
  });
});

describe("generateConfig", () => {
  test("returns the correct default config", () => {
    expect(generateConfig()).toEqual({
      outputType: "html",
      size: {
        sizeRound: "none",
        sizeType: "absolute",
      },
    });
  });
});

describe("fillConfig", () => {
  test("returns the same config if it already has valid properties", () => {
    const config = generateConfig();
    config.outputType = "html";
    expect(fillConfig(config)).toEqual(config);
  });
});

describe("getConfig", () => {
  test("returns the parsed config if it's valid JSON", () => {
    const configString = JSON.stringify(generateConfig());
    expect(getConfig(configString)).toEqual(generateConfig());
  });
  test("returns a default config if the input is not valid JSON", () => {
    const invalidConfig = "invalid-json";
    expect(getConfig(invalidConfig)).toEqual(generateConfig());
  });
  test("should shitpost to console if config was not valid JSON", () => {
    const invalidConfig = "invalid-json";
    jest.spyOn(console, "error");
    getConfig(invalidConfig);
    expect(console.error).toHaveBeenCalled();
  });
  test("returns a default config if the input is undefined", () => {
    expect(getConfig(undefined)).toEqual(generateConfig());
  });
});
