import createConfigEditor from "@/ui/scripts/createConfigEditor";
import createExplorer from "./explorer";

export default function addOnMessage() {
  onmessage = (event) => {
    const message: ToUiMessage = event.data.pluginMessage;
    console.log(message);
    handleMessage(message);
  };
}

function handleMessage(message: ToUiMessage) {
  switch (message.type) {
    case "LAST_CODE":
      createCodeBlock();
      if (message.data === "") return;
    case "CODE":
      let nodeData = createCodeBlock();
      try {
        parseMessage(message.data).forEach((element) =>
          nodeData.append(element),
        );
      } catch (e) {
        if (e instanceof EmptyMessageError) alert("Not found data to process");
      }
      break;
    case "IMPORTS":
      nodeData = createCodeBlock();
      nodeData.append(message.data);
      break;
    case "CONFIG":
      const appRoot = document.getElementById("appRoot");
      if (!appRoot) throw new Error("no app root");
      appRoot.innerHTML = "";
      appRoot.appendChild(createConfigEditor(JSON.parse(message.data)));
      break;
    case "NODES":
      createExplorer(
        JSON.parse(message.data, (key, value) => {
          if (typeof value === "object" && value !== null) {
            if (value.dataType === "Map") {
              return new Map(value.value);
            }
          }
          return value;
        }),
      );
      break;
  }
}

const codeBlockClasses: Array<string> = [
  "overflow-scroll",
  "w-full",
  "h-full",
  "block",
  "whitespace-nowrap",
];

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
  codeBlockClasses.forEach((classItem) => {
    nodeData.classList.add(classItem);
  });
  return nodeData;
}

class EmptyMessageError extends Error {}
/***
 * @throws {EmptyMessageError} If provided message is empty this error will be thrown
 */
function parseMessage(message: string): Array<string | HTMLElement> {
  const splittedMessage = message.match(
    new RegExp("<((?:[^<>]|>)+>)|([^<>]+)", "g"),
  );
  if (!splittedMessage)
    throw new EmptyMessageError("Not found data to process");
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
  return elements;
}
