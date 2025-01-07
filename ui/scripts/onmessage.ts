type ToUiMessage = {
  type: "CODE" | "IMPORTS" | "CONFIG";
  data: string;
};

type Config = {
  outputType: OutputType;
  size: SizeSetting;
};
type ConfigKey = keyof Config;
type OutputType = "jsx" | "html";
type SizeSetting = {
  sizeRound: SizeRound;
  sizeType: SizeType;
};
type SizeSettingKey = keyof SizeSetting;
type SizeRound = "none" | "round";
type SizeType = "absolute" | "relative";

enum FromUiMessageType {
  GET_CODE_FROM_SELECTION = 0,
  GET_LAST_CODE = 1,
  GET_IMPORTS = 2,
  GET_CONFIG = 3,
  SET_CONFIG = 4,
}

type FromUiMessage = {
  type: FromUiMessageType;
  data: string;
};

onmessage = (event) => {
  const message: ToUiMessage = event.data.pluginMessage;
  if (message.data == "") {
    alert("Sorry! Not found data to process");
    return;
  }
  if (!message.data || !message.type) {
    alert("something wrong with the message from api. check console");
  }
  switch (message.type) {
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

function createConfigEditor(config: Config): HTMLElement {
  let list = document.createElement("ul");
  const entries = Object.entries(config);
  entries.forEach((entry) => {
    const item = document.createElement("li");
    item.setAttribute("class", "flex flex-row space-x-1 px-2");
    const configOptionName = document.createElement("h3");
    configOptionName.textContent = entry[0];
    const configOptionInput = document.createElement("input");
    configOptionInput.setAttribute(
      "class",
      "min-w-10 justify-start items-start relative border-b-[2px] border-black bg-neutral-700",
    );
    try {
    configOptionInput.setAttribute("value", JSON.stringify(entry[1]));
    } catch (e) {
      console.error("Error parsing JSON", e);
      configOptionInput.setAttribute("value", entry[1] as OutputType);
    }
    const configOptionButton = document.createElement("button");
    configOptionButton.textContent = "Set";
    configOptionButton.setAttribute(
      "class",
      "block bg-neutral-700 hover:bg-neutral-800 px-2",
    );
    configOptionButton.onclick = () => {
      parent.postMessage(
        {
          pluginMessage: {
            type: FromUiMessageType.SET_CONFIG,
            data: JSON.stringify({
              property: configOptionName.textContent,
              value: configOptionInput.value,
            }),
          },
        },
        "*",
      );
    };
    item.appendChild(configOptionName);
    item.appendChild(configOptionInput);
    item.appendChild(configOptionButton);
    list.appendChild(item);
  });
  return list;
}
