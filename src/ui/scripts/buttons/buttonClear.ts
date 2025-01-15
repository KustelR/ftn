export default function buttonClear() {
  const nodeData = document.getElementById("appRoot");
  if (!nodeData) return;
  nodeData.textContent = "";
}
