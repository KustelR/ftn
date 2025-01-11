export default function buttonClear() {
  const nodeData = document.getElementById("appRoot");
  if (!nodeData) throw new Error("nodeData was not found");
  nodeData.textContent = "";
}
