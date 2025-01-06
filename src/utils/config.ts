import propNameToJsx from "./propNameToJsx";

export function generateConfig(): Config {
  return {
    outputType: "html",
  };
}

export function isConfig(config: any): config is Config {
  if (!config) return false;
  if (config.outputType === "html" || config.outputType === "jsx") return true;
  return false;
}

export function getPropName(propName: string, config: Config): string {
  if (config.outputType === "html") return propName;
  if (config.outputType === "jsx") return propNameToJsx(propName);
  console.warn("Unsupported output type: " + config.outputType);
  return "";
}

export function isOutputType(s: string): s is OutputType {
  return ["jsx", "html"].includes(s.toLowerCase());
}
export function isConfigKey(s: string): s is ConfigKey {
  return ["outputType"].includes(s);
}
