import { setShortUrl } from "src/data/urlShortener";

export default async function handler(req, res) {
  const payload = req.body;

  const { id } = await setShortUrl(payload);

  res.status(200).json({ id });
}
