import { getDataPoints } from "src/Pedals";

export default async function handler(req, res) {
  const pedalId = req.query.id;

  const datapoints = await getDataPoints(pedalId);

  res.status(200).json(datapoints);
}
