import composeHtml from "@/utils/composeHtml";
import { generateConfig } from "@/utils/config";
import generateTailwind from "@/utils/generateTailwind";

const explorerClasses: Array<string> = [
  "w-full",
  "h-full",
  "grid",
  "grid-cols-2",
  "overflow-hidden",
];

class AppRootNotFoundError extends Error {}

/***
 * @throws {AppRootNotFoundError} if the appRoot node is not found this will be thrown
 */
export default function createExplorer(data: Array<HtmlObject>) {
  const appRoot = document.getElementById("appRoot");
  if (!appRoot) throw new AppRootNotFoundError();
  appRoot.innerHTML = "";
  const explorerWindow = document.createElement("div");
  explorerClasses.forEach((className) =>
    explorerWindow.classList.add(className),
  );
  const explorerListContainer = document.createElement("div");
  explorerListContainer.classList.add("size-full");
  const explorerList = explorerListContainer.appendChild(
    document.createElement("ol"),
  );
  explorerListContainer.classList.add("overflow-y-scroll");
  const explorerPreview = document.createElement("div");
  explorerPreview.classList.add("size-full");
  const previewContainer = explorerPreview.appendChild(
    document.createElement("div"),
  );
  previewContainer.classList.add("relative");
  function onSelect(obj: HtmlObject) {
    previewContainer.innerHTML = composeHtml(
      recursiveScale(obj, 0.1),
      generateConfig(),
    );
  }
  data.forEach((element) => {
    explorerList.appendChild(createExplorerItem(element, onSelect));
  });
  explorerWindow.appendChild(explorerListContainer);
  explorerWindow.appendChild(explorerPreview);
  appRoot.appendChild(explorerWindow);
}

function createExplorerItem(
  obj: HtmlObject | string | null,
  onSelect: Function,
): HTMLElement {
  if (!obj) return document.createElement("div");
  if (typeof obj === "string") {
    const text = document.createElement("span");
    text.textContent = obj;
    return text;
  }
  const item = document.createElement("li");
  item.setAttribute("class", `ml-1 p-0.5 hover:bg-white/[0.02] cursor-pointer`);
  const header = document.createElement("h4");
  header.setAttribute("class", "font-bold");
  header.textContent = obj.tagName;
  const propList = createPropList(obj.props);

  item.appendChild(header);
  item.appendChild(propList);
  const childList = document.createElement("ul");
  childList.classList.add("hidden");
  item.onclick = (event) => {
    childList.classList.toggle("hidden");
    onSelect(obj);
    event.stopPropagation();
  };
  obj.children.forEach((child) => {
    childList.appendChild(createExplorerItem(child, onSelect));
  });
  item.appendChild(childList);
  return item;
}

function createPropList(data: Props): HTMLElement {
  const list = document.createElement("ul");
  const liHeader = document.createElement("h5");
  liHeader.textContent = "props:";
  Object.entries(data).forEach(([name, value]) => {
    const li = document.createElement("li");
    let strValue;
    if (Array.isArray(value)) {
      strValue = JSON.stringify(value);
    } else strValue = generateTailwind(value, generateConfig());
    li.textContent = `${name}: ${strValue}`;
    list.appendChild(li);
  });
  return list;
}

function recursiveScale(obj: HtmlObject, scale: number): HtmlObject {
  const result: HtmlObject = Object.assign({}, obj);
  function recursiveScaleStep(obj: HtmlObject, scale: number) {
    /*
    if (obj.tagName === "path" || obj.tagName === "polygon") {
      console.log(obj.tagName);
      if (Array.isArray(obj.props.transform)) {
        obj.props.transform.push(`scale(${scale}, ${scale})`);
      }
      if (!obj.props.transform) {
        obj.props.transform = [`scale(${scale}, ${scale})`];
      }
    }
      */
    if (obj.props.class) {
      if (!Array.isArray(obj.props.class)) {
        obj.props.class.forEach((value, key) => {
          if (typeof value !== "string" && typeof value !== "boolean") {
            value.absolute = value.absolute * scale;
            (obj.props.class as TailwindProperties).set(key, value);
          }
        });
      }
      obj.children.forEach((child) => {
        if (!child) return;
        if (typeof child === "string") return;
        recursiveScaleStep(child, scale);
      });
    }
  }
  recursiveScaleStep(result, scale);
  return result;
}
