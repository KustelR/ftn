export default function addButtonImports() {
const imports = document.getElementById("open-imports");
if (!imports) throw new Error("Imports button not found");
imports.onclick = () => {
  parent.postMessage({ pluginMessage: { type: 2 } }, "*");
};
}