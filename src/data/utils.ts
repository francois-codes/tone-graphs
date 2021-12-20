export function decodeState(string: string): PedalState {
  if (typeof string === "undefined") return null;

  try {
    const rawState = decodeURIComponent(string);
    const decodedRawState = Buffer.from(rawState, "base64").toString("utf8");
    return JSON.parse(decodedRawState);
  } catch (e) {
    return null;
  }
}

export function encodeState(state: PedalState): string {
  return encodeURIComponent(Buffer.from(JSON.stringify(state)).toString("base64"));
}
