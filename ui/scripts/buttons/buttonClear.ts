const clear = document.getElementById("clear-code");
if (!clear) throw new Error("Clear code button not found");
clear.onclick = () => {
  const nodeData = document.getElementById("nodeData");
  if (!nodeData) throw new Error("nodeData was not found");
  nodeData.textContent = "";
};
