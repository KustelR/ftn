type SerializedNode = {
    type?: string | null;
    id?: string | null;
    name?: string | null;
    x?: number | null;
    y?: number | null;
    children?: SerializedNode[] | null;
}


function parseNode(node: BaseNode) {
    const serializedNode: SerializedNode = {
        id: node.id,
    };

    return serializedNode;
}


export {
    parseNode
}