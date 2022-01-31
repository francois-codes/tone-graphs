import axios from "axios";

export async function getShortUrl(payload) {
  const {
    data: { id },
  } = await axios.post("/api/short_urls", payload);

  return `${window.location.origin}?p=${id}`;
}
