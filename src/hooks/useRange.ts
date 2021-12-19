import { atom, useRecoilState } from "recoil";

const toneRange = atom({ key: "toneRange", default: 50 });
const gainRange = atom({ key: "gainRange", default: 50 });

type Range = "tone" | "gain";

const rangeMaps = {
  tone: toneRange,
  gain: gainRange,
};

export function useRange(range: Range) {
  const rangeState = rangeMaps[range];
  return useRecoilState(rangeState);
}
