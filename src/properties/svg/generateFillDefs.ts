import generateId from "./generateId";

export default function generateFillDefs(
  fills: Array<Paint>,
  output: Set<SvgFill>,
): undefined {
  for (let i = 0; i < fills.length; i++) {
    const fill = fills[i];
    switch (fill.type) {
      case "SOLID":
        break;
      case "GRADIENT_LINEAR":
        output.add({
          id: generateId(fill),
          type: fill.type,
          stops: (fill as GradientPaint).gradientStops.map((stop) => {
            return { offset: stop.position, color: stop.color };
          }),
        });
        break;
      default:
        console.warn(`Unsupported fill type for svg gradient: ${fill.type}`);
    }
  }
}
