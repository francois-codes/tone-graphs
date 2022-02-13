import { getPayload } from "src/data/urlShortener";

export default async function handler(req, res) {
  const { id, apiToken } = req.params;

  if (!apiToken) {
    return res.status(402).json({ error: "Missing API token" });
  }

  if (apiToken !== process.env.TONE_GRAPH_API_TOKEN) {
    return res.status(403).json({ error: "Incorrect API token" });
  }

  const payload = await getPayload(id);
  res.status(200).json(payload);
}
