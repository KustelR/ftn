import propNameToJsx from "./propNameToJsx";

export function generateConfig(): Config {
  return {
    outputType: "HTML",
  };
}

export function isConfig(config: any): config is Config {
  if (!config) return false;
  if (config.outputType === "HTML" || config.outputType === "JSX") return true;
  return false;
}

export function getPropName(propName: string, config: Config): string {
  if (config.outputType === "HTML") return propName;
  if (config.outputType === "JSX") return propNameToJsx(propName);
  console.warn("Unsupported output type: " + config.outputType);
  return "";
}
