import client from "../data/client";

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

function parseRemotePedalData(items, state, preview): Pedal[] {
  return items
    .filter(({ fields }) => fields.preview !== true || preview)
    .map(({ fields, sys }, index) => {
      const { name, brand, image, datapoints } = fields;
      const { id } = sys;

      const pedalState = state ? state.find((s) => s.id === id) : null;

      return {
        id,
        name,
        brand,
        image: image.fields.file.url,
        color: pedalState ? pedalState.color : getRandomColor(),
        datapoints,
        visible: pedalState ? pedalState.visible : index < 2,
        selected: pedalState ? pedalState.selected : datapoints.length > 0,
      };
    });
}

export async function getPedals(state: PedalState, preview?: boolean): Promise<Pedal[]> {
  const { items } = await client.getEntries("pedal");

  return parseRemotePedalData(items, state, preview);
}
