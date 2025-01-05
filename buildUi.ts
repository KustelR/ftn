import * as path from "path";
import * as fs from "fs/promises";

export async function build() {
  const uiDir = path.resolve(__dirname, "./ui");
  const style = `<style>\n${await fs.readFile(path.join(uiDir, "output.css"))}\n</style>`;
  const script = `<script>${await fs.readFile(path.join(uiDir, "script.js"))}</script>`;
  const html = (await fs.readFile(path.join(uiDir, "ui.html")))
    .toString()
    .split("\n");
  html.splice(1, 0, style.toString());
  html.push(script.toString());
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
