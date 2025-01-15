import propNameToJsx from "./propNameToJsx";

export { generateConfig, fillConfig, getConfig, adaptName };
function generateConfig(): Config {
  return {
    outputType: "html",
    size: {
      sizeRound: "none",
      sizeType: "absolute",
    },
  };
}

function fillConfig(config: Config): Config {
  if (!config.outputType) {
    config.outputType = "html";
  }
  if (!config.size) {
    config.size = {
      sizeRound: "none",
      sizeType: "absolute",
    };
  }

  return config;
}

function getConfig(config: string | Config | undefined): Config {
  try {
    if (!config) return generateConfig();
    if (typeof config === "string") return fillConfig(JSON.parse(config));

    return fillConfig(config);
  } catch (error) {
    console.error("Error parsing config: ", error);
    return generateConfig();
  }
}

function generateSizeSetting(): SizeSetting {
  return {
    sizeRound: "none",
    sizeType: "absolute",
  };
}

function isConfig(config: any): config is Config {
  if (!config) return false;
  if (
    Object.keys(config).filter((configKey) => {
      return !isConfigKey(configKey);
    }).length > 0
  )
    return false;
  return true;
}

function adaptName(
  propName: string,
  config: { outputType: OutputType },
): string {
  if (config.outputType === "html") return propName;
  if (config.outputType === "jsx") return propNameToJsx(propName);
  console.warn("Unsupported output type: " + config.outputType);
  return "";
}

function isOutputType(s: string): s is OutputType {
  return ["jsx", "html"].includes(s.toLowerCase());
}

function isSizeSetting(s: any): s is SizeSetting {
  if (!s) return false;
  return (
    Object.keys(s).toString() === Object.keys(generateSizeSetting()).toString()
  );
}
function setOutputType(config: Config, outType: string) {
  if (isOutputType(outType)) config.outputType = outType;
  else throw new Error("Unsupported output type: " + outType);
}

function setSize(config: Config, size: string) {
  let parsedSize: Size;
  try {
    parsedSize = JSON.parse(size);
  } catch (err) {
    config.size = generateSizeSetting();
    return;
  }
  if (isSizeSetting(parsedSize)) config.size = parsedSize;
  else throw new Error("Unsupported size setting: " + size);
}

export function setProperty(config: Config, name: string, value: string) {
  switch (name) {
    case "outputType":
      setOutputType(config, value);
      break;
    case "size":
      setSize(config, value);
      break;
    default:
      throw new Error("Unsupported property: " + name);
  }
}
function isConfigKey(s: string): s is ConfigKey {
  return Object.keys(generateConfig).includes(s);
}
