import client from "../data/client";

function parseRemotePedalData(items): Pedal[] {
  return items.map(({ fields }) => {
    const { name, brand, image, datapoints } = fields;

    return {
      name,
      brand,
      image: image.fields.file.url,
      datapoints,
    };
  });
}

export async function getPedals(): Promise<Pedal[]> {
  const { items } = await client.getEntries("pedal");

  return parseRemotePedalData(items);
}
