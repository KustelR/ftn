import rgbToHex from "@/utils/rgbToHex";

export default function generateId(fill: GradientPaint): string {
  let id = "";
  id += fill.type;
  id += fill.gradientStops?.length;
  id += fill.visible;
  id += fill.opacity;
  id += fill.blendMode;
  fill.gradientStops?.forEach((stop) => {
    id += stop.position;
    id += rgbToHex(stop.color).slice(1);
  });
  return id;
}
