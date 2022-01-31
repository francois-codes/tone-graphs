import { v4 } from "uuid";
import { supabase } from "./supabase";

const SHORT_URLS = "short_urls";

export async function setShortUrl(payload) {
  const id = v4();

  await supabase.from(SHORT_URLS).insert([{ id, payload }]);

  return { id };
}

export async function getPayload(id) {
  const { data } = await supabase.from(SHORT_URLS).select("payload").eq("id", id);
  return data?.[0].payload || {};
}
