import { describe, test, expect } from "@jest/globals";
import { toJSX_GroupNode } from "@/nodes";
import { generateConfig } from "@/utils/config";

type GroupMock = {
  type: "GROUP";
  x: number;
  y: number;
  children: Array<GroupMock>;
  parent: GroupMock | null;
};

const groupChild: GroupMock = {
  type: "GROUP",
  x: 826,
  y: 210,
  parent: null,
  children: [],
};

const groupParent: GroupMock = {
  type: "GROUP",
  x: 800,
  y: 200,
  children: [groupChild],
  parent: null,
};
groupChild.parent = groupParent;

describe("toJSX_GroupNode", () => {
  test("should generate group node with position based on parent position", () => {
    expect(
      (
        (
          toJSX_GroupNode(groupChild as unknown as GroupNode, generateConfig())
            .props["class"] as TailwindProperties
        ).get("top") as Size
      ).absolute,
    ).toEqual(10);
    expect(
      (
        (
          toJSX_GroupNode(groupChild as unknown as GroupNode, generateConfig())
            .props["class"] as TailwindProperties
        ).get("left") as Size
      ).absolute,
    ).toEqual(26);
  });
});
