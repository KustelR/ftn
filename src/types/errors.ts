export class FigmaMixedError extends Error {}
export class VectorPathsError extends Error {}
export class UnsupportedNodeTypeError extends Error {
  constructor(message: string, options: ErrorOptions, placeholder: HtmlObject) {
    super(message, options);
    this.placeholder = placeholder;
  }
  placeholder: HtmlObject;
}
export class UnsupportedFillTypeError extends Error {}
export class UnsupportedPropertyError extends Error {}
