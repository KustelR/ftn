const config = document.getElementById("open-config");
if (!config) throw new Error("OpenConfig button not found");

config.onclick = () => {
  parent.postMessage({ pluginMessage: { type: 3 } }, "*");
};
