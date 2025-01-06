const code = document.getElementById("open-code");
if (!code) throw new Error("Open code button not found");
code.onclick = () => {
  parent.postMessage({ pluginMessage: { type: 1 } }, "*");
};
