export default function buttonCode() {
  parent.postMessage({ pluginMessage: { type: 1 } }, "*");
}
