import client from "../data/client";
import * as R from "ramda";
import * as Vibrant from "node-vibrant";

type PedalState = {
  id: string;
  selected: boolean;
  visible: boolean;
  color: string;
}[];

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function parseRemotePedalData(items, preview, state): Promise<Pedal[]> {
  return Promise.all(
    items
      .filter(({ fields }) => fields.preview !== true || preview === true)
      .map(async ({ fields, sys }) => {
        const { name, brand, image } = fields;
        const { id } = sys;

        const pedalState = state ? state?.find?.((s) => s.id === id) : null;
        const imageUrl = image?.fields?.file?.url;

        const color = await Vibrant.from(`https://${imageUrl}`).getPalette();

        return {
          id,
          name,
          brand,
          image: image.fields.file.url,
          color: pedalState?.color ?? color.Vibrant.hex ?? getRandomColor(),
          datapoints: [],
          visible: pedalState?.visible ?? false,
          selected: pedalState?.selected ?? false,
        };
      }),
  );
}

export async function getPedals(preview: string | boolean = false, state: PedalState): Promise<Pedal[]> {
  const { items } = await client.getEntries({
    content_type: "pedal",
  });

  return parseRemotePedalData(items, preview == "true", state);
}

export async function getDataPoints(pedalId: string): Promise<DataPointResponse> {
  const { items } = await client.getEntries({
    content_type: "datapoints",
    "fields.pedal.sys.id": pedalId,
  });

  return { id: pedalId, datapoints: items?.[0]?.fields?.data || [] };
}
