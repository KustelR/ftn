

export default function addButtonClear() {
const clear = document.getElementById("clear-code");
if (!clear) throw new Error("Clear code button not found");
clear.onclick = () => {
  const nodeData = document.getElementById("appRoot");
  if (!nodeData) throw new Error("nodeData was not found");
  nodeData.textContent = "";
};
}
