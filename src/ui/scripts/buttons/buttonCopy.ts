class NodeDataNotFoundError extends Error {}

export function buttonCopy() {
  const nodeData = document.getElementById("nodeData");
  if (!nodeData) throw new NodeDataNotFoundError("Node data not found");
  const copyEvent = new Event("copy");
  Object.defineProperty(copyEvent, "target", nodeData);
  window.dispatchEvent(copyEvent);
  window.oncopy = (event) => {
    alert(event);
  };
  //if (nodeData.textContent) navigator.clipboard.writeText(nodeData.textContent);
}
