import rgbToHex from "@/utils/rgbToHex";

export default function generateId(fill: Paint): string {
  return hashFill(fill);
}

function hashFill(fill: Paint): string {
  let hash: number = 0;
  let parsedFill: string = "";
  Object.entries(fill).forEach((entry) => {
    parsedFill += entry[0].toString() + getStringFromFillProperty(entry[1]);
  });
  parsedFill.split("").forEach((char) => {
    hash += (hash << 5) + char.charCodeAt(0);
  });
  return hash.toString(16);
}

function getStringFromFillProperty(property: unknown): string {
  if (typeof property === "string") {
    return property;
  }
  if (typeof property === "number") {
    return property.toString();
  }
  if (typeof property === "boolean") {
    return property.toString();
  }
  if (typeof property === "object") {
    return JSON.stringify(property);
  }
  return `unknown`;
}
