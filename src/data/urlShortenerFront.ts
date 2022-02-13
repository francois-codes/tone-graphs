import axios from "axios";

export async function getShortUrl(payload) {
  try {
    const apiToken = process.env.TONE_GRAPH_API_TOKEN;

    const {
      data: { id },
    } = await axios.post("/api/short_urls", { payload, apiToken });

    return `${window.location.origin}?p=${id}`;
  } catch (e) {
    console.error(e);

    return "";
  }
}
