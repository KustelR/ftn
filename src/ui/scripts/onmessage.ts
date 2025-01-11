import createConfigEditor from "@/ui/scripts/createConfigEditor";

export default function addOnMessage() {
  onmessage = (event) => {
    const message: ToUiMessage = event.data.pluginMessage;
    console.log(message);
    switch (message.type) {
      case "LAST_CODE":
        if (message.data === "") return;
      case "CODE":
        let nodeData = createCodeBlock();
        const splittedMessage = message.data.match(
          new RegExp("<((?:[^<>]|>)+>)|([^<>]+)", "g"),
        );
        if (!splittedMessage) {
          alert("Sorry! Not found data to process");
          return;
        }
        const elements: Array<string | HTMLElement> = [];
        let step = 0;
        splittedMessage.map((msgElement) => {
          if (msgElement.match("<\/[^>]+>")) step--;

          elements.push(
            "\xa0\xa0".repeat(Math.max(step, 0)),
            msgElement,
            document.createElement("br"),
          );
          if (msgElement.match("^<[^\/].+[^\/]>$")) step++;
        });
        elements.forEach((element) => nodeData.append(element));
        break;
      case "IMPORTS":
        nodeData = createCodeBlock();
        nodeData.append(message.data);
        break;
      case "CONFIG":
        console.log(message.data);
        const appRoot = document.getElementById("appRoot");
        if (!appRoot) throw new Error("no app root");
        appRoot.innerHTML = "";
        appRoot.appendChild(createConfigEditor(JSON.parse(message.data)));
        break;
    }
  };

  function createCodeBlock(): HTMLElement {
    let nodeData = document.getElementById("nodeData");
    if (!nodeData) {
      const appRoot = document.getElementById("appRoot");
      if (!appRoot) throw new Error("appRoot not found wtf");
      nodeData = document.createElement("code");
      appRoot.innerHTML = "";
      appRoot.appendChild(nodeData);
    }
    nodeData.innerHTML = "";
    return nodeData;
  }
}
