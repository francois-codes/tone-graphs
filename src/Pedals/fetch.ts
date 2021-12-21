import { encodeState } from "src/data/utils";

export async function fetchPedals(preview = false, state: PedalState): Promise<Pedal[]> {
  let endpoint = `/api/pedals?preview=${preview}`;

  if (typeof state !== "undefined") {
    const s = encodeState(state);
    endpoint += `&state=${s}`;
  }

  const pedals = fetch(endpoint).then((res) => res.json());

  return pedals;
}

export async function fetchDataPoints({ id }: { id: string }) {
  const endpoint = `/api/pedal/${id}/data`;
  const { datapoints } = await fetch(endpoint).then((res) => res.json());

  return datapoints;
}
