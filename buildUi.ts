import * as path from "path";
import * as fs from "fs/promises";
import * as ts from "typescript";
import { Dirent } from "fs";

export async function build() {
  const uiDir = path.resolve(__dirname, "./ui");
  const style = `<style>\n${await fs.readFile(path.join(uiDir, "output.css"))}\n</style>`;
  const script = await getScripts(path.join(uiDir, "scripts"));
  //const script = `<script>${await fs.readFile(path.join(uiDir, "script.js"))}</script>`;
  const html = (await fs.readFile(path.join(uiDir, "ui.html")))
    .toString()
    .split("\n");
  html.splice(1, 0, style.toString());
  html.push(script);
  try {
    await fs.mkdir(path.join(__dirname, "dist"), { recursive: false });
  } catch (err) {
    if (err.code !== "EEXIST") throw err;
  }
  try {
    await fs.mkdir(path.join(__dirname, "dist", "ui"), { recursive: false });
  } catch (err) {
    if (err.code !== "EEXIST") throw err;
  }
  const targetPath = path.join(__dirname, "/dist", "/ui", "index.html");
  fs.writeFile(targetPath, html.join("\n"), { flag: "w+" });
  console.log(`Ui created at ${targetPath}`);
}

build();

async function getScripts(scriptsDirPath: string): Promise<string> {
  let result = "";
  const scriptFiles = await getScriptPaths(scriptsDirPath);
  const scripts = await Promise.all(
    scriptFiles.map(async (file) => {
      if (file.name.endsWith(".js"))
        return fs.readFile(path.join(file.parentPath, file.name));
      if (file.name.endsWith(".ts"))
        return tsCompile(
          (await fs.readFile(path.join(file.parentPath, file.name))).toString(),
        );
    }),
  );
  result += "<script>";
  for (let i = 0; i < scripts.length; i++) {
    result += `\n\n// ${path.relative(scriptsDirPath, path.join(scriptFiles[i].parentPath, scriptFiles[i].name))}\n`;
    result += scripts[i];
  }
  result += "</script>";

  return result;
}

function tsCompile(
  source: string,
  options = { compilerOptions: { module: ts.ModuleKind.CommonJS } },
): string {
  // Default options -- you could also perform a merge, or use the project tsconfig.json
  return ts.transpileModule(source, options).outputText;
}

async function getScriptPaths(dirPath: string): Promise<Array<Dirent>> {
  const scriptFiles = await fs.readdir(dirPath, { withFileTypes: true });
  const scripts = await Promise.all(
    scriptFiles.map(async (scriptFile) => {
      if (scriptFile.isDirectory()) {
        return await getScriptPaths(path.join(scriptFile.parentPath, scriptFile.name));
      } else {
        return scriptFile;
      }
    }),
  );
  return scripts
    .filter((script) => {
      return script != undefined;
    })
    .flat();
}
