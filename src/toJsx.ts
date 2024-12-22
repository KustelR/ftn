import rgbToHex from "./utils/rgbToHex";

type IntermediateNodeData = {
}

function generateBgFromFills(node: {fills: Array<Paint>}): Array<String> {
    const result: Array<string> = [];
    node.fills.map((fill) => {
        switch (fill.type) {
            case "SOLID":
                result.push(`bg-[${rgbToHex(fill.color)}]/[${fill.opacity ? fill.opacity : 1}] `);
                break;
            case "GRADIENT_ANGULAR":
                break;
            case "GRADIENT_LINEAR":
                let gradientStrings: Array<string> = [`bg-gradient-to-l`];
                for (let i = 0; i < fill.gradientStops.length; i++) {
                    const stop = fill.gradientStops[i];
                    if (i === 0) {
                        gradientStrings.push(`from-[${rgbToHex(stop.color)}]/[${stop.color.a * (fill.opacity ? fill.opacity : 1)}]`);
                        if (stop.position != 0) gradientStrings.push(`from-[${stop.position}]`);
                        continue;
                    } else if (i === fill.gradientStops.length - 1) {
                        gradientStrings.push(` to-[${rgbToHex(stop.color)}]/[${stop.color.a * (fill.opacity ? fill.opacity : 1)}]`);
                        if (stop.position != 1) gradientStrings.push(`to-[${stop.position}]`);
                        continue;
                    }
                    gradientStrings.push(`via-[${rgbToHex(stop.color)}]/[${stop.color.a * (fill.opacity ? fill.opacity : 1)}]`);
                    gradientStrings.push(`via-[${stop.position}]`);
                }
                result.push(gradientStrings.join(' '));
                break;
            case "GRADIENT_DIAMOND":
                break;
            case "GRADIENT_RADIAL":
                break;
            case "IMAGE":
                break;
            case "VIDEO":
                break;
            default:
        }
            
    })
    return result;
}
type LayoutMode = "NONE" | "HORIZONTAL" | "VERTICAL" | "FIXED"
type Layouted = {
    height: number,
    maxHeight?: number | null | undefined, 
    minHeight?: number | null | undefined,
    width: number, 
    maxWidth?: number | null | undefined, 
    minWidth?: number | null | undefined,
    layoutMode: LayoutMode
    layoutSizingVertical: "FIXED" | "HUG" | "FILL"
    layoutSizingHorizontal: "FIXED" | "HUG" | "FILL"
    primaryAxisAlignItems: "MIN" | "MAX" | "SPACE_BETWEEN" | "CENTER"
    counterAxisAlignItems: "MIN" | "MAX" | "BASELINE" | "CENTER"
}
function generateLayout(node: Layouted): Array<string> {
    let result: Array<string> = [];
    switch (node.layoutMode) {
        case "NONE":
            break;
        case "HORIZONTAL":
            result.push(`flex flex-row`);
            break;
        case "VERTICAL":
            result.push(`flex flex-col`);
            break;
        case "FIXED":
            result.push();
            break;
    }
    switch (node.primaryAxisAlignItems) {
        case "MIN":
            result.push(`justify-items-start`);
            break;
        case "MAX":
            result.push(`justify-end`);
            break;
        case "SPACE_BETWEEN":
            result.push(`justify-stretch`);
            break;
        case "CENTER":
            result.push(`justify-center`);
            break;
    }

    if (node.maxHeight) {
        result.push(`max-h-${node.maxHeight}`);
    }
    if (node.minHeight) {
        result.push(`max-h-${node.minHeight}`);
    }
    if (node.maxWidth) {
        result.push(`max-h-${node.maxWidth}`);
    }
    if (node.minWidth) {
        result.push(`max-h-${node.minWidth}`);
    }
    switch (node.layoutSizingHorizontal) {
        case "FIXED":
            result.push(`w-[${node.width}]`)
            break;
        case "HUG":
            result.push(`w-fit`);
            break;
        case "FILL":
            result.push(`w-full`);
            break;
    }
    switch (node.layoutSizingVertical) {
        case "FIXED":
            result.push(`h-[${node.height}]`)
            break;
        case "HUG":
            result.push(`h-fit`);
            break;
        case "FILL":
            result.push(`h-full`);
            break;
    }

    return result;
}

type SpacedNode = {
    paddingTop: number, 
    paddingBottom: number, 
    paddingLeft: number, 
    paddingRight: number
}
function generateSpacings(node: SpacedNode): Array<string> {
    let result: Array<string> = [];
    if (node.paddingTop == node.paddingBottom) {
        result.push(`py-[${node.paddingTop}]`);
    } else {
        result.push(`pt-[${node.paddingTop}] pb-[${node.paddingBottom}]`);
    }
    if (node.paddingLeft == node.paddingRight) {
        result.push(`px-[${node.paddingLeft}]`);
    } else {
        result.push(`pl-[${node.paddingLeft}] pr-[${node.paddingRight}]`);
    }
    return result;
}

export default function toJSXWIP(node: BaseNode): string | null {

    if (node.type === "DOCUMENT") {
        throw new Error("NOT IMPLEMENTED");
        //return toJSX_DocumentNode(node as DocumentNode);
    }
    else if (node.type === "PAGE") {
        throw new Error("NOT IMPLEMENTED");
        //return [toJSX_PageNode(node as PageNode)];
    } else {
        return toJSX_SceneNode(node);
    }
}

function toJSX_SceneNode(node: SceneNode): string {
    switch (node.type) {
        case "FRAME":
            return toJSX_FrameNode(node);
        default:
            throw new Error(`Unsupported node type: ${node.type}`);
    }
}

function toJSX_FrameNode(node: FrameNode): string {
    let tagName = "div";
    let classNames: Array<string> = [];
    const children: Array <string | null> = [];
    node.children.map(child => {children.push(toJSXWIP(child))})

    if (typeof node.fills !== "symbol") {
        classNames.push(generateBgFromFills({fills: [...node.fills]}).join(" "));
    }
    classNames.push(generateLayout(node).join(" "));
    classNames.push(generateSpacings(node).join(" "));

    return `<${tagName} className="${classNames.join(" ")}">${children.join('')}<\/${tagName}>`;
}