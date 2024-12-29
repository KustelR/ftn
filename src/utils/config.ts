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

export function getClassName(config: Config): string {
  if (config.outputType === "HTML") return "class";
  if (config.outputType === "JSX") return "className";
  console.warn("Unsupported output type: " + config.outputType);
  return "";
}
