import {describe, test, expect, jest} from "@jest/globals"
import toJSX from "@/toJsx"

import { generateConfig } from "@/utils/config"
import * as nodes from "@/nodes"


describe("toJSX()", () => {
    test("Throws an error on an unimplemented node", () => {
        expect(() =>
        toJSX({type: "PAGE"} as BaseNode, generateConfig())).toThrow("NOT IMPLEMENTED");
        expect(() =>
        toJSX({type: "DOCUMENT"} as BaseNode, generateConfig())).toThrow("NOT IMPLEMENTED");
    })
    test("Calls toJSX_SceneNode on scene node", () => {
        const spy = jest.spyOn(nodes, "toJSX_SceneNode");
        try {
        toJSX({type: "RECTANGLE", fills: []} as unknown as BaseNode, generateConfig());
        }
        catch {}
        expect(spy).toBeCalled();
    })
})