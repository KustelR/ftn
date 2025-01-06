const find = document.getElementById("generate");
if (!find) throw new Error("Generate button not found");
find.onclick = () => {
  parent.postMessage({ pluginMessage: { type: 0 } }, "*");
};
