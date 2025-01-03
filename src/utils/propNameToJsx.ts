export default function propToJsx(propName: string): string {
  const replaceTargets = propName.match(new RegExp("(\-[a-z])", "g"));
  let result = propName;
  if (propName === "class") {
    return "className";
  }
  if (!replaceTargets) return propName;

  replaceTargets.forEach((match) => {
    result = result.replace(match, match[1].toUpperCase());
  });
  return result;
}
