import * as path from "path";
import * as fs from "fs/promises";

type ManType = "figma" | "pixso";

function isManType(manType: string): manType is ManType {
    return ["figma", "pixso"].includes(manType);
}

export async function create(manType: "figma" | "pixso"): Promise<void> {
  fs.copyFile(`./manifests/manifest_${manType}.json`, `./dist/manifest.json`);
}

function run() {
    console.log("runs")
    const args = process.argv;

    const apiType: Array<ManType> = args.filter((arg) => {
        return isManType(arg);
    });
    apiType.forEach((arg) => {
        create(arg);
    });
}

run();