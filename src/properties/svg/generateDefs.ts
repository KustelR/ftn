import { getPropName } from "@/utils/config";
import rgbToHex from "@/utils/rgbToHex";

export default function generateDefs(
  data: Set<SvgFill> | undefined,
  config: Config,
): HtmlObject {
  let result: Array<HtmlObject> = [];
  if (!data)
    return {
      tagName: "defs",
      children: [],
      props: [],
      destroyOnRender: true,
    };
  data.forEach((fill) => {
    switch (fill.type) {
      case "GRADIENT_LINEAR":
        const stops = fill.stops?.map((stop) => {
          const parsedStop: HtmlObject = {
            tagName: "stop",
            props: [
              { name: "offset", data: [`${stop.offset}`] },
              {
                name: getPropName("stop-color", config),
                data: [`${rgbToHex(stop.color)}`],
              },
            ],
            children: [],
          };
          if (stop.color.a !== 1) {
            parsedStop.props.push({
              name: getPropName("stop-opacity", config),
              data: [`${stop.color.a}`],
            });
          }
          return parsedStop;
        });
        result.push({
          tagName: getPropName("gradient-linear", config),
          props: [{ name: "id", data: [fill.id] }],
          children: stops ? stops : [],
        });
        break;
      default:
    }
  });
  if (result.length === 0)
    return {
      tagName: "defs",
      children: [],
      props: [],
      destroyOnRender: true,
    };
  return {
    tagName: "defs",
    children: result,
    props: [],
  };
}
