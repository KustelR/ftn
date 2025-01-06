type ToUiMessage = {
  type: "CODE" | "IMPORTS";
  data: string;
};

onmessage = (event) => {
  const nodeData = document.getElementById("nodeData");
  if (!nodeData) throw new Error("nodeData was not found");
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
      nodeData.innerHTML = "";
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
      nodeData.innerHTML = "";
      nodeData.append(message.data);
      break;
  }
};
