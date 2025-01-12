import { getPropName } from "@/utils/config";
import rgbToHex from "@/utils/rgbToHex";

export default function generateDefs(
  data: Set<SvgFill> | undefined,
  config: { outputType: OutputType },
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
          tagName: "linear-gradient",
          props: [{ name: "id", data: [fill.id] }],
          children: stops ? stops : [],
        });
        break;
      case "IMAGE":
        if (!fill.pattern) {
          throw new Error(
            `Trying to create Image fill from no pattern\nfill: ${fill}`,
          );
        }
        result.push({
          tagName: "pattern",
          props: [
            { name: "id", data: [fill.id] },
            { name: "width", data: ["100%"] },
            { name: "height", data: ["100%"] },
          ],
          children: [
            {
              tagName: "image",
              props: [
                {
                  name: "href",
                  data: [
                    `https://placehold.co/${Math.round(fill.pattern.width)}x${Math.round(fill.pattern.height)}?text=${fill.pattern.name}`,
                  ],
                },
                { name: "width", data: ["100%"] },
                { name: "height", data: ["100%"] },
              ],
              children: [],
            },
          ],
        });
        break;
      default:
        console.warn(`Unsupported fill type: ${fill.type}`);
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
