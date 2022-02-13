import { setShortUrl } from "src/data/urlShortener";

export default async function handler(req, res) {
  const { payload, apiToken } = req.body;

  console.log({ payload, apiToken });

  if (!apiToken) {
    return res.status(402).json({ error: "incorrect API token" });
  }

  if (apiToken !== process.env.TONE_GRAPH_API_TOKEN) {
    return res.status(403).json({ error: "incorrect API token" });
  }

  const { id } = await setShortUrl(payload);
  res.status(200).json({ id });
}
