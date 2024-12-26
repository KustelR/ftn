export {};
declare global {
  type TailwindProperties = Map<string, string | number>;
  type ResultObject = {
    tagName: string;
    otherTags: Map<string, string>;
    className: TailwindProperties;
    children: Array<ResultObject>;
  };
}
