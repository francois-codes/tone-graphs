import client from "../data/client";

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function parseRemotePedalData(items): Pedal[] {
  return items.map(({ fields, sys }, index) => {
    const { name, brand, image, datapoints } = fields;
    const { id } = sys;

    return {
      id,
      name,
      brand,
      image: image.fields.file.url,
      color: getRandomColor(),
      datapoints,
      visible: index < 2,
      selected: datapoints.length > 0,
    };
  });
}

export async function getPedals(): Promise<Pedal[]> {
  const { items } = await client.getEntries("pedal");

  return parseRemotePedalData(items);
}
