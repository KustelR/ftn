type TextedNode = {
    fontName: {family: string, style: string} | symbol,
    fontSize: number | symbol,
    fontWeight: number | symbol,
    textAlignHorizontal: 'LEFT' | 'CENTER' | 'RIGHT' | 'JUSTIFIED',
    textAlignVertical: 'TOP' | 'BOTTOM' | 'CENTER',
} 

export default function generateFont(node: TextedNode): Array<string> {
    const result: Array<string> = [];
    //result.push(`break-words`)
    if (typeof node.fontSize !== `symbol`) {
    result.push(`text-[${node.fontSize}px]`)
    }
    if (typeof node.fontWeight !== `symbol`) {
    result.push(`font-[${node.fontWeight}]`)
    }
    result.push(`text-${node.textAlignHorizontal.toLowerCase()}`)


    return result;
} 