
  onmessage = (event) => {
    const nodeData = document.getElementById("nodeData");
    message = event.data.pluginMessage;
    if (message.data == "" || !message.data || !message.type) {
      alert("something wrong with the message from api. check console");
    }
    switch (message.type) {
      case "CODE":
        nodeData.innerHTML = "";
        const splittedMessage = message.data.match(
          new RegExp("<((?:[^<>]|>)+>)|([^<>]+)", "g"),
        );
        const elements = [];
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

  document.getElementById("imports").onclick = () => {
    parent.postMessage({ pluginMessage: { type: 2 } }, "*");
  };

  document.getElementById("code").onclick = () => {
    parent.postMessage({ pluginMessage: { type: 1 } }, "*");
  };

  document.getElementById("find").onclick = () => {
    parent.postMessage({ pluginMessage: { type: 0 } }, "*");
  };

  document.getElementById("clear").onclick = () => {
    const nodeData = document.getElementById("nodeData");
    nodeData.textContent = "";
  };

