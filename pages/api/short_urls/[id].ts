import { getPayload } from "src/data/urlShortener";

export default async function handler(req, res) {
  const { id } = req.params;

  const payload = await getPayload(id);

  res.status(200).json(payload);
}
