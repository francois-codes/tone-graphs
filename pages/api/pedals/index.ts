import { decodeState } from "src/data/utils";
import { getPedals } from "src/Pedals";

export default async function handler(req, res) {
  const { state, preview = false } = req.query;
  const decodedState = decodeState(state);
  const pedals = await getPedals(preview, decodedState);

  res.status(200).json(pedals);
}
